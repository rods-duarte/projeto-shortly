import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

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

export async function signin(req, res) {
  const { body } = req; // email, password

  try {
    const user = await db.query(
      `--sql
        SELECT id, password FROM USERS
        WHERE email = $1
      `,
      [body.email]
    );

    if (!user.rows.length) {
      res.status(401).send('User not found');
      return;
    }

    const validPassword = bcrypt.compareSync(
      body.password,
      user.rows[0].password
    );

    if (!validPassword) {
      res.status(401).send('Invalid password');
      return;
    }

    const config = { expiresIn: 60 * 60 * 24 };
    const token = jwt.sign(
      { userId: user.rows[0].id },
      process.env.SECRET_KEY,
      config
    );

    await db.query(
      `--sql
          INSERT INTO SESSIONS ("userId", token)
          VALUES ($1, $2)
        `,
      [user.rows[0].id, token]
    );

    res.status(200).send(token);
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while login',
      details: err,
    });
  }
}
