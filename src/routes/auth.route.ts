import { Router } from 'express';
import { inject, injectable } from 'inversify';
import Route from '../interfaces/route.interface';
import AuthController from '../controllers/auth.controller';
import TYPES from '../types';
import validationMiddleware from '../middlewares/validation.middleware';
import { CreateUserDto } from '../dtos/users/create-user.dto';
import { SocialLoginDto } from '../dtos/auth/social-login.dto';
import authMiddleware from '../middlewares/auth.middleware';
import { RequestEmailDto } from '../dtos/auth/auth.dto';
import { InternalLoginDto } from '../dtos/auth/login.dto';

@injectable()
class AuthRoute implements Route {
  public router = Router();
  public path = '/auth';

  constructor(@inject(TYPES.AuthController) private authController: AuthController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register/internal`, validationMiddleware(CreateUserDto, 'body'), this.authController.register);
    this.router.post(`${this.path}/verify-account/`, authMiddleware, this.authController.verify);
    this.router.post(`${this.path}/login/social`, validationMiddleware(SocialLoginDto, 'body'), this.authController.socialLogin);
    this.router.post(`${this.path}/login/internal`, validationMiddleware(InternalLoginDto, 'body'), this.authController.internalLogin);
    this.router.post(`${this.path}/logout`, authMiddleware, this.authController.logOut);
    this.router.post(`${this.path}/recover-password`, validationMiddleware(RequestEmailDto, 'body'), this.authController.recoverPassword);
    this.router.post(`${this.path}/`);
  }
}

export default AuthRoute;
