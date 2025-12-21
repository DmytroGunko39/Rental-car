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

      <div className="grid grid-cols-4 gap-6 mt-[32px]">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {!isLoading && currentPage < totalPages && (
        <div className="text-center mt-10">
          <button
            onClick={loadMore}
            className=" border border-[#3470ff]
    rounded-[12px]
    px-[38px] py-[12px]
    min-w-[156px]
    h-[44px]
    font-manrope font-semibold
    text-[16px] leading-[1.25]
    text-[#101828]
    cursor-pointer
    hover:border-[#0b44cd]"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}
