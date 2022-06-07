import { Router } from 'express';

const userRouter = Router();

userRouter.post('/signup');
userRouter.post('singin');
userRouter.get('users/:id');
userRouter.get('users/ranking');

export default userRouter;
