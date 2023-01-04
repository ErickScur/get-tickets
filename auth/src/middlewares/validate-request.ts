import { Request, Response, NextFunction } from 'express'
import { RequestValidationError } from '../errors'
import { validationResult } from 'express-validator'

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req)
  if (errors.array().length) {
    throw new RequestValidationError(errors.array())
  }

  next()
}
