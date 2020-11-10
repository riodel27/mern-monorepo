type HTTP_STATUS_CODE = number

/* eslint-disable no-use-before-define */
class GeneralError extends Error {
   constructor(message: string) {
      super()
      this.message = message
   }

   getCode(): HTTP_STATUS_CODE {
      if (this instanceof BadRequest) {
         return 400
      }
      if (this instanceof NotFound) {
         return 404
      }
      return 500
   }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}

export { GeneralError, BadRequest, NotFound }
