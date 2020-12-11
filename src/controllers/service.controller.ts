import _ from 'lodash';
import { Types } from 'mongoose';
import { inject, injectable } from 'inversify';
import { NextFunction, Response } from 'express';

import TYPES from '../types';
import { FIELDS_SERVICE_POPULATE, FIELDS_SERVICE_SHOW } from '../utils/constants';

import ServiceService from '../services/service.service';

import { RequestWithUser } from '../interfaces/auth.interface';

import { CreateServiceDto } from './../dtos/services/create-service.dto';
import { UpdateServiceDto } from './../dtos/services/update-services.dto';
import { QueryServicesDto } from './../dtos/services/query-service.dto';

@injectable()
class ServiceController {
  constructor(@inject(TYPES.ServiceService) private serviceService: ServiceService) {}

  /**
   * Returns response after create new service object
   * Create service object
   * @param {RequestWithUser} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {void}
   */
  public create = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      //const userId: string = req.user.id;
      const userId = '1234';
      const serviceData: CreateServiceDto = req.body;

      const createdService = await this.serviceService.create(serviceData, userId);

      res.status(200).json({ data: createdService, message: 'Create new services' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Returns response list of services by conditions
   * @param {RequestWithUser} req
   * @param {Response} res
   * @param {NextFunction} res
   * @returns {void}
   */
  public findAll = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      // TO DO: query by role's user
      //const userId: string = req.user.id;
      const query: QueryServicesDto = req.body;

      const services = await this.serviceService.find(query, {
        populate: FIELDS_SERVICE_POPULATE,
        limit: +query.limit,
        ...(query.lastId && {
          lastId: Types.ObjectId.createFromHexString(query.lastId),
        }),
        sortBy: [
          {
            field: query.sortField as any,
            order: query.sortOrder,
          },
        ],
        fields: FIELDS_SERVICE_SHOW,
      });

      res.status(200).json({ data: services, message: 'Services response' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Returns reposnse update service object by service id
   * @param {RequestWithUser} req
   * @param {Response} res
   * @param {NextFunction} res
   * @returns {void}
   */
  public updateById = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      // TO DO: Update userId after auth services completed
      //const userId: string = req.user.id;
      const userId = '1234';
      const serviceId = _.get(req.params, 'serviceId', '');
      const updateData: UpdateServiceDto = req.body;

      const updatedService = await this.serviceService.updateOne(
        {
          _id: serviceId,
        },
        updateData,
        userId,
      );

      res.status(200).json({ data: updatedService, message: 'Service is updated successfull' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Return reposonse delete service object by service id
   * @param {RequestWithUser} req
   * @param {Response} res
   * @param {NextFunction} res
   * @returns {void}
   */
  public deleteById = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const serviceId = _.get(req.params, 'serviceId', '');
      // TO DO: Get user id
      //const userId = req.user.id;

      const userId = '`1234';

      const deletedService = await this.serviceService.deleteOne(
        {
          _id: serviceId,
        },
        userId,
      );
      res.status(200).json({ message: 'Service is deleted' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Returns response upload image of object
   * @param {RequestWithUser} req
   * @param {Response} res
   * @param {NextFunction} res
   * @returns {void}
   */
  public uploadImage = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('TO DO Upload Image');
    } catch (error) {
      next(error);
    }
  };
}

export default ServiceController;
