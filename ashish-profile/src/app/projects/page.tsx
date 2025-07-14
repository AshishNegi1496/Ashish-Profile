
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
  skills: string[];
  startDate: string;
  endDate: string;
  highlights: string;
  imageUrl?: string;
};

export default function ProjectsPage() {
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

  if (isLoading) return <Loader />;
  if (error) return <p className="text-center text-red-500">Failed to load projects.</p>;

  return (
 <div className="bg-background text-foreground min-h-screen font-[Poppins,sans-serif]">
      <main className="container mx-auto px-6 py-16 md:py-24">
        <section className="mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-2 sm:mb-4 text-foreground">
            Projects
          </h1>
          <h2 className="text-xs sm:text-sm md:text-base font-serif mb-6 sm:mb-8 text-muted-foreground">
            A curated selection of my latest development projects.
          </h2>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
          {projects?.map((p, idx) => {
            const resolvedImage = p.imageUrl?.startsWith('/')
              ? `http://10.208.10.157:8081${p.imageUrl}`
              : p.imageUrl || '/images/fallback.webp';

            return (
              <div
                key={p.id}
                className="bg-secondary p-6 rounded-2xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-2 card-enter"
                style={{ transitionDelay: `${100 * (idx + 1)}ms` }}
              >
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
        </section>

        {selectedProject && (
          <ReusableDialog
            open={true}
            title={selectedProject.title}
            onClose={() => setSelectedProject(null)}
            content={
              <>
                <div className="space-y-2 text-xs sm:text-sm md:text-base text-white">
                  <p><strong>Description:</strong> {selectedProject.description}</p>
                  <p><strong>Key Skills:</strong> {selectedProject.skills}</p>
                  <p><strong>Highlights:</strong> {selectedProject.highlights}</p>
                  <p><strong>Duration:</strong> {selectedProject.startDate} — {selectedProject.endDate}</p>
                </div>
              </>
            }
          />
        )}

        {token && (
          <div className="max-w-2xl mx-auto my-8">
            <ProjectForm />
          </div>
        )}
      </main>
    </div>
  );
}
  
