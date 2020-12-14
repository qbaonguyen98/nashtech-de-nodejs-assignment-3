import _ from 'lodash';
import { MongooseFilterQuery } from 'mongoose';
import { injectable } from 'inversify';

import UserModel, { UserDocument } from '../models/user.model';
import User from '../interfaces/user.interface';

import { QueryOptions } from '../utils/query-builder';

@injectable()
class UserRepository {
  public findOne = async (
    conditions: MongooseFilterQuery<UserDocument> = {},
    options: QueryOptions<UserDocument> = {},
  ): Promise<UserDocument | null> => {
    return await UserModel.findOne(
      {
        ...conditions,
        isDeleted: false,
      },
      options.fields,
    );
  };

  public find = async (conditions: MongooseFilterQuery<UserDocument> = {}, options: QueryOptions<UserDocument> = {}): Promise<UserDocument[]> => {
    let userQuery = UserModel.find(
      {
        ...conditions,
        isDeleted: false,
      },
      options.fields,
      {
        sort: {
          _id: -1,
        },
        limit: options.limit,
      },
    );

    if (options.populate) {
      for (const p of _.uniq(options.populate)) {
        userQuery = userQuery.populate(p);
      }
    }

    const users = userQuery.exec();
    return users;
  };

  public create = async (user: User): Promise<User> => {
    return await UserModel.create(user);
  };
}

export default UserRepository;
