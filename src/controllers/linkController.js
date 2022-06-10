import { nanoid } from 'nanoid';

import { linksRepository } from '../repositories/linksRepository.js';

export async function createShortenUrl(req, res) {
  const { url } = req.body;
  const { userId } = res.locals.tokenData;
  const code = nanoid();

  try {
    await linksRepository.createShortenUrl(userId, url, code);

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
    const result = await linksRepository.getLinkById(id);

    const urlObj = result.rows[0];
    delete urlObj.visits;
    delete urlObj.userId;

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

export async function openShortUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const result = await linksRepository.getLinkByCode(shortUrl);
    if (!result.rows.length) {
      res.status(404).send('Link not found');
      return;
    }
    const { url, visits } = result.rows[0];

    await linksRepository.updateVisitsCount(visits, shortUrl);

    res.redirect(url);
    return;
  } catch (err) {
    res.status(500).send({
      message: 'Internal error while trying to open link',
      details: err,
    });
  }
}

export async function deleteShortenUrl(req, res) {
  const { id } = req.params;
  const { tokenData } = res.locals;

  try {
    const result = await linksRepository.getLinkById(id);
    console.log(result);

    if (!result.rows.length) {
      res.status(404).send('Link not found');
      return;
    }

    if (tokenData.userId !== result.rows[0].userId) {
      res.status(401).send('Unauthorized');
      return;
    }

    await linksRepository.deleteLink(id);

    res.sendStatus(204);
  } catch (err) {
    res.status(500).send('Internal error while trying to delete');
  }
}
