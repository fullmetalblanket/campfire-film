"use client"

import React, { useState, useEffect } from 'react';
import VideoThumbnail from './VideoThumbnail';
import VideoPopup from './VideoPopup';
import Mention from './Mention'

const Project = ({ project, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    if (project.id) {
      window.history.pushState(null, '', `?video=${project.id}`);
      setIsOpen(true);
    }
  };
  const closePopup = () => {
    window.history.pushState(null, '', window.location.pathname);
    setIsOpen(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('video');
    if (videoId === project.id) {
      setIsOpen(true);
    }
  }, [project.id]);

  const curserStyle = project.id ? 'cursor-pointer hover:underline' : 'cursor-default';
  const exists = project.id
  const existsClass = exists ? '' : 'opacity-[.65]';

  return (
    <li 
      key={index} 
      className={`bg-gray-800/70 border border-slate-700 rounded-lg p-3 shadow-md ${existsClass}`}
    >
      <VideoThumbnail
        project={project} 
        thumbNailClassName="mb-3"
        onClick={openPopup}
      />
      <div className="px-[2px]">
        <h3 className={`${curserStyle} mb-1 text-2xl font-medium text-gray-200`} onClick={openPopup}>{project.name}</h3>
        <div>
          {project.year && <p className="inline-block text-lg text-gray-200/70">{project.year}&nbsp;</p>}
          {project.genre && <p className="inline-block text-md text-gray-200/70">{project.genre}</p>}
        </div>
        <p className="text-sm text-gray-200/50">{project.role?.join(', ')}</p>
        {project.byline && <p className="mt-2 inline-block text-sm text-gray-200/70">{project.byline}&nbsp;</p>}
        <Mention project={project} />
      </div>
      <VideoPopup project={project} isOpen={isOpen} onClose={closePopup} />
    </li>
  );
};

export default Project;
