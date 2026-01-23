'use client';

import { useState, useEffect } from 'react';
import { useCarStore } from '../../store/useCarStore';
import { customStyles } from '../../helpers/customStylesSelect';
import { carPriceOptions } from '../../helpers/selectorOptions';
import dynamic from 'next/dynamic';
import { BrandOption, PriceOption } from '../../helpers/selectorOptions';
import { useFormattedNumberInput } from '@/app/helpers/useFormattedNumberInput';

const Select = dynamic(() => import('react-select'), {
  ssr: false,
});

export default function Filters() {
  const { availableBrands, setFilters, resetFilters, filters } = useCarStore();

  // Local state for filters (not applied until Search is clicked)
  const [localFilters, setLocalFilters] = useState({
    brand: undefined as string | undefined,
    rentalPrice: undefined as number | undefined,
  });

  // Use the custom hook for mileage inputs
  const minMileageInput = useFormattedNumberInput(filters.minMileage);
  const maxMileageInput = useFormattedNumberInput(filters.maxMileage);

  // Sync local filters with store filters when store resets
  useEffect(() => {
    setLocalFilters({
      brand: filters.brand,
      rentalPrice: filters.rentalPrice,
    });
  }, [filters.brand, filters.rentalPrice]);

  const handleSearch = () => {
    // Apply filters to store (this triggers fetchCars automatically)
    setFilters({
      brand: localFilters.brand,
      rentalPrice: localFilters.rentalPrice,
      minMileage: minMileageInput.rawValue,
      maxMileage: maxMileageInput.rawValue,
    });
  };

  const handleReset = () => {
    // Reset local filters
    setLocalFilters({
      brand: undefined,
      rentalPrice: undefined,
    });

    // Reset mileage inputs using hook's reset function
    minMileageInput.reset();
    maxMileageInput.reset();

    // Reset store filters (this also triggers fetchCars automatically)
    resetFilters();
  };
  return (
    <div className="flex justify-center items-end gap-5 mt-20">
      {/* BRAND */}
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-2 font-medium tracking-wide">
          Car brand
        </label>

        <Select
          styles={customStyles}
          placeholder="Choose a brand"
          value={
            localFilters.brand
              ? { label: localFilters.brand, value: localFilters.brand }
              : null
          }
          onChange={(newValue) => {
            const option = newValue as BrandOption | null;
            setLocalFilters({ ...localFilters, brand: option?.value });
          }}
          options={availableBrands.map((b) => ({
            label: b,
            value: b,
          }))}
          isClearable
        />
      </div>

      {/* PRICE */}
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-2 font-medium tracking-wide">
          Price / 1 hour
        </label>

        <Select
          styles={customStyles}
          placeholder="Choose a price"
          options={carPriceOptions}
          value={
            localFilters.rentalPrice
              ? carPriceOptions.find(
                  (option) => option.value === localFilters.rentalPrice,
                )
              : null
          }
          onChange={(newValue) => {
            const option = newValue as PriceOption | null;
            setLocalFilters({ ...localFilters, rentalPrice: option?.value });
          }}
          isClearable
          formatOptionLabel={(option, { context }) => {
            const opt = option as PriceOption;
            return context === 'menu' ? opt.label : `To $${opt.label}`;
          }}
        />
      </div>

      {/* MILEAGE */}
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-2 font-medium tracking-wide">
          Car mileage / km
        </label>

        <div className="flex items-center">
          {/* FROM */}
          <div className="bg-gray-50 h-11 w-[160px] rounded-l-xl flex items-center px-5 border border-r-0 border-gray-200 focus-within:border-blue-400 focus-within:bg-white transition-colors">
            <span className="text-base font-medium text-gray-700 mr-2 whitespace-nowrap">
              From
            </span>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="
        bg-transparent flex-1
        border-none outline-none
        text-base font-medium text-gray-800
      "
              value={minMileageInput.displayValue}
              onChange={(e) => {
                minMileageInput.handleChange(e.target.value);
              }}
              onBlur={minMileageInput.handleBlur}
            />
          </div>

          {/* SEPARATOR */}
          <div className="h-11 w-px bg-gray-200"></div>

          {/* TO */}
          <div className="bg-gray-50 h-11 w-[160px] rounded-r-xl flex items-center px-5 border border-l-0 border-gray-200 focus-within:border-blue-400 focus-within:bg-white transition-colors">
            <span className="text-base font-medium text-gray-700 mr-2 whitespace-nowrap">
              To
            </span>
            <input
              type="text"
              inputMode="numeric" //shows the numeric keyboard on mobile devices! 📱
              pattern="[0-9]*"
              className="
        bg-transparent flex-1
        border-none outline-none
        text-base font-medium text-gray-800
      "
              value={maxMileageInput.displayValue}
              onChange={(e) => {
                maxMileageInput.handleChange(e.target.value);
              }}
              onBlur={maxMileageInput.handleBlur}
            />
          </div>
        </div>
      </div>

      {/*  BUTTONS */}
      <div className="flex gap-3">
        {/* SEARCH */}
        <button
          onClick={handleSearch}
          className="
          flex justify-center items-center
          w-[156px] h-11
          bg-[#3470ff]
          text-white text-base font-semibold
          rounded-xl
          transition-all duration-300
          hover:bg-[#0b44cd] hover:shadow-lg hover:shadow-blue-500/25
          active:scale-[0.98]
          cursor-pointer
        "
        >
          Search
        </button>

        {/* RESET */}
        <button
          onClick={handleReset}
          className="flex justify-center items-center
      min-w-[156px] h-11
      border-2 border-[#3470ff]
      rounded-xl
      px-9 py-3
      text-[#3470ff]
      text-base font-semibold
      cursor-pointer
      transition-all duration-300
      hover:bg-blue-50 hover:border-[#0b44cd] hover:text-[#0b44cd]
      active:scale-[0.98]"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
