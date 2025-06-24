import ProjectCard from '@/app/components/ProjectCard'

const projects = [
  { title: 'Minimal Portfolio', image: '/images/project1.jpg', description: 'A clean, responsive portfolio website.' },
  { title: 'Photo Gallery App', image: '/images/project2.jpg', description: 'Modern gallery with smooth transitions.' },
]

export default function ProjectsPage() {
  return (
    <section className="max-w-5xl mx-auto py-12">
      <h1 className="text-3xl font-serif mb-8 text-center">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((p, i) => <ProjectCard key={i} {...p} />)}
      </div>
    </section>
  )
}
