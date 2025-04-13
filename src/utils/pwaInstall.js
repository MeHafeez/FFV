let deferredPrompt = null;

export const initializePWAPrompt = () => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });
};

export const isPWAInstallable = () => {
  return !!deferredPrompt;
};

export const installPWA = async () => {
  if (!deferredPrompt) return false;

  deferredPrompt.prompt();
  const result = await deferredPrompt.userChoice;
  deferredPrompt = null;
  
  return result.outcome === 'accepted';
};