
import React from 'react';

interface ShareButtonProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

export default function ShareButton({ url, title, description, className = '' }: ShareButtonProps) {
  const shareData = {
    title,
    text: description || title,
    url
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(url);
      // Show a toast or notification here if needed
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`share-button-wrapper ${className}`}
      aria-label="Share this content"
    >
      <div className="share-button">
        <div className="share-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3"/>
            <circle cx="6" cy="12" r="3"/>
            <circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
        </div>
        <span className="share-text">Share</span>
        <div className="share-ripple"></div>
      </div>
    </button>
  );
}
