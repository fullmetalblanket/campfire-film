'use client';

import { useState, useEffect } from 'react';

export default function Accordion({ children, title, content, defaultOpen = false, className }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={className}>
      <button 
        className="w-full text-left flex justify-between items-center mt-4 mb-4 text-lg font-semibold focus:outline-none"
        onClick={toggleAccordion}
      >
        <span>{title}</span>
        <span>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-700">
          <div>{children || content}</div>
        </div>
      )}
    </div>
  );
}
