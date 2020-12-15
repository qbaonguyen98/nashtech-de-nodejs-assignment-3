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
    this.router.get(`${this.path}`, this.userController.getUserList);
    this.router.get(`${this.path}/:username`, this.userController.getUser);
    this.router.put(`${this.path}/profile/:username`, this.userController.updateUserProfile);
    this.router.put(`${this.path}/:username`, this.userController.updateUserByAdmin);
    this.router.delete(`${this.path}/:username`, this.userController.deleteUser);
  }
}

export default UserRoute;
