'use client';

import React, { useState, useEffect } from 'react';
import { InstallPromptEvent } from '@/lib/service-worker';

interface PWAInstallerProps {
  className?: string;
}

const PWAInstaller: React.FC<PWAInstallerProps> = ({ className = '' }) => {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if already installed
    const checkInstalled = () => {
      const isPWA = window.matchMedia('(display-mode: standalone)').matches ||
                   (window.navigator as any).standalone ||
                   document.referrer.includes('android-app://');
      setIsInstalled(isPWA);
    };

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const installEvent = e as InstallPromptEvent;
      setInstallPrompt(installEvent);
      setIsInstallable(true);
      
      // Show banner after a delay if not dismissed
      setTimeout(() => {
        if (!localStorage.getItem('pwa-banner-dismissed')) {
          setShowBanner(true);
        }
      }, 5000);
    };

    // Listen for app installed
    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setIsInstalled(true);
      setIsInstallable(false);
      setShowBanner(false);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    
    checkInstalled();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;

    try {
      await installPrompt.prompt();
      const choiceResult = await installPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted PWA install');
      } else {
        console.log('User dismissed PWA install');
      }
    } catch (error) {
      console.error('PWA install failed:', error);
    } finally {
      setInstallPrompt(null);
      setIsInstallable(false);
    }
  };

  const dismissBanner = () => {
    setShowBanner(false);
    localStorage.setItem('pwa-banner-dismissed', 'true');
  };

  // Don't render if not installable or already installed
  if (!isInstallable || isInstalled) {
    return null;
  }

  return (
    <>
      {/* Install Button - Positioned above banner area */}
      <button
        id="pwa-install-button"
        onClick={handleInstall}
        className={`fixed bottom-20 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 z-50 hidden ${className}`}
        aria-label="Install BizCivitas App"
      >
        <div className="flex items-center space-x-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span>Install App</span>
        </div>
      </button>

      {/* Install Banner - Bottom positioned to avoid navbar conflict */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg z-50 transform transition-transform duration-300 animate-slide-up pwa-banner-mobile">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 rounded-full p-2 flex-shrink-0">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-base">Install BizCivitas App</h3>
                <p className="text-sm opacity-90 hidden sm:block">
                  Get quick access and enhanced performance
                </p>
                <p className="text-xs opacity-90 sm:hidden">
                  Quick access & offline features
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 pwa-actions flex-shrink-0">
              <button
                onClick={handleInstall}
                className="bg-white text-blue-600 px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-sm text-sm sm:text-base"
              >
                Install
              </button>
              <button
                onClick={dismissBanner}
                className="text-white hover:text-gray-200 p-2"
                aria-label="Dismiss install banner"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PWA Features Notification - Show after install, positioned above potential banner area */}
      {isInstalled && (
        <div className="fixed bottom-20 left-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm animate-slide-up">
          <div className="flex items-start space-x-3">
            <div className="bg-white bg-opacity-20 rounded-full p-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">App Installed!</h4>
              <p className="text-sm opacity-90">
                Enjoy faster loading and offline access
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PWAInstaller;
