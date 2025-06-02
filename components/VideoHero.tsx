
'use client';

import { useState } from 'react';

interface VideoHeroProps {
  videoSrc: string;
  posterSrc: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function VideoHero({ 
  videoSrc, 
  posterSrc, 
  title, 
  subtitle, 
  children 
}: VideoHeroProps) {
  const [videoError, setVideoError] = useState(false);

  const handleVideoError = () => {
    console.warn('Video failed to load, falling back to poster image');
    setVideoError(true);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        {!videoError ? (
          <video
            className="w-full h-full object-cover"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            preload="auto"
            poster={posterSrc}
            aria-label="Business innovation video showing successful companies like Airbnb, Uber, and SolarCity"
            onError={handleVideoError}
          />
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${posterSrc})` }}
          />
        )}
      </div>
      
      {/* Video Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl lg:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
