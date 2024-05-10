// test/integration/contact.test.js

const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');

describe('Contact API', () => {
  before(() => {
    // Connect to test database before running tests
    mongoose.connect('mongodb://localhost:27017/contact-list-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    // Disconnect from test database after running tests
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  describe('POST /api/contacts', () => {
    it('should create a new contact', async () => {
      const res = await request(app)
        .post('/api/contacts')
        .send({ name: 'John Doe', emails: ['john@example.com'], phoneNumbers: ['1234567890'] })
        .expect(200);

      expect(res.body).to.have.property('_id');
      expect(res.body.name).to.equal('John Doe');
      expect(res.body.emails).to.deep.equal(['john@example.com']);
    });

    // Add more integration tests for other endpoints if needed
  });

  // Add more integration tests for other endpoints if needed
});
