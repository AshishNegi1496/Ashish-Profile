// src/app/components/ReusableDialog.tsx
'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
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
  maxWidth = 'sm',
  fullWidth = true,
}: ReusableDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth={fullWidth}>
      {title && (
        <DialogTitle>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </DialogTitle>
      )}
      <DialogContent dividers>
        {typeof content === 'string' ? (
          <DialogContentText>{content}</DialogContentText>
        ) : (
          content
        )}
      </DialogContent>
      <DialogActions>
        {actions || (
          <Button onClick={onClose} 
            variant="outlined"
         sx={{
    color: '#fff',               
    backgroundColor: '#000',     
        borderColor: '#000',         
    '&:hover': {
      backgroundColor: '#222',   
      borderColor: '#000',
      color: '#fff',
    },
  }}>
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
