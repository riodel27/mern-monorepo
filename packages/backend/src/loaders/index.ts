import express from 'express'

import dependencyInjectorLoader from './dependencyInjector'
import expressLoader from './express'
import Logger from './logger'
import mongoosesLoader from './mongoose'
import redisLoader from './redis'

export default async ({ expressApp }: { expressApp: express.Application }) => {
   await mongoosesLoader()
   Logger.info('✌️ DB loaded and connected!')

   const userModel = {
      name: 'userModel',
      model: require('../models/user').default,
   }

   const redis_client = await redisLoader()
   Logger.info('✌️ Redis loaded and connected!')

   await dependencyInjectorLoader({
      models: [userModel],
   })
   Logger.info('✌️ Dependency Injector loaded')

   await expressLoader({ app: expressApp, redis_client })
   Logger.info('✌️ Express loaded')
}
