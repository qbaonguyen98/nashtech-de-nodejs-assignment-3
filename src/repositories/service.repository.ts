import _ from 'lodash';
import { injectable } from 'inversify';

import { FIELDS_SERVICE_UPDATE } from '../utils/constants';

import serviceModel from '../models/service.model';
import { ServiceDocument } from './../models/service.model';

import Service from '../interfaces/service.interface';

import { UpdateServiceDto } from './../dtos/services/update-services.dto';
import { MongooseFilterQuery } from 'mongoose';
import { QueryOptions } from '../utils/query-builder';

@injectable()
class ServiceRepository {
  /**
   * Returns service after created
   * @param {Service} service
   * @returns {Promise<ServiceDocument>}
   */
  public create = async (service: Service): Promise<ServiceDocument> => {
    return await serviceModel.create(service);
  };

  /**
   * Returns one service by conditions
   * @param {object} filter
   * @param {object} projection
   * @param {object} options
   * @returns {Promise<ServiceDocument | null>}
   */
  public findOne = async (filter = {}, projection = {}, options = {}): Promise<ServiceDocument | null> => {
    return await serviceModel.findOne(
      {
        ...filter,
        isDeleted: false,
      },
      projection,
      options,
    );
  };

  /**
   * Returns list of services by conditions in database
   * @param {MongooseFilterQuery<ServiceDocument> } conditions
   * @param {QueryOptions<ServiceDocument>} options
   * @returns {Promise<ServiceDocument[]>}
   */
  public find = async (
    conditions: MongooseFilterQuery<ServiceDocument> = {},
    options: QueryOptions<ServiceDocument> = {},
  ): Promise<ServiceDocument[]> => {
    let userQuery = serviceModel.find(
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

  /**
   * Soft delete service object
   * Return delete successfull or failed
   * @param {ServiceDocument} service
   * @param {string} userId
   * @returns {Promise<Boolean>}
   */
  public deleteOne = async (service: ServiceDocument, userId: string): Promise<boolean> => {
    service.isDeleted = true;
    service.updatedBy = userId;
    service.updatedDate = Date.now();

    const deletedService = await service.save();
    return _.isEqual(deletedService, service);
  };

  /**
   * Update service object in database
   * @param {ServiceDocument} service
   * @param {UpdateServiceDto} updateData
   * @param {string} userId
   * @returns {Promise<Boolean>}
   */
  public updateOne = async (service: ServiceDocument, updateData: UpdateServiceDto, userId: string): Promise<boolean> => {
    service.updatedBy = userId;
    service.updatedDate = Date.now();

    _.each(_.pick(updateData, FIELDS_SERVICE_UPDATE), (value, key) => {
      service[key] = value;
    });

    const updatedService = await service.save();
    return _.isEqual(updatedService, service);
  };
}

export default ServiceRepository;
