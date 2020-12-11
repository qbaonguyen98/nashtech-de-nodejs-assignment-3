import { inject, injectable } from 'inversify';
import HttpException from '../exceptions/HttpException';
import GarageRepository from '../repositories/garage.repository';
import TYPES from '../types';

@injectable()
class GarageService {
  constructor(@inject(TYPES.GarageRepository) private garageRepository: GarageRepository) {}
}

export default GarageService;
