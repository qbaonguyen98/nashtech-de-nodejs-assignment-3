import { Request } from 'express';
import User from './user.interface';

export interface DataStoredInToken {
  id: string;
  role: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}

export interface DataStoredInSocialToken {
  email: string;
  given_name: string;
  family_name: string;
}
