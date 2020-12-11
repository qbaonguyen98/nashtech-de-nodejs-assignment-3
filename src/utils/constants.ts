import Service from '../interfaces/service.interface';

export const FIELDS_SERVICE_POPULATE = [] as (keyof Service)[];

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

export const FIELDS_SERVICE_UPDATE = ['name', 'description', 'price', 'isDeleted'] as (keyof Service)[];
