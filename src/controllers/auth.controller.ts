import { inject, injectable } from 'inversify';

import AuthService from '../services/auth.service';
import TYPES from '../types';

@injectable()
class AuthController {
  constructor(@inject(TYPES.AuthService) private authService: AuthService) {}
}

export default AuthController;
