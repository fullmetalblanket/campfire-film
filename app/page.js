"use client"

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import HomePage from '@/components/content/HomePage';
import MainFeed from '@/components/content/MainFeed';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import { useGlobalState } from '@/components/store/GlobalStateContext';

export default function Home() {
  const { data: session } = useSession();
  const { state } = useGlobalState();
  const [isReady, setIsReady] = useState(false);
  const { initialized } = state;

  useEffect(() => {
    console.log('initialized',initialized)
    if (initialized) {
      setIsReady(true);
    }
  }, [initialized, session])

  if (!isReady) {
    return <LoadingOverlay text="loading campfire..." />;
  }

  return (
    <div className="container mx-auto px-5 py-8 pb-0 max-w-5xl">

      {session ? (
        <MainFeed />
      ) : ( 
        <HomePage />
      )}

    </div>
  );
}
