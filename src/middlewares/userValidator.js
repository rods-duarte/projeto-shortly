import { userRepository } from '../repositories/userRepository.js';

export function findUser(dataType, criterion) {
  return async (req, res, next) => {
    const value = req[dataType][criterion];

    const result = await userRepository.getUser(criterion, value);

    if (!result.rowCount) {
      res.status(404).send('User not found');
      return;
    }

    [res.locals.user] = result.rows;
    next();
  };
}
