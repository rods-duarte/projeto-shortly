import { Router } from 'express';

import userRouter from './userRouter.js';
import linkRouter from './linkRouter.js';

const router = Router();

router.use(userRouter);
router.use(linkRouter);

export default router;
