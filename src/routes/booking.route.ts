import { Router } from 'express';
import { inject, injectable } from 'inversify';
import Route from '../interfaces/route.interface';
import TYPES from '../types';
import BookingController from '../controllers/booking.controller';

@injectable()
class BookingRoute implements Route {
  public router = Router();
  public path = '/booking';

  constructor(@inject(TYPES.BookingController) private bookingController: BookingController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    console.log('Booking route');
  }
}

export default BookingRoute;
