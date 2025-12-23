'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../Logo/Logo';
import { navItems, isItemActive } from '@/app/helpers/nav-items';

export default function Header() {
  const path = usePathname();

  const baseLink =
    'px-2.5 py-2 transition-all duration-200 ease-linear hover:scale-110';
  const active = 'text-[#0b44cd] hover:text-[#5377ce]';
  const inactive = 'text-[#101828] hover:text-[#26282c]';

  return (
    <header className="w-full bg-[#f2f4f7] border-b border-[#f2f4f7]">
      <nav className="w-full flex items-center justify-between py-4 px-[120px] font-medium text-[16px] leading-tight text-center">
        <Link href="/" className="flex items-center">
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
