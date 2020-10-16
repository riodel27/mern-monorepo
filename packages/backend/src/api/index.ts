import { Router } from 'express'

import auth from './routes/auth'
import user from './routes/user'

export default () => {
   const app = Router()

   auth(app)
   user(app)

   app.get('/', (_, res) => res.send('✌️Welcome to node-express-typescript-boilerplate API!✌️'))

   return app
}
