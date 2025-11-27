import type { Metadata } from 'next';
import './globals.css';
import Header from './components/Header/Header';

export const metadata: Metadata = {
  title: {
    default: 'RentalCar - Premium Car Rental Service',
    template: '%s | RentalCar',
  },
  description:
    'Rent your perfect car today. Wide selection of vehicles at competitive prices.',
  keywords: [
    'car rental',
    'rent a car',
    'vehicle rental',
    'car hire',
    'auto rental',
  ],
  authors: [{ name: 'Your Name' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'RentalCar - Premium Car Rental Service',
    description:
      'Rent your perfect car today. Wide selection of vehicles at competitive prices.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
