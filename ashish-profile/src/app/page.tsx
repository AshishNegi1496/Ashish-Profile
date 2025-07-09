


"use client";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Paper,
  Avatar,
  Link as MuiLink,
  useTheme,
  Chip,
  Stack,
  Fab,
} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useProfiles } from "./lib/fetcher";
import Loader from "./components/Loader";
import ReusableDialog from "./components/ReusableDialog";
import Chatbot from "./components/Chatbot";
import ChatIcon from '@mui/icons-material/Chat';

const altImg =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBtUlfdm1JH2SjTck8lbNVEuEGEMLJgbe8RNkfrKpuG25vi8GCC1UxQgfBgc2YBxmcuzgMeStW7KYEe7CUI2nQi5J9937h_bb87eML-4wtgA4SpV_zqdTM6MebiPb_e2Me5EPgjyqV1lJVqg0R2uBJ4jO1tqBskw90lW1csityH4W5F8uA_y8F0g95QM0yIDyRT_EXDMsEU1RD8VhfBplwQKEzAFbaggcyRe2wqNSbh1iXXQvDWrQzWkJ1kQ7ELqDjLIO4aGBMzwas";

export default function HomePage() {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<{ title: string; content: React.ReactNode } | null>(null);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const { profiles, loading } = useProfiles();
  const profile = profiles?.[0] || {};
  const name = profile.name || "Ashish Negi";

  if (loading) return <Loader />;

  interface Experience {
    title: string;
    company: string;
    start_date: string;
    end_date?: string;
    description?: string;
  }

  const cardData = [
    {
      title: "Skills",
      desc: Array.isArray(profile.skills) && profile.skills.length > 0
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
      desc: Array.isArray(profile.experience) && profile.experience.length > 0
        ? profile.experience[0].title + " at " + profile.experience[0].company
        : "No experience listed.",
      showKnowMore: Array.isArray(profile.experience) && profile.experience.length > 0,
      content: (
        <Stack spacing={2}>
          {profile.experience?.map((exp: Experience, i: number) => (
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
      desc: Array.isArray(profile.certifications) && profile.certifications.length > 0
        ? profile.certifications[0].name
        : "No certifications listed.",
      showKnowMore: Array.isArray(profile.certifications) && profile.certifications.length > 0,
      content: (
        <Stack spacing={1}>
          {profile.certifications?.map((cert: { name: string; issuer: string; issue_date: string; credential_url?: string }, i: number) => (
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
      desc: Array.isArray(profile.languages) && profile.languages.length > 0
        ? profile.languages.join(", ")
        : "No languages listed.",
      showKnowMore: Array.isArray(profile.languages) && profile.languages.length > 0,
      content: <Typography variant="body2">{profile.languages?.join(", ")}</Typography>,
    },
    {
      title: "Passions",
      desc: "Esports, Cricket, Lawn Tennis, Photography, Cooking, Travelling, Learning new technology, and many more. You can find some of my moments and clicks in the Gallery section.",
      showKnowMore: true,
      content: (
        <>
          <List
            sx={{
              listStyleType: 'disc',
              pl: 2,
              mb: 1,
              '& .MuiListItem-root': {
                display: 'list-item',
                color: 'black',
                fontSize: '1rem',
                py: 0,
              },
            }}
          >
            <ListItem>Esports</ListItem>
            <ListItem>Cricket</ListItem>
            <ListItem>Lawn Tennis</ListItem>
            <ListItem>Photography</ListItem>
            <ListItem>Cooking</ListItem>
            <ListItem>Travelling</ListItem>
            <ListItem>Learning New Technology</ListItem>
          </List>
          <Typography variant="body2">
            ...and many more! Check out the{' '}
            <Link href="/gallery" color="primary" >
              Gallery
            </Link>{' '}
            for pictures.
          </Typography>
        </>
      ),
    }
  ];

  const handleKnowMore = (title: string) => {
    const card = cardData.find(c => c.title === title);
    if (card) setDialogContent({ title: card.title, content: card.content });
    setDialogOpen(true);
  };

  return (
    <div className="w-full">
      <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh", fontFamily: "Poppins, sans-serif" }}>
        <Head>
          <title>{name} | {profile.position || "Project Engineer"}</title>
          <meta name="description" content="Personal portfolio of Ashish Negi - Full-stack developer." />
          <link rel="icon" href="/favicon.ico" />
        </Head>



        {/* Main */}
        <Container sx={{ py: 8 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid
              sx={{
                flexBasis: {
                  xs: "100%",
                  md: "50%",
                },
                maxWidth: {
                  xs: "100%",
                  md: "50%",
                },
              }}
            >
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {profile.position || "Project Engineer"}
              </Typography>
              <Typography variant="h2" fontWeight={700} color="text.primary" gutterBottom sx={{ lineHeight: 1.1 }}>
                I am {name}
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 480, mb: 3 }}>
                {profile.summary ||
                  "Full Stack Developer with expertise in React.js, Spring Boot, FastAPI, and microservices. Experienced with cloud-native solutions, CI/CD, Docker, and data visualization."}
              </Typography>
              <Link href="/projects" passHref >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    backgroundColor: "#222",
                    "&:hover": { backgroundColor: "#444", transform: "scale(1.05)" },
                    borderRadius: 2,
                    px: 5,
                    py: 2,
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  View Projects
                </Button>
              </Link>
            </Grid>


            <div
              style={{
                maxWidth: "100%",
                display: "flex",
                justifyContent: "center",
                boxSizing: "border-box",
              }}
            >
              <Avatar
                src={profile?.profileImage || altImg}
                alt={name}
                sx={{
                  width: 320,
                  height: 320,
                  boxShadow: 4,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>


          </Grid>

          {/* Cards Section */}
          <Grid container spacing={4} sx={{ mt: 8 }}>
            {cardData?.map((item) => (
              <Grid
                key={item.title}
                sx={{
                  display: "flex",
                  flexBasis: {
                    xs: "100%",
                    md: "50%",
                    lg: "25%",
                  },
                  maxWidth: {
                    xs: "100%",
                    md: "50%",
                    lg: "25%",
                  },
                }}
              >
                <Paper
                  elevation={4}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    transition: "box-shadow 0.3s, transform 0.3s",
                    "&:hover": {
                      boxShadow: 8,
                      transform: "translateY(-4px)",
                    },
                    width: "100%",
                    minHeight: 240,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flex: 1,
                  }}
                >
                  <Typography variant="h5" fontWeight={700} color="text.primary" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 3 }}>
                    {item.desc}
                  </Typography>
                  {item.showKnowMore && (
                    <MuiLink
                      href="#"
                      color="text.primary"
                      underline="none"
                      sx={{
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        "&:hover": { color: "grey.700" },
                      }}
                      onClick={e => {
                        e.preventDefault();
                        handleKnowMore(item?.title);
                      }}
                    >
                      Know More <ArrowForwardIcon fontSize="small" />
                    </MuiLink>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Chatbot
          isOpen={chatbotOpen}
          onClose={() => setChatbotOpen(false)}
          profileName={name} // Pass the dynamic name to the chatbot
        />

        {/* Floating Action Button to open Chatbot */}
        {!chatbotOpen && (
          <Fab
            color="primary"
            aria-label="chat"
            sx={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              bgcolor: theme.palette.primary.main, // Use theme primary color
              '&:hover': {
                bgcolor: theme.palette.primary.dark, // Darken on hover
              },
              zIndex: 1200, // Slightly lower than chatbot window
            }}
            onClick={() => setChatbotOpen(true)}
          >
            <ChatIcon />
          </Fab>
        )}

        s
        {/* Dialog for Know More */}
        {dialogContent && (
          <ReusableDialog
            open={dialogOpen}
            title={dialogContent.title}
            content={dialogContent.content}
            onClose={() => setDialogOpen(false)}
          />
        )}

      </Box>
    </div>
  );
}