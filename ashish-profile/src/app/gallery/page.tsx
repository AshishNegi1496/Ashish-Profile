import GalleryItem from '../../app/components/GalleryItem'

const photos = [
  { src: '/images/photo1.jpg', title: 'Mountain Hike' },
  { src: '/images/photo2.jpg', title: 'City Lights' },
]

export default function GalleryPage() {
  return (
    <section className="max-w-5xl mx-auto py-12">
      <h1 className="text-3xl font-serif mb-8 text-center">Gallery</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((p, i) => <GalleryItem key={i} {...p} />)}
      </div>
    </section>
  )
}
