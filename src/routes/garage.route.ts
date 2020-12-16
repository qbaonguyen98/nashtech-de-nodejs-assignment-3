import { GarageUpdateServicesDto } from './../dtos/garages/garage-update-services.dto';
import { Router } from 'express';
import { inject, injectable } from 'inversify';

import TYPES from '../types';

import { UpdateGarageDto } from './../dtos/garages/update-garage.dto';
import { QueryGaragesDto } from './../dtos/garages/query-garage.dto';
import { CreateGarageDto } from './../dtos/garages/create-garage.dto';

import Route from '../interfaces/route.interface';
import GarageController from '../controllers/garage.controller';
import validationMiddleware from '../middlewares/validation.middleware';
import authMiddleware from '../middlewares/auth.middleware';
import adminMiddleware from '../middlewares/admin.middleware';

@injectable()
class GarageRoute implements Route {
  public router = Router();
  public path = '/garages';

  constructor(@inject(TYPES.GarageController) private garageController: GarageController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, validationMiddleware(QueryGaragesDto, 'body'), this.garageController.findAll);
    this.router.post(`${this.path}`, authMiddleware, adminMiddleware, validationMiddleware(CreateGarageDto, 'body'), this.garageController.create);
    this.router.put(
      `${this.path}/:garageId`,
      authMiddleware,
      adminMiddleware,
      validationMiddleware(UpdateGarageDto, 'body'),
      this.garageController.updateById,
    );
    this.router.put(
      `${this.path}/services/:garageId`,
      authMiddleware,
      adminMiddleware,
      validationMiddleware(GarageUpdateServicesDto, 'body'),
      this.garageController.addServices,
    );
    this.router.delete(
      `${this.path}/services/:garageId`,
      authMiddleware,
      adminMiddleware,
      validationMiddleware(GarageUpdateServicesDto, 'body'),
      this.garageController.deleteServices,
    );
    this.router.delete(`${this.path}/:garageId`, authMiddleware, adminMiddleware, this.garageController.deleteById);
  }
}

export default GarageRoute;
