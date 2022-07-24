require("dotenv").config({ path: "./.env" });
import Server from './models/server'
import { connectDb } from './db'
void connectDb()

const server = new Server()
server.execute()

server.server.listen(server.port, () => {
  console.log('server started in http://localhost:8080')
})
