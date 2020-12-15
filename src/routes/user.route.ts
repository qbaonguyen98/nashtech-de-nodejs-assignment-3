import { Router } from 'express';
import { inject, injectable } from 'inversify';
import Route from '../interfaces/route.interface';
import TYPES from '../types';
import UserController from '../controllers/user.controller';
import authMiddleware from '../middlewares/auth.middleware';
import adminMiddleware from '../middlewares/admin.middleware';
import validationMiddleware from '../middlewares/validation.middleware';
import { UpdateUserByAdminDto } from '../dtos/users/update-user-by-admin.dto';
import { UpdateUserProfileDto } from '../dtos/users/update-user-profile.dto';

@injectable()
class UserRoute implements Route {
  public router = Router();
  public path = '/users';

  constructor(@inject(TYPES.UserController) private userController: UserController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, adminMiddleware, this.userController.getUserList);
    this.router.get(`${this.path}/:username`, authMiddleware, this.userController.getUser);
    this.router.put(`${this.path}/profile/:username`, authMiddleware, validationMiddleware(UpdateUserProfileDto, 'body'), this.userController.updateUserProfile);
    this.router.put(`${this.path}/:username`, authMiddleware, adminMiddleware, validationMiddleware(UpdateUserByAdminDto, 'body'), this.userController.updateUserByAdmin);
    this.router.delete(`${this.path}/:username`, authMiddleware, adminMiddleware, this.userController.deleteUser);
  }
}

export default UserRoute;
