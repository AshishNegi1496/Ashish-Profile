// src/app/projects/page.tsx
'use client';

import useSWR from 'swr';
import { useState } from 'react';
import ProjectCard from '@/app/components/ProjectCard';
import { fetcher } from '@/app/lib/fetcher';
import Loader from '@/app/components/Loader';
import ReusableDialog from '@/app/components/ReusableDialog';
import { Button } from '@mui/material';

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
    <section className="bg-white max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-serif mb-4 text-left text-black">Projects</h1>
        <h2 className="text-sm font-serif mb-8 text-left text-black">A selection of my recent  projects, showcasing my skills and experience in development.</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {projects?.map((p) => {
          const resolvedImage = p.imageUrl?.startsWith('/')
            ? `http://localhost:8080${p.imageUrl}`
            : p.imageUrl || '/images/fallback.jpg';

          return (
            <div key={p.id} className="flex flex-col">
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
            <div className="space-y-2">
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
