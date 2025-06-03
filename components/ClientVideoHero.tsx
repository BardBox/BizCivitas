
'use client';

import { useState, useEffect } from 'react';

interface ClientVideoHeroProps {
  videoSrc: string;
  posterSrc: string;
  children: React.ReactNode;
}

export default function ClientVideoHero({ 
  videoSrc, 
  posterSrc, 
  children 
}: ClientVideoHeroProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-gray-900">
          <div className="absolute inset-0 bg-flat-text-primary bg-opacity-40 flex items-center justify-center">
            {children}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <video
          className="w-full h-full object-cover"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          controlsList="nodownload nofullscreen noremoteplaybook"
          disablePictureInPicture
          preload="metadata"
          poster={posterSrc}
          aria-label="Business innovation video showcasing successful companies"
        />
      </div>
      <div className="absolute inset-0 bg-flat-text-primary bg-opacity-40 flex items-center justify-center">
        {children}
      </div>
    </section>
  );
}
