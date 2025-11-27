'use client';

import { useState } from 'react';
import { Car } from '../../types/car';

interface CarDetailsProps {
  car: Car;
}

export default function BookingForm({ car }: CarDetailsProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!name || !phone || !date) {
      alert('Please fill all fields');
      return;
    }

    alert(`You have successfully booked the ${car.brand} ${car.model}!`);
    setName('');
    setPhone('');
    setDate('');
  };

  return (
    <div className="bg-gray-100 shadow p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Book this car</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Your name</label>
          <input
            className="w-full p-2 border rounded mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            className="w-full p-2 border rounded mt-1"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+380..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Rental date</label>
          <input
            type="date"
            className="w-full p-2 border rounded mt-1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          type="submit"
        >
          Book now
        </button>
      </form>
    </div>
  );
}
