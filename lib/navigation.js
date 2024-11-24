"use client"

import { usePathname } from 'next/navigation';

export const useIsActive = (url) => {
  const pathname = usePathname();
  console.log('url',url);
  console.log('pathname',pathname);
  return pathname === url;
};