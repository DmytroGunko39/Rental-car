// 'use client';

import { Car } from '../../types/car';
import { IoLocationOutline } from 'react-icons/io5';
import { TbCurrencyDollar } from 'react-icons/tb';
import { FaRegCheckCircle } from 'react-icons/fa';
import { BsCalendar2Week } from 'react-icons/bs';
import { FaCar } from 'react-icons/fa';
import { BsFuelPump } from 'react-icons/bs';
import { GoGear } from 'react-icons/go';

import BookingForm from '../BookingForm/BookingForm';
import { formatMileage } from '@/app/services/carService';

interface CarDetailsProps {
  car: Car;
}

export default function CarDetails({ car }: CarDetailsProps) {
  const addressParts = car.address.split(',');
  const city = addressParts[1]?.trim();
  const country = addressParts[2]?.trim();

  return (
    <div className="flex justify-center gap-[72px] mt-[84px] px-8 ">
      {/* LEFT SIDE: IMAGE + FORM */}
      <div className="flex flex-col items-center gap-10 w-[640px]">
        <img
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-auto rounded-[19px]"
        />

        <BookingForm car={car} />
      </div>

      {/* RIGHT SIDE: INFORMATION */}
      <div className="flex flex-col max-w-[500px]">
        {/* Block 1 – Main Info */}
        <div className="mb-10">
          <h2 className="font-semibold text-[24px] leading-[1.33] text-[#101828]">
            {car.brand} <span className="text-[#3470ff]">{car.model}</span>,{' '}
            <span className="text-[#8d929a] text-[16px] font-medium">
              Id: {car.id.slice(0, 4)}
            </span>
          </h2>

          <p className="flex items-center gap-4 mt-4 mb-4 font-medium text-[16px]">
            <span className="flex items-center gap-1">
              <IoLocationOutline className="text-[20px]" />
              {city} {country}
            </span>
            Mileage: {formatMileage(car.mileage)} km
          </p>

          <p className="flex items-center gap-2 text-[#3470ff] text-[24px] font-semibold mb-8">
            <TbCurrencyDollar /> {car.rentalPrice}
          </p>

          <p className="text-[16px] font-medium leading-[1.25] text-[#101828] mb-[68px]">
            {car.description}
          </p>
        </div>

        {/* Block 2 – Rental Conditions */}
        <div className="mb-10">
          <h2 className="font-semibold text-[24px] leading-[1.33] text-[#101828] mb-4">
            Rental Conditions:
          </h2>
          <ul>
            {car.rentalConditions.map((condition, i) => (
              <li
                key={i}
                className="flex items-center gap-2 mb-4 last:mb-[110px]"
              >
                <FaRegCheckCircle className="text-[#3470ff]" />
                {condition}
              </li>
            ))}
          </ul>
        </div>

        {/* Block 3 – Specifications */}
        <div className="mb-10">
          <h2 className="font-semibold text-[24px] leading-[1.33] text-[#101828] mb-4">
            Car specifications
          </h2>

          <ul>
            <li className="flex items-center gap-2 mb-4">
              <BsCalendar2Week /> Year: {car.year}
            </li>

            <li className="flex items-center gap-2 mb-4">
              <FaCar /> Type: {car.type}
            </li>

            <li className="flex items-center gap-2 mb-4">
              <BsFuelPump /> Consumption: {car.fuelConsumption}
            </li>

            <li className="flex items-center gap-2 mb-4 last:mb-[110px]">
              <GoGear /> Engine Size: {car.engineSize}
            </li>
          </ul>
        </div>

        {/* Block 4 – Accessories + Functionalities */}
        <div>
          <h2 className="font-semibold text-[24px] leading-[1.33] text-[#101828] mb-4">
            Accessories and functionalities:
          </h2>

          <ul>
            {[...car.accessories, ...car.functionalities].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-2 mb-4 last:mb-[110px]"
              >
                <FaRegCheckCircle className="text-[#3470ff]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
