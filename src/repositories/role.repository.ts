import _ from 'lodash';
import { MongooseFilterQuery } from 'mongoose';
import { injectable } from 'inversify';

import RoleModel, { RoleDocument } from '../models/role.model';
import Role from '../interfaces/role.interface';
import { QueryOptions } from '../utils/query-builder';

@injectable()
class RoleRepository {
  public findOne = async (
    conditions: MongooseFilterQuery<RoleDocument> = {},
    options: QueryOptions<RoleDocument> = {},
  ): Promise<RoleDocument | null> => {
    return await RoleModel.findOne(
      {
        ...conditions,
      },
      options.fields,
    );
  };
}

export default RoleRepository;
