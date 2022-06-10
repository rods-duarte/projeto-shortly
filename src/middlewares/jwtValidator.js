import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: './src/config/.env' });

export function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '').trim();
  const secretKey = process.env.SECRET_KEY;

  try {
    const data = jwt.verify(token, secretKey);
    res.locals.tokenData = data;
    next();
  } catch (e) {
    return res.status(401).send('Invalid token');
  }
}

export function compareTokenWithUserId(req, res, next) {
  const { id } = req.params;
  const { userId } = res.locals.tokenData;

  if (id != userId) {
    res.status(404).send('Token id does not match the given id');
  }

  next();
}
