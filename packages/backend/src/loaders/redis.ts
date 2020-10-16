import Redis from 'ioredis'

import config from '../config'
import Logger from './logger'

export default () => {
   return new Promise((resolve, _) => {
      const redis = new Redis(config.redis.url)

      //TODO: how to properly handle error on redis like connection error
      redis.on('error', (error) => {
         Logger.error(error)
         process.exit(1)
      })

      redis.on('connect', () => {
         resolve(redis)
      })
   })
}
