import express from 'express'
import cors from 'cors'

class Server {
  app: express.Application
  port: string | undefined

  constructor () {
    this.app = express()
    this.port = process.env.PORT
  }

  middleware (): void {
    this.app.use(cors())
    this.app.use(express.json())
  }

  execute (): void {
    this.middleware()
  }
}

export default Server
