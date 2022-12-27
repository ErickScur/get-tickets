import { NextFunction, Request, Response } from 'express'
import { DatabaseConnectionError, RequestValidationError } from '../errors'

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
    return res.status(400).send({ errors: formattedErros })
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(500).send({ errors: [{ message: err.reason }] })
  }

  return res.status(500).send({
    errors: [{ message: 'Something went wrong' }],
  })
}
