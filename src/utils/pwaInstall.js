let deferredPrompt;

export const initializePWAPrompt = () => {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Only show if on mobile
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            showInstallPrompt();
        }
    });
};

const showInstallPrompt = () => {
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    `;

    alertDiv.innerHTML = `
        <p style="margin: 0;">Install our app for a better experience!</p>
        <button id="pwa-install-btn" style="
            padding: 8px 16px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        ">Add to Home Screen</button>
    `;

    document.body.appendChild(alertDiv);

    document.getElementById('pwa-install-btn').addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                alertDiv.remove();
            }
            deferredPrompt = null;
        }
    });
};