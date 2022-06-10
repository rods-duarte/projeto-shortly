import { Router } from 'express';

// controllers
import {
  signup,
  signin,
  getUser,
  getRanking,
} from '../controllers/userController.js';

// middlewares
import { validateSchema } from '../middlewares/schemaValidator.js';
import { checkDuplicateEmail } from '../middlewares/signUpValidator.js';
import {
  validateToken,
  compareTokenWithUserId,
} from '../middlewares/jwtValidator.js';
import { findUser } from '../middlewares/userValidator.js';

// schemas
import SignUpSchema from '../models/signupSchema.js';
import SignInSchema from '../models/signinSchema.js';

const userRouter = Router();

userRouter.post(
  '/signup',
  validateSchema(SignUpSchema),
  checkDuplicateEmail,
  signup
);
userRouter.post(
  '/signin',
  validateSchema(SignInSchema),
  findUser('body', 'email'),
  signin
);
userRouter.get(
  '/users/:id',
  validateToken,
  findUser('params', 'id'),
  compareTokenWithUserId,
  getUser
);
userRouter.get('/ranking', getRanking);

export default userRouter;
