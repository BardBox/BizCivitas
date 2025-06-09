'use client'
import React, { useState } from 'react';
import { CarouselItem, InfiniteCarouselProps } from '@/types/carosual.types';

const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({ 
  items = [], 
  title = "Success Stories that Go with Our Motto",
  speed = 20, 
  pauseOnHover = true,
  backgroundColor = 'bg-orange-100',
  cardBackgroundColor = 'bg-white',
  titleColor = 'text-orange-500',
  textColor = 'text-gray-700',
  mainTitleColor = 'text-orange-500',
  gap = 6
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = (): void => {
    if (pauseOnHover) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = (): void => {
    if (pauseOnHover) {
      setIsHovered(false);
    }
  };

  // Create enough duplicates for seamless scrolling
  const duplicatedItems: CarouselItem[] = [...items, ...items, ...items];

  return (
    <div className={`w-full py-12 ${backgroundColor} `}>
      <div className="container mx-auto px-4">
        {title && (
          <h2 className={`text-4xl font-bold text-center mb-12 ${mainTitleColor}`}>
            {title}
          </h2>
        )}
        
        <div
          className="overflow-hidden relative border-l-4 border-r-4 border-black/10 rounded-2xl p-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className={`flex gap-${gap} animate-scroll`}
            style={{
              width: 'fit-content',
              animationDuration: `${speed}s`,
              animationPlayState: isHovered ? 'paused' : 'running'
            }}
          >
            {duplicatedItems.map((item, index) => (
              <div 
                key={`${item.id}-${index}`}
                className={`${cardBackgroundColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex-shrink-0`}
                style={{ 
                  width: '320px',
                  minHeight: '280px'
                }}
              >
                <h3 className={`text-xl font-bold mb-2 ${textColor}`}>
                  {item.title}
                </h3>
                <h4 className={`text-lg font-semibold mb-4 ${titleColor}`}>
                  {item.subtitle}
                </h4>
                <p className={`${textColor} leading-relaxed text-sm`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        .animate-scroll {
          animation: scroll linear infinite;
        }
      `}</style>
    </div>
  );
};

export default InfiniteCarousel;