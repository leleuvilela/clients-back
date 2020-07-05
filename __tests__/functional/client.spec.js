const request = require('supertest');
const MongoMock = require('../utils/MongoMock');
const Client = require('../../src/app/schemas/Client');
const app = require('../../src/app');

describe('route clients', () => {
  beforeAll(async () => {
    await MongoMock.connect();
    await Client.deleteMany({});
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  it('should be able to create new Contact', async () => {
    const response = await request(app)
      .post('/clients')
      .send({
        name: 'Vinicius',
        email: 'viniciusvilela19@gmail.com',
        cpf: '12345678910',
        phone: '62999300390',
      });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      name: 'Vinicius',
      email: 'viniciusvilela19@gmail.com',
      cpf: 12345678910,
      phone: 62999300390,
    });
  });

  it('should be able to list contacts', async () => {
    const response = await request(app).get('/clients');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'Vinicius' })]),
    );
  });

  it('should be able to show one contact', async () => {
    const client = await Client.findOne({});

    const response = await request(app).get(`/clients/${client.email}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'Vinicius' })]),
    );
  });

  it('should be able to update one contact', async () => {
    const client = await Client.findOne({});

    const response = await request(app)
      .put(`/clients/${client.email}`)
      .send({ name: 'Vinicius Vilela', cpf: 12345678910, phone: 62999300390 });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ name: 'Vinicius Vilela' });
  });

  it('should be able to delete one contact', async () => {
    const client = await Client.findOne({});

    const response = await request(app).delete(`/clients/${client.email}`);

    expect(response.status).toBe(200);
  });
});
