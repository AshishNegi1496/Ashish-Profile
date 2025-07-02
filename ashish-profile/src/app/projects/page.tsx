// src/app/projects/page.tsx
'use client';

import useSWR from 'swr';
import { useState } from 'react';
import ProjectCard from '@/app/components/ProjectCard';
import { fetcher } from '@/app/lib/fetcher';
import Loader from '@/app/components/Loader';
import ReusableDialog from '@/app/components/ReusableDialog';

type Project = {
  id: number;
  title: string;
  description: string;
  keySkills: string;
  startDate: string;
  endDate: string;
  highlights: string;
  imageUrl?: string;
};

export default function ProjectsPage() {
  const { data: projects, error, isLoading } = useSWR<Project[]>('/api/projects', fetcher);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (isLoading) return <Loader />;
  if (error) return <p className="text-center text-red-500">Failed to load projects.</p>;

return (
    <section className="bg-white min-h-screen max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-2 sm:mb-4 text-left text-black">
        Projects
      </h1>
      <h2 className="text-xs sm:text-sm md:text-base font-serif mb-6 sm:mb-8 text-left text-black">
        A selection of my recent projects, showcasing my skills and experience in development.
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {projects?.map((p) => {
          const resolvedImage = p.imageUrl?.startsWith('/')
            ? `http://localhost:8080${p.imageUrl}`
            : p.imageUrl || '/images/fallback.jpg';

          return (
            <div key={p.id} className="flex flex-col h-full">
              <ProjectCard
                title={p.title}
                image={resolvedImage}
                description={p.description}
                showKnowMore={true}
                onKnowMoreClick={() => setSelectedProject(p)}
              />
            </div>
          );
        })}
      </div>

      {selectedProject && (
        <ReusableDialog
          open={true}
          title={selectedProject.title}
          onClose={() => setSelectedProject(null)}
          content={
            <div className="space-y-2 text-xs sm:text-sm md:text-base">
              <p><strong>Description:</strong> {selectedProject.description}</p>
              <p><strong>Key Skills:</strong> {selectedProject.keySkills}</p>
              <p><strong>Highlights:</strong> {selectedProject.highlights}</p>
              <p><strong>Duration:</strong> {selectedProject.startDate} — {selectedProject.endDate}</p>
            </div>
          }
        />
      )}
    </section>
  );
}
