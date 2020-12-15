import _ from 'lodash';
import { injectable } from 'inversify';

import GarageServiceInterface from '../interfaces/garage-service.interface';
import garageServiceModel, { GarageServiceDocument } from './../models/garage-service.model';
import { MongooseFilterQuery } from 'mongoose';

@injectable()
class GarageServiceRepository {
  /**
   * Returns garages by conditions
   * @param {MongooseFilterQuery<GarageServiceDocument>} conds
   * @returns {Promise<GarageDocument[]>}
   */
  public find = async (conds: MongooseFilterQuery<GarageServiceDocument>): Promise<GarageServiceInterface[]> => {
    return await garageServiceModel.find(conds);
  };

  /**
   * Returns garage by conditions
   * @param {MongooseFilterQuery<GarageServiceDocument>} conds
   * @returns {Promise<GarageDocument>}
   */
  public findOne = async (conds: MongooseFilterQuery<GarageServiceDocument>): Promise<GarageServiceInterface> => {
    return await garageServiceModel.findOne(conds);
  };

  /**
   * Returns garage after created
   * @param {Garage} garage
   * @returns {Promise<GarageDocument>}
   */
  public create = async (garageService: GarageServiceInterface): Promise<GarageServiceDocument> => {
    return await garageServiceModel.create(garageService);
  };

  /**
   *
   * @param {MongooseFilterQuery<GarageServiceDocument>} conds
   * @returns {Promise<GarageDocument>}
   */
  public findOneAndDelete = async (conds: MongooseFilterQuery<GarageServiceDocument> = {}): Promise<GarageServiceDocument> => {
    return await garageServiceModel.findOneAndDelete(conds);
  };

  /**
   *
   * @param {GarageServiceInterface[]} garageServices
   * @param {String} userId
   * @returns {Promise<Boolean>}
   */
  public createMultiple = async (garageServices: GarageServiceInterface[], userId: string): Promise<boolean> => {
    const createdGarageServices: GarageServiceDocument[] = [];

    const promises = [];
    _.forEach(garageServices, garageService => {
      promises.push(
        garageServiceModel.findOneAndUpdate(
          garageService,
          { ...garageService, createdBy: userId },
          {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
          },
          (err, doc) => {
            if (!_.isUndefined(doc)) createdGarageServices.push(doc);
          },
        ),
      );
    });

    await Promise.all(promises);
    return _.isEqual(createdGarageServices.length, garageServices.length);
  };

  /**
   *
   * @param {GarageServiceInterface[]} garageServices
   * @param {String} userId
   * @returns {Promise<Boolean>}
   */
  public removeMultiple = async (garageServices: GarageServiceInterface[]): Promise<boolean> => {
    const removedGarageServices: GarageServiceDocument[] = [];

    const promises = [];
    _.forEach(garageServices, garageService => {
      promises.push(garageServiceModel.findOneAndDelete(garageService));
    });

    await Promise.all(promises);
    return _.isEqual(removedGarageServices.length, garageServices.length);
  };
}

export default GarageServiceRepository;
