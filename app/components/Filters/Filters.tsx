'use client';

import { useCarStore } from '../../store/useCarStore';
import { customStyles } from '../../helpers/customStylesSelect';
import { carPriceOptions } from '../../helpers/selectorOptions';
import dynamic from 'next/dynamic';
import type { Props as SelectProps, SingleValue } from 'react-select';
import { BrandOption, PriceOption } from '../../helpers/selectorOptions';

const Select = dynamic(() => import('react-select'), {
  ssr: false,
});
export default function Filters() {
  const { filters, availableBrands, setFilters, resetFilters } = useCarStore();

  return (
    <div className="flex justify-center items-end gap-4 mt-[84px]">
      {/* BRAND */}
      <div className="flex flex-col">
        <label className="text-[12px] text-[#8d929a] mb-2">Car brand</label>

        <Select
          styles={customStyles}
          placeholder="Choose a brand"
          value={
            filters.brand
              ? { label: filters.brand, value: filters.brand }
              : null
          }
          onChange={(newValue) => {
            const option = newValue as BrandOption | null;
            setFilters({ brand: option?.value });
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
        <label className="text-[12px] text-[#8d929a] mb-2">
          Price / 1 hour
        </label>

        <Select
          styles={customStyles}
          placeholder="Choose a price"
          options={carPriceOptions}
          value={
            filters.rentalPrice
              ? carPriceOptions.find(
                  (option) => option.value === Number(filters.rentalPrice),
                )
              : null
          }
          onChange={(newValue) => {
            const option = newValue as PriceOption | null;
            setFilters({ rentalPrice: option?.value ?? undefined });
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
        <label className="text-[12px] text-[#8d929a] mb-2">
          Car mileage / km
        </label>

        <div className="flex">
          {/* FROM */}
          <input
            placeholder="From"
            className="
              bg-[#f7f7f7] h-[44px] w-[100px]
              rounded-l-[12px] border-none outline-none
              pl-3 text-[14px]
            "
            value={filters.minMileage || ''}
            onChange={(e) =>
              setFilters({
                minMileage: e.target.value ? Number(e.target.value) : undefined,
              })
            }
          />

          {/* TO */}
          <input
            placeholder="To"
            className="
              bg-[#f7f7f7] h-[44px] w-[100px]
              rounded-r-[12px] border-none outline-none
              pl-3 text-[14px]
              border-l border-[#dadde1]
            "
            value={filters.maxMileage || ''}
            onChange={(e) =>
              setFilters({
                maxMileage: e.target.value ? Number(e.target.value) : undefined,
              })
            }
          />
        </div>
      </div>

      {/* SEARCH BUTTON */}
      <button
        onClick={resetFilters}
        className="
          flex justify-center items-center
          w-[156px] h-[44px]
          bg-[#3470ff]
          text-white text-[16px] leading-[1.25] font-semibold
          rounded-[12px]
          transition-all hover:bg-[#0b44cd]
        "
      >
        Search
      </button>
    </div>
  );
}
