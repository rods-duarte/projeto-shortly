import db from '../database/index.js';

async function createUser(name, email, password) {
  return db.query(
    `--sql
              INSERT INTO users (name, email, password)
              VALUES ($1, $2, $3)
            `,
    [name, email, password]
  );
}

async function getUser(searchReq, searchVal) {
  return db.query(
    `--sql
          SELECT * FROM USERS
          WHERE ${searchReq} = $1
    `,
    [searchVal]
  );
}

async function getRanking() {
  return db.query(
    `--sql
      SELECT 
        users.id,
        users.name,
        COUNT(links) AS "linksCount",
        COALESCE(SUM(links.visits), 0) AS "visitCount"
      FROM 
        users
      LEFT JOIN
        links ON links."userId" = users.id
      GROUP BY users.id
      ORDER BY "visitCount" DESC
      LIMIT 10
    `
  );
}

export const userRepository = {
  createUser,
  getUser,
  getRanking,
};
