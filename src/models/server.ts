import express from 'express'
import cors from 'cors'
import restaurantRouter from '../routes/restaurant'

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

    // End points
    this.app.use('/api/restaurant', restaurantRouter)
  }

  execute (): void {
    this.middleware()
  }
}

export default Server
