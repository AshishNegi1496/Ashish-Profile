'use client';


import { CircularProgress, Box } from '@mui/material';
export default function Loader() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
      <CircularProgress size={60} thickness={5} />
    </Box>
  );
}