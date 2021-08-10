/* eslint-disable no-await-in-loop */
const request = require('supertest');
const app = require('../../app');
const { Users } = require('../../models');
const { encrypt } = require('../../utils/encryptor');

const mainApiURL = `/api/v1/users`;

describe('Users API', () => {
  test(`POST ${mainApiURL}/login -> return the logged in user along with a token`, async () => {
    const userData = {
      firstName: 'Long',
      lastName: 'Nguyen Tran Phan',
      dateOfBirth: '2000-07-30',
      gender: 'Male',
      joinedDate: '2021-08-02',
      userType: 'Admin',
      staffCode: 'SD0001',
      username: 'longntp',
      userLocation: 'HCM',
      password: encrypt('123456'),
    };

    const user = await Users.create(userData);

    const response = await request(app)
      .post(`${mainApiURL}/login`)
      .send({
        username: user.username,
        password: '123456',
      })
      .expect('Content-Type', /json/)
      .expect(200);

    await user.destroy();

    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({
          id: expect.any(Number),
          firstName: expect.any(String),
          lastName: expect.any(String),
          dateOfBirth: expect.any(String),
          gender: expect.any(String),
          joinedDate: expect.any(String),
          userType: expect.any(String),
          staffCode: expect.any(String),
          username: expect.any(String),
          userLocation: expect.any(String),
          firstTimeLogin: expect.any(Boolean),
        }),
        firstTimeLogin: expect.any(Boolean),
      })
    );
  });

  test(`POST ${mainApiURL}/login -> return 400 if invalid`, async () => {
    const userData = {
      username: 'longntp12312312312',
      password: '12345631231232e3e',
    };

    const response = await request(app)
      .post(`${mainApiURL}/login`)
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        statusCode: expect.any(Number),
        message: expect.any(String),
      })
    );
  });
});
