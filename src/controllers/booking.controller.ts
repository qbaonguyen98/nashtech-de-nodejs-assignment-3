import { inject, injectable } from 'inversify';
import BookingService from '../services/booking.service';
import TYPES from '../types';

@injectable()
class BookingController {
  constructor(@inject(TYPES.BookingService) private bookingService: BookingService) {}
}

export default BookingController;
