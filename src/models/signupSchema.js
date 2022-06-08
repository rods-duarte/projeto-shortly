import Joi from 'joi';

const SignUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
  confirmPassword: Joi.ref('password'),
}).with('confirmPassword', 'password');

export default SignUpSchema;
