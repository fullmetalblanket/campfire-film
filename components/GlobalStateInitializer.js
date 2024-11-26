// components/GlobalStateInitializer.js

'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useGlobalState } from '@/components/store/GlobalStateContext';
import getInitialData from '@/lib/getInitialData';

export default function GlobalStateInitializer() {
  const { status } = useSession();

  const { dispatch } = useGlobalState();

  useEffect(() => {
    async function initializeGlobalState() {
      if (status === 'authenticated') {
        try {
          const {
            // user,
            itineraries,
            // reportPurchases,
            // canAnalyze,
          } = await getInitialData();

          console.log('GlobalStateInitializer itineraries', itineraries);

          // dispatch({ type: 'SET_USER', payload: user });
          dispatch({ type: 'SET_ITINERARIES', payload: itineraries });
          dispatch({ type: 'SET_INITIALIZED', payload: true });
        } catch (error) {
          console.error('Error initializing global state:', error);
          dispatch({ type: 'SET_ERROR', payload: error.message });
        }
      }
    }

    initializeGlobalState();
  }, [status, dispatch]);

  return null; // This component doesn't render anything
}