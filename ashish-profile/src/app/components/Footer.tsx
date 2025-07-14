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
    return (
      <div className="flex justify-center items-center py-4 bg-background">
        <CircularProgress size={20} />
      </div>
    );
  }

  return (
    <Box component="footer" className="bg-background border-t border-border py-6">
      <Container maxWidth="md">
        <Box className="flex justify-center gap-4 mb-4">
          {profile.email && (
            <IconButton
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="text-foreground hover:text-primary transition-colors"
            >
              <EmailIcon />
            </IconButton>
          )}
          {profile.linkedin && (
            <IconButton
              href={profile.linkedin}
              aria-label="LinkedIn"
              target="_blank"
              className="text-foreground hover:text-primary transition-colors"
            >
              <LinkedInIcon />
            </IconButton>
          )}
          {profile.github && (
            <IconButton
              href={profile.github}
              aria-label="GitHub"
              target="_blank"
              className="text-muted-foreground"
            >
              <GitHubIcon />
            </IconButton>
          )}
          {profile.location && (
            <IconButton
              disabled
              aria-label="Location"
              className="text-muted-foreground"
            >
              <LocationOnIcon />
            </IconButton>
          )}
        </Box>

        <Typography
          variant="body2"
          align="center"
          className="text-muted-foreground"
        >
          © 2024 {name}. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
