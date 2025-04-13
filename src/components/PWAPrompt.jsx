import React, { useState, useEffect } from 'react';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';

const PWAPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    // Check if device is mobile or tablet
    const checkDevice = () => {
      const isMobileOrTabletDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobileOrTablet(isMobileOrTabletDevice);
    };

    checkDevice();
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
    isMobileOrTablet && (
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
              color: '#22c55e'  // Changed to green
            }
          }}
          icon={<AddToHomeScreenIcon sx={{ color: '#22c55e' }} />}
          action={
            <Button 
              color="success" 
              size="small" 
              onClick={handleInstallClick}
              variant="contained"
              sx={{ 
                ml: 2,
                backgroundColor: '#22c55e',
                '&:hover': {
                  backgroundColor: '#16a34a'
                }
              }}
            >
              Add to home screen
            </Button>
          }
        >
          Install FFV for a better experience
        </Alert>
      </Snackbar>
    )
  );
};

export default PWAPrompt;