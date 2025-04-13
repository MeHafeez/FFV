let deferredPrompt;

export const initializePWAPrompt = () => {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
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
        background: rgba(255, 255, 255, 0.95);
        padding: 20px;
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 15px;
        max-width: 90%;
        width: 360px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        animation: slideUp 0.3s ease-out;
    `;

    const appIcon = '/logo512.png';  // Using logo512.png from public folder

    alertDiv.innerHTML = `
        <style>
            @keyframes slideUp {
                from { transform: translate(-50%, 100%); }
                to { transform: translate(-50%, 0); }
            }
            .pwa-close-btn {
                position: absolute;
                top: 10px;
                right: 10px;
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                color: #666;
                padding: 5px;
            }
            .pwa-install-btn {
                background: #4CAF50;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .pwa-install-btn:hover {
                background: #45a049;
                transform: translateY(-2px);
            }
        </style>
        <button class="pwa-close-btn" onclick="this.parentElement.remove()">Add to home×</button>
        <img src="${appIcon}" style="width: 48px; height: 48px; border-radius: 12px;" alt="App Icon">
        <div style="flex: 1;">
            <div style="font-weight: 600; color: #333; margin-bottom: 8px;">Install Farm Fresh Vegetables</div>
            <p style="margin: 0; color: #666; font-size: 14px;">Add our app to your home screen for quick access!</p>
            <button class="pwa-install-btn" style="margin-top: 12px;">Add to Home Screen</button>
        </div>
    `;

    document.body.appendChild(alertDiv);

    const installButton = alertDiv.querySelector('.pwa-install-btn');
    installButton.addEventListener('click', async () => {
        // Capture device information
        const deviceInfo = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            vendor: navigator.vendor,
            language: navigator.language,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            deviceMemory: navigator.deviceMemory || 'unknown',
            connection: navigator.connection ? {
                type: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt
            } : 'unknown',
            devicePixelRatio: window.devicePixelRatio,
            timestamp: new Date().toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            browserName: navigator.userAgent.match(/(?:firefox|chrome|safari)\/(\d+)/i)?.[0] || 'unknown',
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        };

        // Send data to Vercel API endpoint
        try {
            await fetch('/api/log-device-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deviceInfo)
            });
        } catch (error) {
            console.error('Error sending device info:', error);
        }

        // Continue with PWA installation
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