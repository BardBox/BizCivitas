
'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface ImageCarouselProps {
  images: string[];
  eventName: string;
}

export default function ImageCarousel({ images, eventName }: ImageCarouselProps) {
  useEffect(() => {
    const carousel = document.getElementById('imageCarousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('[data-slide]');
    const indicators = carousel.querySelectorAll('[data-indicator]');
    let currentSlide = 0;

    const nextSlide = () => {
      if (slides.length <= 1) return;
      
      slides[currentSlide].classList.remove('opacity-100');
      slides[currentSlide].classList.add('opacity-0');
      indicators[currentSlide].classList.remove('bg-white');
      indicators[currentSlide].classList.add('bg-white/50');
      
      currentSlide = (currentSlide + 1) % slides.length;
      
      slides[currentSlide].classList.remove('opacity-0');
      slides[currentSlide].classList.add('opacity-100');
      indicators[currentSlide].classList.remove('bg-white/50');
      indicators[currentSlide].classList.add('bg-white');
    };

    // Auto-advance slides every 4 seconds
    const autoplayInterval = setInterval(nextSlide, 4000);

    // Pause autoplay on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoplayInterval);
    });

    // Resume autoplay when mouse leaves
    carousel.addEventListener('mouseleave', () => {
      const newInterval = setInterval(nextSlide, 4000);
      return () => clearInterval(newInterval);
    });

    return () => clearInterval(autoplayInterval);
  }, []);

  const handlePrevSlide = () => {
    const carousel = document.getElementById('imageCarousel');
    const slides = carousel?.querySelectorAll('[data-slide]');
    const indicators = carousel?.querySelectorAll('[data-indicator]');
    const current = carousel?.querySelector('[data-slide].opacity-100');
    
    if (slides && indicators && current) {
      const currentIndex = parseInt(current.getAttribute('data-slide') || '0');
      const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
      
      current.classList.remove('opacity-100');
      current.classList.add('opacity-0');
      slides[prevIndex].classList.remove('opacity-0');
      slides[prevIndex].classList.add('opacity-100');
      
      indicators.forEach((indicator, i) => {
        if (i === prevIndex) {
          indicator.classList.remove('bg-white/50');
          indicator.classList.add('bg-white');
        } else {
          indicator.classList.remove('bg-white');
          indicator.classList.add('bg-white/50');
        }
      });
    }
  };

  const handleNextSlide = () => {
    const carousel = document.getElementById('imageCarousel');
    const slides = carousel?.querySelectorAll('[data-slide]');
    const indicators = carousel?.querySelectorAll('[data-indicator]');
    const current = carousel?.querySelector('[data-slide].opacity-100');
    
    if (slides && indicators && current) {
      const currentIndex = parseInt(current.getAttribute('data-slide') || '0');
      const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
      
      current.classList.remove('opacity-100');
      current.classList.add('opacity-0');
      slides[nextIndex].classList.remove('opacity-0');
      slides[nextIndex].classList.add('opacity-100');
      
      indicators.forEach((indicator, i) => {
        if (i === nextIndex) {
          indicator.classList.remove('bg-white/50');
          indicator.classList.add('bg-white');
        } else {
          indicator.classList.remove('bg-white');
          indicator.classList.add('bg-white/50');
        }
      });
    }
  };

  const handleIndicatorClick = (index: number) => {
    const carousel = document.getElementById('imageCarousel');
    const slides = carousel?.querySelectorAll('[data-slide]');
    const indicators = carousel?.querySelectorAll('[data-indicator]');
    const current = carousel?.querySelector('[data-slide].opacity-100');
    
    if (slides && indicators && current) {
      current.classList.remove('opacity-100');
      current.classList.add('opacity-0');
      slides[index].classList.remove('opacity-0');
      slides[index].classList.add('opacity-100');
      
      indicators.forEach((indicator, i) => {
        if (i === index) {
          indicator.classList.remove('bg-white/50');
          indicator.classList.add('bg-white');
        } else {
          indicator.classList.remove('bg-white');
          indicator.classList.add('bg-white/50');
        }
      });
    }
  };

  const handleThumbnailClick = (index: number) => {
    handleIndicatorClick(index);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Event Gallery
      </h3>
      <div className="relative">
        {/* Main Carousel */}
        <div 
          className="relative h-96 rounded-xl overflow-hidden shadow-lg"
          id="imageCarousel"
        >
          {images.map((imageUrl, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === 0 ? 'opacity-100' : 'opacity-0'
              }`}
              data-slide={index}
            >
              <Image
                src={imageUrl.trim()}
                alt={`${eventName} gallery image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 66vw"
              />
            </div>
          ))}
          
          {/* Navigation Arrows */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            onClick={handlePrevSlide}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            onClick={handleNextSlide}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === 0 ? 'bg-white' : 'bg-white/50'
                }`}
                data-indicator={index}
                onClick={() => handleIndicatorClick(index)}
              />
            ))}
          </div>
        </div>
        
        {/* Thumbnail Strip */}
        <div className="mt-4 grid grid-cols-4 md:grid-cols-6 gap-2">
          {images.map((imageUrl, index) => (
            <button
              key={index}
              className="relative h-20 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
              onClick={() => handleThumbnailClick(index)}
            >
              <Image
                src={imageUrl.trim()}
                alt={`${eventName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, (max-width: 1200px) 16vw, 16vw"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
