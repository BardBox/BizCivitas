'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles } from 'lucide-react';
import EventRegistrationModal from './EventRegistrationModal';

interface EventRegistrationButtonProps {
  eventName: string;
  eventSlug: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'orange' | 'orange-rounded';
  size?: 'sm' | 'md' | 'lg';
}

export default function EventRegistrationButton({
  eventName,
  eventSlug,
  className = '',
  variant = 'primary',
  size = 'md',
}: EventRegistrationButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-gray-900 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 shadow-md hover:shadow-lg',
    orange: 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl',
    'orange-rounded': 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl',
  };

  const getBorderRadius = () => {
    if (variant === 'orange-rounded') return 'rounded-full';
    return 'rounded-lg';
  };

  return (
    <>
      <motion.button
        whileHover={{ 
          scale: 1.02, 
          y: -2,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsModalOpen(true)}
        className={`
          relative inline-flex items-center justify-center space-x-2 font-semibold ${getBorderRadius()}
          transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          overflow-hidden group
          ${sizeClasses[size]} ${variantClasses[variant]} ${className}
        `}
      >
        {/* Animated background effect */}
        <motion.div
          className={`absolute inset-0 ${getBorderRadius()} opacity-0 bg-gradient-to-r from-blue-400 to-purple-400`}
          whileHover={{ opacity: 0.1 }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "linear"
          }}
        />
        
        {/* Button content */}
        <div className="relative flex items-center space-x-2 z-10">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatDelay: 3,
              ease: "easeInOut"
            }}
          >
            <Calendar className="w-5 h-5" />
          </motion.div>
          <span className="font-semibold">Register for Event</span>
          
          {/* Sparkle effect */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
        </div>
        
        {/* Pulse effect on hover */}
        <motion.div
          className={`absolute inset-0 ${getBorderRadius()} border-2 border-white/50`}
          initial={{ scale: 0.8, opacity: 0 }}
          whileHover={{ 
            scale: 1.05, 
            opacity: 1,
            transition: { duration: 0.3 }
          }}
        />
      </motion.button>

      <EventRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventName={eventName}
        eventSlug={eventSlug}
      />
    </>
  );
}
