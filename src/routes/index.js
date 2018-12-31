import { Router } from 'express';
import contactRoutes from './contactsRoutes';

const router = Router();

contactRoutes(router);

export default router;
