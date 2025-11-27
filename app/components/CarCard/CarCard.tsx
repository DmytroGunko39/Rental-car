'use client';

import Link from 'next/link';
import { Car } from '../../types/car';
import { useCarStore } from '@/app/store/useCarStore';
import IconHeart from '../UI/IconHeart';

interface CarDetailsProps {
  car: Car;
}

export default function CarCard({ car }: CarDetailsProps) {
  const { toggleFavorite, isFavorite } = useCarStore();
  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <div className="relative">
        <img
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-48 object-cover"
        />

        {/* Favorite button */}
        <button
          onClick={() => toggleFavorite(car.id)}
          className="absolute top-3 right-3 w-9 h-9 bg-white/20 backdrop-blur-md 
                     rounded-full flex items-center justify-center"
        >
          <IconHeart active={isFavorite(car.id)} size={16} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg">
          {car.brand} {car.model}
        </h3>
        <p className="text-sm text-gray-500">{car.year}</p>

        <p className="mt-2 font-semibold">${car.rentalPrice}/day</p>

        <Link
          href={`/catalog/${car.id}`}
          className="block mt-4 text-blue-600 hover:underline"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
}
