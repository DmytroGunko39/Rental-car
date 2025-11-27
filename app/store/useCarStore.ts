import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Car, FilterParams } from '../types/car';
import { getCars, getCarBrands } from '../services/carService';

interface CarStore {
  cars: Car[];
  totalCars: number;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  filters: FilterParams;
  availableBrands: string[];
  favorites: string[];

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
  minMileage: undefined,
  maxMileage: undefined,
  page: 1,
  limit: 12,
};

export const useCarStore = create<CarStore>()(
  persist(
    (set, get) => ({
      cars: [],
      totalCars: 0,
      currentPage: 1,
      totalPages: 1,
      isLoading: false,
      error: null,
      filters: initialFilters,
      availableBrands: [],
      favorites: [],

      fetchBrands: async () => {
        try {
          const brands = await getCarBrands();
          set({ availableBrands: brands });
          console.log('✅ Brands loaded:', brands.length);
        } catch (error) {
          console.error('❌ Error fetching brands:', error);
        }
      },

      fetchCars: async (resetResults = false) => {
        const { filters, isLoading, cars } = get();

        if (isLoading) {
          console.log('⏳ Already loading, skipping...');
          return;
        }

        set({ isLoading: true, error: null });

        // If resetting, clear cars and start from page 1
        if (resetResults) {
          set({ cars: [], currentPage: 1 });
        }

        try {
          // Determine which page to fetch
          const pageToFetch = resetResults ? 1 : filters.page || 1;

          console.log(`📡 Fetching page ${pageToFetch} with filters:`, filters);

          const response = await getCars({
            ...filters,
            page: pageToFetch,
          });

          console.log(
            `📦 Received ${response.cars.length} cars (Total: ${response.totalCars}, Page: ${response.page}/${response.totalPages})`,
          );

          set((state) => ({
            cars: resetResults
              ? response.cars
              : [...state.cars, ...response.cars],
            totalCars: response.totalCars,
            currentPage: Number(response.page),
            totalPages: Number(response.totalPages),
            isLoading: false,
          }));

          console.log(`✅ Now showing ${get().cars.length} cars total`);
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : 'Failed to fetch cars',
            isLoading: false,
          });
          console.error('❌ Error fetching cars:', error);
        }
      },

      setFilters: (newFilters) => {
        console.log('🔍 Applying new filters:', newFilters);

        set((state) => ({
          filters: {
            ...state.filters,
            ...newFilters,
            page: 1, // Always reset to page 1 on filter change
          },
        }));

        // Clear previous results and fetch new filtered results
        get().fetchCars(true);
      },

      resetFilters: () => {
        console.log('🔄 Resetting all filters');
        set({
          filters: { ...initialFilters },
          cars: [],
          currentPage: 1,
        });
        get().fetchCars(true);
      },

      loadMore: async () => {
        const { currentPage, totalPages, isLoading } = get();

        if (isLoading) {
          console.log('⏳ Already loading, please wait...');
          return;
        }

        if (currentPage >= totalPages) {
          console.log(
            '📄 All pages loaded (page ' +
              currentPage +
              ' of ' +
              totalPages +
              ')',
          );
          return;
        }

        const nextPage = Number(currentPage) + 1;
        console.log(`📄 Loading more: page ${nextPage} of ${totalPages}`);

        // Update the page number in filters
        set((state) => ({
          filters: {
            ...state.filters,
            page: nextPage,
          },
        }));

        // Fetch next page WITHOUT resetting (append mode)
        await get().fetchCars(false);
      },

      toggleFavorite: (carId) => {
        set((state) => {
          const isFav = state.favorites.includes(carId);

          return {
            favorites: isFav
              ? state.favorites.filter((id) => id !== carId)
              : [...state.favorites, carId],
          };
        });

        const favStatus = get().isFavorite(carId);
        console.log(
          favStatus
            ? `❤️ Added ${carId} to favorites`
            : `💔 Removed ${carId} from favorites`,
        );
      },

      isFavorite: (carId) => {
        return get().favorites.includes(carId);
      },

      clearCars: () => {
        set({ cars: [], currentPage: 1 });
      },
    }),
    {
      name: 'car-favorites-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ favorites: state.favorites }),
    },
  ),
);
