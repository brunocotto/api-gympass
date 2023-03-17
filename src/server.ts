import { app } from './app'
import { env } from './env'

app
  .listen({
    // passa host para não ter problema ao conectar um fronend
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running...')
  })
