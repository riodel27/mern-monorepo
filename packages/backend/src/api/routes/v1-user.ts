import { Router } from 'express'

import UserController from '../controllers/user'
import middleware from '../middlewares'

const route = Router()

export default (app: Router) => {
   route.use(middleware.isAuth)

   app.use('/v1/users', route) /* users */

   route.get('/', UserController.getUsersV1)
}
