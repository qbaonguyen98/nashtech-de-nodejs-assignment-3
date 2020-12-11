import mongoose, { Schema, Document } from 'mongoose';
import Booking from '../interfaces/booking.interface';

export type BookingDocument = Document & Booking;

const BookingSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  bookingDetailId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'BookingDetail',
  },
  reservationDate: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  createdDate: {
    type: Number,
    default: Date.now(),
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export default mongoose.model<BookingDocument>('Booking', BookingSchema);
