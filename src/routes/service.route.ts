import { Router } from 'express';
import { inject, injectable } from 'inversify';
import Route from '../interfaces/route.interface';
import TYPES from '../types';
import ServiceController from '../controllers/service.controller';
import authMiddleware from '../middlewares/auth.middleware';

@injectable()
class ServiceRoute implements Route {
  public router = Router();
  public path = '/services';

  constructor(@inject(TYPES.ServiceController) private serviceController: ServiceController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    console.log('Service route');
  }
}

export default ServiceRoute;
