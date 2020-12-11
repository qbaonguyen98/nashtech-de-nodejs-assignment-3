import { Router } from 'express';
import { inject, injectable } from 'inversify';
import Route from '../interfaces/route.interface';
import AuthController from '../controllers/auth.controller';
import TYPES from '../types';

@injectable()
class AuthRoute implements Route {
  public router = Router();
  public path = '/auth';

  constructor(@inject(TYPES.AuthController) private authController: AuthController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    console.log('Auth route');
  }
}

export default AuthRoute;
