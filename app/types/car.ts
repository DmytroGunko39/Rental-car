export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
}

export interface FilterParams {
  brand?: string; // Filter by brand
  rentalPrice?: number; // Price filter (e.g., "40", "50")
  minMileage?: number; // Changed from mileageFrom
  maxMileage?: number; // Changed from mileageTo
  page?: number;
  limit?: number;
}

export interface CarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}
