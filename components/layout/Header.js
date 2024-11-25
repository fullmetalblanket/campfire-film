"use client"

import Link from 'next/link'
import { useState, useEffect, useRef, useCallback } from 'react'
import LogoFlame from '@/components/icons/LogoFlame'; // Import the LogoFlame component
import Navigation from './Navigation'; // Import the new Navigation component
import PlusIcon from '@/components/icons/PlusIcon'; // Import the PlusIcon component

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const menuRef = useRef(null)
  const menuButtonRef = useRef(null)
  const menuOpenRef = useRef(null)
  const lastScrollY = useRef(0);

  const openMenu = useCallback((event) => {
    setIsMenuOpen(true)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const toggleMenu = useCallback((event) => {
    event.stopPropagation()
    setIsMenuOpen(prevState => !prevState)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down
          setIsHeaderVisible(false);
        } else {
          // Scrolling up
          setIsHeaderVisible(true);
        }
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isButton = menuButtonRef.current.contains(event.target)
      const isClickedOutside = menuRef.current && !menuRef.current.contains(event.target)

      // Check if the click is outside the menu and it wasn't the toggle button
      if (isClickedOutside && !isButton) {
        closeMenu();
      }
    };

    document.addEventListener('mouseup', handleClickOutside);
    document.addEventListener('touchend', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, [closeMenu]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('lock-scroll');
    } else {
      document.body.classList.remove('lock-scroll');
    }

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove('lock-scroll');
    };
  }, [isMenuOpen]);

  return (
    <header className={`sticky top-0 z-50 h-18 bg-gray-800/70 bg-yellow-950/70 backdrop-blur-md shadow-md border-b border-b-slate-700 border-b-orange-700/50 transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container mx-auto px-4 pt-1 pb-2 flex items-center justify-between">
        
        {/* Mobile Menu Button */}
        <button
          className={`text-gray-300 hover:text-gray-100 mr-4 mt-1`}
          onClick={toggleMenu}
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            ref={menuButtonRef} 
            className={`h-6 w-6 `} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <Link href="/" className="text-gray-200 hover:text-gray-400 flex-grow text-center">
          <div className="flex items-center justify-center">
            <LogoFlame size={36} color="#F47521" />
          </div>
        </Link>

        {/* Plus Icon */}
        <button className="text-gray-300 hover:text-gray-100 ml-4 mt-1">
          <PlusIcon size={24} color="currentColor" />
        </button>
        
      </div>

      {/* Navigation Menu */}
      <Navigation ref={menuRef} isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
    </header>
  )
}

export default Header
