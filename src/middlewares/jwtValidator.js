import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: './src/config/.env' });

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '').trim();
  const secretKey = process.env.SECRET_KEY;

  try {
    const data = jwt.verify(token, secretKey);
    res.locals.tokenData = data;
  } catch (e) {
    return res.status(401).send('Invalid token');
  }

  next();
}
