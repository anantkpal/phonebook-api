import bcrypt from 'bcrypt';
import User from '../models/user';

const SALT_WORK_FACTOR = 10;

export const createUser = async ({ name, email, password }) => {
  try {
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });

    return await User.create({ name, email, password: hashedPassword });
  } catch (e) {
    throw new Error('Unable to create user');
  }
};

export const isValidPassword = (user, password) => {
  let validPassword = false;
  try {
    validPassword = bcrypt.compareSync(password, user.password);
  } catch (e) {
    validPassword = false;
  }
  return validPassword;
};
