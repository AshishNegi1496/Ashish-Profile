"use client"
import Link from 'next/link'
import { useState } from 'react'
const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]
export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="bg-black/40 shadow-sm sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center py-4">
          <span className="font-bold text-xl font-serif tracking-tight text-white">Never Settle</span>
          <div className="hidden md:flex gap-6">
            {navLinks.map(({ label, href }) => (
              <Link key={label} href={href} className="font-serif text-lg text-white px-4 py-2 rounded-lg transition-all duration-200 hover:bg-neutral-50 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200">{label}</Link>
            ))}
          </div>
          <button className="md:hidden flex items-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-200" aria-label="Open navigation menu" onClick={() => setOpen(!open)}>
            <span className="sr-only">Open navigation menu</span>
            <svg className="w-7 h-7 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"} />
            </svg>
          </button>
        </div>
        {open && (
          <div className="md:hidden flex flex-col gap-2 pb-4 animate-fade-in-down">
            {navLinks.map(({ label, href }) => (
              <Link key={label} href={href} className="font-serif text-base px-4 py-2 rounded-lg transition-all duration-200 hover:bg-neutral-200 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" onClick={() => setOpen(false)}>{label}</Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}