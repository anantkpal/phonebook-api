import express from 'express';
import { urlencoded, json } from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import winston from 'winston';
import expressWinston from 'express-winston';

import routes from './routes/index';
import authRoutes from './routes/authRoutes';

import config from './config';
import { initializeAuth } from './services/authService';
import { createUser } from './services/userService';

const app = express();

mongoose.connect(config.mongoUrl, { useNewUrlParser: true }).catch(res => console.error(res));

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
  expressFormat: true,
  colorize: false,
}));

app.get('/', (req, res) => res.json({ app: 'phone-book-api', version: '1.0.0' }));

app.use('/api', passport.authenticate('jwt', { session: false }), routes);

authRoutes(app);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(422);
  res.json({ error: err.message });
  return res;
});

initializeAuth();
createUser(config.adminUser).catch(() => console.log('admin user already exists'));

export default app;
