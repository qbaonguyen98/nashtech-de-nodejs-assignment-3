import mongoose, { Schema, Document } from 'mongoose';
import User from '../interfaces/user.interface';

export type UserDocument = Document & User;

const UserSchema = new Schema({
  username: {
    unique: true,
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roleId: {
    type: mongoose.Types.ObjectId,

    ref: 'Role',
  },
  accountType: {
    type: String,
    required: true,
  },
  profileId: {
    type: mongoose.Types.ObjectId,

    ref: 'UserProfile',
  },
  lastLogin: {
    type: Number,
    required: true,
  },
  updatedBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  updatedDate: {
    type: Number,
  },
  isDeleted: {
    type: Boolean,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  isLocked: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model<UserDocument>('User', UserSchema);
