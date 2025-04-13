import React, { useState, useEffect } from 'react';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';

const PWAPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    });
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <Snackbar 
      open={showPrompt} 
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert 
        severity="info" 
        sx={{ 
          width: '100%',
          backgroundColor: '#fff',
          color: '#000',
          '& .MuiAlert-icon': {
            color: '#1976d2'
          }
        }}
        icon={<AddToHomeScreenIcon />}
        action={
          <Button 
            color="primary" 
            size="small" 
            onClick={handleInstallClick}
            variant="contained"
            sx={{ ml: 2 }}
          >
            Add to home screen
          </Button>
        }
      >
        Install FFV for a better experience
      </Alert>
    </Snackbar>
  );
};

export default PWAPrompt;