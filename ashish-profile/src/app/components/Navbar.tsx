


'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/app/store/useAuthStore";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { usePathname } from "next/navigation";
import { useTheme } from "../context/ThemeContext";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { token, logout } = useAuthStore();
    const pathname = usePathname();
     const { theme, toggleTheme } = useTheme();



  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };
const getLinkClasses = (href: string) => {
  const isActive = pathname === href;
  return `transition-colors duration-300 font-medium ${
    isActive
      ? "text-primary"
      : "text-muted-foreground hover:text-primary"
  }`;
};

  return (
<header className="sticky top-0 z-50 bg-background border-b border-border backdrop-blur-lg">
  <div className="container mx-auto px-6 py-4 flex justify-between items-center">
    {/* Logo */}
    <Link
      href="/"
      className="text-3xl font-bold from-purple-500 to-indigo-500 bg-clip-text text-transparent bg-gradient-to-r"
    >
      DevNix
    </Link>

    {/* Theme toggle button */}
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-secondary text-foreground hover:bg-muted transition"
      title="Toggle theme"
      aria-label={`Toggle ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </button>

    {/* Desktop Navigation */}
    <nav className="hidden md:flex items-center space-x-8">
      {navLinks.map(({ label, href }) => (
        <Link key={label} href={href} className={getLinkClasses(href)}>
          {label}
        </Link>
      ))}
    </nav>

    {/* Auth Button (Desktop) */}
    <div className="hidden md:flex">
      {token ? (
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 group"
          title="Logout"
        >
          <LogoutIcon className="transform group-hover:rotate-90 transition-transform duration-300" />
        </button>
      ) : (
        <Link
          href="/login"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 group"
          title="Login"
        >
          <LoginIcon className="transform group-hover:rotate-90 transition-transform duration-300" />
        </Link>
      )}
    </div>

    {/* Hamburger (Mobile) */}
    <button
      className="md:hidden flex items-center justify-center w-12 h-12 rounded-full bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300"
      aria-label="Open navigation menu"
      onClick={() => setOpen(!open)}
    >
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
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
    <div className="md:hidden flex flex-col gap-2 px-6 pb-4 animate-fade-in-down bg-background">
      {navLinks.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          className={`${getLinkClasses(href)} py-2`}
          onClick={() => setOpen(false)}
        >
          {label}
        </Link>
      ))}
      {token ? (
        <button
          onClick={() => {
            handleLogout();
            setOpen(false);
          }}
          className="flex items-center justify-center w-full mt-2 rounded bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 py-2"
        >
          <LogoutIcon className="mr-2" fontSize="small" /> Logout
        </button>
      ) : (
        <Link
          href="/login"
          className="flex items-center justify-center w-full mt-2 rounded bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 py-2"
          onClick={() => setOpen(false)}
        >
          <LoginIcon className="mr-2" fontSize="small" /> Login
        </Link>
      )}
    </div>
  )}
</header>


  );
}