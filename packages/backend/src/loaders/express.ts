import bodyParser from 'body-parser'
import { errors } from 'celebrate'
import connectRedis from 'connect-redis'
import cors from 'cors'
import { Application, NextFunction, Request, Response } from 'express'
import session from 'express-session'
import { GeneralError } from 'utils/errors'

import routes from '../api'
import config from '../config'
import { __prod__, COOKIE_NAME } from '../constants'

export default ({ app, redis_client }: { app: Application; redis_client: any }) => {
   const RedisStore = connectRedis(session)

   app.enable('trust proxy')

   const corsOptions = {
      origin(origin: any, callback: any) {
         if (config.whitelist?.split(',').indexOf(origin) !== -1 || !origin) {
            callback(null, true)
         } else {
            callback(new Error('Not allowed by CORS'))
         }
      },
      credentials: true,
   }
   app.use(cors(corsOptions))
   app.use(bodyParser.json())

   app.use(
      session({
         name: COOKIE_NAME,
         store: new RedisStore({
            client: redis_client,
            disableTouch: true,
         }),
         cookie: {
            // maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
            maxAge: 60 * 60 * 1000, // 1 hour
            httpOnly: true,
            sameSite: 'lax', // csrf
            secure: __prod__, // cookie only works in https
            // domain: __prod__ ? ".xxx.com" : undefined,
         },
         saveUninitialized: false,
         secret: config.redis.secret,
         resave: false,
      }),
   )

   // Load API routes
   app.use(config.api.prefix, routes())

   // handle joi validation errors
   app.use(errors())

   /// catch 404 and forward to error handler
   app.use((_, __, next) => {
      const err: any = new Error('Not Found')
      err['status'] = 404
      next(err)
   })

   app.use((err: any, _: Request, res: Response, next: NextFunction) => {
      /**
       * Handle 401 thrown by auth
       */
      if (err.name === 'UnauthorizedError') {
         return res.status(err.status).send({ message: err.message }).end()
      }
      return next(err)
   })

   app.use((err: any, _: Request, res: Response, __: NextFunction) => {
      if (err instanceof GeneralError) {
         return res.status(err.getCode()).json({
            status: 'error',
            message: err.message,
         })
      }

      return res.status(500).json({
         status: 'error',
         message: err.message,
      })
   })
}
