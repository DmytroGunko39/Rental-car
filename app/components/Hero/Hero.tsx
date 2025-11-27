import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full h-[80vh] flex flex-col justify-end items-center pb-[60px]">
      {/* Background image */}
      <Image
        src="/Hero image.jpg"
        alt="Car rental hero background"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-white text-center gap-4">
        <h1 className="text-[60px] font-bold leading-[1.2]">
          Find your perfect rental car
        </h1>

        <p className="text-[24px] font-semibold leading-[1.33]">
          Reliable and budget-friendly rentals for any journey
        </p>

        <Link href="/catalog" scroll={false}>
          <button
            className="
      flex items-center justify-center
      w-[276px] h-[44px]
      rounded-[12px]
      px-[88px] py-[12px]
      bg-[#3470ff]
      text-white text-[16px] leading-[1.25]
      cursor-pointer border-none
      transition-all duration-200
      hover:bg-[#0b44cd]
    "
          >
            View Catalog
          </button>
        </Link>
      </div>
    </section>
  );
}
