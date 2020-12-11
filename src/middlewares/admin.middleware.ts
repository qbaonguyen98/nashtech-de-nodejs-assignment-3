// import { NextFunction, Response } from 'express';
// import HttpException from '../exceptions/HttpException';
// import { RequestWithUser } from '../interfaces/auth.interface';

// const adminMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
//   const userRole = req.user.role;
//   if (userRole === 'admin') {
//     next();
//   } else {
//     next(new HttpException(401, 'You are not admin'));
//   }
// };

// export default adminMiddleware;
