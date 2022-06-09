import { Router } from 'express';

import { signup } from '../controllers/userController.js';

import { validateSchema } from '../middlewares/schemaValidator.js';
import { checkDuplicateEmail } from '../middlewares/signUpValidator.js';

import SignUpSchema from '../models/signupSchema.js';

const userRouter = Router();

userRouter.post(
  '/signup',
  validateSchema(SignUpSchema),
  checkDuplicateEmail,
  signup
);
userRouter.post('/signin');
userRouter.get('users/:id');
userRouter.get('users/ranking');

export default userRouter;
