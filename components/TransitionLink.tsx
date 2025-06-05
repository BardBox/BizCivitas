
'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  'data-no-swup'?: boolean;
}

export default function TransitionLink({ 
  href, 
  children, 
  className = '', 
  onClick,
  'data-no-swup': noSwup,
  ...props 
}: TransitionLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    }
    
    // Add loading state
    if (typeof window !== 'undefined' && window.swup) {
      document.body.classList.add('is-loading');
    }
  };

  return (
    <Link 
      href={href} 
      className={className}
      onClick={handleClick}
      data-no-swup={noSwup}
      {...props}
    >
      {children}
    </Link>
  );
}
