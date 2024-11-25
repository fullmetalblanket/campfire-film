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
      className={`absolute top-full left-0 w-full bg-gray-800 shadow-lg ${isMenuOpen ? 'block' : 'hidden'}`}
    >
      <ul className="flex flex-col space-y-2 py-1 divide-y divide-slate-600">
        {navigation.main.map(item => {
          const isActive = item.url === pathname; // Determine if the item is active
          const colorClass = isActive ? 'text-white' : 'text-gray-300';
          return (
            <li key={item.url} className="relative">
              <Link href={item.url} className={`block ${colorClass} hover:text-gray-100 px-4 py-5 rounded-md text-base text-xl`}>
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