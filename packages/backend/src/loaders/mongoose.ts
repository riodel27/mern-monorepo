import { Db } from 'mongodb'
import mongoose from 'mongoose'

import config from '../config'

export default async (): Promise<Db> => {
   const connection = await mongoose.connect(config.databaseURL, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
   })
   return connection.connection.db
}
