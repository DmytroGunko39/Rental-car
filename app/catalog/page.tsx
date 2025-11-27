'use client';

import { useEffect } from 'react';
import { useCarStore } from '../store/useCarStore';
import Filters from '../components/Filters/Filters';
import CarCard from '../components/CarCard/CarCard';
import Loader from '../components/UI/Loader';
import ErrorMessage from '../components/UI/ErrorMessage';

export default function CatalogPage() {
  const {
    cars,
    fetchCars,
    fetchBrands,
    loadMore,
    isLoading,
    error,
    currentPage,
    totalPages,
  } = useCarStore();

  useEffect(() => {
    fetchBrands();
    fetchCars(true);
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <Filters />

      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}

      <div className="grid grid-cols-3 gap-6 mt-8">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {!isLoading && currentPage < totalPages && (
        <div className="text-center mt-10">
          <button
            onClick={loadMore}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}
