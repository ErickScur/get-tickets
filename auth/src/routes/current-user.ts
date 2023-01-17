import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { currentUser } from '../middlewares/current-user'

const router = Router()

router.get('/api/users/currentuser', currentUser, (req, res) => {
  return res.send({ currentUser: req.currentUser })
})

export { router as currentUserRouter }
