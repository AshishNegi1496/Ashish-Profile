
// const photos = [
//   { src: '/images/photo1.jpg', title: 'Mountain Hike' },
//   { src: '/images/photo2.jpg', title: 'City Lights' },

"use client";
import ImageCaption from "../components/ImageCaption";
export default function GalleryPage() {
  return (
    <section className="max-w-5xl mx-auto py-12">
      <h1 className="text-3xl font-serif mb-8 text-center">Gallery</h1>
      <h1 className='text-lg font-serif mb-4 text-center'>In Progress.....</h1>
      {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((p, i) => <GalleryItem key={i} {...p} />)}
      </div> */}
      <ImageCaption />
    </section>
  )
}
