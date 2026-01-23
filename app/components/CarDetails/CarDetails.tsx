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
    <div className="flex justify-center gap-16 mt-20 px-8">
      {/* LEFT SIDE: IMAGE + FORM */}
      <div className="flex flex-col items-center gap-10 w-[640px]">
        <img
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-auto rounded-2xl shadow-lg"
        />

        <BookingForm car={car} />
      </div>

      {/* RIGHT SIDE: INFORMATION */}
      <div className="flex flex-col max-w-[488px]">
        {/* Block 1 – Main Info */}
        <div className="mb-16">
          <h2 className="font-bold text-2xl leading-tight text-gray-900 mb-3">
            {car.brand} <span className="text-[#3470ff]">{car.model}</span>,{' '}
            <span className="text-gray-400 text-base font-medium">
              Id: {car.id.slice(0, 4)}
            </span>
          </h2>

          <p className="flex items-center gap-4 mb-4 font-medium text-base text-gray-600">
            <span className="flex items-center gap-1.5">
              <IoLocationOutline className="text-xl text-gray-500" />
              {city} {country}
            </span>
            Mileage: {formatMileage(car.mileage)} km
          </p>

          <p className="flex items-center gap-2 text-[#3470ff] text-3xl font-bold mb-8">
            <TbCurrencyDollar className="text-2xl" /> {car.rentalPrice}
          </p>

          <p className="text-base font-medium leading-relaxed text-gray-700">
            {car.description}
          </p>
        </div>

        {/* Block 2 – Rental Conditions */}
        <div className="mb-20">
          <h2 className="font-bold text-xl leading-tight text-gray-900 mb-5">
            Rental Conditions:
          </h2>
          <ul className="space-y-3">
            {car.rentalConditions.map((condition, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700">
                <FaRegCheckCircle className="text-[#3470ff] text-lg flex-shrink-0" />
                {condition}
              </li>
            ))}
          </ul>
        </div>

        {/* Block 3 – Specifications */}
        <div className="mb-12">
          <h2 className="font-bold text-xl leading-tight text-gray-900 mb-5">
            Car specifications
          </h2>

          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-gray-700">
              <BsCalendar2Week className="text-gray-500 text-lg" /> Year:{' '}
              {car.year}
            </li>

            <li className="flex items-center gap-3 text-gray-700">
              <FaCar className="text-gray-500 text-lg" /> Type: {car.type}
            </li>

            <li className="flex items-center gap-3 text-gray-700">
              <BsFuelPump className="text-gray-500 text-lg" /> Consumption:{' '}
              {car.fuelConsumption}
            </li>

            <li className="flex items-center gap-3 text-gray-700">
              <GoGear className="text-gray-500 text-lg" /> Engine Size:{' '}
              {car.engineSize}
            </li>
          </ul>
        </div>

        {/* Block 4 – Accessories + Functionalities */}
        <div className="pb-20">
          <h2 className="font-bold text-xl leading-tight text-gray-900 mb-5">
            Accessories and functionalities:
          </h2>

          <ul className="space-y-3">
            {[...car.accessories, ...car.functionalities].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700">
                <FaRegCheckCircle className="text-[#3470ff] text-lg flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
