import { NextFunction, Request, Response } from 'express'
import { not } from 'ramda'

const isAuth = (req: Request, _: Response, next: NextFunction) => {
   if (not(req.session!.user_id)) {
      throw new Error('not authenticated')
   }

   return next()
}

export default isAuth
