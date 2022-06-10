import db from '../database/index.js';

export function findUser(dataType, criterion) {
  return async (req, res, next) => {
    const value = req[dataType][criterion];

    const result = await db.query(
      `--sql
            SELECT * FROM USERS
            WHERE ${criterion} = $1
      `,
      [value]
    );

    if (!result.rowCount) {
      res.status(404).send('User not found');
      return;
    }

    [res.locals.user] = result.rows;
    next();
  };
}
