import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full h-[80vh] flex flex-col justify-end items-center pb-16">
      {/* Background image */}
      <Image
        src="/Hero image.jpg"
        alt="Car rental hero background"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-white text-center gap-5">
        <h1 className="text-6xl font-bold leading-tight tracking-tight drop-shadow-lg">
          Find your perfect rental car
        </h1>

        <p className="text-2xl font-medium leading-relaxed text-white/90 max-w-2xl">
          Reliable and budget-friendly rentals for any journey
        </p>

        <Link href="/catalog" scroll={false}>
          <button
            className="
      flex items-center justify-center
      w-[276px] h-12
      rounded-xl
      px-8 py-3
      bg-[#3470ff]
      text-white text-base font-semibold
      cursor-pointer border-none
      transition-all duration-300 ease-out
      hover:bg-[#0b44cd] hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30
      active:scale-100
    "
          >
            View Catalog
          </button>
        </Link>
      </div>
    </section>
  );
}
