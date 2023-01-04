import { Router, Request, Response } from 'express'
import { body } from 'express-validator'
import { UnauthorizedError } from '../errors'
import { validateRequest } from '../middlewares/validate-request'
import { User } from '../models/user'

const router = Router()

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      throw new UnauthorizedError('Invalid credentials')
    }
  },
)

export { router as signInRouter }
