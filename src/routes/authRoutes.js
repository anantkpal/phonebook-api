import { generateAccessTokenHandler } from '../controllers/authController';
import asyncMiddleware from './asyncMiddleware';

const authRoutes = (api) => {
  api.post('/auth', asyncMiddleware(generateAccessTokenHandler));
};

export default authRoutes;
