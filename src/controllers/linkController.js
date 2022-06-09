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

export async function getShortUrl(req, res) {
  const { id } = req.params;
  try {
    const result = await db.query(
      `--sql
            SELECT id, code as "shortUrl", url FROM LINKS
            WHERE id = $1
          `,
      [id]
    );

    const urlObj = result.rows[0];

    if (!urlObj) {
      res.status(404).send('shortened url not found');
      return;
    }

    res.status(200).send(urlObj);
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while trying to get shortened url',
      details: err,
    });
  }
}
