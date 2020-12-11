import { Types } from 'mongoose';

export interface QueryOptions<T> {
  throwNotFoundException?: boolean;
  useLean?: boolean;
  populate?: (keyof T)[];
  fields?: (keyof T)[];
  sortBy?: {
    field: keyof T;
    order: 'asc' | 'desc';
  }[];
  lastId?: Types.ObjectId;
  limit?: number;
  exclude?: Types.ObjectId;
}

export interface QueryOptionsPaging<T> extends QueryOptions<T> {
  pageNumber?: number;
  nPerPage?: number;
}
