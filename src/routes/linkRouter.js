import { Router } from 'express';
// controllers
import {
  createShortenUrl,
  getShortUrl,
} from '../controllers/linkController.js';
// middlewares
import { validateToken } from '../middlewares/jwtValidator.js';
import { validateSchema } from '../middlewares/schemaValidator.js';
// schemas
import UrlSchema from '../models/urlSchema.js';

const linkRouter = Router();

linkRouter.post(
  '/urls/shorten',
  validateSchema(UrlSchema),
  validateToken,
  createShortenUrl
);
linkRouter.get('/urls/:id', getShortUrl);
export default linkRouter;
