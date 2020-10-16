import { celebrate as validate } from 'celebrate'
import { NextFunction, Request, Response, Router } from 'express'
import { Container } from 'typedi'

import AuthService from '../../services/auth'
import signUpValidator from '../../validators/signUpValidator'

const route = Router()

export default (app: Router) => {
   app.use('/auth', route)

   route.post(
      '/signup',
      validate({ body: signUpValidator }),
      async (req: Request, res: Response, next: NextFunction) => {
         const logger: any = Container.get('logger')
         logger.debug('Calling Sign-Up endpoint with body: %o', req.body)

         try {
            const AuthServiceInstance = Container.get(AuthService)

            const { user } = await AuthServiceInstance.SignUp(req.body)

            req.session!.user_id = user._id

            logger.info(`${req.method} ${req.originalUrl} ${201}`)
            return res.status(201).json({ user })
         } catch (error) {
            return next(error)
         }
      },
   )

   route.post('/signin', async (req: Request, res: Response, next: NextFunction) => {
      const logger: any = Container.get('logger')
      logger.debug('Calling Sign-In endpoint with body: %o', req.body)
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
