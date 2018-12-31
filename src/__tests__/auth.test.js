import request from 'supertest';
import app from '../server';

describe('Auth', () => {
  let requestApp;

  beforeEach(() => {
    requestApp = request.agent(app);
  });

  it('should gove version of the app', () => requestApp.get('/')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual({ app: 'phone-book-api', version: '1.0.0' });
    }));

  it('should error out for invalid credentials', (done) => {
    requestApp.post('/auth')
      .send({ email: 'email@email.com', password: 'pass' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  it('should error out for invalid credentials bad password', () => requestApp.post('/auth')
    .send({ email: 'admin@admin.com', password: 'test' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(400));

  it('should return accesstoken', () => requestApp
    .post('/auth')
    .send({ email: 'admin@admin.com', password: 'password' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((response) => {
      expect(response.body.accessToken).not.toBeNull();
    }));
});
