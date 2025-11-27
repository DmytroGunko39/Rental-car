'use client';

import { useCarStore } from '../../store/useCarStore';
import { customStyles } from '../../helpers/customStylesSelect';
import { carPriceOptions } from '../../helpers/selectorOptions';
import dynamic from 'next/dynamic';
import { Option } from '../../helpers/selectorOptions';

// export default function Filters() {
//   const { filters, availableBrands, setFilters, resetFilters } = useCarStore();

//   return (
//     <div className="flex justify-center items-center gap-4 mt-[84px]">
//       {/* Brand */}
//       <div className="flex flex-col">
//         <label className="font-normal text-[12px] leading-[1.333] text-[#8d929a] mb-2">
//           Car brand
//         </label>

//         <select
//           className="
//             w-[224px] h-[44px]
//             bg-[#f7f7f7]
//             rounded-[12px]
//             pl-3 pr-2
//             border-none outline-none
//           "
//           value={filters.brand || ''}
//           onChange={(e) => setFilters({ brand: e.target.value || undefined })}
//         >
//           <option value="">Choose a brand</option>
//           {availableBrands.map((brand) => (
//             <option key={brand} value={brand}>
//               {brand}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Price */}
//       <div className="flex flex-col">
//         <label className="font-normal text-[12px] leading-[1.333] text-[#8d929a] mb-2">
//           Price/ 1 hour
//         </label>

//         <select
//           className="
//             w-[224px] h-[44px]
//             bg-[#f7f7f7]
//             rounded-[12px]
//             pl-3 pr-2
//             border-none outline-none
//           "
//           value={filters.rentalPrice || ''}
//           onChange={(e) =>
//             setFilters({ rentalPrice: e.target.value || undefined })
//           }
//         >
//           <option value="">Choose a price</option>
//           <option value="30">To $30</option>
//           <option value="40">To $40</option>
//           <option value="50">To $50</option>
//           <option value="60">To $60</option>
//         </select>
//       </div>

//       {/* Mileage container */}
//       <div className="flex flex-col">
//         <label className="font-normal text-[12px] leading-[1.333] text-[#8d929a] mb-2">
//           Car mileage / km
//         </label>

//         <div className="flex">
//           {/* Min mileage */}
//           <input
//             placeholder="From"
//             className="
//               pl-3 bg-[#f7f7f7]
//               h-[44px] max-w-[160px]
//               border-none outline-none
//               first:rounded-l-[12px]
//               first:border-r first:border-[#dadde1]
//             "
//             value={filters.minMileage || ''}
//             onChange={(e) =>
//               setFilters({
//                 minMileage: e.target.value ? Number(e.target.value) : undefined,
//               })
//             }
//           />

//           {/* Max mileage */}
//           <input
//             placeholder="To"
//             className="
//               pl-3 bg-[#f7f7f7]
//               h-[44px] max-w-[160px]
//               border-none outline-none
//               last:rounded-r-[12px]
//             "
//             value={filters.maxMileage || ''}
//             onChange={(e) =>
//               setFilters({
//                 maxMileage: e.target.value ? Number(e.target.value) : undefined,
//               })
//             }
//           />
//         </div>
//       </div>

//       {/* Search Button */}
//       <button
//         onClick={resetFilters}
//         className="
//     flex justify-center items-center
//     w-[156px] h-[44px]
//     px-[51px] py-[12px]
//     bg-[#3470ff]
//     text-white text-[16px] leading-[1.25]
//     rounded-[12px]
//     border-none cursor-pointer
//     self-end
//     transition-all duration-200
//     hover:bg-[#0b44cd]
//   "
//       >
//         Search
//       </button>
//     </div>
//   );
// }
const Select = dynamic(() => import('react-select'), { ssr: false });
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
            const option = newValue as { label: string; value: string } | null;
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
            const option = newValue as Option | null;
            setFilters({ rentalPrice: option?.value });
          }}
          isClearable
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
            type="number"
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
            type="number"
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
