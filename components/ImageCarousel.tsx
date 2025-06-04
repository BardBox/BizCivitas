'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface ImageCarouselProps {
  images: string[];
  eventName: string;
}

export default function ImageCarousel({ images, eventName }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);


  // Clean and validate URLs
  const cleanImages = images
    .map(url => url?.trim())
    .filter(url => url && url.length > 0);

  if (!cleanImages || cleanImages.length === 0) {
    return null;
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === cleanImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cleanImages.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Event Gallery
      </h3>

      <div className="relative">
        {/* Main Carousel */}
        <div className="relative h-96 rounded-xl overflow-hidden shadow-lg bg-gray-100">
          <AnimatePresence>
            {isFullscreen && (
              <motion.div
                key="fullscreen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
                onClick={() => setIsFullscreen(false)} // close on background click
              >
                <motion.div
                  key="image"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full max-w-5xl max-h-[90vh] cursor-zoom-out"
                  onClick={(e) => e.stopPropagation()} // prevent closing when clicking the image
                >
                  <Image
                    src={cleanImages[currentIndex]}
                    alt={`Fullscreen ${eventName} image`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                  <button
                    onClick={() => setIsFullscreen(false)}
                    className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 p-2 rounded-full"
                  >
                    ✕
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>


          {/* Navigation Arrows */}
          {cleanImages.length > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors z-10"
                onClick={prevSlide}
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors z-10"
                onClick={nextSlide}
              >
                <ChevronRightIcon className="w-5 h-5" />
              </motion.button>
            </>
          )}

          {/* Slide Indicators */}
          {cleanImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {cleanImages.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {cleanImages.length > 1 && (
          <div className="mt-4 grid grid-cols-4 md:grid-cols-6 gap-2">
            {cleanImages.map((imageUrl, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative h-20 rounded-lg overflow-hidden transition-all ${index === currentIndex
                  ? 'ring-2 ring-flat-btn-primary'
                  : 'hover:ring-2 hover:ring-flat-btn-secondary'
                  }`}
                onClick={() => goToSlide(index)}
              >
                <Image
                  src={imageUrl}
                  alt={`${eventName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, (max-width: 1200px) 16vw, 16vw"
                  onError={(e) => {
                    console.error('Thumbnail failed to load:', imageUrl);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Auto-advance functionality */}
      <div className="mt-2 text-sm text-gray-500 text-center">
        {currentIndex + 1} of {cleanImages.length} images
      </div>
    </div>
  );
}