import mongoose, { Schema, Document } from 'mongoose';
import UserProfile from '../interfaces/user-profile.interface';

export type UserProfileDocument = Document & UserProfile;

const UserProfileSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: Number,
  },
  updatedBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  updatedDate: {
    type: Number,
  },
});

export default mongoose.model<UserProfileDocument>('UserProfile', UserProfileSchema);
