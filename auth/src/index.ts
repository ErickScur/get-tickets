import mongoose from 'mongoose'
import { app } from './app'

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be provided')
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('Connected to MongoDB')
    app.listen(3000, async () => {
      console.log('Listening on 3000')
    })
  } catch (error) {
    throw error
  }
}

start()
