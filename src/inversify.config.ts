import 'reflect-metadata';
import { Container } from 'inversify';
import TYPES from './types';
import AuthController from './controllers/auth.controller';
import AuthService from './services/auth.service';
import UserRepository from './repositories/user.repository';

import UserController from './controllers/user.controller';
import UserService from './services/user.service';

import ServiceController from './controllers/service.controller';
import ServiceService from './services/service.service';
import ServiceRepository from './repositories/service.repository';

import GarageController from './controllers/garage.controller';
import GarageService from './services/garage.service';
import GarageRepository from './repositories/garage.repository';

import BookingController from './controllers/booking.controller';
import BookingService from './services/booking.service';
import BookingRepository from './repositories/booking.repository';
import GarageServiceRepository from './repositories/garage-service.repository';

const container = new Container({ defaultScope: 'Singleton' });

// Auth
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);

// User
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<UserService>(TYPES.UserService).to(UserService);

// Service
container.bind<ServiceController>(TYPES.ServiceController).to(ServiceController);
container.bind<ServiceService>(TYPES.ServiceService).to(ServiceService);
container.bind<ServiceRepository>(TYPES.ServiceRepository).to(ServiceRepository);

// Garage
container.bind<GarageController>(TYPES.GarageController).to(GarageController);
container.bind<GarageService>(TYPES.GarageService).to(GarageService);
container.bind<GarageRepository>(TYPES.GarageRepository).to(GarageRepository);

// Booking
container.bind<BookingController>(TYPES.BookingController).to(BookingController);
container.bind<BookingService>(TYPES.BookingService).to(BookingService);
container.bind<BookingRepository>(TYPES.BookingRepository).to(BookingRepository);

// GarageService
container.bind<GarageServiceRepository>(TYPES.GarageServiceRepository).to(GarageServiceRepository);

export default container;
