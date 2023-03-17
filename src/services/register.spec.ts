import { UserAlreadyExistsError } from './../errors/user-already-exists'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'

describe('Register use case', () => {
  it('should hash user password upon registration', async () => {
    const UsersRepository = new InMemoryUsersRepository()
    const registeUseCase = new RegisterUseCase(UsersRepository)

    const { user } = await registeUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
describe('should not be able to register with same email twice', () => {
  it('should hash user password upon registration', async () => {
    const UsersRepository = new InMemoryUsersRepository()
    const registeUseCase = new RegisterUseCase(UsersRepository)

    const email = 'johndoe@example.com'

    await registeUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    expect(
      () =>
        registeUseCase.execute({
          name: 'John Doe',
          email,
          password: '123456',
        }),
      // esperando um erro da promise Reject
      // e que o erro seja uma instância de UserAlreadyExistsError
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
