
"use client";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useProfiles } from "../lib/fetcher";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  IconButton,
  CircularProgress,
} from "@mui/material";
interface FooterProps {
  name?: string;
}

export default function Footer({ name }: FooterProps) {
    const { profiles, loading } = useProfiles();
      const profile = profiles?.[0] || {};
      if (loading) {
        return <><CircularProgress /></>; 
      }
  return (

     <Box component="footer" sx={{ backgroundColor: "#fff" }}>
        <Container  maxWidth="md">
          <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mb: 3 }}>
            {profile.email && (
              <IconButton color="inherit" href={`mailto:${profile.email}`} aria-label="Email">
                <EmailIcon sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }} />
              </IconButton>
            )}
            {profile.linkedin && (
              <IconButton color="inherit" href={profile.linkedin} aria-label="LinkedIn" target="_blank">
                <LinkedInIcon sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }} />
              </IconButton>
            )}
            {profile.github && (
              <IconButton color="inherit" href={profile.github} aria-label="GitHub" target="_blank">
                <GitHubIcon sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }} />
              </IconButton>
            )}
            {profile.location && (
              <IconButton color="inherit" disabled aria-label="Location">
                <LocationOnIcon sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }} />
              </IconButton>
            )}
          </Box>
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 {name}. All rights reserved.
          </Typography>
        </Container>
      </Box>
  
  );
}