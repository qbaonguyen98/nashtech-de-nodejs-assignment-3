import 'dotenv/config';
import mongoose from 'mongoose';
import request from 'supertest';
import bcrypt from 'bcrypt';
import App from '../app';
import container from '../inversify.config';
import UserRoute from '../routes/user.route';
import RoleModel from '../models/role.model';
import UserModel from '../models/user.model';
import UserProfileModel from '../models/user-profile.model';

beforeAll(async () => {
  // create a user for testing
  await RoleModel.create({ userRole: 'user' });

  const role = await RoleModel.findOne({ userRole: 'user' });

  const userProfile = await UserProfileModel.create({
    firstName: 'Quoc Bao',
    lastName: 'Nguyen',
    gender: 'male',
    dateOfBirth: 123456789,
  });

  await UserModel.create({
    username: 'qbaonguyen98',
    email: 'qbaonguyen98@gmail.com',
    password: bcrypt.hashSync('1234', 10),
    roleId: role._id,
    accountType: 'internal',
    profileId: userProfile._id,
    lastLogin: 123456789,
    status: {
      isActive: true,
      isDeleted: false,
      isLocked: false,
    },
  });
});

afterAll(done => {
  mongoose.connection.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

const userRoute = container.resolve<UserRoute>(UserRoute);
const app = new App([userRoute]);
const api = request(app.getServer());

describe('Testing User', () => {
  describe('[GET] /users', () => {
    it('Should response with an array of users', async () => {
      await api
        .get('/users')
        .expect(200)
        .then(response => {
          expect(response.body.data[0].fullName).toBe('Quoc Bao Nguyen');
          expect(response.body.data[0].email).toBe('qbaonguyen98@gmail.com');
          expect(response.body.data[0].lastLogin).toBe(123456789);
          expect(response.body.message).toBe('Get user list');
        });
    });
  });

  describe('[GET] /users/:username', () => {
    it('Should response with an object of user', async () => {
      const user = await UserModel.findOne({ username: 'qbaonguyen98' });
      const userId = user._id;

      await api
        .get('/users/qbaonguyen98')
        .send({ id: userId })
        .expect(200)
        .then(response => {
          expect(response.body.data.firstName).toBe('Quoc Bao');
          expect(response.body.data.lastName).toBe('Nguyen');
          expect(response.body.data.gender).toBe('male');
          expect(response.body.data.dateOfBirth).toBe(123456789);
          expect(response.body.data.username).toBe('qbaonguyen98');
          expect(response.body.data.email).toBe('qbaonguyen98@gmail.com');
          expect(response.body.data.accountType).toBe('internal');
          expect(response.body.data.lastLogin).toBe(123456789);
          expect(response.body.data.isLocked).toBe(false);
          expect(response.body.message).toBe('Get user');
        });
    });
  });

  describe('[PUT] /users/:username', () => {
    it('Should response OK', async () => {
      const user = await UserModel.findOne({ username: 'qbaonguyen98' });
      const userId = user._id;

      const userData = {
        id: userId,
        firstName: 'Marco',
        lastName: 'Reus',
        gender: 'male',
        dateOfBirth: 987654321,
        isLocked: true,
        isDeleted: false,
      };

      await api
        .put('/users/qbaonguyen98')
        .send(userData)
        .expect(200)
        .then(response => {
          expect(response.body.message).toBe('Update user by admin');
        });
    });
  });

  describe('[PUT] /users/profile/:username', () => {
    it('Should response OK', async () => {
      const user = await UserModel.findOne({ username: 'qbaonguyen98' });
      const userId = user._id;

      const userData = {
        id: userId,
        firstName: 'Marco',
        lastName: 'Reus',
        gender: 'male',
        dateOfBirth: 987654321,
      };

      await api
        .put('/users/profile/qbaonguyen98')
        .send(userData)
        .expect(200)
        .then(response => {
          expect(response.body.message).toBe('Update user profile');
        });
    });
  });

  describe('[DELETE] /users/:username', () => {
    it('Should response OK', async () => {
      const user = await UserModel.findOne({ username: 'qbaonguyen98' });
      const userId = user._id;

      await api
        .delete('/users/qbaonguyen98')
        .send({ id: userId })
        .expect(200)
        .then(response => {
          expect(response.body.message).toBe('Delete user');
        });
    });
  });
});
