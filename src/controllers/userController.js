import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import db from '../database/index.js';

dotenv.config({ path: './src/config/.env' });

export async function signup(req, res) {
  const { name, email, password } = req.body;

  try {
    const cryptPass = bcrypt.hashSync(password, 10);

    await db.query(
      `--sql
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
          `,
      [name, email, cryptPass]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while creating new user',
      details: err,
    });
  }
}
