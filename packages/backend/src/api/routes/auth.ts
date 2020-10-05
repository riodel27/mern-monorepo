import { Router, Request, Response, NextFunction } from 'express'
import { Container } from 'typedi'

import AuthService from '../../services/auth'

const route = Router()

export default (app: Router) => {
   app.use('/auth', route)

   route.post('/login', async (req: Request, res: Response, next: NextFunction) => {
      const logger: any = Container.get('logger')
      logger.debug(`calling auth login endpoint`)
      try {
         const { email, password } = req.body

         const authServiceInstance = Container.get(AuthService)

         const { user } = await authServiceInstance.SignIn(email, password)

         req.session!.user_id = user._id

         logger.info(`${req.method} ${req.originalUrl} ${200}`)
         return res.status(200).json({ user })
      } catch (error) {
         return next(error)
      }
   })
}
