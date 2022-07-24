import express from 'express'
import cors from 'cors'
import restaurantRouter from '../routes/restaurant'
import categoryRouter from '../routes/category'
import foodRouter from '../routes/food'
import dinerRouter from '../routes/diner'
import orderRouter from '../routes/order'
import http from 'http'
import Socket from '../models/socket.model'

const socketIo = require('socket.io');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class Server {
  app: express.Application
  port: string | undefined
  stripe: any
  server: http.Server
  io: any
  
  constructor () {
    this.app = express()
    this.port = `${process.env.PORT}`
    this.server = http.createServer(this.app);
    this.io = socketIo(this.server, {});
  }

  middleware (): void {
    this.app.use(cors())
    this.app.use(express.json())

    // End points
    this.app.use('/api/restaurant', restaurantRouter)
    this.app.use('/api/category', categoryRouter)
    this.app.use('/api/food', foodRouter)
    this.app.use('/api/diner', dinerRouter)
    this.app.use('/api/order', orderRouter)

    // Stripe
    this.app.post('/api/pay', async (req: any, res: any) => {
      try {
        const { amount } = req.body
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount * 100,
          currency: 'usd',
          payment_method_types: ['card'],
          description: 'Good Food charge',
      })
      const clientSecret = paymentIntent.client_secret
      res.json({ message: 'Payment initiated', clientSecret })
      } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
      }
    })
  }

  configSocket() {
    new Socket(this.io)
  }

  execute (): void {
    this.middleware()
    this.configSocket()
  }
}

export default Server
