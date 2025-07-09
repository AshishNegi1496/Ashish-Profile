'use client';

import { useState } from 'react';
import {
  Button,
  Box,
  Typography,
  CircularProgress,
  Paper,
  Alert,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function ImageCaption() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setCaption(null); // Clear previous caption when a new file is selected
      setError(null); // Clear previous errors
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image file first.');
      return;
    }

    setLoading(true);
    setError(null); // Clear previous errors
    setCaption(null); // Clear previous caption

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await fetch('http://10.208.10.157:8000/api/ai/caption', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        // Handle HTTP errors
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to generate caption.');
      }

      const data = await res.json();
      setCaption(data.caption);
    } catch (err: unknown) {
      console.error('Upload error:', err);
      let errorMessage = 'An unexpected error occurred while generating the caption.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      setCaption(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: 500,
        mx: 'auto',
        my: 6,
        bgcolor: 'background.paper',
        boxShadow: 3,
        borderRadius: 2,
      }}
      component={Paper}
      elevation={3}
    >
      <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ mb: 3 }}>
        🖼️ Image Captioning
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ alignSelf: 'center' }}
        >
          {selectedFile ? selectedFile.name : 'Choose Image'}
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
        </Button>
        {selectedFile && (
          <Typography variant="body2" color="text.secondary" align="center">
            File selected: **{selectedFile.name}**
          </Typography>
        )}
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!selectedFile || loading}
        fullWidth
        sx={{ height: 50 }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Caption'}
      </Button>

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      {caption && (
        <Box sx={{ mt: 3, p: 2, border: '1px dashed', borderColor: 'grey.400', borderRadius: 1 }}>
          <Typography variant="subtitle1" component="strong" sx={{ fontWeight: 'bold' }}>
            Caption:
          </Typography>{' '}
          <Typography variant="body1" component="span">
            {caption}
          </Typography>
        </Box>
      )}
    </Box>
  );
}