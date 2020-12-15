import { inject, injectable } from 'inversify';
import { MongooseFilterQuery } from 'mongoose';

import TYPES from '../types';

import { isEmptyObject } from '../utils/util';
import { QueryOptions } from '../utils/query-builder';

import HttpException from '../exceptions/HttpException';

import Service from '../interfaces/service.interface';

import { ServiceDocument } from './../models/service.model';

import ServiceRepository from '../repositories/service.repository';

import { CreateServiceDto } from './../dtos/services/create-service.dto';
import { UpdateServiceDto } from '../dtos/services/update-services.dto';

@injectable()
class ServiceService {
  constructor(@inject(TYPES.ServiceRepository) private serviceRepository: ServiceRepository) {}

  /**
   * Returns service object if created successfull
   * Returns error message if created failed
   * @param {CreateServiceDto} serviceData
   * @param {string} userId
   * @returns {Service}
   */
  public create = async (serviceData: CreateServiceDto, userId: string): Promise<Service> => {
    if (isEmptyObject(serviceData)) {
      throw new HttpException(400, 'Missing service information');
    }

    const existedService: Service = await this.serviceRepository.findOne({
      code: serviceData.code,
    });
    if (existedService) {
      throw new HttpException(409, `Service already exists`);
    }

    const createServiceData = await this.serviceRepository.create({
      ...serviceData,
      createdDate: Date.now(),
      createdBy: userId,
    } as Service);

    return createServiceData;
  };

  /**
   * Returns list of services by conditions
   * @param conditions
   * @param {QueryOptions<Service>} options
   * @returns {Service[]}
   */
  public async find(conditions: MongooseFilterQuery<ServiceDocument> = {}, options: QueryOptions<Service> = {}): Promise<Service[]> {
    conditions = conditions.filter;

    const services = this.serviceRepository.find(conditions, options);

    return services;
  }

  /**
   * Returns is service object updated successfull or faileds
   * @param {MongooseFilterQuery<Service>} conditions
   * @param {UpdateServiceDto} serviceData
   * @param {string} userId
   * @returns {Boolean}
   */
  public async updateOne(conditions: MongooseFilterQuery<Service> = {}, serviceData: UpdateServiceDto, userId: string): Promise<boolean> {
    const service = await this.serviceRepository.findOne(conditions, {
      useLean: true,
      throwNotFoundException: true,
    });

    const updatedService = await this.serviceRepository.updateOne(service, serviceData, userId);

    return updatedService;
  }

  /**
   * Returns list of services by conditions
   * @param {MongooseFilterQuery<Service>} conditions
   * @param {string} userId
   * @returns {Boolean}
   */
  public async deleteOne(conditions: MongooseFilterQuery<Service> = {}, userId: string): Promise<boolean> {
    const service = await this.serviceRepository.findOne(conditions, {
      useLean: true,
      throwNotFoundException: true,
    });

    const deletedService = await this.serviceRepository.deleteOne(service, userId);
    return deletedService;
  }
}

export default ServiceService;
