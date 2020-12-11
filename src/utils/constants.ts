import { GarageDocument } from './../models/garage.model';
import Service from '../interfaces/service.interface';
import Garage from '../interfaces/garage.interface';

export const FIELDS_SERVICE_POPULATE = ['createdBy', 'updatedBy'] as (keyof Service)[];

export const FIELDS_GARAGE_POPULATE = ['createdBy', 'updatedBy'] as (keyof Garage)[];

export const FIELDS_SERVICE_SHOW = [
  'id',
  'code',
  'name',
  'description',
  'image',
  'price',
  'createdBy',
  'createdDate',
  'updatedBy',
  'updatedDate',
] as (keyof Service)[];

export const FIELDS_GARAGE_SHOW = [
  'id',
  'code',
  'name',
  'description',
  'address',
  'location',
  'createdBy',
  'createdDate',
  'updatedBy',
  'updatedDate',
] as (keyof Garage)[];

export const FIELDS_SERVICE_UPDATE = ['name', 'description', 'price', 'isDeleted'] as (keyof Service)[];

export const FIELDS_GARAGE_UPDATE = ['name', 'description', 'address', 'location'] as (keyof Garage)[];
