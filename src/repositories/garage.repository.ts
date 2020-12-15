import _ from 'lodash';
import { injectable } from 'inversify';
import { MongooseFilterQuery } from 'mongoose';

import Garage from '../interfaces/garage.interface';
import { UpdateGarageDto } from './../dtos/garages/update-garage.dto';
import garageModel, { GarageDocument } from './../models/garage.model';

import { QueryOptions } from '../utils/query-builder';
import { FIELDS_GARAGE_UPDATE } from '../utils/constants';

@injectable()
class GarageRepository {
  /**
   * Returns garage after created
   * @param {Garage} garage
   * @returns {Promise<GarageDocument>}
   */
  public create = async (garage: Garage): Promise<GarageDocument> => {
    return await garageModel.create(garage);
  };

  /**
   * Returns one garage by conditions
   * @param {MongooseFilterQuery<GarageDocument>} conditions
   * @param {QueryOptions<GarageDocument>} options
   * @returns {Promise<GarageDocument | null>}
   */
  public findOne = async (
    conditions: MongooseFilterQuery<GarageDocument> = {},
    options: QueryOptions<GarageDocument> = {},
  ): Promise<GarageDocument | null> => {
    return await garageModel.findOne(
      {
        ...conditions,
        isDeleted: false,
      },
      options.fields,
    );
  };

  /**
   * Returns list of garages by conditions in database
   * @param {MongooseFilterQuery<GarageDocument>} conditions
   * @param {QueryOptions<GarageDocument>} options
   * @returns {Promise<GarageDocument[]>}
   */
  public find = async (
    conditions: MongooseFilterQuery<GarageDocument> = {},
    options: QueryOptions<GarageDocument> = {},
  ): Promise<GarageDocument[]> => {
    const garageQuery = garageModel.find(
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

    const garages = garageQuery.exec();
    return garages;
  };

  /**
   * Soft delete garage object
   * Return delete successfull or failed
   * @param {GarageDocument} garage
   * @param {string} userId
   * @returns {Promise<Boolean>}
   */
  public deleteOne = async (garage: GarageDocument, userId: string): Promise<boolean> => {
    garage.isDeleted = true;
    garage.updatedBy = userId;
    garage.updatedDate = Date.now();

    const deletedGarage = await garage.save();
    return _.isEqual(deletedGarage, garage);
  };

  /**
   * Update garage object in database
   * @param {GarageDocument} garage
   * @param {UpdateGarageDto} updateData
   * @param {string} userId
   * @returns {Promise<Boolean>}
   */
  public updateOne = async (garage: GarageDocument, updateData: UpdateGarageDto, userId: string): Promise<boolean> => {
    garage.updatedBy = userId;
    garage.updatedDate = Date.now();

    _.each(_.pick(updateData, FIELDS_GARAGE_UPDATE), (v, k) => {
      garage[k] = v;
    });

    const updatedGarage = await garage.save();
    return _.isEqual(updatedGarage, garage);
  };
}

export default GarageRepository;
