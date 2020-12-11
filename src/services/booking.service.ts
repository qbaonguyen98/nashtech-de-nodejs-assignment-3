import { inject, injectable } from 'inversify';
import HttpException from '../exceptions/HttpException';
import BookingRepository from '../repositories/booking.repository';
import TYPES from '../types';

@injectable()
class BookingService {
  constructor(@inject(TYPES.BookingRepository) private bookingRepository: BookingRepository) {}
}

export default BookingService;
