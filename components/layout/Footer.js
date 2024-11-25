"use client"
import { useEffect, useState } from 'react';
import FooterNav from '@/components/ui/FooterNav';
const appName = process.env.NEXT_PUBLIC_SITE_NAME;

export default function Footer() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      // Scrolling down
      setIsVisible(false);
    } else {
      // Scrolling up
      setIsVisible(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <footer className={`fixed bottom-0 left-0 right-0 bg-gray-700 transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="p-4 py-2 pb-6 bg-gray-800 border-t border-t-slate-700">
        {/* <FooterNav /> */}
        footer
      </div>
      {/* Uncomment to show copyright */}
      {/* <div className="flex justify-between items-center flex-col">
        <SocialMediaLinks />
        <div className="text-gray-400 cursor-default text-sm md:text-md mb-10 mt-5">
          © {appName} {new Date().getFullYear()} - All rights reserved
        </div>
      </div> */}
    </footer>
  );
}
