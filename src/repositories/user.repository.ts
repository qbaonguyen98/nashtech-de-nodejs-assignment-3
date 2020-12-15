import _ from 'lodash';
import { MongooseFilterQuery } from 'mongoose';
import { injectable } from 'inversify';

import UserModel, { UserDocument } from '../models/user.model';
import User, { UpdateUser } from '../interfaces/user.interface';

import { QueryOptions } from '../utils/query-builder';

@injectable()
class UserRepository {
  public findOne = async (
    conditions: MongooseFilterQuery<UserDocument> = {},
    options: QueryOptions<UserDocument> = {},
  ): Promise<UserDocument | null> => {
    let userQuery = UserModel.findOne(
      {
        ...conditions,
        ...{
          'status.isDeleted': false,
        },
      },
      options.fields,
    );

    if (options.populate) {
      for (const p of _.uniq(options.populate)) {
        userQuery = userQuery.populate(p);
      }
    }

    const user = userQuery.exec();
    return user;
  };

  public create = async (user: User): Promise<UserDocument> => {
    return await UserModel.create(user);
  };

  public find = async (conditions: MongooseFilterQuery<UserDocument> = {}, options: QueryOptions<UserDocument> = {}): Promise<UserDocument[]> => {
    let userQuery = UserModel.find(
      {
        ...conditions,
        ...{
          'status.isDeleted': false,
        },
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

  public findByIdAndUpdate = async (id: string, update: UpdateUser): Promise<UserDocument> => {
    return await UserModel.findByIdAndUpdate(id, update);
  };
}

export default UserRepository;
