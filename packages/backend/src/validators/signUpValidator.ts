import { Joi } from 'celebrate'

export default Joi.object({
   name: Joi.string().required(),
   email: Joi.string().required(),
   password: Joi.string().required(),
})
