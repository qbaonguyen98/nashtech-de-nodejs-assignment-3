import 'dotenv/config';
import mongoose from 'mongoose';
import request from 'supertest';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import App from '../app';
import container from '../inversify.config';
import UserRoute from '../routes/user.route';
import RoleModel from '../models/role.model';
import UserModel from '../models/user.model';
import UserProfileModel from '../models/user-profile.model';

let adminCookie: string = '';
let userCookie: string = '';

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

  const user = await UserModel.create({
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

  // create an admin for testing
  await RoleModel.create({ userRole: 'admin' });

  const adminRole = await RoleModel.findOne({ userRole: 'admin' });

  const admin = await UserModel.create({
    username: 'admin',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('admin', 10),
    roleId: adminRole._id,
    accountType: 'internal',
    profileId: null,
    lastLogin: 123456789,
    status: {
      isActive: true,
      isDeleted: false,
      isLocked: false,
    },
  });

  // Create admin cookie
  const secret: string = process.env.JWT_SECRET;
  const expiresIn: number = 60 * 60 * 60;

  const adminToken = jwt.sign({ id: admin._id, role: 'admin' }, secret, { expiresIn })
  adminCookie = `Authorization=${adminToken}; HttpOnly; Max-Age=${expiresIn};`

  // Create user cookie
  const userToken = jwt.sign({ id: user._id, role: 'user' }, secret, { expiresIn })
  userCookie = `Authorization=${userToken}; HttpOnly; Max-Age=${expiresIn};`
});

afterAll(done => {
  mongoose.connection.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

// get API
const userRoute = container.resolve<UserRoute>(UserRoute);
const app = new App([userRoute]);
const api = request(app.getServer());


describe('Testing User', () => {
  describe('[GET] /users', () => {
    it('Request by admin - Should response with an array of users', async () => {
      await api
        .get('/users')
        .set('Cookie', [adminCookie])
        .expect(200)
        .then(response => {
          expect(response.body.data[0].fullName).toBe('Quoc Bao Nguyen');
          expect(response.body.data[0].email).toBe('qbaonguyen98@gmail.com');
          expect(response.body.data[0].lastLogin).toBe(123456789);
          expect(response.body.message).toBe('Get user list');
        });
    });

    it('Request by user - Should response 401', async () => {
      await api
        .get('/users')
        .set('Cookie', [userCookie])
        .expect(401)
        .then(response => {
          expect(response.body.message).toBe('You are not admin');
        });
    });
  });

  describe('[GET] /users/:username', () => {
    it('Request by admin - Should response with an object of user', async () => {
      const user = await UserModel.findOne({ username: 'qbaonguyen98' });
      const userId = user._id;

      await api
        .get('/users/qbaonguyen98')
        .set('Cookie', [adminCookie])
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

    it('Request by correct user - Should response with an object of user', async () => {
      const user = await UserModel.findOne({ username: 'qbaonguyen98' });
      const userId = user._id;

      await api
        .get('/users/qbaonguyen98')
        .set('Cookie', [userCookie])
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
    it('Request by admin - Should response OK', async () => {
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
        .set('Cookie', [adminCookie])
        .send(userData)
        .expect(200)
        .then(response => {
          expect(response.body.message).toBe('Update user by admin');
        });
    });

    it('Request by user - Should response 401', async () => {
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
        .set('Cookie', [userCookie])
        .send(userData)
        .expect(401)
        .then(response => {
          expect(response.body.message).toBe('You are not admin');
        });
    });
  });

  describe('[PUT] /users/profile/:username', () => {
    it('Request by correct user - Should response OK', async () => {
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
        .set('Cookie', [userCookie])
        .send(userData)
        .expect(200)
        .then(response => {
          expect(response.body.message).toBe('Update user profile');
        });
    });
  });

  describe('[DELETE] /users/:username', () => {
    it('Request by admin - Should response OK', async () => {
      const user = await UserModel.findOne({ username: 'qbaonguyen98' });
      const userId = user._id;

      await api
        .delete('/users/qbaonguyen98')
        .set('Cookie', [adminCookie])
        .send({ id: userId })
        .expect(200)
        .then(response => {
          expect(response.body.message).toBe('Delete user');
        });
    });
  });
});
