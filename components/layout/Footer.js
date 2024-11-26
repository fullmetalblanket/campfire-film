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
    <footer className={`fixed z-40 bottom-0 left-0 border-t border-t-slate-700 border-t-yellow-700/70 right-0 bg-gray-700 bg-yellow-950/80 backdrop-blur-md transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="pb-2">
        <FooterNav />
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
