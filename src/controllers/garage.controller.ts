import { inject, injectable } from 'inversify';
import TYPES from '../types';
import GarageService from '../services/garage.service';

@injectable()
class GarageController {
  constructor(@inject(TYPES.GarageService) private garageService: GarageService) {}
}

export default GarageController;
