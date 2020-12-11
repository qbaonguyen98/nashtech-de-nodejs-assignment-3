import mongoose, { Schema, Document } from 'mongoose';
import Role from '../interfaces/role.interface';

export type RoleDocument = Document & Role;

const RoleSchema = new Schema({
  userRole: {
    type: String,
    required: true,
  },
});

export default mongoose.model<RoleDocument>('Role', RoleSchema);
