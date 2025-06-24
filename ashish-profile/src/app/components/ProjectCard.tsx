type ProjectCardProps = {
  title: string;
  image: string;
  description: string;
};

export default function ProjectCard({ title, image, description }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h2 className="font-serif text-xl mb-2">{title}</h2>
        <p className="text-neutral-600">{description}</p>
      </div>
    </div>
  )
}
