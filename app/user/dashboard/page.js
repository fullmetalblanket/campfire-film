'use client'

import { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import PageContainer from '@/components/layout/PageContainer';
import Container from '@/components/layout/Container';
// import UserItineraries from '@/components/UserItineraries';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import { useGlobalState } from '@/components/store/GlobalStateContext';
// import handleTempItinerary from '@/lib/handleTempItinerary';
// import localStorageHelper from '@/lib/localStorageHelper';

export default function Dashboard() {
  const { data: session } = useSession();
  const { state, dispatch } = useGlobalState();
  const [isReady, setIsReady] = useState(false);
  // const tempItineraryInitialized = useRef(false);

  const { initialized } = state;

  useEffect(() => {
    // console.log('\ninitialized',initialized);
    // console.log('session',session);
    if (initialized && session) {
      // if (!tempItineraryInitialized.current) {
      //   tempItineraryInitialized.current = true;
      //   checkTempItinerary();
      // }
      setIsReady(true);
    } else if (initialized) {
      setIsReady(true);
    }
  }, [initialized, session, dispatch]);

  // const checkTempItinerary = async () => {
  //   const response = await handleTempItinerary();
  //   const payload = response?.payload;
  //   if (payload) {
  //     dispatch({ type: 'ADD_ITINERARY', payload });
  //   }
  // };

  if (!isReady) {
    return <PageContainer><LoadingOverlay text="loading dashboard..." /></PageContainer>;
  }

  if (!session && isReady) {
    return (
      <PageContainer>
        <h1 className="text-3xl font-bold mb-7">Dashboard</h1>
        <Container>
          <p>Please log in to view your profile.</p>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="md:pl-6">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-lg mb-6">Welcome {session.user.name || session.user.email}!</p>
      </div>
      <Container className="bg-white/70">
        {/* <UserItineraries itineraries={itineraries} /> */}
      </Container>
    </PageContainer>
  );
}