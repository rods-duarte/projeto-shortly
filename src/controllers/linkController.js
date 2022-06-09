import { nanoid } from 'nanoid';

import db from '../database/index.js';

export async function createShortenUrl(req, res) {
  const { url } = req.body;
  const { userId } = res.locals.tokenData;
  const code = nanoid();

  try {
    await db.query(
      `--sql
        INSERT INTO links ("userId", url, code)
        VALUES ($1, $2, $3)
      `,
      [userId, url, code]
    );

    res.status(201).send({
      shortUrl: code,
    });
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while trying to create short url',
      details: err,
    });
  }
}
