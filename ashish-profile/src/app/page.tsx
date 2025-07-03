"use client";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Box, Typography, Button, Chip, Stack, IconButton, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useProfiles } from "./lib/fetcher";
import Loader from "./components/Loader";
import ProjectCard from "./components/ProjectCard";
import ReusableDialog from "./components/ReusableDialog";

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<{ title: string; content: React.ReactNode } | null>(null);
  const { profiles, loading } = useProfiles();
  const profile = profiles?.[0] || {};
  const name = profile.name || "Ashish Negi";

  if (loading) return <Loader />;

  const cardData = [
    {
      title: "Skills",
      image: "/images/skills.webp",
      description: Array.isArray(profile.skills) && profile.skills.length > 0
        ? profile.skills.slice(0, 5).join(", ") + (profile.skills.length > 5 ? "..." : "")
        : "No skills listed.",
      showKnowMore: Array.isArray(profile.skills) && profile.skills.length > 0,
      content: (
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          {profile.skills?.map((skill: string, i: number) => (
            <Chip key={i} label={skill} color="primary" variant="outlined" size="small" />
          ))}
        </Stack>
      ),
    },
    {
      title: "Experience",
      image: "/images/experience.webp",
      description: Array.isArray(profile.experience) && profile.experience.length > 0
        ? profile.experience[0].title + " at " + profile.experience[0].company
        : "No experience listed.",
      showKnowMore: Array.isArray(profile.experience) && profile.experience.length > 0,
      content: (
        <Stack spacing={2}>
          {profile.experience?.map((exp: any, i: number) => (
            <Box key={i}>
              <Typography fontWeight={700}>{exp.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {exp.company} • {exp.start_date} – {exp.end_date || "Present"}
              </Typography>
              {exp.description && <Typography variant="body2">{exp.description}</Typography>}
            </Box>
          ))}
        </Stack>
      ),
    },
    {
      title: "Certifications",
      image: "/images/certifications.webp",
      description: Array.isArray(profile.certifications) && profile.certifications.length > 0
        ? profile.certifications[0].name
        : "No certifications listed.",
      showKnowMore: Array.isArray(profile.certifications) && profile.certifications.length > 0,
      content: (
        <Stack spacing={1}>
          {profile.certifications?.map((cert: any, i: number) => (
            <Box key={i}>
              <Typography fontWeight={600} variant="body2">{cert.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {cert.issuer} • {cert.issue_date}
              </Typography>
              {cert.credential_url && (
                <Button href={cert.credential_url} target="_blank" size="small" sx={{ ml: 1 }} variant="text">
                  View Credential
                </Button>
              )}
            </Box>
          ))}
        </Stack>
      ),
    },
    {
      title: "Languages",
      image: "/images/languages.webp",
      description: Array.isArray(profile.languages) && profile.languages.length > 0
        ? profile.languages.join(", ")
        : "No languages listed.",
      showKnowMore: Array.isArray(profile.languages) && profile.languages.length > 0,
      content: <Typography variant="body2">{profile.languages?.join(", ")}</Typography>,
    },
  ];

  const handleKnowMore = (title: string) => {
    const card = cardData.find(c => c.title === title);
    if (card) setDialogContent({ title: card.title, content: card.content });
    setDialogOpen(true);
  };

  return (
    <>
    <Box bgcolor="#fff" minHeight="100vh">
      <Head>
        <title>{name} | {profile.position || "Project Engineer"}</title>
        <meta name="description" content="Personal portfolio of Ashish Negi - Full-stack developer." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box minHeight="88vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={8}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={4} alignItems="center" width="100%" maxWidth={900}>
          <Paper
            sx={{
              width: { xs: 220, md: 400 },
              aspectRatio: "16/9",
              borderRadius: 3,
              backgroundImage: `url("https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minWidth: 220,
              maxWidth: 400,
              mx: "auto",
            }}
          />
          <Stack spacing={2} minWidth={180} maxWidth={400} width="100%">
            <Typography variant="h2" fontWeight={900} color="#0d141c" sx={{ fontSize: { xs: "2rem", md: "2.7rem" }, letterSpacing: "-0.033em", lineHeight: 1.1 }}>
              {name.split("").map((char, i) => (
                <Box
                  key={i}
                  component="span"
                  onMouseEnter={() => activeIndex === null && (setActiveIndex(i), setTimeout(() => setActiveIndex(null), 500))}
                  sx={{
                    display: "inline-block",
                    transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
                    transform: activeIndex === i ? "translateY(-16px)" : "translateY(0)",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </Box>
              ))}
            </Typography>
            <Typography variant="subtitle1" color="#0d141c" fontWeight={400}>
              {profile.position || "Project Engineer"}
            </Typography>
            <Link href="/projects" passHref>
              <Button variant="outlined" fullWidth>View Projects</Button>
            </Link>
          </Stack>
        </Stack>

        <Typography color="#0d141c" fontWeight={400} textAlign="left" py={2} maxWidth={700} mt={4}>
          {profile.summary ||
            "I'm a passionate full-stack developer with a focus on creating intuitive and engaging digital experiences. My work blends user-centered design principles with a keen eye for aesthetics, resulting in solutions that are both functional and visually appealing. I'm always eager to collaborate on new projects and bring innovative ideas to life."}
        </Typography>

        <Box p={2} mt={6} maxWidth={900} width="100%">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cardData.map(card => (
              <div key={card.title}>
                <ProjectCard
                  title={card.title}
                  image={card.image}
                  description={card.description}
                  showKnowMore={card.showKnowMore}
                  onKnowMoreClick={() => handleKnowMore(card.title)}
                />
              </div>
            ))}
          </div>
        </Box>

        {dialogContent && (
          <ReusableDialog
            open={dialogOpen}
            title={dialogContent.title}
            content={dialogContent.content}
            onClose={() => setDialogOpen(false)}
          />
        )}

        <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
          {profile.email && (
            <IconButton href={`mailto:${profile.email}`} target="_blank" title="Email">
              <EmailIcon />
            </IconButton>
          )}
          {profile.linkedin && (
            <IconButton href={profile.linkedin} target="_blank" title="LinkedIn">
              <LinkedInIcon />
            </IconButton>
          )}
          {profile.github && (
            <IconButton href={profile.github} target="_blank" title="GitHub">
              <GitHubIcon />
            </IconButton>
          )}
          {profile.location && (
            <IconButton disabled title={profile.location}>
              <LocationOnIcon />
            </IconButton>
          )}
        </Stack>
      </Box>
    </Box>
   
    </>
  );
}