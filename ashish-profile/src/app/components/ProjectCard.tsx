'use client';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Box,
  Link
} from '@mui/material';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
export type ProjectCardProps = {
  title: string;
  image: string;
  description: string;
  showKnowMore?: boolean;
  onKnowMoreClick?: () => void;
};

export default function ProjectCard({
  title,
  image,
  description,
  showKnowMore = false,
  onKnowMoreClick,
}: ProjectCardProps) {
  return (
    <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{ height: 200, objectFit: 'cover' }}
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          const target = e.target as HTMLImageElement;
          if (target.src !== window.location.origin + '/images/fallback.jpg') {
            target.src = '/images/fallback.jpg';
          }
        }}
      />
      <CardHeader
        title={
          <Typography variant="h6" sx={{ fontFamily: 'serif', fontWeight: 600 }}>
            {title}
          </Typography>
        }
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ minHeight: 60 }}>
          {description.length > 120 ? description.slice(0, 117) + '...' : description}
        </Typography>

        {showKnowMore && (
          <Box sx={{
            mt: 2,
            alignSelf: 'flex-start',
          }}>
            <Link
              component="button"
              onClick={onKnowMoreClick}
              color="text.primary"
              underline="none"
              sx={{
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                "&:hover": { color: "grey.700" },
                px: 0,
                py: 0,
                sticky: "bottom",
                bottom: 0,
              }}
            >
              Know More
              <ArrowForwardIcon fontSize="small" />
            </Link>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
