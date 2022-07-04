import Server from './models/server'
import dotenv from 'dotenv'
import { connectDb } from './db'
dotenv.config()
void connectDb()

const server = new Server()
server.execute()
server.app.listen(server.port, () => {
  console.log('server started in http://localhost:8080')
})
