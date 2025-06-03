
'use client';

import React, { useState } from 'react';

interface ShareButtonProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

export default function ShareButton({ url, title, description, className = '' }: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const shareData = {
    title,
    text: description || title,
    url
  };

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('share-ripple');
    
    const existingRipple = button.querySelector('.share-ripple');
    if (existingRipple) {
      existingRipple.remove();
    }
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  const handleShare = async (event: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(event);
    setIsSharing(true);
    
    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(url);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.log('Error sharing:', err);
        // Fallback to clipboard
        try {
          await navigator.clipboard.writeText(url);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        } catch (clipboardErr) {
          console.log('Clipboard error:', clipboardErr);
        }
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className={`share-button-wrapper ${className}`}>
      <button
        onClick={handleShare}
        className="share-button"
        aria-label="Share this content"
        disabled={isSharing}
      >
        <div className="share-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3"/>
            <circle cx="6" cy="12" r="3"/>
            <circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
        </div>
        <span className="share-text">
          {isSharing ? 'Sharing...' : 'Share'}
        </span>
      </button>
      
      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300">
          Link copied to clipboard!
        </div>
      )}
    </div>
  );
}
