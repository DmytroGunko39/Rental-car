import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Car, FilterParams } from '../types/car';
import { getCars, getCarBrands } from '../services/carService';

interface CarStore {
  // Cars data
  cars: Car[];
  totalCars: number;
  currentPage: number;
  totalPages: number;

  // Loading states
  isLoading: boolean;
  error: string | null;

  // Filters
  filters: FilterParams;

  // Available brands for dropdown
  availableBrands: string[];

  // Favorites (persisted in localStorage)
  favorites: string[]; // Array of car IDs

  // Actions
  fetchCars: (resetResults?: boolean) => Promise<void>;
  fetchBrands: () => Promise<void>;
  setFilters: (newFilters: Partial<FilterParams>) => void;
  resetFilters: () => void;
  loadMore: () => Promise<void>;
  toggleFavorite: (carId: string) => void;
  isFavorite: (carId: string) => boolean;
  clearCars: () => void;
}

const initialFilters: FilterParams = {
  brand: undefined,
  rentalPrice: undefined,
  mileageFrom: undefined,
  mileageTo: undefined,
  page: 1,
  limit: 12,
};

export const useCarStore = create<CarStore>()(
  persist(
    (set, get) => ({
      // Initial state
      cars: [],
      totalCars: 0,
      currentPage: 1,
      totalPages: 1,
      isLoading: false,
      error: null,
      filters: initialFilters,
      availableBrands: [],
      favorites: [],

      /**
       * Fetch available car brands from API
       */
      fetchBrands: async () => {
        try {
          const brands = await getCarBrands();
          set({ availableBrands: brands });
          console.log('✅ Brands loaded:', brands.length);
        } catch (error) {
          console.error('❌ Error fetching brands:', error);
        }
      },

      /**
       * Fetch cars from API with current filters
       * @param resetResults - If true, clears previous results before fetching (important for new filters!)
       */
      fetchCars: async (resetResults = false) => {
        const { filters } = get();

        set({ isLoading: true, error: null });

        // Clear previous results if this is a new filter search
        if (resetResults) {
          set({ cars: [], currentPage: 1 });
        }

        try {
          const response = await getCars({
            ...filters,
            page: resetResults ? 1 : filters.page,
          });

          set({
            cars: resetResults
              ? response.cars
              : [...get().cars, ...response.cars],
            totalCars: response.totalCars,
            currentPage: response.page,
            totalPages: response.totalPages,
            isLoading: false,
          });

          console.log('✅ Cars fetched:', response.cars.length, 'cars');
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : 'Failed to fetch cars',
            isLoading: false,
          });
          console.error('❌ Error fetching cars:', error);
        }
      },

      /**
       * Update filters and fetch new results
       * IMPORTANT: Resets previous search results as per requirements!
       */
      setFilters: (newFilters) => {
        set((state) => ({
          filters: {
            ...state.filters,
            ...newFilters,
            page: 1, // Reset to page 1 when filters change
          },
        }));

        // Fetch with reset to clear previous results (requirement!)
        get().fetchCars(true);
      },

      /**
       * Reset all filters to initial state
       */
      resetFilters: () => {
        set({ filters: initialFilters });
        get().fetchCars(true);
      },

      /**
       * Load more cars (pagination)
       * Backend pagination as per requirements
       */
      loadMore: async () => {
        const { currentPage, totalPages, filters } = get();

        if (currentPage >= totalPages) {
          console.log('📄 No more pages to load');
          return;
        }

        set((state) => ({
          filters: {
            ...state.filters,
            page: currentPage + 1,
          },
        }));

        await get().fetchCars(false); // Don't reset, append results
      },

      /**
       * Toggle car in favorites list
       * Favorites persist in localStorage as per requirements
       */
      toggleFavorite: (carId) => {
        set((state) => {
          const isFav = state.favorites.includes(carId);

          return {
            favorites: isFav
              ? state.favorites.filter((id) => id !== carId)
              : [...state.favorites, carId],
          };
        });

        console.log(
          get().isFavorite(carId)
            ? '❤️ Added to favorites'
            : '💔 Removed from favorites',
        );
      },

      /**
       * Check if car is in favorites
       */
      isFavorite: (carId) => {
        return get().favorites.includes(carId);
      },

      /**
       * Clear all cars (useful when applying new filters)
       */
      clearCars: () => {
        set({ cars: [], currentPage: 1 });
      },
    }),
    {
      name: 'car-favorites-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist favorites, not the entire store
      partialize: (state) => ({ favorites: state.favorites }),
    },
  ),
);
