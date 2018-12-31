import request from 'supertest';
import { get } from 'lodash';
import app from '../server';


const contactRequest = {
  firstName: 'Anant',
  lastName: 'Pal',
  email: 'email@email.com',
  address: "B'glr, India",
  phone: '+91 9884996917',
};

describe('Contacts', () => {
  let requestApp;
  let accessToken;

  beforeEach(async () => {
    requestApp = request.agent(app);
    const response = await requestApp
      .post('/auth')
      .send({ email: 'admin@admin.com', password: 'password' })
      .set('Accept', 'application/json');
    accessToken = get(response, 'body.accessToken');
  });

  describe('JWT validation', () => {
    it('should error out if token is not passed while fetching contacts', () => requestApp
      .get('/api/contacts')
      .set('Accept', 'application/json')
      .expect(401));

    it('should error out if token is not passed while fetching contact', () => requestApp
      .get('/api/contacts/5c29b9259010f771465ac87c')
      .set('Accept', 'application/json')
      .expect(401));

    it('should error out if token is not passed while deleting contact', () => requestApp
      .delete('/api/contacts/5c29b9259010f771465ac87c')
      .set('Accept', 'application/json')
      .expect(401));

    it('should error out if token is not passed while updating contact', () => requestApp
      .put('/api/contacts/5c29b9259010f771465ac87c')
      .send({ firstName: 'Nam' })
      .set('Accept', 'application/json')
      .expect(401));

    it('should error out if token is not passed while creating contact', () => requestApp
      .put('/api/contacts/5c29b9259010f771465ac87c')
      .send({ firstName: 'Nam' })
      .set('Accept', 'application/json')
      .expect(401));

    it('should be able to create contact of valid token is passed', () => requestApp
      .post('/api/contacts')
      .send(contactRequest)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Accept', 'application/json')
      .expect(200));

    it('should be able to update contact of valid token is passed', async () => {
      const createdContact = await requestApp
        .post('/api/contacts')
        .send(contactRequest)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Accept', 'application/json');

      expect(createdContact.body.firstName).toEqual('Anant');

      const updatedContact = await requestApp
        .put(`/api/contacts/${createdContact.body.id}`)
        .send({ firstName: 'update' })
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Accept', 'application/json');
      expect(updatedContact.body.firstName).toEqual('update');
    });

    it('should be able to get contact of valid token is passed', async () => {
      const createdContact = await requestApp
        .post('/api/contacts')
        .send(contactRequest)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Accept', 'application/json');

      expect(createdContact.body.firstName).toEqual('Anant');

      const updatedContact = await requestApp
        .get(`/api/contacts/${createdContact.body.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Accept', 'application/json');
      expect(updatedContact.body.firstName).toEqual(contactRequest.firstName);
      expect(updatedContact.body.lastName).toEqual(contactRequest.lastName);
      expect(updatedContact.body.email).toEqual(contactRequest.email);
      expect(updatedContact.body.phone).toEqual(contactRequest.phone);
    });

    it('should fail  to get contact of valid token is passed but bad contact id', async () => {
      const createdContact = await requestApp
        .post('/api/contacts')
        .send(contactRequest)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Accept', 'application/json');

      expect(createdContact.body.firstName).toEqual('Anant');

      const contactResponse = await requestApp
        .get(`/api/contacts/${createdContact}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Accept', 'application/json');
      expect(contactResponse.statusCode).toEqual(422);
    });

    it('should be able to fetch all contacts of valid token is passed', async () => {
      const createdContact = await requestApp
        .post('/api/contacts')
        .send(contactRequest)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Accept', 'application/json');

      expect(createdContact.body.firstName).toEqual('Anant');

      const contacts = await requestApp
        .get('/api/contacts')
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Accept', 'application/json');

      expect(contacts.body.items[0].firstName).toEqual(contactRequest.firstName);
      expect(contacts.body.items[0].lastName).toEqual(contactRequest.lastName);
      expect(contacts.body.items[0].email).toEqual(contactRequest.email);
      expect(contacts.body.items[0].phone).toEqual(contactRequest.phone);
    });


    it('should be able to delete contact of valid token is passed', async () => {
      const createdContact = await requestApp
        .post('/api/contacts')
        .send(contactRequest)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Accept', 'application/json');

      expect(createdContact.body.firstName).toEqual('Anant');

      const contacts = await requestApp
        .delete(`/api/contacts/${createdContact.body.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Accept', 'application/json');
      expect(contacts.statusCode).toEqual(200);
    });
  });
});
