"use client";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useProfiles } from "./lib/fetcher";
import Loader from "./components/Loader";
import AppButton from "./components/AppButton";

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { profiles, loading } = useProfiles();

  const profile = profiles && profiles.length > 0 ? profiles[0] : null;
  const name = profile?.name || "Ashish Negi";
  const letters = name.split("");

  if (loading) {
    return <Loader />;
  }

  const handleHover = (index: number) => {
    if (activeIndex === null) {
      setActiveIndex(index);
      setTimeout(() => setActiveIndex(null), 500);
    }
  };

  return (
    <>
      <Head>
        <title>
          {profile?.name || "Ashish "} | {profile?.position || "Project Engineer"}
        </title>
        <meta name="description" content="Personal portfolio of Ashish Negi - Full-stack developer." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          minHeight: "88vh",
          background: "#f8fafc",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem 0",
            flexDirection: "column",
          }}
        >
          {/* Grid for image and info */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2.5rem",
              width: "100%",
              maxWidth: 900,
              alignItems: "center",
            }}
          >
            {/* Profile Image */}
            <div
              style={{
                width: "100%",
                minWidth: 320,
                maxWidth: 400,
                aspectRatio: "16/9",
                borderRadius: 16,
                backgroundImage: profile?.avatar
                  ? `url("${profile.avatar}")`
                  : 'url("https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                margin: "0 auto",
              }}
            />
            {/* Name, position, button */}
            <div style={{ minWidth: 220, maxWidth: 400, width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1.2rem" }}>
              <Typography
                variant="h2"
                fontWeight={900}
                color="#0d141c"
                sx={{
                  fontSize: { xs: "2.2rem", md: "2.7rem" },
                  letterSpacing: "-0.033em",
                  lineHeight: 1.1,
                }}
              >
                {letters.map((char, index) => (
                  <span
                    key={index}
                    onMouseEnter={() => handleHover(index)}
                    style={{
                      display: "inline-block",
                      transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
                      transform: activeIndex === index ? "translateY(-16px)" : "translateY(0)",
                    }}
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
                  fontSize: { xs: "1rem", md: "1.15rem" },
                }}
              >
                {profile?.position || "Project Engineer"}
              </Typography>
              <Link href="/projects" passHref>
                <AppButton fullWidth>
                  View Projects
                </AppButton>
              </Link>
            </div>
          </div>
          <div style={{ width: "100%", maxWidth: 700, margin: "2rem auto 0 auto" }}>
            <Typography
              color="#0d141c"
              fontSize="1rem"
              fontWeight={400}
              sx={{ textAlign: "center", px: 2, pb: 2, pt: 1 }}
            >
              {profile?.summary ||
                "I'm a passionate full-stack developer with a focus on creating intuitive and engaging digital experiences. My work blends user-centered design principles with a keen eye for aesthetics, resulting in solutions that are both functional and visually appealing. I'm always eager to collaborate on new projects and bring innovative ideas to life."}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
}