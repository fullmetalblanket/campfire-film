  'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

// Define a mapping of route patterns to their display names
const routePatterns = [
  { 
    pattern: /^\/$/,                       
    name: 'home' 
  },
  { 
    pattern: /^\/user\/results$/,          
    name: 'results' 
  },
  { 
    pattern: /^\/user\/reports$/,          
    name: 'reports' 
  },
  { 
    pattern: /^\/checkout\/.+$/,           
    name: 'checkout' 
  },
  { 
    pattern: /^\/itinerary\/create$/, 
    name: 'create new itinerary' 
  },
  { 
    pattern: /^\/itinerary(\/.*)?$/, 
    name: 'itinerary' 
  },
];

export default function Breadcrumbs({ backText = "back", backButtonPathname }) {
  const router = useRouter();
  const pathname = usePathname();
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  useEffect(() => {
    const checkNavigation = () => {
      // const navigation = performance.getEntriesByType('navigation')[0];
      // console.log('Navigation type:', navigation.type);
      // setHasPreviousPage(navigation.type !== 'navigate');
      setHasPreviousPage(document.referrer);
    };

    // Check immediately
    checkNavigation();
  }, [pathname]); // Re-run effect when pathname changes

  // Get the current page name
  const currentPageName = routePatterns.find(route => route.pattern.test(pathname))?.name 
    || pathname.split('/').pop() 
    || 'Home';

  const handleBack = () => {
    if (backButtonPathname) {
      router.push(backButtonPathname);
    } else {
      router.back();
    }
  };

  if (!hasPreviousPage) {
    console.log("BREADCRUMBS: No previous page detected");
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 mb-4">
      <button
        onClick={handleBack}
        className="text-blue-600 hover:text-blue-800 flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        {backText}
      </button>
      <span className="text-gray-500 cursor-default">/</span>
      <span className="text-slate-500 cursor-default">
        {currentPageName}
      </span>
    </nav>
  );
}
