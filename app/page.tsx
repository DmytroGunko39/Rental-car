'use client';

import { useEffect } from 'react';
import { useCarStore } from './store/useCarStore';
import { formatMileage } from './services/carService';

export default function Home() {
  const {
    cars,
    totalCars,
    currentPage,
    totalPages,
    isLoading,
    error,
    filters,
    favorites,
    availableBrands,
    fetchCars,
    fetchBrands,
    setFilters,
    resetFilters,
    loadMore,
    toggleFavorite,
    isFavorite,
  } = useCarStore();

  // Fetch brands and cars on initial load
  useEffect(() => {
    fetchBrands();
    if (cars.length === 0) {
      fetchCars(true);
    }
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">🚗 RentalCar - Store Test</h1>

      {/* Store Stats */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded">
          <p className="text-sm text-gray-600">Total Cars</p>
          <p className="text-2xl font-bold">{totalCars}</p>
        </div>
        <div className="bg-green-100 p-4 rounded">
          <p className="text-sm text-gray-600">Loaded</p>
          <p className="text-2xl font-bold">{cars.length}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded">
          <p className="text-sm text-gray-600">Page</p>
          <p className="text-2xl font-bold">
            {currentPage} / {totalPages}
          </p>
        </div>
        <div className="bg-pink-100 p-4 rounded">
          <p className="text-sm text-gray-600">Favorites</p>
          <p className="text-2xl font-bold">❤️ {favorites.length}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          <p className="text-sm text-gray-600">Brands</p>
          <p className="text-2xl font-bold">{availableBrands.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">
          🔍 Filters (Backend Filtering)
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {/* Brand Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Car Brand</label>
            <select
              className="w-full p-2 border rounded"
              value={filters.brand || ''}
              onChange={(e) =>
                setFilters({ brand: e.target.value || undefined })
              }
            >
              <option value="">Choose a brand</option>
              {availableBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Price / hour
            </label>
            <select
              className="w-full p-2 border rounded"
              value={filters.rentalPrice || ''}
              onChange={(e) =>
                setFilters({ rentalPrice: e.target.value || undefined })
              }
            >
              <option value="">Choose a price</option>
              <option value="30">To $30</option>
              <option value="40">To $40</option>
              <option value="50">To $50</option>
              <option value="60">To $60</option>
            </select>
          </div>

          {/* Mileage From */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Car mileage / km (From)
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="From"
              value={filters.minMileage || ''}
              onChange={(e) =>
                setFilters({
                  minMileage: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
            />
          </div>

          {/* Mileage To */}
          <div>
            <label className="block text-sm font-medium mb-2">To</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="To"
              value={filters.maxMileage || ''}
              onChange={(e) =>
                setFilters({
                  maxMileage: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={resetFilters}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reset Filters
          </button>
          <div className="text-sm text-gray-600 flex items-center">
            Active filters:
            {filters.brand && ` Brand: ${filters.brand}`}
            {filters.rentalPrice && ` | Price: $${filters.rentalPrice}`}
            {filters.minMileage && ` | From: ${filters.minMileage}km`}
            {filters.maxMileage && ` | To: ${filters.maxMileage}km`}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="text-xl">⏳ Loading cars...</div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          ❌ Error: {error}
        </div>
      )}

      {/* Cars Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {cars.map((car) => (
          <div
            key={car.id}
            className="border-2 rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <div className="relative">
              <img
                src={car.img}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => toggleFavorite(car.id)}
                className="absolute top-2 right-2 bg-white p-2 rounded-full hover:bg-gray-100 text-xl"
              >
                {isFavorite(car.id) ? '❤️' : '🤍'}
              </button>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">
                {car.brand} {car.model}
              </h3>
              <div className="text-sm space-y-1">
                <p>📅 Year: {car.year}</p>
                <p>💰 ${car.rentalPrice}/day</p>
                <p>🛣️ Mileage: {formatMileage(car.mileage)} km</p>
                <p className="text-xs text-gray-500">{car.type}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {!isLoading && cars.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-xl">😔 No cars found</p>
          <p>Try adjusting your filters</p>
        </div>
      )}

      {/* Load More Button */}
      {currentPage < totalPages && !isLoading && (
        <div className="text-center">
          <button
            onClick={loadMore}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            Load More ({cars.length} of {totalCars})
          </button>
        </div>
      )}

      {/* End of Results */}
      {currentPage >= totalPages && cars.length > 0 && (
        <div className="text-center text-gray-500 py-4">🏁 All cars loaded</div>
      )}
    </div>
  );
}
