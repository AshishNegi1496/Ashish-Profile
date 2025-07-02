type GalleryItemProps = {
  // src: string;
  title: string;
};

export default function GalleryItem({ title }: GalleryItemProps) {
  return (
    <div className="relative group rounded-xl overflow-hidden shadow">
      {/* <img src={src} alt={title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform" /> */}
      <div className="absolute bottom-0 left-0 w-full bg-black/40 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {title}
      </div>
    </div>
  )
}
