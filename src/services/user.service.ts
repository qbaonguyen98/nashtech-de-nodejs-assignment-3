import { timeStamp } from 'console';
import { inject, injectable } from 'inversify';
import _, { isUndefined } from 'lodash';
import { profile } from 'winston';
import { Http } from 'winston/lib/winston/transports';
import { UpdateUserByAdminDto } from '../dtos/users/update-user-by-admin.dto';
import { UpdateUserProfileDto } from '../dtos/users/update-user-profile.dto';
import { UserListDto } from '../dtos/users/user-list.dto';
import { UserDto } from '../dtos/users/user.dto';
import HttpException from '../exceptions/HttpException';
import User from '../interfaces/user.interface';
import RoleRepository from '../repositories/role.repository';
import UserProfileRepository from '../repositories/user-profile.repository';
import UserRepository from '../repositories/user.repository';
import TYPES from '../types';

@injectable()
class UserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
    @inject(TYPES.UserProfileRepository) private userProfileRepository: UserProfileRepository,
    @inject(TYPES.RoleRepository) private roleRepository: RoleRepository,
  ) { }

  public getUserList = async (): Promise<UserListDto[]> => {
    const userList: UserListDto[] = [];

    const userRole = await this.roleRepository.findOne({ userRole: 'user' });
    const users = await this.userRepository.find({ roleId: userRole.id }, { populate: ['profileId'] });

    users.forEach(user => {
      userList.push({
        fullName: _.isObject(user.profileId) ? `${_.get(user.profileId, 'firstName')} ${_.get(user.profileId, 'lastName')}` : 'unknown',
        email: user.email,
        lastLogin: user.lastLogin,
      });
    });

    return userList;
  };

  public getUser = async (userId: string): Promise<UserDto> => {
    if (!userId) {
      throw new HttpException(400, 'Invalid user id');
    }

    const user = await this.userRepository.findOne({ _id: userId });
    if (!user) {
      throw new HttpException(404, 'User not found');
    }

    const userProfile = await this.userProfileRepository.findOne({ _id: user.profileId });

    const result = {
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      gender: userProfile.gender,
      dateOfBirth: userProfile.dateOfBirth,
      username: user.username,
      email: user.email,
      accountType: user.accountType,
      lastLogin: user.lastLogin,
      isLocked: user.status.isLocked,
    };

    return result;
  };

  public updateUserByAdmin = async (userData: UpdateUserByAdminDto): Promise<void> => {
    const user = await this.userRepository.findOne({ _id: userData.id });
    if (!user) {
      throw new HttpException(404, 'User not found');
    }

    user.status.isLocked = userData.isLocked;
    await this.userRepository.save(user);

    if (!user.profileId) {
      const newProfile = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        gender: userData.gender,
        dateOfBirth: userData.dateOfBirth,
      };

      const profile = await this.userProfileRepository.create(newProfile);
      user.profileId = profile._id;
      await this.userRepository.save(user);
    }

    await this.userProfileRepository.findOneAndUpdate({ _id: user.profileId }, {
      firstName: userData.firstName,
      lastName: userData.lastName,
      gender: userData.gender,
      dateOfBirth: userData.dateOfBirth,
    });
  }

  public updateUserProfile = async (userData: UpdateUserProfileDto): Promise<void> => {
    const user = await this.userRepository.findOne({ _id: userData.id });
    if (!user) {
      throw new HttpException(404, 'User not found');
    }

    if (!user.profileId) {
      const newProfile = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        gender: userData.gender,
        dateOfBirth: userData.dateOfBirth,
      };

      const profile = await this.userProfileRepository.create(newProfile);
      user.profileId = profile._id;
      await this.userRepository.save(user);
    }

    const profile = await this.userProfileRepository.findOne({ _id: user.profileId });
    profile.firstName = userData.firstName;
    profile.lastName = userData.lastName;
    profile.gender = userData.gender;
    profile.dateOfBirth = userData.dateOfBirth;
    await this.userProfileRepository.save(profile);
  };

  public deleteUser = async (userId: string): Promise<void> => {
    if (!userId) {
      throw new HttpException(400, 'Invalid user id');
    }

    const user = await this.userRepository.findOne({ _id: userId });
    if (!user) {
      throw new HttpException(404, 'User not found');
    }

    user.status.isDeleted = true;
    await this.userRepository.save(user);
  };
}

export default UserService;
