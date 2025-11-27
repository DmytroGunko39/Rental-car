'use client';

import { useCarStore } from '../../store/useCarStore';

export default function Filters() {
  const { filters, availableBrands, setFilters, resetFilters } = useCarStore();

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      <div className="grid grid-cols-4 gap-4">
        {/* Brand */}
        <div>
          <label className="block text-sm font-medium mb-2">Brand</label>
          <select
            className="w-full p-2 border rounded"
            value={filters.brand || ''}
            onChange={(e) => setFilters({ brand: e.target.value || undefined })}
          >
            <option value="">Choose a brand</option>
            {availableBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-2">Price</label>
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

        {/* min mileage */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Mileage (from)
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={filters.minMileage || ''}
            onChange={(e) =>
              setFilters({
                minMileage: e.target.value ? Number(e.target.value) : undefined,
              })
            }
          />
        </div>

        {/* max mileage */}
        <div>
          <label className="block text-sm font-medium mb-2">To</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={filters.maxMileage || ''}
            onChange={(e) =>
              setFilters({
                maxMileage: e.target.value ? Number(e.target.value) : undefined,
              })
            }
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={resetFilters}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reset Filters
        </button>

        <div className="text-sm text-gray-600 flex items-center">
          Active filters:
          {filters.brand && ` Brand: ${filters.brand}`}
          {filters.rentalPrice && ` | Price: ${filters.rentalPrice}`}
          {filters.minMileage && ` | From: ${filters.minMileage}km`}
          {filters.maxMileage && ` | To: ${filters.maxMileage}km`}
        </div>
      </div>
    </div>
  );
}
