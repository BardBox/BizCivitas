
import React from 'react';
import Link from 'next/link';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
}

export default function EnhancedCTA({ 
  href, 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  external = false 
}: CTAButtonProps) {
  const baseClasses = `enhanced-cta enhanced-cta-${variant} enhanced-cta-${size} ${className}`;
  
  const content = (
    <>
      <span className="cta-content">
        {children}
      </span>
      <div className="cta-background"></div>
      <div className="cta-shine"></div>
      <div className="cta-particles">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>
    </>
  );

  if (external) {
    return (
      <a href={href} className={baseClasses} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={baseClasses}>
      {content}
    </Link>
  );
}
