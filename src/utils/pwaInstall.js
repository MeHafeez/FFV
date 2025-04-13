let deferredPrompt = null;

export const logInstallationDetails = async (outcome) => {
  try {
    const deviceInfo = {
      timestamp: new Date().toISOString(),
      device: {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        vendor: navigator.vendor,
        language: navigator.language,
        screenSize: `${window.screen.width}x${window.screen.height}`,
        connection: navigator.connection ? {
          effectiveType: navigator.connection.effectiveType,
          downlink: navigator.connection.downlink,
          rtt: navigator.connection.rtt,
        } : 'Not Available'
      },
      outcome: outcome
    };

    console.log('Sending installation log:', deviceInfo);

    const response = await fetch('/api/log-pwa-install', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deviceInfo)
    });

    const result = await response.json();
    console.log('Log response:', result);

  } catch (error) {
    console.error('Error logging PWA installation:', error);
  }
};

export const initializePWAPrompt = () => {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Don't prevent default here
    deferredPrompt = e;
  });
};

export const isPWAInstallable = () => {
  return !!deferredPrompt;
};

export const installPWA = async () => {
  if (!deferredPrompt) return false;

  try {
    // Show the prompt
    await deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    
    // Log installation attempt
    await logInstallationDetails(result.outcome);
    
    // Clear the prompt
    deferredPrompt = null;
    return result.outcome === 'accepted';
  } catch (error) {
    console.error('Installation failed:', error);
    return false;
  }
};