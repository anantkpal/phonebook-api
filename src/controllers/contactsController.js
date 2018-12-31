import {
  createContact, deleteContact, getContact, getContacts, updateContact,
} from '../services/contactService';

export const createContactHandler = async (req, res) => {
  const contact = await createContact(req.user.id, req.body);
  res.json(contact);
};

export const updateContactHandler = async (req, res) => {
  const contact = await updateContact(req.user.id, req.params.contactId, req.body);
  res.json(contact);
};

export const getContactHandler = async (req, res) => {
  const contact = await getContact(req.user.id, req.params.contactId);
  res.json(contact);
};

export const getContactsHandler = async (req, res) => {
  const contacts = await getContacts(req.user.id);
  res.json({ items: contacts });
};

export const deleteContactHandler = async (req, res) => {
  await deleteContact(req.user.id, req.params.contactId);
  res.json({});
};
