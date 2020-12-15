import mongoose, { Schema, Document } from 'mongoose';
import GarageService from '../interfaces/garage-service.interface';

export type GarageServiceDocument = Document & GarageService;

const GarageServiceSchema = new Schema({
  garageId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'garage',
  },
  serviceId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'service',
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  createdDate: {
    type: Number,
    default: Date.now(),
  },
});

export default mongoose.model<GarageServiceDocument>('garage-service', GarageServiceSchema);
