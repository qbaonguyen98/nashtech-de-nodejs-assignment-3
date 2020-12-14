import bcrypt from 'bcrypt';
import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { DataStoredInSocialToken, DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import UserRepository from '../repositories/user.repository';
import TYPES from '../types';
import HttpException from '../exceptions/HttpException';
import { SocialLoginDto } from '../dtos/auth/social-login.dto';
import UserProfileRepository from '../repositories/user-profile.repository';
import RoleRepository from '../repositories/role.repository';
import { InternalLoginDto } from '../dtos/auth/login.dto';
import { isEmptyObject } from '../utils/util';

@injectable()
class AuthService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
    @inject(TYPES.UserProfileRepository) private userProfileRepository: UserProfileRepository,
    @inject(TYPES.RoleRepository) private roleRepository: RoleRepository,
  ) {}

  public socialLogin = async (requestData: SocialLoginDto): Promise<{ cookie: string }> => {
    const socialData = jwt.decode(requestData.idToken) as DataStoredInSocialToken;

    if (!socialData || !socialData.email || !socialData.family_name || !socialData.given_name) {
      throw new HttpException(400, 'Invalid social token');
    }

    let user = await this.userRepository.findOne({
      email: socialData.email,
    });

    if (!user) {
      const newUser = {
        email: socialData.email,
        username: socialData.email,
        password: bcrypt.hashSync('google', 10),
        roleId: null,
        accountType: 'google',
        profileId: null,
        lastLogin: Date.now(),
        status: {
          isLocked: false,
          isActive: true,
          isDeleted: false,
        },
      };
      user = await this.userRepository.create(newUser);

      const newUserProfile = {
        firstName: socialData.given_name,
        lastName: socialData.family_name,
      };
      const userProfile = await this.userProfileRepository.create(newUserProfile);

      const newUserRoleId = (await this.roleRepository.findOne({ userRole: 'user' })).id;

      user = await this.userRepository.findByIdAndUpdate(user._id, {
        profileId: userProfile.id,
        roleId: newUserRoleId,
      });
    } else {
      if (user.status.isLocked) {
        throw new HttpException(403, 'User is locked');
      }
    }
    const tokenData = this.createToken(user.id, 'user');
    const cookie = this.createCookie(tokenData);

    return {
      cookie,
    };
  };

  public internalLogin = async (userData: InternalLoginDto): Promise<{ cookie: string; token: TokenData }> => {
    if (isEmptyObject(userData)) {
      throw new HttpException(400, 'Missing user information');
    }

    let user = await this.userRepository.findOne({
      username: userData.username,
    });

    if (!user) {
      throw new HttpException(404, 'User not found');
    } else {
      if (user.status.isLocked) {
        throw new HttpException(403, 'User is locked');
      }
    }

    const isPasswordMatch: boolean = bcrypt.compareSync(userData.password, user.password);
    if (!isPasswordMatch) {
      throw new HttpException(401, 'Incorrect password');
    }

    // update lastLogin info
    const filter = { username: user.username };
    user = await this.userRepository.findOne(filter);

    const tokenData = this.createToken(user.id, 'user');
    const cookie = this.createCookie(tokenData);

    return {
      cookie,
      token: tokenData,
    };
  };

  private createToken(id: string, role: string): TokenData {
    const dataStoredInToken: DataStoredInToken = { id, role };
    const secret: string = process.env.JWT_SECRET;
    const expiresIn: number = 60 * 60 * 60;

    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }

  private createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
