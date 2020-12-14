import _ from 'lodash';
import bcrypt from 'bcrypt';
import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import UserRepository from '../repositories/user.repository';
import TYPES from '../types';
import { CreateUserDto } from '../dtos/users/create-user.dto';
import User from '../interfaces/user.interface';
import { isEmptyObject } from '../utils/util';
import HttpException from '../exceptions/HttpException';
import { transporter } from '../utils/send-email';

@injectable()
class AuthService {
  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {}

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
    const createUserData = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
      isActive: false,
      isLocked: false,
      lastLogin: Date.now(),
      isDeleted: false,
      accountType: 'internal',
    });

    const token = jwt.sign(createUserData.id, process.env.TOKEN_SECRET as string, {
      expiresIn: process.env.TOKEN_LIFE as string,
    });

    await this.requestVerifyAccount(userData, origin, token);
  };

  private requestVerifyAccount = async (userData: CreateUserDto, origin, token) => {
    let html;
    let verifyUrl;
    if (origin) {
      verifyUrl = `${origin}/verify-acccount/${token}`;
      html = `<p>Please click the below link to verify your email address:</p>
                 <p><a href="${verifyUrl}">link</a></p>`;
    } else {
      verifyUrl = `${process.env.CLIENT_URL}/verify-acccount/${token}`;
      html = `<p>Please click the below link to verify your email address:</p>
                 <p><a href="${verifyUrl}">link</a></p>`;
    }

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
