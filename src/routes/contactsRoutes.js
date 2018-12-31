import {
  getContactsHandler, getContactHandler, updateContactHandler,
  createContactHandler, deleteContactHandler,
} from '../controllers/contactsController';
import asyncMiddleware from './asyncMiddleware';

const contactRoutes = (api) => {
  api.get('/contacts', asyncMiddleware(getContactsHandler));
  api.get('/contacts/:contactId', asyncMiddleware(getContactHandler));
  api.put('/contacts/:contactId', asyncMiddleware(updateContactHandler));
  api.post('/contacts/', asyncMiddleware(createContactHandler));
  api.delete('/contacts/:contactId', asyncMiddleware(deleteContactHandler));
};

export default contactRoutes;
