import 'dotenv/config';
import mongoose from 'mongoose';
import request from 'supertest';
import App from '../app';
import container from '../inversify.config';
import AuthRoute from '../routes/auth.route';
import RoleModel from '../models/role.model';

const authRoute = container.resolve<AuthRoute>(AuthRoute);
const app = new App([authRoute]);
const api = request(app.getServer());

beforeAll(() => {
  RoleModel.create({ userRole: 'user' });
})

afterAll(done => {
  mongoose.connection.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

describe('Testing Auth', () => {
  describe('[POST] /login/social', () => {
    it('Valid idToken - Should response with status 200', async () => {
      const idToken =
        'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ0Y2JhMjVlNTYzNjYwYTkwMDlkODIwYTFjMDIwMjIwNzA1NzRlODIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMTI2OTk4NTg3OTQwLW9vc28zODU5Mjl1dmg2bDlrcDBzcGl0ZmtuODA3OGs5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTI2OTk4NTg3OTQwLW9vc28zODU5Mjl1dmg2bDlrcDBzcGl0ZmtuODA3OGs5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE4MzQxMzM4MDkwNjQ4NTUzMzc1IiwiZW1haWwiOiJxYmFvbmd1eWVuOThAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJaOHk1MFo3RzZYaUg0bXR2aF9LR2Z3IiwibmFtZSI6IlF14buRYyBC4bqjbyBOZ3V54buFbiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHaVltbXdyS3FCVWl6Zk5CNTBPRXdpZkhBQU83SWpSdFdMRDlab3ZqZz1zOTYtYyIsImdpdmVuX25hbWUiOiJRdeG7kWMgQuG6o28iLCJmYW1pbHlfbmFtZSI6Ik5ndXnhu4VuIiwibG9jYWxlIjoidmkiLCJpYXQiOjE2MDc1OTQyODEsImV4cCI6MTYwNzU5Nzg4MSwianRpIjoiODg2MzViZmViYmRkMWQ0MjdkNDQ5OTEzYzUwMTViYzg4YjI4MzMzYyJ9.MG6Is8Cfc3FGoYAmOYSmTN9F0qKdDq4NtTTeFSEpxJg3PswKs_HT_0Cr3-sDdQE7iTClIqEwFFjx1Kemp85GkpISpok1QHiI3uyL_opaen8CTm72ZKS-DAcSeHw97j-CWmr6pT4AuXY0wIiACKDou-OY3nWCVdd-MUpQmxqO5B_Zfi5ry-SrNPT3Svwo2Gy5WHiQtofKRLcQdQSA5IZ2fFRLB07SWi6Dn7xkKZ2d8AKis_wfR-uzfzCfYetIVQ3XM_Txp_DKd7bFc3qW0v8ZFvkuRfzvxciuKF2YLMxsag7IQ3RxFLsJk4K1Cu1a1ITxT118PF2qeHprdtdCXsp2bg';

      await api
        .post('/auth/login/social')
        .send({ idToken })
        .expect(200)
        .then(response => {
          expect(response.body.message).toBe('Social login');
        });
    });

    it('Invalid idToken - Should response with status 400', async () => {
      const idToken = 'akjshdiuqwhyeuiqwhdjihnaskd';
      await api
        .post('/auth/login/social')
        .send({ idToken })
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe('Invalid social token');
        });
    });

    it('No idToken provided - Should response with status 400', async () => {
      await api
        .post('/auth/login/social')
        .send()
        .expect(400)
        .then(response => {
          expect(response.body.message).toBe('idToken must be a string');
        });
    });
  });
  describe('[POST] /auth/register/internal', () => {
    it('Register success - Should response with status 200', async () => {
      const registerUser = {
        username: 'Hiep nguyen',
        email: 'np71379@gmail.com',
        password: '1234567',
      };
      await api
        .post('/auth/register/internal')
        .send(registerUser)
        .expect(201)
        .then(response => {
          expect(response.body.message).toBe(`A verification email has been sent to ${registerUser.email}.`);
        });
    });
  });
});
