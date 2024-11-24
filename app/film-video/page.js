import React from 'react';
import Project from '@/components/Project';
import projects from '@/lib/projects.json';

export default function FilmVideo() {
  const { short_film } = projects;

  return (
    <div className="container mx-auto px-4 py-8 pb-0 md:pt-20">

      <div className="hidden md:block w-full bg-neutral-900/50 backdrop-blur-md shadow-md md:fixed z-10 top-[66px] left-0 border-b border-b-slate-700">
        <ul className="container m-auto flex gap-10 py-3 px-4 text-lg text-gray-400">
          <li><a href="#directing_anchor" className="hover:text-gray-200">Directing</a></li>
          <li><a href="#acting_anchor" className="hover:text-gray-200">Acting</a></li>
          <li><a href="#crew_anchor" className="hover:text-gray-200">Crew</a></li>
        </ul>
      </div>

      <h1 className="text-3xl text-gray-200 font-bold mb-6">Film / Video</h1>

      <section className="mb-12">
        <span id="directing_anchor" className="absolute block -mt-[150px]"></span>
        <h2 className="text-2xl font-semibold mb-4 text-gray-400">Directing</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {short_film.directing.filter(project => !project.hide).map((project, index) => (
            <Project key={index} project={project} index={index} />
          ))}
        </ul>
      </section>

      <section className="mb-12 relative">
        <span id="acting_anchor" className="absolute block -mt-[150px]"></span>
        <h2 className="text-2xl font-semibold mb-4 text-gray-400">Acting</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {short_film.acting.filter(project => !project.hide).map((project, index) => (
            <Project key={index} project={project} index={index} />
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <span id="crew_anchor" className="absolute block -mt-[150px]"></span>
        <h2 className="text-2xl font-semibold mb-4 text-gray-400">Crew</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {short_film.crew.filter(project => !project.hide).map((project, index) => (
            <Project key={index} project={project} index={index} />
          ))}
        </ul>
      </section>
    </div>
  );
}
