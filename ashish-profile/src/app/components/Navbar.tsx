'use client';
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useProfiles } from "../lib/fetcher";
import { useState } from "react";
import { useAuthStore } from "@/app/store/useAuthStore";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { token, username, logout } = useAuthStore();

  const { profiles } = useProfiles();
  const profile = profiles && profiles.length > 0 ? profiles[0] : null;


 const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 backdrop-blur-md text-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <span className="font-bold text-xl font-serif tracking-tight text-white flex items-center gap-2">
            <Box sx={{ width: 32, height: 32, color: "#fff" }}>
              <svg viewBox="0 0 48 48" fill="none" width={32} height={32} xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor"></path>
              </svg>
            </Box>
            <Typography variant="h6" fontWeight={700} color="#000" sx={{ letterSpacing: "-0.015em" }}>
             DevNix
            </Typography>
          </span>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 items-center">
            {navLinks?.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="font-serif text-base px-4 py-2 rounded-lg transition-all duration-200 hover:bg-neutral-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                {label}
              </Link>
            ))}

            {/* Conditional Auth Section */}
        {token ? (
              <>
          
                <button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 bg-red-100 text-red-700  transition"
                >
                   <LogoutIcon fontSize="small" />
                  
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="ml-4 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
              >
          <LoginIcon fontSize="small" />
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-label="Open navigation menu"
            onClick={() => setOpen(!open)}
          >
            <svg className="w-7 h-7 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {open && (
          <div className="md:hidden flex flex-col gap-2 pb-4 animate-fade-in-down">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="font-serif text-base px-4 py-2 rounded-lg transition-all duration-200 hover:bg-neutral-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}

            {/* Conditional Auth for mobile */}
              {token ? (
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
