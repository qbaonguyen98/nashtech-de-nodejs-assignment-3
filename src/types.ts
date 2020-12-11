const TYPES = {
  // Auth
  AuthController: Symbol.for('AuthController'),
  AuthService: Symbol.for('AuthService'),
  UserRepository: Symbol.for('UserRepository'),

  // User
  UserController: Symbol.for('UserController'),
  UserService: Symbol.for('UserService'),

  // Service
  ServiceController: Symbol.for('ServiceController'),
  ServiceService: Symbol.for('ServiceService'),
  ServiceRepository: Symbol.for('ServiceRepository'),

  // Garage
  GarageController: Symbol.for('GarageController'),
  GarageService: Symbol.for('GarageService'),
  GarageRepository: Symbol.for('GarageRepository'),

  // Booking
  BookingController: Symbol.for('BookingController'),
  BookingService: Symbol.for('BookingService'),
  BookingRepository: Symbol.for('BookingRepository'),
};

export default TYPES;
