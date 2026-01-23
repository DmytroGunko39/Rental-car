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
    <main className="max-w-7xl mx-auto px-6 py-12">
      <Filters />

      <div className="grid grid-cols-4 gap-x-8 gap-y-12 mt-14">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!isLoading && currentPage < totalPages && (
        <div className="text-center mt-16">
          <button
            onClick={loadMore}
            className="border-2 border-[#3470ff]
    rounded-xl
    px-10 py-2
    min-w-[156px]
    h-11
    font-semibold
    text-base
    text-[#3470ff]
    cursor-pointer
    transition-all duration-300
    hover:bg-blue-50 hover:border-[#0b44cd] hover:text-[#0b44cd]
    active:scale-[0.98]"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}
