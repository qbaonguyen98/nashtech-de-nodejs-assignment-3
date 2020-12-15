import mongoose, { Schema, Document } from 'mongoose';
import Garage from '../interfaces/garage.interface';

export type GarageDocument = Document & Garage;

const Coordinates = new Schema({
  lat: {
    type: Number,
  },
  lng: {
    type: Number,
  },
});

const GarageSchema = new Schema({
  code: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  address: {
    type: String,
  },
  location: {
    googleId: {
      type: String,
      required: true,
    },
    coordinates: {
      type: Coordinates,
      required: true,
    },
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  createdDate: {
    type: Number,
    default: Date.now(),
  },
  updatedBy: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  updatedDate: {
    type: Number,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<GarageDocument>('garage', GarageSchema);
