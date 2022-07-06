import express from 'express'
import cors from 'cors'
import restaurantRouter from '../routes/restaurant'
import categoryRouter from '../routes/category'
import foodRouter from '../routes/food'

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
    this.app.use('/api/category', categoryRouter)
    this.app.use('/api/food', foodRouter)
  }

  execute (): void {
    this.middleware()
  }
}

export default Server
