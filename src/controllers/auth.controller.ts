import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';

import AuthService from '../services/auth.service';
import TYPES from '../types';
import { CreateUserDto } from '../dtos/users/create-user.dto';
import User from '../interfaces/user.interface';

@injectable()
class AuthController {
  constructor(@inject(TYPES.AuthService) private authService: AuthService) {}

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const origin  = req.get('origin');
      await this.authService.register(userData, origin);

      res.status(201).json({ message: 'A verification email has been sent to ' + userData.email + '.' });
    } catch (error) {
      next(error);
    }
  };

  public verify = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.params.token) {
      res.status(400).json({ message: "We were unable to find a user for this token." });
    }
    try {
      
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
