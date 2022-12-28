import { CustomError } from './custom-error'

export class ConflictError extends CustomError {
  statusCode = 409

  constructor(private field: string) {
    super(`Field already in use: ${field}`)
    Object.setPrototypeOf(this, ConflictError.prototype)
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: `Field already in use: ${this.field}` }]
  }
}
