export interface Car {
  id: string;
  year: number;
  brand: string; // Note: API uses "brand" not "make"
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string; // Price is a string like "40"
  rentalCompany: string;
  address: string;
  rentalConditions: string[]; // Array of condition strings
  mileage: number;
}

export interface FilterParams {
  brand?: string; // Filter by brand
  rentalPrice?: string; // Price filter (e.g., "40", "50")
  mileageFrom?: number; // Minimum mileage
  mileageTo?: number; // Maximum mileage
  page?: number;
  limit?: number;
}

export interface CarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}
