"use client"

import Link from 'next/link'
import { useState, useEffect, useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation' // Import usePathname
import navigation from '@/lib/navigation.json' // Import the navigation JSON
import Image from 'next/image'; // Import Image component

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const pathname = usePathname(); // Use usePathname to get the current pathname

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const toggleMenu = useCallback((event) => {
    event.stopPropagation()
    setIsMenuOpen(prevState => !prevState)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('button')) {
        closeMenu()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeMenu])

  return (
    <header className="sticky top-0 z-50 h-18 bg-gray-800/70 backdrop-blur-md shadow-md border-b border-b-slate-700">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Site Title */}
        <Link href="/" className="text-gray-200 hover:text-gray-400">
          <div className="flex items-center">
            {/* Outer div for cropping */}
            <div className="rounded-full overflow-hidden w-10 h-10 mr-4 relative">
              {/* Inner div to position the image */}
              <div className="absolute top-[-54%] left-[-18%] w-[136%] h-[136%]">
                <Image
                  src="/images/tyson-ely.jpg" // Path to the thumbnail image
                  alt="Tyson Ely"
                  width="96"
                  height="147"
                />
              </div>
            </div>
            <div className="text-xl font-bold">
                Tyson Ely
            </div>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-gray-100"
          onClick={toggleMenu}
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Navigation Menu */}
        <nav 
          ref={menuRef} 
          id="mobile-menu"
          className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-full left-0 w-full md:w-auto bg-gray-800 md:bg-transparent shadow-lg md:shadow-none`}
        >
          {/* Navigation Items */}
          <ul className="flex flex-col md:flex-row md:space-x-4 py-1 divide-y divide-slate-600 md:divide-none">
            {navigation.main.map(item => {
              const isActive = item.url === pathname; // Determine if the item is active
              const colorClass = isActive ? 'text-white' : 'text-gray-300';
              return (
                <li key={item.url} className="relative">
                  <Link href={item.url} className={`block md:inline-block ${colorClass} hover:text-gray-100 px-4 py-5 md:py-2 rounded-md text-base text-xl md:text-sm`}>
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
      </div>
    </header>
  )
}

export default Header
