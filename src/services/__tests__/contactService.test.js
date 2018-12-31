import sinon from 'sinon';
import 'sinon-mongoose';

import Contact from '../../models/contact';
import {
  createContact, deleteContact, getContact, getContacts, updateContact,
} from '../contactService';

const contactRequest = {
  firstName: 'Anant',
  lastName: 'Pal',
  email: 'email@email.com',
  address: "B'glr, India",
  phone: '+91 9884996917',
};

describe('Contact Service', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('should create contact with right arguments', async () => {
    const ContactMock = sinon.mock(Contact);
    ContactMock
      .expects('create')
      .withArgs({
        first_name: contactRequest.firstName,
        last_name: contactRequest.lastName,
        email: contactRequest.email,
        address: contactRequest.address,
        phone: contactRequest.phone,
        created_by: 'userId',
      })
      .chain('exec')
      .resolves({
        first_name: contactRequest.firstName,
        last_name: contactRequest.lastName,
        email: contactRequest.email,
        address: contactRequest.address,
        phone: contactRequest.phone,
        created_by: 'userId',
      });

    const contact = await createContact('userId', contactRequest);
    expect(contact.firstName).toEqual(contactRequest.firstName);
    expect(contact.lastName).toEqual(contactRequest.lastName);
    expect(contact.email).toEqual(contactRequest.email);
    expect(contact.phone).toEqual(contactRequest.phone);
    ContactMock.verify();
    ContactMock.restore();
  });

  it('should fail to create contact with right arguments', async () => {
    const ContactMock = sinon.mock(Contact);
    ContactMock
      .expects('create')
      .withArgs({
        first_name: contactRequest.firstName,
        last_name: contactRequest.lastName,
        email: contactRequest.email,
        address: contactRequest.address,
        phone: contactRequest.phone,
        created_by: 'userId',
      })
      .chain('exec')
      .rejects();

    try {
      await createContact('userId', contactRequest);
    } catch (e) {
      expect(e.message).toEqual('Unable create contact');
    }
    ContactMock.restore();
  });


  it('should get contact with right attributes', async () => {
    const ContactMock = sinon.mock(Contact);
    ContactMock
      .expects('findOne')
      .withArgs({ _id: 'id', created_by: 'userId' })
      .chain('exec')
      .resolves({
        first_name: contactRequest.firstName,
        last_name: contactRequest.lastName,
        email: contactRequest.email,
        address: contactRequest.address,
        phone: contactRequest.phone,
        created_by: 'userId',
      });

    const contact = await getContact('userId', 'id');
    expect(contact.firstName).toEqual(contactRequest.firstName);
    expect(contact.lastName).toEqual(contactRequest.lastName);
    expect(contact.email).toEqual(contactRequest.email);
    expect(contact.phone).toEqual(contactRequest.phone);
    ContactMock.verify();
    ContactMock.restore();
  });

  it('should fail to get contact', async () => {
    const ContactMock = sinon.mock(Contact);
    ContactMock
      .expects('findOne')
      .withArgs({ id: 'id', created_by: 'userId' })
      .chain('exec')
      .rejects();

    try {
      await getContact('userId', 'id');
    } catch (e) {
      expect(e.message).toEqual('Unable get contact');
    }
    ContactMock.restore();
  });

  it('should get contacts with right attributes', async () => {
    const ContactMock = sinon.mock(Contact);
    ContactMock
      .expects('find')
      .withArgs({ created_by: 'userId' })
      .chain('exec')
      .resolves([{
        first_name: contactRequest.firstName,
        last_name: contactRequest.lastName,
        email: contactRequest.email,
        address: contactRequest.address,
        phone: contactRequest.phone,
        created_by: 'userId',
      }]);

    const contacts = await getContacts('userId');
    expect(contacts[0].firstName).toEqual(contactRequest.firstName);
    expect(contacts[0].lastName).toEqual(contactRequest.lastName);
    expect(contacts[0].email).toEqual(contactRequest.email);
    expect(contacts[0].phone).toEqual(contactRequest.phone);
    ContactMock.verify();
    ContactMock.restore();
  });

  it('should fail to get contacts', async () => {
    const ContactMock = sinon.mock(Contact);
    ContactMock
      .expects('findOne')
      .withArgs({ id: 'id', created_by: 'userId' })
      .chain('exec')
      .rejects();

    try {
      await getContacts('userId');
    } catch (e) {
      expect(e.message).toEqual('Unable fetch contacts');
    }
    ContactMock.restore();
  });

  it('should update contact with right arguments', async () => {
    const ContactMock = sinon.mock(Contact);
    ContactMock
      .expects('findOneAndUpdate')
      .withArgs({ _id: 'id', created_by: 'userId' }, {
        first_name: contactRequest.firstName,
        last_name: contactRequest.lastName,
        email: contactRequest.email,
        address: contactRequest.address,
        phone: contactRequest.phone,
      })
      .chain('exec')
      .resolves({
        first_name: contactRequest.firstName,
        last_name: contactRequest.lastName,
        email: contactRequest.email,
        address: contactRequest.address,
        phone: contactRequest.phone,
        created_by: 'userId',
      });

    ContactMock
      .expects('findOne')
      .withArgs({
        created_by: 'userId', _id: 'id',
      })
      .chain('exec')
      .resolves({
        first_name: contactRequest.firstName,
        last_name: contactRequest.lastName,
        email: contactRequest.email,
        address: contactRequest.address,
        phone: contactRequest.phone,
        created_by: 'userId',
      });

    const contact = await updateContact('userId', 'id', contactRequest);
    expect(contact.firstName).toEqual(contactRequest.firstName);
    expect(contact.lastName).toEqual(contactRequest.lastName);
    expect(contact.email).toEqual(contactRequest.email);
    expect(contact.phone).toEqual(contactRequest.phone);
    ContactMock.verify();
    ContactMock.restore();
  });

  it('should fail to update contact with right arguments', async () => {
    const ContactMock = sinon.mock(Contact);
    ContactMock
      .expects('findOneAndUpdate')
      .withArgs({ _id: 'id', created_by: 'userId' }, {
        first_name: contactRequest.firstName,
        last_name: contactRequest.lastName,
        email: contactRequest.email,
        address: contactRequest.address,
        phone: contactRequest.phone,
      })
      .chain('exec')
      .rejects();

    try {
      await updateContact('userId', 'id', contactRequest);
    } catch (e) {
      expect(e.message).toEqual('Unable update contact id');
    }
    ContactMock.restore();
  });

  it('should delete contact with right arguments', async () => {
    const ContactMock = sinon.mock(Contact);
    ContactMock
      .expects('findOneAndDelete')
      .withArgs({ _id: 'id', created_by: 'userId' })
      .chain('exec')
      .resolves();
    await deleteContact('userId', 'id');
    ContactMock.verify();
    ContactMock.restore();
  });

  it('should fail to delete contact with right arguments', async () => {
    const ContactMock = sinon.mock(Contact);
    ContactMock
      .expects('findOneAndDelete')
      .withArgs({ _id: 'id', created_by: 'userId' })
      .chain('exec')
      .rejects();

    try {
      await deleteContact('userId', 'id');
    } catch (e) {
      expect(e.message).toEqual('Unable to delete contact with id id');
    }
    ContactMock.verify();
    ContactMock.restore();
  });
});
