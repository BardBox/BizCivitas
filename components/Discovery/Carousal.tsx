'use client';

import { useState, useEffect } from 'react';
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

    // Auto-advance functionality - every 3 seconds
    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const openFullscreen = () => {
        setIsFullscreen(true);
    };

    const closeFullscreen = () => {
        setIsFullscreen(false);
    };

    return (
        <div className='w-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#ACB7D9] to-white'>

            <div
                className="mt-8 "
            >

                <div className="relative flex justify-center">
                    {/* Main Carousel with responsive width */}
                    <div
                        className="carousel-container relative h-[80vh] rounded-xl  "
                       
                    >
                        {/* Apply 70vw width only for screens >= 1440px */}
                        <style>{`
            @media (max-width: 1440px) {
                .carousel-container {
                width: 70vw !important;
              }
              }
            @media (max-width: 948px) {
                .carousel-container {
                width: 85vw !important;
              }
              }
            @media (max-width: 798px) {
                .carousel-container {
                width: 100vw !important;
              }
              }
          `}</style>

                        <div className="carousel-container flex align-center justify-center" style={{ width: '100%', height: '100%' }}>
                            {/* Main Image - clickable for fullscreen */}
                            <motion.div
                                className="relative w-full h-full cursor-zoom-in flex align-center justify-center"

                                whileHover={{ scale: 1.005 }}
                                transition={{ duration: 0.2 }}
                            >

                                <h3 className="text-5xl font-bold mt-16 text-blue-500 text-center">
                                    What inspires our journey
                                </h3>
                                <Image
                                    src={images[currentIndex]}
                                    alt={`${eventName} image Quotes of the Successfull leader like Richard Branson, Robert Kiyosaki, Porter Gale ${currentIndex + 1}`}
                                    fill
                                    className="object-contain translate-y-0"
                                    onError={(e) => {
                                        console.error('Image failed to load:', images[currentIndex]);
                                    }}
                                />
                            </motion.div>

                            {/* Navigation Arrows */}
                            {images.length > 1 && (
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
                        </div>
                    </div>
                </div>

                {/* Fullscreen Modal */}
                <AnimatePresence>
                    {isFullscreen && (
                        <motion.div
                            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeFullscreen}
                        >
                            <motion.div
                                className="relative max-w-screen-lg max-h-screen-lg"
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.8 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Image
                                    src={images[currentIndex]}
                                    alt={`${eventName} fullscreen image ${currentIndex + 1}`}
                                    width={1200}
                                    height={800}
                                    className="object-contain max-h-[90vh] max-w-[90vw]"
                                />
                                <button
                                    className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
                                    onClick={closeFullscreen}
                                >
                                    ×
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Image counter */}
                <div className="mt-2 text-sm text-gray-500 text-center">
                    {currentIndex + 1} of {images.length} images
                </div>
            </div>
        </div>
    );
}