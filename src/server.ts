import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config'

let server: Server

process.on('uncaughtException', error => {
  console.error(error)
  process.exit(1)
})

const bootstrap = async () => {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Connected to database successfully')

    server = app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`)
    })
  } catch (error) {
    console.error('Fail to connect database')
  }

  process.on('unhandledRejection', error => {
    if (error) {
      server.close(() => {
        console.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()

process.on('SIGTERM', () => {
  console.log('Sigterm signal received.')

  if (server) {
    server.close()
  }
})
