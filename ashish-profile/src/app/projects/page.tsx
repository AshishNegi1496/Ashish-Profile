'use client';

import useSWR from 'swr';
import { useState } from 'react';
import ProjectCard from '@/app/components/ProjectCard';
import { fetcher } from '@/app/lib/fetcher';
import Loader from '@/app/components/Loader';
import ReusableDialog from '@/app/components/ReusableDialog';
import ProjectForm from '../components/ProjectForm';
import { useAuthStore } from "@/app/store/useAuthStore";
type Project = {
  id: number;
  title: string;
  description: string;
  skills: string;
  startDate: string;
  endDate: string;
  highlights: string;
  imageUrl?: string;
};

export default function ProjectsPage() {
  // const { data: projects, error, isLoading } = useSWR<Project[]>('/api/projects', fetcher);
  const { data: projects, error, isLoading } = useSWR<Project[]>(
  '/api/projects',
  fetcher,
  {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
    shouldRetryOnError: false,
  }
);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const { token } = useAuthStore();

  // const router = useRouter();



  if (isLoading) return <Loader />;
  if (error) return <p className="text-center text-red-500">Failed to load projects.</p>;

return (
 
    <section className="bg-white min-h-screen max-w-full mx-auto px-2 sm:px-4 md:px-8 py-8 sm:py-12">
  
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-2 sm:mb-4 text-left text-black">
        Projects
      </h1>
      <h2 className="text-xs sm:text-sm md:text-base font-serif mb-6 sm:mb-8 text-left text-black">
      A curated selection of my latest development projects.
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {projects?.map((p) => {
          const resolvedImage = p.imageUrl?.startsWith('/')
            ? `http://10.208.10.157:8081${p.imageUrl}`
            : p.imageUrl || '/images/fallback.webp';

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
            <div className="space-y-2 text-xs sm:text-sm md:text-base text-black">
              <p><strong>Description:</strong> {selectedProject.description}</p>
              <p><strong>Key Skills:</strong> {selectedProject.skills}</p>
              <p><strong>Highlights:</strong> {selectedProject.highlights}</p>
              <p><strong>Duration:</strong> {selectedProject.startDate} — {selectedProject.endDate}</p>
            </div>
          }
        />
      )}
      
 

     {token && (
      <div className="max-w-2xl mx-auto my-8">
        <ProjectForm />
      </div>
    )}
      </section>
  );
}
