interface Service {
  code: number;
  name: string;
  description: string;
  image?: string;
  price: number;
  createdBy: string;
  createdDate: number;
  updatedBy: string;
  updatedDate: number;
  isDeleted: boolean;
}

export default Service;
