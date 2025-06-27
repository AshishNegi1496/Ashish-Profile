"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import './globals.css';

export default function HomePage() {
  const [time, setTime] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString());
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const name = "Ashish Negi";
  const letters = name.split("");

  const handleHover = (index: number) => {
    if (activeIndex === null) {
      setActiveIndex(index);
      setTimeout(() => setActiveIndex(null), 500); // Jump duration
    }
  };

  return (
    <>
      <Head>
        <title>Ashish Negi | Project Engineer</title>
        <meta name="description" content="Personal portfolio of Ashish Negi - Full-stack developer." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/images/bg.jpg")' }} />
        <div className="absolute inset-0 bg-white/30 backdrop-blur-xs" />
        <div className="relative z-10 flex flex-col items-center w-full">
          <h1 className="heading-1 text-white flex gap-1 mb-10 text-white/90 tracking-tight">
            {letters.map((char, index) => (
              <span
                key={index}
                onMouseEnter={() => handleHover(index)}
                className={`inline-block transition-transform duration-300 ease-in-out ${
                  activeIndex === index ? "-translate-y-4" : "translate-y-0"
                }`}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <p className="body-text text-gray-50 text-center">
            Engineering sleek, scalable digital experiences with a full-stack mindset.<br />
            Currently crafting high-performance applications at <span className="font-semibold">CDAC India</span>.<br />
            Passionate about clean code, creative tech, and thoughtful design.<br />
            <span className="italic text-neutral-300">"Code with clarity, design with purpose."</span>
          </p>

          <span className="mt-4 mb-2 text-3xl md:text-4xl font-mono bg-black/60 text-white px-6 py-2 rounded-lg shadow-lg tracking-widest">
            {time}
          </span>
        </div>
        <div className="absolute bottom-6 left-6 z-20 text-left">
          <div className="text-base md:text-lg heading-3 text-white/80">📍 Pune, India</div>
          <div className="text-sm md:text-base text-neutral-100">CDAC (Centre for Development of Advanced Computing)</div>
        </div>
        <div className="absolute bottom-6 right-6 z-20 text-right max-w-xs">
          <div className="heading-3 text-white/80">Project Engineer</div>
          <div className="italic heading-3 rounded-lg shadow text-neutral-100">
            "Turning ideas into reality, one line of code at a time."
          </div>
        </div>
      </section>
    </>
  );
}
