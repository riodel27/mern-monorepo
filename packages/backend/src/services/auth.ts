import argon2 from 'argon2'
import { randomBytes } from 'crypto'

import { not } from 'ramda'
import { Inject, Service } from 'typedi'

import { IUser, IUserInputDTO } from '../interfaces/IUser'

@Service()
export default class AuthService {
   constructor(
      @Inject('userModel') private user: Models.UserModel,
      @Inject('logger') private logger: any,
   ) {}

   public async SignUp(userInputDTO: IUserInputDTO): Promise<{ user: IUser }> {
      try {
         const salt = randomBytes(32)

         const userInput = {
            ...userInputDTO,
            salt: salt.toString('hex'),
            password: await argon2.hash(userInputDTO.password, { salt }),
         }

         const userRecord = await this.user.create(userInput)

         if (not(userRecord)) {
            throw new Error('User cannot be created')
         }

         return { user: userRecord.toObject() }
      } catch (e) {
         /**
          * @TODO: how to handle database error like duplicate key. ex. email uniqueness
          */
         this.logger.error(e)
         throw e
      }
   }

   public async SignIn(email: string, password: string): Promise<{ user: IUser }> {
      const userRecord = await this.user.findOne({ email })

      if (not(userRecord)) {
         throw new Error('Incorrect email or password')
      }

      const validPassword = await argon2.verify(userRecord!.password, password)

      if (not(validPassword)) throw new Error('Incorrect email or password')

      return { user: userRecord?.toObject() }
   }
}
