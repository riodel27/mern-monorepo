import { celebrate as validate, Joi } from 'celebrate'
import { Router } from 'express'

import UserController from '../controllers/user'
import middleware from '../middlewares'

const route = Router()

export default (app: Router) => {
   app.use('/user', route)

   route.post(
      '/',
      validate({
         body: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
         }),
      }),
      UserController.createUser,
   )

   route.use(middleware.isAuth)

   route.get('/current', UserController.getCurrentUser)
   route.get('/:id', UserController.getUserById)
   route.put('/:id', UserController.updateUser)
   route.delete('/:id', UserController.deleteUser)

   app.use('/users', route) /* users */

   route.get('/', UserController.getUsers)
}
