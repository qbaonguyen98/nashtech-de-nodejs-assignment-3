import _ from 'lodash';
import bcrypt from 'bcrypt';
import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { DataStoredInSocialToken, DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import UserRepository from '../repositories/user.repository';
import RoleRepository from '../repositories/role.repository';
import TYPES from '../types';
import { CreateUserDto } from '../dtos/users/create-user.dto';
import User from '../interfaces/user.interface';
import { isEmptyObject } from '../utils/util';

import { transporter } from '../utils/send-email';
import HttpException from '../exceptions/HttpException';
import { SocialLoginDto } from '../dtos/auth/social-login.dto';
import UserProfileRepository from '../repositories/user-profile.repository';

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

  public register = async (userData: CreateUserDto, origin): Promise<void> => {
    if (isEmptyObject(userData)) {
      throw new HttpException(400, 'Missing user information');
    }

    const findUserEmail: User = await this.userRepository.findOne({
      email: userData.email,
    });

    if (findUserEmail) {
      throw new HttpException(409, `Username already exist. The email address you entered is already associated with another account.`);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const userRole = await this.roleRepository.findOne({ userRole: 'user' });
    const createUserData = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
      roleId: userRole._id,
      status: {
        isActive: false,
        isLocked: false,
        isDeleted: false,
      },
      lastLogin: Date.now(),
      accountType: 'internal',
    });

    const token = await jwt.sign({ id: createUserData.id }, process.env.TOKEN_SECRET as string, {
      expiresIn: process.env.TOKEN_LIFE as string,
    });

    await this.requestVerifyAccount(userData, origin, token);
  };

  public verify = async (userId): Promise<void> => {
    const userData = await this.userRepository.findOne({ _id: userId });
    if (!userData) {
      throw new HttpException(400, 'We were unable to find a user for this user id.');
    }
    if (userData.status.isActive === true) {
      throw new HttpException(400, 'This user has already been verified.');
    }
    userData.status.isActive = true;
    await userData.save();
  };

  private requestVerifyAccount = async (userData: CreateUserDto, origin, token) => {
    let verifyUrl;
    if (origin) {
      verifyUrl = `${origin}/verify-account/${token}`;
    } else {
      verifyUrl = `${process.env.CLIENT_URL}/verify-account/${token}`;
    }
    const html = `<p>Please click the below link to verify your email address:</p> <p><a href="${verifyUrl}">link</a></p>`;
    const subject = 'Account Verification';
    const to = userData.email;
    const from = process.env.EMAIL_LOGIN;
    await transporter.sendMail({ from, to, subject, html }, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log('Message sent: ' + info.response);
      }
    });
  };
}

export default AuthService;
