import { inject, injectable } from 'inversify';
import TYPES from '../types';
import ServiceService from '../services/service.service';

@injectable()
class ServiceController {
  constructor(@inject(TYPES.ServiceService) private serviceService: ServiceService) {}
}

export default ServiceController;
