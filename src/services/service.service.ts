import { inject, injectable } from 'inversify';
import HttpException from '../exceptions/HttpException';
import ServiceRepository from '../repositories/service.repository';
import TYPES from '../types';

@injectable()
class ServiceService {
  constructor(@inject(TYPES.ServiceRepository) private serviceRepository: ServiceRepository) {}
}

export default ServiceService;
