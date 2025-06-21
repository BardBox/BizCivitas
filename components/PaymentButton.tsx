'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Payment from '@/components/PaymentPage';
import { PaymentProps } from '@/types/payment.types';

// --- Color Variants ---
export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonColors {
  background: string;
  backgroundHover: string;
  text: string;
  textHover?: string;
  border?: string;
  borderHover?: string;
  focus: string;
}

const buttonVariants: Record<ButtonVariant, ButtonColors> = {
  primary: {
    background: 'bg-gradient-to-r from-blue-600 to-blue-700',
    backgroundHover: 'hover:from-blue-700 hover:to-blue-800',
    text: 'text-white',
    focus: 'focus:ring-blue-500'
  },
  secondary: {
    background: 'bg-gradient-to-r from-gray-600 to-gray-700',
    backgroundHover: 'hover:from-gray-700 hover:to-gray-800',
    text: 'text-white',
    focus: 'focus:ring-gray-500'
  },
  success: {
    background: 'bg-gradient-to-r from-green-600 to-green-700',
    backgroundHover: 'hover:from-green-700 hover:to-green-800',
    text: 'text-white',
    focus: 'focus:ring-green-500'
  },
  warning: {
    background: 'bg-gradient-to-r from-yellow-600 to-yellow-700',
    backgroundHover: 'hover:from-yellow-700 hover:to-yellow-800',
    text: 'text-white',
    focus: 'focus:ring-yellow-500'
  },
  danger: {
    background: 'bg-gradient-to-r from-red-600 to-red-700',
    backgroundHover: 'hover:from-red-700 hover:to-red-800',
    text: 'text-white',
    focus: 'focus:ring-red-500'
  },
  outline: {
    background: 'bg-transparent',
    backgroundHover: 'hover:bg-blue-50',
    text: 'text-blue-600',
    textHover: 'hover:text-blue-700',
    border: 'border-2 border-blue-600',
    borderHover: 'hover:border-blue-700',
    focus: 'focus:ring-blue-500'
  },
  ghost: {
    background: 'bg-transparent',
    backgroundHover: 'hover:bg-gray-100',
    text: 'text-gray-700',
    textHover: 'hover:text-gray-900',
    focus: 'focus:ring-gray-300'
  }
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl'
};

// --- Icon Components ---
const PaymentIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const ShoppingCartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-5M7 13l-2.5 5M17 17h0m4 0h0m-4 0a2 2 0 11-4 0 2 2 0 014 0zm0 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2z" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const TicketIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
  </svg>
);

export type IconType = 'payment' | 'cart' | 'user' | 'ticket' | 'none';

const iconComponents: Record<IconType, React.ComponentType<{ className?: string }> | null> = {
  payment: PaymentIcon,
  cart: ShoppingCartIcon,
  user: UserIcon,
  ticket: TicketIcon,
  none: null
};

// --- Loading Component ---
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-gray-600">Loading payment...</span>
  </div>
);

// --- Error Boundary Component ---
const ErrorFallback = ({ error, retry }: { error: string; retry?: () => void }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <div className="text-red-500 mb-4">
      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Error</h3>
    <p className="text-gray-600 mb-4">{error}</p>
    {retry && (
      <button
        onClick={retry}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    )}
  </div>
);

// --- Payment Content Component ---
interface PaymentContentProps extends PaymentProps {
  onError?: (error: string) => void;
}

const PaymentContent = ({ onError, ...paymentData }: PaymentContentProps) => {
  // Validate payment data
  if (!paymentData || !paymentData.amount) {
    const errorMsg = "Invalid payment data provided";
    onError?.(errorMsg);
    return <ErrorFallback error={errorMsg} />;
  }

  try {
    return (
      <Payment
        color={paymentData.color}
        amount={paymentData.amount}
        isEvent={paymentData.isEvent}
        paidFor={paymentData.paidFor}
      />
    );
  } catch (error) {
    const errorMsg = "Failed to load payment component";
    onError?.(errorMsg);
    return <ErrorFallback error={errorMsg} />;
  }
};

// --- Enhanced Payment Dialog Component ---
interface PaymentDialogProps {
  paymentData: PaymentProps;
  children?: React.ReactNode;
  trigger?: React.ReactNode;
  buttonText?: string;
  buttonClassName?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconType;
  iconPosition?: 'left' | 'right';
  showIcon?: boolean;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  animateIcon?: boolean;
}

