import { Router } from 'express'

const router = Router()

router.post('/api/users/signout', (req, res) => {
  res.send('Hello world')
})

export { router as signOutRouter }
