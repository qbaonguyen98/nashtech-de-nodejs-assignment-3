import { Router } from 'express';
import { inject, injectable } from 'inversify';

import Route from '../interfaces/route.interface';
import GarageController from '../controllers/garage.controller';
import TYPES from '../types';

@injectable()
class GarageRoute implements Route {
  public router = Router();
  public path = '/garages';

  constructor(@inject(TYPES.GarageController) private garageController: GarageController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    console.log('Garage route');
  }
}

export default GarageRoute;
