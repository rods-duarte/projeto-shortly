import { userRepository } from '../repositories/userRepository.js';

export async function checkDuplicateEmail(req, res, next) {
  const { email } = req.body;

  try {
    const userExists = await userRepository.getUser('email', email);

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
