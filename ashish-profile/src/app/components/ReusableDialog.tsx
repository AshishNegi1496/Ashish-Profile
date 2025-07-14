

'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

type ReusableDialogProps = {
  open: boolean;
  title?: string;
  content?: React.ReactNode;
  onClose: () => void;
  actions?: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
};

export default function ReusableDialog({
  open,
  title,
  content,
  onClose,
  actions,
  maxWidth = 'md',
  fullWidth = true,
}: ReusableDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          
          backgroundColor: '#161b22',
          border: '1px solid #30363d',
          borderRadius: '1rem',
          boxShadow: 24,
          animation: 'slide-up 1s ease-out',
          color: '#c9d1d9',
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0,0,0,0.25)',
          backdropFilter: 'blur(7px)',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#fff',
        }}
      >
        {title}
        <IconButton onClick={onClose} sx={{ color: '#9ca3af' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          px: 4,
          py: 2,
          maxHeight: '70vh',
          overflowY: 'auto',
          fontSize: '0.95rem',
          color: '#fff',
        }}
      >
        {typeof content === 'string' ? (
          <Typography>
            <p className='text-slate-300'>
            {content}
            </p>
            </Typography>
        ) : (
          content
        )}
      </DialogContent>

    </Dialog>
  );
}
