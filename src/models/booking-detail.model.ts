import mongoose, { Schema, Document } from 'mongoose';
import BookingDetail from '../interfaces/booking-detail.interface';

export type BookingDetailDocument = Document & BookingDetail;

const BookingDetailSchema = new Schema({
  garageServiceId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'garage-service',
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<BookingDetailDocument>('booking-detail', BookingDetailSchema);
