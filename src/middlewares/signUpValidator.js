import db from '../database/index.js';

export async function checkDuplicateEmail(req, res, next) {
  const { email } = req.body;

  try {
    const userExists = await db.query(
      `--sql
        SELECT * FROM USERS
        WHERE email = $1
      `,
      [email]
    );

    if (userExists.rows.length) {
      res.status(409).send('Failed! Email is already in use');
      return;
    }

    next();
  } catch (err) {
    console.log(`ERROR: `, err);
    res.status(500).send({
      message: 'Internal error while trying to validate email',
      details: err,
    });
  }
}
