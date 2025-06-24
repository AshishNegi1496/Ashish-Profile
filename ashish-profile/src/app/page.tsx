"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [time, setTime] = useState<string>("");

 useEffect(() => {
    setTime(new Date().toLocaleTimeString());
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);


  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: 'url("/images/bg.jpg")',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-neutral-900 mb-2 drop-shadow-lg">
          Ashish Negi
        </h1>
        <div className="text-lg md:text-xl font-medium text-neutral-700 mb-2">
          Project Engineer
        </div>
        <p className="text-xl md:text-2xl font-light text-neutral-800 max-w-2xl mx-auto mb-4 drop-shadow">
          Full-stack developer passionate about minimal, impactful user experiences.<br />
          Currently building scalable web solutions at <span className="font-semibold">ABC Tech Solutions</span>.<br />
          Exploring new tech, photography, hiking, and design trends.
        </p>
        <div className="mt-4 mb-2">
          <span className="text-3xl md:text-4xl font-mono bg-black/60 text-white px-6 py-2 rounded-lg shadow-lg tracking-widest">
            {time}
          </span>
        </div>
      </div>
      <div className="absolute bottom-6 left-6 z-20 text-left">
        <div className="text-base md:text-lg font-semibold text-neutral-900 drop-shadow">
          📍 Pune, India
        </div>
        <div className="text-sm md:text-base text-neutral-800">
          CDAC (Centre for Development of Advanced Computing) 
        </div>
      </div>
      {/* Bottom Right: Position & Quote */}
      <div className="absolute bottom-6 right-6 z-20 text-right max-w-xs">
        <div className="text-base md:text-lg font-semibold text-neutral-900 drop-shadow mb-1">
          Project Engineer
        </div>
        <div className="italic text-md md:text-lg text-neutral-700 bg-white/60 px-3 py-2 rounded-lg shadow">
          "Turning ideas into reality, one line of code at a time."
        </div>
      </div>
    </section>
  );
}