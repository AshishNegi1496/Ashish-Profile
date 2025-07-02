"use client";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Typography from "@mui/material/Typography";
import { useProfiles } from "./lib/fetcher";
import Loader from "./components/Loader";
import AppButton from "./components/AppButton";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { log } from "console";

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { profiles, loading } = useProfiles();
 console.log("Profiles:", profiles);
  const profile = profiles?.[0] || null;
  const name = profile?.name || "Ashish Negi";
  const letters = name.split("");
  const handleHover = (i: number) => activeIndex === null && (setActiveIndex(i), setTimeout(() => setActiveIndex(null), 500));
  if (loading) return <Loader />;
   return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>{name} | {profile?.position || "Project Engineer"}</title>
        <meta name="description" content="Personal portfolio of Ashish Negi - Full-stack developer." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-[88vh] bg-slate-50 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center py-8 px-2 sm:px-4">
          <div className="w-full max-w-[900px] grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div
              className="w-full min-w-[220px] max-w-[400px] aspect-[16/9] rounded-xl mx-auto"
              style={{
                backgroundImage: `url("${
                  // profile?.profileImage || 
                  "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div className="min-w-[180px] max-w-[400px] w-full flex flex-col items-start gap-4">
              <Typography
                variant="h2"
                fontWeight={900}
                color="#0d141c"
                sx={{
                  fontSize: { xs: "2rem", sm: "2.2rem", md: "2.7rem" },
                  letterSpacing: "-0.033em",
                  lineHeight: 1.1,
                }}
              >
                {letters.map((char: string, i: number) => (
                  <span
                    key={i}
                    onMouseEnter={() => handleHover(i)}
                    style={{
                      display: "inline-block",
                      transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
                      transform: activeIndex === i ? "translateY(-16px)" : "translateY(0)",
                    } as React.CSSProperties}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </Typography>
              <Typography
                variant="subtitle1"
                color="#0d141c"
                sx={{
                  fontWeight: 400,
                  fontSize: { xs: "1rem", sm: "1.08rem", md: "1.15rem" },
                }}
              >
                {profile?.position || "Project Engineer"}
              </Typography>
              <Link href="/projects" passHref>
                <AppButton variant="outlined" fullWidth>
                  View Projects
                </AppButton>
              </Link>
            </div>
          </div>
          <div className="w-full max-w-[700px] mx-auto mt-8 px-2">
            <Typography
              color="#0d141c"
              fontSize={{ xs: "1rem", sm: "1.08rem", md: "1.15rem" }}
              fontWeight={400}
              sx={{ textAlign: "center", px: 2, pb: 2, pt: 1 }}
            >
              {profile?.summary ||
                "I'm a passionate full-stack developer with a focus on creating intuitive and engaging digital experiences. My work blends user-centered design principles with a keen eye for aesthetics, resulting in solutions that are both functional and visually appealing. I'm always eager to collaborate on new projects and bring innovative ideas to life."}
            </Typography>
            <div className="flex justify-center gap-6 mt-4">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Email"
                >
                  <EmailIcon fontSize="medium" style={{ color: "#000" }} />
                </a>
              )}
              {profile?.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                >
                  <LinkedInIcon fontSize="medium" style={{ color: "#000" }} />
                </a>
              )}
              {profile?.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                >
                  <GitHubIcon fontSize="medium" style={{ color: "#000" }} />
                </a>
              )}
              {profile?.location && (
                <span
                  title={profile.location}
                  className="flex items-center"
                  style={{ color: "#1976d2" }}
                >
                  <LocationOnIcon fontSize="medium" style={{ color: "#000" }} />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}