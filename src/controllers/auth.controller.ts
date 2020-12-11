import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { SocialLoginDto } from '../dtos/auth/social-login.dto';

import AuthService from '../services/auth.service';
import TYPES from '../types';

@injectable()
class AuthController {
  constructor(@inject(TYPES.AuthService) private authService: AuthService) {}

  public socialLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const requestData: SocialLoginDto = req.body;
      const { cookie } = await this.authService.socialLogin(requestData);

      res.setHeader('Set-cookie', [cookie]);
      res.status(200).json({ message: 'social login' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
