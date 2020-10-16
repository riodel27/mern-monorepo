import 'reflect-metadata' // we need this in order to use @Decorators

import express from 'express'

import config from './config'
import Logger from './loaders/logger'

const startServer = async () => {
   const app = express()

   await require('./loaders').default({ expressApp: app })

   app.listen(config.port, () => {
      Logger.info(`
    ################################################
    🛡️  Server listening on port: ${config.port} 🛡️ 
    ################################################
  `)
   })
}

startServer()

// TODO: improve over-all error handling and error response
