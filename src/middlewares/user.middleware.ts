import { NextFunction, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '../interfaces/auth.interface';
import jwt from 'jsonwebtoken';

const userMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const secret = process.env.JWT_SECRET;
  const verificationResponse = jwt.verify(req.cookies.Authorization, secret) as DataStoredInToken;
  const userId = verificationResponse.id;

  if (req.role === 'admin') {
    next();
  } else {
    if (userId !== req.body.id) {
      next(new HttpException(403, 'Access denied'))
    } else {
      next();
    }
  }
};

export default userMiddleware;
