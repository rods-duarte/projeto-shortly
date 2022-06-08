import { Router } from 'express';

import { signup } from '../controllers/userController.js';

const userRouter = Router();

userRouter.post('/signup', signup);
userRouter.post('singin');
userRouter.get('users/:id');
userRouter.get('users/ranking');

export default userRouter;
