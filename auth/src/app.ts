import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { errorHandler } from './middlewares/error-handler'
import cookieSession from 'cookie-session'

import {
  currentUserRouter,
  signInRouter,
  signOutRouter,
  signUpRouter,
} from './routes'

const app = express()
app.set('trust proxy', true)

app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: true,
  }),
)

app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)

app.use(errorHandler)

export { app }
