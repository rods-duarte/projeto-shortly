import { Router } from 'express';

import { signup, signin } from '../controllers/userController.js';

import { validateSchema } from '../middlewares/schemaValidator.js';
import { checkDuplicateEmail } from '../middlewares/signUpValidator.js';

import SignUpSchema from '../models/signupSchema.js';
import SignInSchema from '../models/signinSchema.js';

const userRouter = Router();

userRouter.post(
  '/signup',
  validateSchema(SignUpSchema),
  checkDuplicateEmail,
  signup
);
userRouter.post('/signin', validateSchema(SignInSchema), signin);
userRouter.get('users/:id');
userRouter.get('users/ranking');

export default userRouter;
