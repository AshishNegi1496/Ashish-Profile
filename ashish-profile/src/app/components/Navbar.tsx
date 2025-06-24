import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="flex justify-center gap-8 py-6 bg-white/80 shadow-sm sticky top-0 z-50">
      {['Home', 'Projects', 'Gallery', 'Contact'].map((label, i) => (
        <Link
          key={label}
          href={label === 'Home' ? '/' : `/${label.toLowerCase()}`}
          className="font-serif text-lg px-4 py-2 rounded transition-colors hover:bg-neutral-200"
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
