import _ from 'lodash';
import { MongooseFilterQuery } from 'mongoose';
import { injectable } from 'inversify';

import UserProfileModel, { UserProfileDocument } from '../models/user-profile.model';
import UserProfile from '../interfaces/user-profile.interface';

import { QueryOptions } from '../utils/query-builder';

@injectable()
class UserProfileRepository {
  public findOne = async (
    conditions: MongooseFilterQuery<UserProfileDocument> = {},
    options: QueryOptions<UserProfileDocument> = {},
  ): Promise<UserProfileDocument | null> => {
    return await UserProfileModel.findOne(
      {
        ...conditions,
      },
      options.fields,
    );
  };

  public create = async (userProfile: UserProfile): Promise<UserProfileDocument> => {
    return await UserProfileModel.create(userProfile);
  };

  public find = async (
    conditions: MongooseFilterQuery<UserProfileDocument> = {},
    options: QueryOptions<UserProfileDocument> = {},
  ): Promise<UserProfileDocument[]> => {
    let userQuery = UserProfileModel.find(
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

  public save = async (userProfile: UserProfileDocument): Promise<UserProfileDocument> => {
    return await userProfile.save({ validateBeforeSave: true });
  };
}

export default UserProfileRepository;
