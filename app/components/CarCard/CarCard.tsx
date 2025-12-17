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
    <div className="max-w-[276px] h-[424px] flex flex-col justify-between relative">
      {/* Image Section */}
      <div className="relative rounded-[14px] w-[276px] h-[268px] overflow-hidden">
        <img
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-fill"
        />

        {/* Favorite button */}
        <button
          onClick={() => toggleFavorite(car.id)}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center"
        >
          <IconHeart active={isFavorite(car.id)} size={16} />
        </button>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-2">
        {/* Title and Price Row */}
        <div className="flex justify-between font-medium text-base leading-[1.25] text-[#101828]">
          <p>
            {car.brand}{' '}
            <span className="text-[#3470ff] uppercase">{car.model}</span>,{' '}
            {car.year}
          </p>
          <p>${car.rentalPrice}</p>
        </div>
        {/* Details Row 1 */}
        <div className="flex  font-normal gap-2 text-xs leading-[1.33333] text-[#8d929a]">
          <p className="pr-[8px] relative after:content-[''] after:absolute after:-right-1 after:top-0 after:w-[1px] after:bg-[#8d929a] after:h-full">
            {car.address.split(',')[1]?.trim() || 'Ukraine'}
          </p>
          <p className="px-1 relative after:content-[''] after:absolute after:-right-1 after:top-0 after:w-[1px] after:bg-[#8d929a] after:h-full">
            {car.rentalCompany}
          </p>
        </div>

        <div className="flex font-normal gap-2 text-xs leading-[1.33333] text-[#8d929a]">
          <p className="px-1 relative after:content-[''] after:absolute after:-right-1 after:top-0 after:w-[1px] after:bg-[#8d929a] after:h-full">
            {car.type}
          </p>
          <p className="pl-1">{formatMileage(car.mileage)} km</p>
        </div>
        {/* Read More Button */}
        <Link
          href={`/catalog/${car.id}`}
          className="mt-2 w-full py-3 bg-[#3470ff] text-white text-sm font-semibold rounded-xl 
                     hover:bg-[#0b44cd] transition-colors text-center"
        >
          Read more
        </Link>
      </div>
    </div>
  );
}
