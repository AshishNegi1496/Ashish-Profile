'use client';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Box,
  Link,
  useTheme,
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
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Card
      elevation={6}
      sx={{
        bgcolor: isDark ? '#1e293b' : '#f8fafc', // slate-800 / light-muted
        color: isDark ? '#e2e8f0' : '#1e293b',   // slate-300 / slate-800
        borderRadius: 4,
        boxShadow: 6,
        transition: 'all 0.3s',
        '&:hover': {
          boxShadow: isDark
            ? '0 8px 32px rgba(139,92,246,0.2)'
            : '0 8px 32px rgba(99,102,241,0.15)', // purple-500 or indigo-500
          transform: 'translateY(-8px)',
        },
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          height: 192,
          objectFit: 'cover',
          borderRadius: 3,
          bgcolor: isDark ? '#334155' : '#e2e8f0', // slate-700 / border-light
          mb: 2,
        }}
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          const target = e.target as HTMLImageElement;
          if (target.src !== '/images/fallback.webp') {
            target.src = '/images/fallback.webp';
          }
        }}
      />
      <CardHeader
        title={
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'serif',
              fontWeight: 700,
              color: isDark ? '#ffffff' : '#0f172a', // white / dark text
              mb: 1,
            }}
          >
            {title}
          </Typography>
        }
        sx={{ pb: 0 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="body2"
          sx={{
            color: isDark ? '#94a3b8' : '#475569', // muted contrast
            mb: 2,
            minHeight: 60,
          }}
        >
          {description.length > 120 ? description.slice(0, 117) + '...' : description}
        </Typography>

        {showKnowMore && (
          <Box sx={{ mt: 1 }}>
            <Link
              component="button"
              onClick={onKnowMoreClick}
              underline="none"
              sx={{
                fontWeight: 600,
                color: isDark ? '#a78bfa' : '#6d28d9', // purple-400 / indigo-700
                display: 'flex',
                alignItems: 'center',
                fontSize: '1rem',
                '&:hover': {
                  color: isDark ? '#c4b5fd' : '#7c3aed', // hover tone
                },
              }}
            >
              Know More
              <ArrowForwardIcon
                fontSize="small"
                sx={{
                  ml: 0.5,
                  transition: 'transform 0.2s',
                  '.MuiLink-root:hover &': {
                    transform: 'translateX(4px)',
                  },
                }}
              />
            </Link>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
