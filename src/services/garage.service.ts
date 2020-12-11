import { inject, injectable } from 'inversify';
import { MongooseFilterQuery } from 'mongoose';

import TYPES from '../types';
import { isEmptyObject } from '../utils/util';
import { QueryOptions } from '../utils/query-builder';
import HttpException from '../exceptions/HttpException';

import Garage from '../interfaces/garage.interface';
import { GarageDocument } from './../models/garage.model';
import GarageRepository from '../repositories/garage.repository';
import { UpdateGarageDto } from './../dtos/garages/update-garage.dto';
import { CreateGarageDto } from './../dtos/garages/create-garage.dto';

@injectable()
class GarageService {
  constructor(@inject(TYPES.GarageRepository) private garageRepository: GarageRepository) {}

  /**
   * Returns garage object if created successfull
   * Returns error message if created failed
   * @param {CreateGarageDto} garageData
   * @param {string} userId
   * @returns {Garage}
   */
  public create = async (garageData: CreateGarageDto, userId: string): Promise<Garage> => {
    if (isEmptyObject(garageData)) {
      throw new HttpException(400, 'Missing garage information');
    }

    const existedGarage: Garage = await this.garageRepository.findOne({
      code: garageData.code,
    });
    if (existedGarage) {
      throw new HttpException(409, `Garage already exists`);
    }

    const createGarageData = await this.garageRepository.create({
      ...garageData,
      createdBy: null,
      isDeleted: false,
    });

    return createGarageData;
  };

  /**
   * Returns list of gaarages by conditions
   * @param conditions
   * @param {QueryOptions<Garage>} options
   * @returns {Garage[]}
   */
  public async find(conditions: MongooseFilterQuery<GarageDocument> = {}, options: QueryOptions<Garage> = {}): Promise<Garage[]> {
    conditions = conditions.filter;

    const garages = this.garageRepository.find(conditions, options);

    return garages;
  }

  /**
   * Returns is garage object updated successfull or faileds
   * @param {MongooseFilterQuery<Garage>} conditions
   * @param {UpdateGarageDto} garageData
   * @param {string} userId
   * @returns {Boolean}
   */
  public async updateOne(conditions: MongooseFilterQuery<GarageDocument> = {}, garageData: UpdateGarageDto, userId: string): Promise<boolean> {
    const garage = await this.garageRepository.findOne(conditions, {
      useLean: true,
      throwNotFoundException: true,
    });

    const updatedGarage = await this.garageRepository.updateOne(garage, garageData, userId);

    return updatedGarage;
  }

  /**
   * Returns list of services by conditions
   * @param {MongooseFilterQuery<Service> } conditions
   * @param {string} userId
   * @returns {Boolean}
   */
  public async deleteOne(conditions: MongooseFilterQuery<GarageDocument> = {}, userId: string): Promise<boolean> {
    const garage = await this.garageRepository.findOne(conditions, {
      useLean: true,
      throwNotFoundException: true,
    });

    const deleteGarage = await this.garageRepository.deleteOne(garage, userId);
    return deleteGarage;
  }
}

export default GarageService;
