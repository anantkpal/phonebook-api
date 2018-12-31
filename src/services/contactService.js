import { pickBy, identity, map } from 'lodash';
import Contact from '../models/contact';

const serializeContact = ({
  _id: id, first_name: firstName, last_name: lastName, email, address, phone,
}) => ({
  id, firstName, lastName, email, address, phone,
});

export const createContact = async (actingUserId, {
  firstName, lastName, email, address, phone,
}) => {
  try {
    const contact = await Contact.create({
      first_name: firstName, last_name: lastName, email, address, phone, created_by: actingUserId,
    });
    return serializeContact(contact);
  } catch (e) {
    throw new Error('Unable create contact');
  }
};

export const getContact = async (actingUserId, contactId) => {
  try {
    const contact = await Contact.findOne({ created_by: actingUserId, _id: contactId }).lean();
    return serializeContact(contact);
  } catch (e) {
    throw new Error('Unable get contact');
  }
};

export const updateContact = async (actingUserId, contactId, {
  firstName, lastName, email, address, phone,
}) => {
  try {
    const newContactDetails = pickBy(
      {
        first_name: firstName, last_name: lastName, email, address, phone,
      },
      identity,
    );
    await Contact.findOneAndUpdate({ _id: contactId, created_by: actingUserId }, newContactDetails);
    return await getContact(actingUserId, contactId);
  } catch (e) {
    throw new Error(`Unable update contact ${contactId}`);
  }
};


export const getContacts = async (actingUserId) => {
  try {
    const contacts = await Contact.find({ created_by: actingUserId }).lean();
    return map(contacts, contact => serializeContact(contact));
  } catch (e) {
    throw new Error('Unable fetch contacts');
  }
};

export const deleteContact = async (actingUserId, contactId) => {
  try {
    await Contact.findOneAndDelete({ _id: contactId, created_by: actingUserId });
  } catch (e) {
    throw new Error(`Unable to delete contact with id ${contactId}`);
  }
  return true;
};
