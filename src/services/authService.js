import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user';
import { isValidPassword } from './userService';
import config from '../config';


export const authenticate = async (email, password) => {
  const user = await User.findOne({ email }).lean();
  if (isValidPassword(user, password)) {
    return user;
  }
  return null;
};

export const initializeAuth = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  (async (email, password, cb) => {
    try {
      const user = await authenticate(email, password);
      if (!user) {
        return cb(null, false, { message: 'Incorrect email or password.' });
      }
      // eslint-disable-next-line no-underscore-dangle
      return cb(null, { ...user, id: user._id }, { message: 'Logged In Successfully' });
    } catch (e) {
      return cb(e);
    }
  })));

  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
  },
  ((jwtPayload, cb) => {
    cb(null, { id: jwtPayload.id });
  }
  )));
};
