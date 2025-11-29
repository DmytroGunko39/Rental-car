'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCarById } from '../../services/carService';
import CarDetails from '../../components/CarDetails/CarDetails';

import Loader from '../../components/UI/Loader';
import { Car } from '../../types/car';

export default function CarDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    if (!id) return;
    getCarById(id).then((data) => setCar(data));
  }, [id]);

  if (!car) return <Loader />;

  return (
    <main className="w-full mx-auto px-6 py-10">
      <CarDetails car={car} />
    </main>
  );
}
