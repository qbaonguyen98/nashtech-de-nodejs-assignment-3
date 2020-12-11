import mongoose, { Schema, Document } from 'mongoose';
import Service from '../interfaces/service.interface';

export type ServiceDocument = Document & Service;

const ServiceSchema = new Schema({
  code: {
    type: Number,
    required: true,
    default: 0,
  },
  name: {
    type: String,
    required: true,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    default: 0,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    default: null,
    required: true,
    ref: 'User',
  },
  createdDate: {
    type: Number,
    required: true,
    default: Date.now(),
  },
  updatedBy: {
    type: mongoose.Types.ObjectId,
    default: null,
    ref: 'User',
  },
  updatedDate: {
    type: Number,
    default: new Date(),
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model<ServiceDocument>('Service', ServiceSchema);
