'use client';
import Link from 'next/link';
import { Car } from '../../types/car';
import { useCarStore } from '@/app/store/useCarStore';
import IconHeart from '../UI/IconHeart';
import { formatMileage } from '@/app/services/carService';

interface CarDetailsProps {
  car: Car;
}

export default function CarCard({ car }: CarDetailsProps) {
  const { toggleFavorite, isFavorite } = useCarStore();

  return (
    <div className="max-w-[276px] h-[424px] flex flex-col justify-between relative group">
      {/* Image Section */}
      <div className="relative rounded-2xl w-[276px] h-[268px] overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
        <img
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Favorite button */}
        <button
          onClick={() => toggleFavorite(car.id)}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:scale-110 transition-all duration-200"
        >
          <IconHeart active={isFavorite(car.id)} size={16} />
        </button>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-2 pt-1">
        {/* Title and Price Row */}
        <div className="flex justify-between font-semibold text-base leading-snug text-[#101828]">
          <p>
            {car.brand}{' '}
            <span className="text-[#3470ff] uppercase">{car.model}</span>,{' '}
            {car.year}
          </p>
          <p className="text-[#101828]">${car.rentalPrice}</p>
        </div>
        {/* Details Row 1 */}
        <div className="flex font-normal gap-2 text-xs leading-relaxed text-gray-500">
          <p className="pr-2 relative after:content-[''] after:absolute after:-right-1 after:top-0 after:w-px after:bg-gray-300 after:h-full">
            {car.address.split(',')[1]?.trim() || 'Ukraine'}
          </p>
          <p className="px-1 relative after:content-[''] after:absolute after:-right-1 after:top-0 after:w-px after:bg-gray-300 after:h-full">
            {car.rentalCompany}
          </p>
        </div>

        <div className="flex font-normal gap-2 text-xs leading-relaxed text-gray-500">
          <p className="px-1 relative after:content-[''] after:absolute after:-right-1 after:top-0 after:w-px after:bg-gray-300 after:h-full">
            {car.type}
          </p>
          <p className="pl-1">{formatMileage(car.mileage)} km</p>
        </div>
        {/* Read More Button */}
        <Link
          href={`/catalog/${car.id}`}
          className="mt-5 w-full py-3 bg-[#3470ff] text-white text-sm font-semibold rounded-xl 
                     hover:bg-[#0b44cd] hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-center"
        >
          Read more
        </Link>
      </div>
    </div>
  );
}
