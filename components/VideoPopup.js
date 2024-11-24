import React from 'react';

const VideoPopup = ({ project, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      onClick={handleBackgroundClick}
    >
      <div className="w-full h-full md:w-4/5 md:h-4/5 lg:w-3/4 lg:h-3/4 bg-gray-800 rounded-lg overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute top-0 right-0 p-1 text-gray-300 hover:text-gray-100 z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="w-full h-full p-8 px-0 md:p-8">
          <iframe
            src={`https://www.youtube.com/embed/${project.id}?autoplay=1`}
            title={project.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoPopup;
