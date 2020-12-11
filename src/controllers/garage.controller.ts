import _ from 'lodash';
import { Types } from 'mongoose';
import { inject, injectable } from 'inversify';
import { NextFunction, Response } from 'express';

import TYPES from '../types';
import { FIELDS_GARAGE_POPULATE, FIELDS_GARAGE_SHOW } from '../utils/constants';

import GarageService from '../services/garage.service';

import { RequestWithUser } from '../interfaces/auth.interface';

import { QueryGaragesDto } from './../dtos/garages/query-garage.dto';
import { UpdateGarageDto } from './../dtos/garages/update-garage.dto';
import { CreateGarageDto } from './../dtos/garages/create-garage.dto';

@injectable()
class GarageController {
  constructor(@inject(TYPES.GarageService) private garageService: GarageService) {}

  /**
   * Returns response list of garages by conditions
   * @param {RequestWithUser} req
   * @param {Response} res
   * @param {NextFunction} res
   * @returns {void}
   */
  public findAll = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      // TO DO: query by role's user
      //const userId: string = req.user.id;
      const query: QueryGaragesDto = req.body;

      const garages = await this.garageService.find(query, {
        populate: FIELDS_GARAGE_POPULATE,
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
        fields: FIELDS_GARAGE_SHOW,
      });

      res.status(200).json({ data: garages, message: 'Garages response' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Returns response after create new garage object
   * Create garage object
   * @param {RequestWithUser} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {void}
   */
  public create = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      //const userId: string = req.user.id;
      const userId = '1234';
      const garageData: CreateGarageDto = req.body;

      const createdGarage = await this.garageService.create(garageData, userId);

      res.status(200).json({ data: garageData, message: 'Create new garage' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Returns response update garage object by garage id
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
      const garageId = _.get(req.params, 'garageId', '');
      const updateData: UpdateGarageDto = req.body;

      const updatedService = await this.garageService.updateOne(
        {
          _id: garageId,
        },
        updateData,
        userId,
      );

      res.status(200).json({ data: updatedService, message: 'Garage is updated successfull' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Return reposonse delete garage object by service id
   * @param {RequestWithUser} req
   * @param {Response} res
   * @param {NextFunction} res
   * @returns {void}
   */
  public deleteById = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const garageId = _.get(req.params, 'garageId', '');
      // TO DO: Get user id
      //const userId = req.user.id;

      const userId = '1234';

      const deletedService = await this.garageService.deleteOne(
        {
          _id: garageId,
        },
        userId,
      );
      res.status(200).json({ message: 'Garage is deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default GarageController;
