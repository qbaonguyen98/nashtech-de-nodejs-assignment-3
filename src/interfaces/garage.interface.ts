export interface Coordinates {
  lat: number;
  lng: number;
}

interface Garage {
  code: number;
  name: string;
  description?: string;
  address: string;
  location: {
    googleId: string;
    coordinates: Coordinates;
  };
  createdBy: string;
  createdDate?: number;
  updatedBy?: string;
  updatedDate?: number;
  isDeleted?: boolean;
}

export default Garage;
