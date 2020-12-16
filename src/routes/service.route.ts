import { Router } from 'express';
import { inject, injectable } from 'inversify';

import TYPES from '../types';

import Route from '../interfaces/route.interface';

import { QueryServicesDto } from './../dtos/services/query-service.dto';
import { CreateServiceDto } from './../dtos/services/create-service.dto';
import { UpdateServiceDto } from './../dtos/services/update-services.dto';
import { UploadImageService } from './../dtos/services/upload-image-service.dto';

import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';

import ServiceController from '../controllers/service.controller';
import adminMiddleware from '../middlewares/admin.middleware';

@injectable()
class ServiceRoute implements Route {
  public router = Router();
  public path = '/services';

  constructor(@inject(TYPES.ServiceController) private serviceController: ServiceController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, validationMiddleware(QueryServicesDto, 'body'), this.serviceController.findAll);
    this.router.post(`${this.path}`, authMiddleware, adminMiddleware, validationMiddleware(CreateServiceDto, 'body'), this.serviceController.create);
    this.router.put(
      `${this.path}/:serviceId`,
      authMiddleware,
      adminMiddleware,
      validationMiddleware(UpdateServiceDto, 'body'),
      this.serviceController.updateById,
    );
    this.router.delete(`${this.path}/:serviceId`, authMiddleware, adminMiddleware, this.serviceController.deleteById);
    this.router.post(
      `${this.path}/update-image/:serviceId`,
      authMiddleware,
      adminMiddleware,
      validationMiddleware(UploadImageService, 'body'),
      this.serviceController.uploadImage,
    );
  }
}

export default ServiceRoute;
