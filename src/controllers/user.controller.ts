import { inject, injectable } from 'inversify';
import TYPES from '../types';
import UserService from '../services/user.service';

@injectable()
class AuthController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}
}

export default AuthController;
