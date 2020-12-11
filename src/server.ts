import 'dotenv/config';
import App from './app';
import container from './inversify.config';
import validateEnv from './utils/validateEnv';
import AuthRoute from './routes/auth.route';
import UserRoute from './routes/user.route';

import ServiceRoute from './routes/service.route';
import GarageRoute from './routes/garage.route';
import BookingRoute from './routes/booking.route';

validateEnv();

const routes = [
  container.resolve<AuthRoute>(AuthRoute),
  container.resolve<UserRoute>(UserRoute),
  container.resolve<ServiceRoute>(ServiceRoute),
  container.resolve<GarageRoute>(GarageRoute),
  container.resolve<BookingRoute>(BookingRoute),
];

const app = new App(routes);

app.listen();
