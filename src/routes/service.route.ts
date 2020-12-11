import { Router } from 'express';
import { inject, injectable } from 'inversify';

import TYPES from '../types';

import Route from '../interfaces/route.interface';

import { QueryServicesDto } from './../dtos/services/query-service.dto';
import { CreateServiceDto } from './../dtos/services/create-service.dto';
import { UpdateServiceDto } from './../dtos/services/update-services.dto';
import { UploadImageService } from './../dtos/services/upload-image-service.dto';

import validationMiddleware from '../middlewares/validation.middleware';

import ServiceController from '../controllers/service.controller';

@injectable()
class ServiceRoute implements Route {
  public router = Router();
  public path = '/services';

  constructor(@inject(TYPES.ServiceController) private serviceController: ServiceController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, validationMiddleware(CreateServiceDto, 'body'), this.serviceController.create);
    this.router.get(`${this.path}`, validationMiddleware(QueryServicesDto, 'body'), this.serviceController.findAll);
    this.router.put(`${this.path}/:serviceId`, validationMiddleware(UpdateServiceDto, 'body'), this.serviceController.updateById);
    this.router.delete(`${this.path}/:serviceId`, this.serviceController.deleteById);
    this.router.post(`${this.path}/update-image/:serviceId`, validationMiddleware(UploadImageService, 'body'), this.serviceController.uploadImage);
  }
}

export default ServiceRoute;
