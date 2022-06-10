import db from '../config/dbConfig.js';

async function getUserLinks(userId) {
  return db.query(
    `--sql
      SELECT
        id,
        url,
        code AS "shortUrl", 
        visits AS "visitCount"
      FROM
        links
      WHERE "userId" = $1
      ORDER BY id
        `,
    [userId]
  );
}

async function getLinkById(id) {
  return db.query(
    `--sql
        SELECT id, userId, url, visits, code as "shortUrl" FROM LINKS
        WHERE id = $1
    `,
    [id]
  );
}

async function getLinkByCode(code) {
  return db.query(
    `--sql
        SELECT id, userId, url, visits, code as "shortUrl" FROM LINKS
        WHERE code = $1
    `,
    [code]
  );
}

async function createShortenUrl(userId, url, code) {
  return db.query(
    `--sql
          INSERT INTO links ("userId", url, code)
          VALUES ($1, $2, $3)
        `,
    [userId, url, code]
  );
}

async function updateVisitsCount(visitsValue, code) {
  return db.query(
    `--sql
        UPDATE LINKS
          SET visits = $1
          WHERE code = $2
    `,
    [visitsValue + 1, code]
  );
}

async function deleteLink(id) {
  return db.query(
    `--sql
        DELETE FROM LINKS
        WHERE id = $1
    `,
    [id]
  );
}

export const linksRepository = {
  getUserLinks,
  getLinkById,
  getLinkByCode,
  createShortenUrl,
  updateVisitsCount,
  deleteLink,
};
