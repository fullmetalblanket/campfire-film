'use client';

import { GlobalStateProvider } from '@/components/store/GlobalStateContext';

export default function ClientWrapper({ children }) {
  return <GlobalStateProvider>{children}</GlobalStateProvider>;
}