import { Router } from 'express';
import { inject, injectable } from 'inversify';
import Route from '../interfaces/route.interface';
import AuthController from '../controllers/auth.controller';
import TYPES from '../types';
import validationMiddleware from '../middlewares/validation.middleware';
import { CreateUserDto } from '../dtos/users/create-user.dto';

@injectable()
class AuthRoute implements Route {
  public router = Router();
  public path = '/auth';

  constructor(@inject(TYPES.AuthController) private authController: AuthController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register/internal`, validationMiddleware(CreateUserDto, 'body'), this.authController.register);
    this.router.get(`/verify-account/:token`, this.authController.verify);
  }
}

export default AuthRoute;
