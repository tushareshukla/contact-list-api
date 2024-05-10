// test/unit/contactService.test.js

const { expect } = require('chai');
const sinon = require('sinon');
const Contact = require('../../models/Contact');
const PhoneNumber = require('../../models/PhoneNumber');
const contactService = require('../../services/contactService');

describe('Contact Service', () => {
  describe('createContact', () => {
    it('should create a new contact', async () => {
      const name = 'John Doe';
      const emails = ['john@example.com'];
      const phoneNumbers = ['1234567890'];

      const saveStub = sinon.stub().resolves({ _id: 'abc123' });
      sinon.stub(Contact.prototype, 'save').callsFake(saveStub);

      const result = await contactService.createContact(name, emails, phoneNumbers);

      expect(saveStub.calledOnce).to.be.true;
      expect(result).to.deep.include({ _id: 'abc123', name, emails });
    });
  });

  // Add more unit tests for other functions in contactService if needed
});
