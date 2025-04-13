import React, { useState, useEffect } from 'react';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import { logInstallationDetails } from '../utils/pwaInstall';  // Fixed import path

const PWAPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const isMobileOrTabletDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isIOSDevice = /iPhone|iPad|iPod/.test(navigator.userAgent);
      setIsMobileOrTablet(isMobileOrTabletDevice);
      setIsIOS(isIOSDevice);
      
      // Show prompt for iOS devices if using Safari
      if (isIOSDevice && /Safari/.test(navigator.userAgent) && !(/Chrome/.test(navigator.userAgent))) {
        setShowPrompt(true);
      }
    };

    checkDevice();

    const handleBeforeInstallPrompt = (e) => {
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    // Only add beforeinstallprompt listener for non-iOS devices
    if (!isIOS) {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }
  }, [isIOS]);

  const handleInstallClick = async () => {
    if (isIOS) {
      // Log iOS installation attempt
      // When iOS users click the Install Instructions button
      await logInstallationDetails('ios_prompt_shown');
      return;
    }

    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      // When users interact with the install prompt
      await logInstallationDetails(outcome); // outcome will be 'accepted' or 'dismissed'
      
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } catch (error) {
      console.error('Installation failed:', error);
      // When installation fails
      await logInstallationDetails('error');
    }
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
              color: '#22c55e'
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
              {isIOS ? 'Install Instructions' : 'Add to home screen'}
            </Button>
          }
        >
          {isIOS 
            ? 'Tap the share button and select "Add to Home Screen" to install FFV'
            : 'Install FFV for a better experience'
          }
        </Alert>
      </Snackbar>
    )
  );
};

export default PWAPrompt;