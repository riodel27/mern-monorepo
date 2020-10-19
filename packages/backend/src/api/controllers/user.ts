import { NextFunction, Request, Response } from 'express'
import { Container } from 'typedi'

import AuthService from '../../services/auth'
import UserService from '../../services/user'

export default {
   createUser: async (req: Request, res: Response, next: NextFunction) => {
      const logger: any = Container.get('logger')
      logger.debug('calling create user endpoint with body: ', req.body)

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
   getUserById: async (req: Request, res: Response, next: NextFunction) => {
      const logger: any = Container.get('logger')
      logger.debug('calling get user  by id endpoint')

      try {
         const { id } = req.params

         const UserServiceInstance = Container.get(UserService)

         const user = await UserServiceInstance.findOneUser({ _id: id })

         logger.info(`${req.method} ${req.originalUrl} ${200}`)
         return res.status(200).json({ message: 'Ok', data: user })
      } catch (error) {
         return next(error)
      }
   },
   getCurrentUser: async (req: Request, res: Response, next: NextFunction) => {
      const logger: any = Container.get('logger')
      logger.debug('calling get current user  endpoint')

      try {
         const id = req.session!.user_id
         console.log('ID: ', id)

         const UserServiceInstance = Container.get(UserService)

         const user = await UserServiceInstance.findOneUser({ _id: id })
         logger.info(`${req.method} ${req.originalUrl} ${200}`)
         return res
            .status(200)
            .json({ user: { name: user?.name, email: user?.email, id: user?._id } })
      } catch (error) {
         return next(error)
      }
   },
   getUsers: async (req: Request, res: Response, next: NextFunction) => {
      const logger: any = Container.get('logger')
      logger.debug(`calling get users endpoint`)
      try {
         const UserServiceInstance = Container.get(UserService)

         const { users, ...rest } = await UserServiceInstance.getAll(req.query)

         logger.info(`${req.method} ${req.originalUrl} ${202}`)
         return res.status(202).json({ users, ...rest })
      } catch (error) {
         return next(error)
      }
   },
   updateUser: async (req: Request, res: Response, next: NextFunction) => {
      const logger: any = Container.get('logger')
      logger.debug(`calling update user endpoint`)
      try {
         const { id } = req.params
         const { body: user_input } = req

         const UserServiceInstance = Container.get(UserService)

         const user = await UserServiceInstance.updateUser(id, user_input)

         logger.info(`${req.method} ${req.originalUrl} ${202}`)
         return res.status(202).json({ message: 'User Updated', data: user })
      } catch (error) {
         return next(error)
      }
   },
   deleteUser: async (req: Request, res: Response, next: NextFunction) => {
      const logger: any = Container.get('logger')
      logger.debug(`calling delete user endpoint`)
      try {
         const { id } = req.params

         const UserServiceInstance = Container.get(UserService)

         await UserServiceInstance.deleteOneUser({ _id: id })

         logger.info(`${req.method} ${req.originalUrl} ${202}`)
         return res.status(202).json({ message: 'delete successful' })
      } catch (error) {
         return next(error)
      }
   },
}
