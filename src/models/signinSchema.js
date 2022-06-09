import Joi from 'joi';

const SignInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default SignInSchema;
