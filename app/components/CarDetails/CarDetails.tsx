import { Car } from '../../types/car';

interface CarDetailsProps {
  car: Car;
}

export default function CarDetails({ car }: CarDetailsProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-10">
      <img
        src={car.img}
        className="w-full h-80 object-cover rounded-lg mb-6"
        alt={`${car.brand} ${car.model}`}
      />

      <h1 className="text-3xl font-bold mb-2">
        {car.brand} {car.model}
      </h1>

      <p className="text-gray-600 mb-4">{car.description}</p>

      <div className="grid grid-cols-2 gap-6 mt-4">
        <div>
          <p>
            <strong>Brand:</strong> {car.brand}
          </p>
          <p>
            <strong>Year:</strong> {car.year}
          </p>
          <p>
            <strong>Type:</strong> {car.type}
          </p>
          <p>
            <strong>Engine:</strong> {car.engineSize}
          </p>
        </div>

        <div>
          <p>
            <strong>Mileage:</strong> {car.mileage.toLocaleString()} km
          </p>
          <p>
            <strong>Price:</strong> ${car.rentalPrice}/day
          </p>
          <p>
            <strong>Company:</strong> {car.rentalCompany}
          </p>
          <p>
            <strong>Location:</strong> {car.address}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">Accessories</h2>
      <ul className="list-disc ml-5">
        {car.accessories.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Functionalities</h2>
      <ul className="list-disc ml-5">
        {car.functionalities.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Rental Conditions</h2>
      <ul className="list-disc ml-5">
        {car.rentalConditions.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
