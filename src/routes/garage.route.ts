import { Router } from 'express';
import { inject, injectable } from 'inversify';

import TYPES from '../types';

import { UpdateGarageDto } from './../dtos/garages/update-garage.dto';
import { QueryGaragesDto } from './../dtos/garages/query-garage.dto';
import { CreateGarageDto } from './../dtos/garages/create-garage.dto';

import Route from '../interfaces/route.interface';
import GarageController from '../controllers/garage.controller';
import validationMiddleware from '../middlewares/validation.middleware';

@injectable()
class GarageRoute implements Route {
  public router = Router();
  public path = '/garages';

  constructor(@inject(TYPES.GarageController) private garageController: GarageController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    console.log('Garage route');
    this.router.get(`${this.path}`, this.garageController.findAll);
    this.router.post(`${this.path}`, validationMiddleware(CreateGarageDto, 'body'), this.garageController.create);
    this.router.get(`${this.path}`, validationMiddleware(QueryGaragesDto, 'body'), this.garageController.findAll);
    this.router.put(`${this.path}/:garageId`, validationMiddleware(UpdateGarageDto, 'body'), this.garageController.updateById);
    this.router.delete(`${this.path}/:garageId`, this.garageController.deleteById);
  }
}

export default GarageRoute;
