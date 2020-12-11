import mongoose, { Schema, Document } from 'mongoose';
import GarageService from '../interfaces/garage-service.interface';

export type GarageServiceDocument = Document & GarageService;

const GarageServiceSchema = new Schema({
  garageId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Garage',
  },
  serviceId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Service',
  },
});

export default mongoose.model<GarageServiceDocument>('GarageService', GarageServiceSchema);
