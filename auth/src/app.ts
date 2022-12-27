import mongoose from 'mongoose'
import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { errorHandler } from './middlewares/error-handler'
import {
  currentUserRouter,
  signInRouter,
  signOutRouter,
  signUpRouter,
} from './routes'

const app = express()
app.use(json())

app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)

app.use(errorHandler)

const start = async () => {
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
