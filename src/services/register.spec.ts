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
