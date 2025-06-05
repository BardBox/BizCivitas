
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    swup?: any;
  }
}

export default function SwupProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    let swup: any;

    const initSwup = async () => {
      // Dynamically import Swup modules
      const [SwupModule, OverlayThemeModule] = await Promise.all([
        import('swup'),
        import('@swup/overlay-theme')
      ]);

      const Swup = SwupModule.default;
      const SwupOverlayTheme = OverlayThemeModule.default;

      swup = new Swup({
        containers: ['#swup'],
        animateHistoryBrowsing: true,
        linkSelector: 'a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
        plugins: [
          new SwupOverlayTheme({
            color: '#1a365d', // Using your theme color
            duration: 600,
            direction: 'to-right'
          })
        ]
      });

      // Add custom animations
      swup.on('animationInStart', () => {
        document.body.classList.add('is-animating');
      });

      swup.on('animationOutDone', () => {
        document.body.classList.remove('is-animating');
      });

      // Store swup instance globally
      window.swup = swup;
    };

    if (typeof window !== 'undefined') {
      initSwup();
    }

    return () => {
      if (swup) {
        swup.destroy();
        window.swup = undefined;
      }
    };
  }, []);

  return (
    <div id="swup" className="transition-container">
      {children}
    </div>
  );
}
