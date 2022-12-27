import { NextFunction, Request, Response } from 'express'
import { RequestValidationError } from '../errors'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof RequestValidationError) {
    const formattedErros = err.errors.map((error) => {
      return { message: error.msg, field: error.param }
    })
    res.status(400).send({ errors: formattedErros })
  }
}
