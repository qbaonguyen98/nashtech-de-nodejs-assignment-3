import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';

import jwt from 'jsonwebtoken';

import { InternalLoginDto } from '../dtos/auth/login.dto';
import { SocialLoginDto } from '../dtos/auth/social-login.dto';

import AuthService from '../services/auth.service';
import TYPES from '../types';
import { CreateUserDto } from '../dtos/users/create-user.dto';
import { DecodedToken, RequestWithUser } from '../interfaces/auth.interface';
import HttpException from '../exceptions/HttpException';
import User from '../interfaces/user.interface';
import { ChangePasswordDto, ResetPasswordDto } from '../dtos/auth/auth.dto';

@injectable()
class AuthController {
  constructor(@inject(TYPES.AuthService) private authService: AuthService) {}

  // @route POST /auth/register/internal
  // @desc Register user
  // @access Public
  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const origin = req.get('origin');
      await this.authService.register(userData, origin);
      res.status(201).json({ message: 'A verification email has been sent to ' + userData.email + '.' });
    } catch (error) {
      next(error);
    }
  };

  // EMAIL VERIFICATION
  // @route GET /auth/verify-account/:token
  // @desc Verify token
  // @access Protective
  public verify = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      // const token = req.params.token;
      // if (!token) {
      //   next(new HttpException(400, 'We were unable to find a user for this token.'));
      // }
      // const decoded = jwt.verify(token, process.env.TOKEN_SECRET) as DecodedToken;
      const user: User = req.user;
      await this.authService.verify(user);
      res.status(200).send({ message: 'The account has been verified. Please log in.' });
    } catch (error) {
      next(error);
    }
  };

  public socialLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const requestData: SocialLoginDto = req.body;
      const { cookie } = await this.authService.socialLogin(requestData);

      res.setHeader('Set-cookie', [cookie]);
      res.status(200).json({ message: 'Social login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };

  public internalLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: InternalLoginDto = req.body;
      const result = await this.authService.internalLogin(userData);

      res.setHeader('Set-cookie', [result.cookie]);
      res.status(200).json({ message: 'Login success', token: result.token });
    } catch (error) {
      next(error);
    }
  };

  public recoverPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userEmail = req.body;
      const origin = req.get('origin');
      await this.authService.recoverPassword(userEmail);
      res.status(200).json({ message: 'Please check your email for password reset instructions' });
    } catch (error) {
      next(error);
    }
  };

  public resetpassword = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { newPassword } = req.body;
      const user: User = req.user;
      await this.authService.resetPassword(user, newPassword);
    } catch (error) {
      next(error);
    }
  };

  public changePassword = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: ChangePasswordDto = req.body;
      const user: User = req.user;
      await this.authService.changePassword(user, userData);
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
