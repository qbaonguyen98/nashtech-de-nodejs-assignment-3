import { inject, injectable } from 'inversify';
import UserRepository from '../repositories/user.repository';
import TYPES from '../types';

@injectable()
class UserService {
  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {}
}

export default UserService;
