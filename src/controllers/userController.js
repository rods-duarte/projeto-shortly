import bcrypt from 'bcrypt';

import db from '../database/index.js';
import SignUpSchema from '../models/signupSchema.js';

export async function signup(req, res) {
  const { body } = req; // name, email, password, confirmPassword
  const validation = SignUpSchema.validate(body).error;

  if (validation) {
    res.status(422).send({
      message: 'Invalid input',
      details: `${validation.details.map((e) => e.message).join(', ')}`,
    });
    return;
  }

  try {
    const userExists = await db.query(
      `--sql
        SELECT * FROM USERS
        WHERE email = $1
      `,
      [body.email]
    );

    if (userExists.rows.length) {
      res.status(409).send('Email already registered');
      return;
    }
  } catch (err) {
    console.log(`ERROR: `, err);
    res.status(500).send({
      message: 'Internal error while trying to validate email',
      details: err,
    });
  }

  try {
    const { name, email, password } = req.body;
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
    console.log(`ERROR: `, err);
    res.status(500).send({
      message: 'Internal error while creating new user',
      details: err,
    });
  }
}
