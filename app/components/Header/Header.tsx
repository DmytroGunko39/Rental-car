'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../Logo/Logo';
import { navItems, isItemActive } from '@/app/helpers/nav-items';

export default function Header() {
  const path = usePathname();

  const baseLink =
    'px-3 py-2 rounded-lg transition-all duration-300 ease-out hover:scale-105 hover:bg-blue-50';
  const active = 'text-[#0b44cd] font-semibold';
  const inactive = 'text-[#101828] hover:text-[#3470ff]';

  return (
    <header className="w-full bg-gradient-to-r from-slate-50 to-gray-100 border-b border-gray-200/60 shadow-sm">
      <nav className="w-full flex items-center justify-between py-5 px-[120px] font-medium text-[16px] leading-tight text-center">
        <Link
          href="/"
          className="flex items-center transition-transform duration-300 hover:scale-105"
        >
          <Logo className="w-[102px] h-auto" />
        </Link>

        <div className="flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${baseLink} ${isItemActive(path, item) ? active : inactive}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
