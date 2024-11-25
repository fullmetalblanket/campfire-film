"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import navigation from '@/lib/navigation.json';
import { forwardRef } from 'react';

const Navigation = forwardRef(({ isMenuOpen, closeMenu }, ref) => {
  const pathname = usePathname();

  return (
    <nav 
      ref={ref}
      className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-full left-0 w-full md:w-auto bg-gray-800 md:bg-transparent shadow-lg md:shadow-none`}
    >
      <ul className="flex flex-col md:flex-row md:space-x-4 py-1 divide-y divide-slate-600 md:divide-none">
        {navigation.main.map(item => {
          const isActive = item.url === pathname; // Determine if the item is active
          const colorClass = isActive ? 'text-white' : 'text-gray-300';
          return (
            <li key={item.url} className="relative">
              <Link href={item.url} className={`block md:inline-block ${colorClass} hover:text-gray-100 px-4 py-5 md:py-2 rounded-md text-base text-xl md:text-sm`}>
                {item.text}
              </Link>
              {isActive && (
                <div className="hidden md:block absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-white text-xs opacity-50">
                  &#9660; {/* Triangle indicator */}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
});

export default Navigation; 