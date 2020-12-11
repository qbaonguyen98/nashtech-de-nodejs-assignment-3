import { Router } from 'express';
import { inject, injectable } from 'inversify';
import Route from '../interfaces/route.interface';
import TYPES from '../types';
import UserController from '../controllers/user.controller';

@injectable()
class UserRoute implements Route {
  public router = Router();
  public path = '/users';

  constructor(@inject(TYPES.UserController) private userController: UserController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    console.log('User route');
  }
}

export default UserRoute;
