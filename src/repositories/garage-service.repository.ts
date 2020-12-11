import _ from 'lodash';
import { injectable } from 'inversify';

import GarageServiceInterface from '../interfaces/garage-service.interface';
import garageServiceModel, { GarageServiceDocument } from './../models/garage-service.model';

@injectable()
class GarageServiceRepository {
  /**
   * Returns garage after created
   * @param {Garage} garage
   * @returns {Promise<GarageDocument>}
   */
  public create = async (garageService: GarageServiceInterface): Promise<GarageServiceDocument> => {
    return await garageServiceModel.create(garageService);
  };

  public createMultiple = async (garageServices: GarageServiceInterface[]): Promise<boolean> => {
    const createdGarageServices: GarageServiceDocument[] = [];
    _.forEach(garageServices, garageService => {
      garageServiceModel.findOneAndUpdate(
        garageService,
        garageService,
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        },
        (err, doc) => {
          if (!_.isUndefined(doc)) createdGarageServices.push(doc);
        },
      );
    });

    return _.isEqual(createdGarageServices.length, garageServices.length);
  };
}

export default GarageServiceRepository;
