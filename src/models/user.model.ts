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
    default: null,
    ref: 'Role',
  },
  accountType: {
    type: String,
    required: true,
  },
  profileId: {
    type: mongoose.Types.ObjectId,
    default: null,
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
  status: {
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
      required: true,
    },
    isLocked: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
});

export default mongoose.model<UserDocument>('User', UserSchema);
