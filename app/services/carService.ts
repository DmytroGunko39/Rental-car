import { apiClient } from './api';
import { Car, FilterParams, CarsResponse } from '../types/car';

// Fetch cars with optional filters and pagination
// Backend filtering is performed on the server

export const getCars = async (
  params: FilterParams = {},
): Promise<CarsResponse> => {
  try {
    const {
      page = 1,
      limit = 12,
      brand,
      rentalPrice,
      minMileage,
      maxMileage,
    } = params;

    // Build query parameters for backend filtering
    const queryParams: Record<string, any> = {
      page,
      limit,
    };

    // Add filters only if they have values
    if (brand) queryParams.brand = brand;
    if (rentalPrice) queryParams.rentalPrice = rentalPrice;
    if (minMileage) queryParams.minMileage = minMileage;
    if (maxMileage) queryParams.maxMileage = maxMileage;

    const response = await apiClient.get<CarsResponse>('/cars', {
      params: queryParams,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

/**
 * Fetch single car by ID
 */
export const getCarById = async (id: string): Promise<Car> => {
  try {
    const response = await apiClient.get<Car>(`/cars/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching car with id ${id}:`, error);
    throw error;
  }
};

//Get all available car brands from API

export const getCarBrands = async (): Promise<string[]> => {
  try {
    const response = await apiClient.get<string[]>('/brands');
    return response.data;
  } catch (error) {
    console.error('Error fetching car brands:', error);
    return [];
  }
};

//Get available price options for filter

export const getRentalPrices = async (): Promise<string[]> => {
  try {
    const response = await apiClient.get<CarsResponse>('/cars', {
      params: { limit: 200, page: 1 },
    });

    // Extract unique prices and sort numerically
    const prices = [
      ...new Set(response.data.cars.map((car) => car.rentalPrice)),
    ];
    return prices.sort((a, b) => Number(a) - Number(b));
  } catch (error) {
    console.error('Error fetching rental prices:', error);
    return [];
  }
};

/**
 * Format mileage with space separator
 * Example: 5000 -> "5 000"
 */
export const formatMileage = (mileage: number): string => {
  return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
