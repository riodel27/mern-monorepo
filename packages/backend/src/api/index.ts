import { Router } from 'express'

import auth from './routes/auth'
import user from './routes/user'
import userV1 from './routes/v1-user'

export default () => {
   const app = Router()

   auth(app)
   user(app)

   userV1(app)

   app.get('/', (_, res) => res.send('✌️Welcome to node-express-typescript-boilerplate API!✌️'))

   return app
}
