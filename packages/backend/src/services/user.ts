import argon2 from 'argon2'
import { randomBytes } from 'crypto'
import mongodb from 'mongodb'

import { not } from 'ramda'
import { Inject, Service } from 'typedi'

import { IUser, IUserInputDTO as IUserInput, IUserQuery } from '../interfaces/IUser'

@Service()
export default class UserService {
   constructor(
      @Inject('userModel') private user: Models.UserModel,
      @Inject('logger') private logger: any,
   ) {}

   public async findOneUser(query: { _id: string }): Promise<IUser | null> {
      try {
         const user = await this.user.findOne(query)

         if (not(user)) throw new Error('user not found')

         return user
      } catch (e) {
         this.logger.error(e)
         throw e
      }
   }

   public async updateUser(id: string, user_input: IUserInput): Promise<IUser | null> {
      try {
         if (user_input.email) {
            const existing_user_email = await this.user.findOne({
               email: user_input.email,
            })

            if (existing_user_email && existing_user_email.id !== id)
               throw new Error('User with this email already exists')
         }

         const salt = randomBytes(32)

         const hash_password =
            user_input.password &&
            user_input.password.trim() &&
            (await argon2.hash(user_input.password, { salt }))

         const user = await this.user.findOneAndUpdate(
            { _id: id },
            {
               ...user_input,
               ...(hash_password && {
                  salt: salt.toString('hex'),
                  password: hash_password,
               }),
            },
            { new: true },
         )

         //TODO: custom error
         if (not(user)) throw new Error('Unknown user')

         return user
      } catch (e) {
         this.logger.error(e)
         throw e
      }
   }

   public async deleteOneUser(filter: {
      _id: string
   }): Promise<mongodb.DeleteWriteOpResultObject['result'] & { deletedCount?: number }> {
      const response = await this.user.deleteOne(filter)
      return response
   }

   // TODO: need to be dynamic to handle infinite scroll, pagination, filtering and sorting.
   public async getAll(query: IUserQuery) {
      const offset = (query.offset && parseInt(query.offset)) || 0
      const limit = (query.limit && parseInt(query.limit)) || 10

      const total = await this.user.countDocuments() // needed to compute for the next offset

      const users = await this.user.find({}).sort({ _id: -1 }).skip(offset).limit(limit)

      const next_offset = offset < total ? offset + limit : null

      return { users, next_offset, meta: { count: total, limit, offset } }
   }
}
