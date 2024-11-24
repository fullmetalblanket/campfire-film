import React from 'react';

export default function HeroSection() {
  return (
    <div className="relative h-96">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md"
        style={{ backgroundImage: "url('/images/hero-image.png')" }} // Replace with your image path
      ></div>

      {/* Optional overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
        <div>
          <h1 className="text-4xl font-bold mb-4">Your Hero Title</h1>
          <p className="text-lg mb-6">Your call to action text goes here.</p>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg">
            Click Here
          </button>
        </div>
      </div>
    </div>
  );
}