export default function PaymentDialog({
  paymentData,
  trigger,
  buttonText = "Make Payment",
  buttonClassName,
  variant = 'primary',
  size = 'md',
  icon = 'payment',
  iconPosition = 'left',
  showIcon = true,
  disabled = false,
  loading = false,
  fullWidth = false,
  animateIcon = true
}: PaymentDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleOpen = useCallback(() => {
    if (disabled || loading) return;
    
    setError(null);
    setIsLoading(true);
    setIsOpen(true);
    
    // Simulate loading delay for better UX
    setTimeout(() => setIsLoading(false), 300);
  }, [disabled, loading]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setError(null);
    setIsLoading(false);
  }, []);

  const handleError = useCallback((errorMsg: string) => {
    setError(errorMsg);
    setIsLoading(false);
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  // Build button classes
  const colors = buttonVariants[variant];
  const IconComponent = showIcon && icon !== 'none' ? iconComponents[icon] : null;
  
  const baseClasses = [
    'inline-flex items-center justify-center font-medium rounded-lg shadow-sm',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'transition-all duration-200 transform',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
    buttonSizes[size],
    colors.background,
    colors.backgroundHover,
    colors.text,
    colors.textHover,
    colors.border,
    colors.borderHover,
    colors.focus,
    fullWidth ? 'w-full' : '',
    !disabled && !loading ? 'hover:scale-105 active:scale-95' : '',
    buttonClassName || ''
  ].filter(Boolean).join(' ');

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 30
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 30,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  // Icon animation variants
  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: animateIcon ? 1.1 : 1, 
      rotate: animateIcon ? 5 : 0,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: animateIcon ? 0.95 : 1,
      transition: { duration: 0.1 }
    }
  };

  // Default trigger button
  const defaultTrigger = (
    <motion.button
      onClick={handleOpen}
      className={baseClasses}
      disabled={disabled || loading || !paymentData}
      whileHover={!disabled && !loading ? "hover" : ""}
      whileTap={!disabled && !loading ? "tap" : ""}
      variants={{
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
      }}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2"></div>
          Loading...
        </>
      ) : (
        <>
          {IconComponent && iconPosition === 'left' && (
            <motion.div
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : size === 'xl' ? 'w-7 h-7' : 'w-5 h-5'} mr-2`}
            >
              <IconComponent className="w-full h-full" />
            </motion.div>
          )}
          
          <span>{buttonText}</span>
          
          {IconComponent && iconPosition === 'right' && (
            <motion.div
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : size === 'xl' ? 'w-7 h-7' : 'w-5 h-5'} ml-2`}
            >
              <IconComponent className="w-full h-full" />
            </motion.div>
          )}
        </>
      )}
    </motion.button>
  );

  return (
    <>
      {trigger ? (
        <div onClick={handleOpen} className="cursor-pointer">
          {trigger}
        </div>
      ) : (
        defaultTrigger
      )}

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex h-screen items-center justify-center p-4"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={handleClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto h-screen"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Complete Payment</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Amount: <span className="font-semibold">₹{paymentData?.amount || '0.00'}</span>
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                  aria-label="Close payment dialog"
                >
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <LoadingSpinner />
                    </motion.div>
                  ) : error ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ErrorFallback error={error} retry={handleRetry} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="p-6"
                    >
                      <PaymentContent {...paymentData} onError={handleError} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- Utility Components ---

// Pre-configured payment button variants for common use cases
export const MembershipPaymentButton = (props: Omit<PaymentDialogProps, 'variant' | 'icon' | 'buttonText'> & { 
  buttonText?: string;
}) => (
  <PaymentDialog
    variant="primary"
    icon="user"
    buttonText="Purchase Membership"
    {...props}
  />
);

export const EventRegistrationButton = (props: Omit<PaymentDialogProps, 'variant' | 'icon' | 'buttonText'> & { 
  buttonText?: string;
}) => (
  <PaymentDialog
    variant="success"
    icon="ticket"
    buttonText="Register for Event"
    {...props}
  />
);

export const QuickPayButton = (props: Omit<PaymentDialogProps, 'variant' | 'icon' | 'size'>) => (
  <PaymentDialog
    variant="outline"
    icon="payment"
    size="sm"
    {...props}
  />
);

export const PremiumPayButton = (props: Omit<PaymentDialogProps, 'variant' | 'size' | 'animateIcon'>) => (
  <PaymentDialog
    variant="primary"
    size="lg"
    animateIcon={true}
    {...props}
  />
);

// Export additional components and variants for external use
export { buttonVariants, buttonSizes, iconComponents };