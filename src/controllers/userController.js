import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { userRepository } from '../repositories/userRepository.js';
import { linksRepository } from '../repositories/linksRepository.js';

dotenv.config({ path: './src/config/.env' });

export async function signup(req, res) {
  const { name, email, password } = req.body;

  try {
    const cryptPass = bcrypt.hashSync(password, 10);
    await userRepository.createUser(name, email, cryptPass);

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
  const { user } = res.locals;
  delete user.email;

  try {
    const validPassword = bcrypt.compareSync(body.password, user.password);

    if (!validPassword) {
      res.status(401).send('Invalid password');
      return;
    }

    const config = { expiresIn: 60 * 60 * 24 };
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, config);

    res.status(200).send(token);
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while login',
      details: err,
    });
  }
}

export async function getUser(req, res) {
  const { id } = req.params;
  const { user } = res.locals;
  delete user.password;
  delete user.email;

  try {
    const userData = { ...user };

    const resultLinks = await linksRepository.getUserLinks(id);

    const shortenedUrls = resultLinks.rows;
    const totalVisits = shortenedUrls.reduce(
      (acc, elem) => acc + elem.visitCount,
      0
    );
    const responseObj = { ...userData, visitCount: totalVisits, shortenedUrls };
    res.status(200).send(responseObj);
  } catch (err) {
    res.status(500).send('Internal error while geting user data');
  }
}

export async function getRanking(req, res) {
  try {
    const result = await userRepository.getRanking();

    const ranking = result.rows;
    res.status(200).send(ranking);
  } catch (err) {
    res.status(500).send('Internal error while trying to fetch the ranking');
  }
}
