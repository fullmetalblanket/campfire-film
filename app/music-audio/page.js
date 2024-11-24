import React from 'react';
import projects from '@/lib/projects.json';
import Project from '@/components/Project';

export default function MusicAudio() {
  const { music_video } = projects;

  return (
    <div className="container mx-auto px-4 py-8 pb-0">
      <h1 className="text-3xl text-gray-200 font-bold mb-2">Music / Audio</h1>
      <p className="mb-4 text-gray-400">
        Hear more of my music on <a href="https://www.soundcloud.com/tysonely" target="_blank" className="underline hover:text-gray-200">Soundcloud</a>
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-400">Music Videos</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {music_video.filter(project => project.id).map((project, index) => (
            <Project key={index} project={project} index={index} />
          ))}
        </ul>
      </section>
    </div>
  );
}
