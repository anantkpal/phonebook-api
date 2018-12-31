/* eslint-disable import/prefer-default-export */
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../config';


export const generateAccessTokenHandler = (req, res) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Unable to login',
      });
    }
    return req.login(user, { session: false }, (error) => {
      if (error) {
        res.send(error);
      }
      const accessToken = jwt.sign(user, config.jwtSecret, { expiresIn: '10m' });
      return res.json({ accessToken });
    });
  })(req, res);
};
