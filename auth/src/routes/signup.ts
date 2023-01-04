import { Router, Request, Response } from 'express'
import { body } from 'express-validator'
import { ConflictError } from '../errors/conflict-error'
import { User } from '../models/user'
import jwt from 'jsonwebtoken'
import { validateRequest } from '../middlewares/validate-request'

const router = Router()

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const exists = await User.findOne({ email })
    if (exists) {
      throw new ConflictError('email')
    }

    const user = User.build({
      email,
      password,
    })
    await user.save()

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_KEY!,
    )

    req.session = {
      jwt: token,
    }

    res.status(201).send(user)
  },
)

export { router as signUpRouter }
