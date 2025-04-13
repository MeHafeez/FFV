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
        isStandalone: window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches,
        connection: navigator.connection ? {
          effectiveType: navigator.connection.effectiveType,
          downlink: navigator.connection.downlink,
          rtt: navigator.connection.rtt,
        } : 'Not Available'
      },
      outcome: outcome,
      url: window.location.href,
      environment: process.env.NODE_ENV || 'production'
    };

    console.log('Sending installation log:', deviceInfo);

    const response = await fetch('/api/log-pwa-install', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deviceInfo),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Log successfully recorded:', result);

  } catch (error) {
    console.error('Failed to log installation:', {
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
};

export const initializePWAPrompt = (setShowPrompt, setDeferredPrompt) => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Only call setDeferredPrompt if it's provided
    if (typeof setDeferredPrompt === 'function') {
      setDeferredPrompt(e);
    }
    
    // Only call setShowPrompt if it's provided
    if (typeof setShowPrompt === 'function') {
      setShowPrompt(true);
    }
    
    console.log('PWA prompt is ready to show');
  });

  // Check if running as standalone
  const isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
  if (!isStandalone && typeof setShowPrompt === 'function') {
    setShowPrompt(true);
  }
};

export const isPWAInstallable = () => {
  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
  const isInStandaloneMode = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
  
  return !isInStandaloneMode && (!!deferredPrompt || isIOS);
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