import mongoose from 'mongoose'

let connection: any

export async function connectDb (): Promise<void> {
  if (connection) return
  const URI = process.env.DB_CNN_STRING as string

  connection = mongoose.connection
  connection.once('open', () =>
    console.log('Connection established successfully')
  )
  connection.on('disconnected', () => console.log('Succesfully disconnected'))
  connection.on('error', (err: any) => console.log('Something went wrong', err))

  await mongoose.connect(URI)
}

export async function disconnected (): Promise<void> {
  if (!connection) return
  await mongoose.disconnect()
}

export async function cleanup (): Promise<void> {
  if (!connection) return
  for (const collection in connection.collections) {
    await connection.collections[collection].deleteMany({})
  }
}
