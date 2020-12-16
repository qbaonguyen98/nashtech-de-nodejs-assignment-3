import { inject, injectable } from 'inversify';
import TYPES from '../types';
import UserService from '../services/user.service';
import { RequestWithUser } from '../interfaces/auth.interface';
import { Response, NextFunction } from 'express';
import { UserListDto } from '../dtos/users/user-list.dto';
import { UserDto } from '../dtos/users/user.dto';
import { UpdateUserProfileDto } from '../dtos/users/update-user-profile.dto';
import { UpdateUserByAdminDto } from '../dtos/users/update-user-by-admin.dto';

@injectable()
class AuthController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  public getUserList = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userList: UserListDto[] = await this.userService.getUserList();
      res.status(200).json({ data: userList, message: 'Get user list' });
    } catch (error) {
      next(error);
    }
  };

  public getUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.body;
      const user: UserDto = await this.userService.getUser(id);
      res.status(200).json({ data: user, message: 'Get user' });
    } catch (error) {
      next(error);
    }
  };

  public updateUserByAdmin = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: UpdateUserByAdminDto = req.body;
      await this.userService.updateUserByAdmin(userData);
      res.status(200).json({ message: 'Update user by admin' });
    } catch (error) {
      next(error);
    }
  };

  public updateUserProfile = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: UpdateUserProfileDto = req.body;
      await this.userService.updateUserProfile(userData);
      res.status(200).json({ message: 'Update user profile' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.body;
      await this.userService.deleteUser(id);
      res.status(200).json({ message: 'Delete user' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
