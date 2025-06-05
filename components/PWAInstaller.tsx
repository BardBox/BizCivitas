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
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2591_13316)">
              <path d="M34.0815 0.00361779V34.1591C34.0399 34.1591 34.0001 34.1591 33.9585 34.1591C24.5253 34.1591 16.8789 26.5128 16.8789 17.0796C16.8789 7.64638 24.5253 0 33.9585 0C34.0001 0 34.0399 0 34.0815 0V0.00361779Z" fill="#FF9D00" />
              <path d="M21.8772 0.00390625C19.4719 6.77859 13.0064 11.6272 5.40709 11.6272C3.49007 11.6272 1.64539 11.3179 -0.078125 10.7483V0.00390625H21.8772Z" fill="#3359FF" />
              <path d="M17.2474 30.3624C17.2474 31.6681 17.1045 32.9377 16.8333 34.1602H-0.078125V12.8867C9.50517 12.9681 17.2474 20.761 17.2474 30.3624Z" fill="#1DB212" />
            </g>
            <defs>
              <clipPath id="clip0_2591_13316">
                <rect width="34" height="34" fill="white" />
              </clipPath>
            </defs>
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
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_2591_13316)">
                    <path d="M34.0815 0.00361779V34.1591C34.0399 34.1591 34.0001 34.1591 33.9585 34.1591C24.5253 34.1591 16.8789 26.5128 16.8789 17.0796C16.8789 7.64638 24.5253 0 33.9585 0C34.0001 0 34.0399 0 34.0815 0V0.00361779Z" fill="#FF9D00" />
                    <path d="M21.8772 0.00390625C19.4719 6.77859 13.0064 11.6272 5.40709 11.6272C3.49007 11.6272 1.64539 11.3179 -0.078125 10.7483V0.00390625H21.8772Z" fill="#3359FF" />
                    <path d="M17.2474 30.3624C17.2474 31.6681 17.1045 32.9377 16.8333 34.1602H-0.078125V12.8867C9.50517 12.9681 17.2474 20.761 17.2474 30.3624Z" fill="#1DB212" />
                  </g>
                  <defs>
                    <clipPath id="clip0_2591_13316">
                      <rect width="34" height="34" fill="white" />
                    </clipPath>
                  </defs>
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
