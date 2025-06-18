'use client'

import React from 'react';
import { Timer } from '@/components/Countdown';
import EnhancedCTA from "@/components/EnhancedCTA";
import { Clock, CheckCircle } from 'lucide-react';

interface ClientTimerProps {
    targetDate?: string; // Date string in format "YYYY-MM-DD HH:MM"
    className?: string;
}

export default function ClientTimer({
    targetDate = "2025-06-28 12:30",
    className = ""
}: ClientTimerProps) {
    return (
        <div className={`bg-black/85 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-white/20 shadow-2xl max-w-md mx-auto ${className}`}>
            <div className="text-center mb-4">
                <h3 className="text-white text-sm md:text-lg font-bold mb-1">🚀 Next Event Starts In</h3>
                <p className="text-gray-300 text-xs md:text-sm">June 28, 2025 • 12:30 PM</p>
            </div>
            <Timer targetDate={targetDate} />
            <EnhancedCTA
                href="/Events"
                variant="outline"
                size="sm"
                className="border-white text-white hover:bg-white hover:text-gray-900"
            >
                Learn More
            </EnhancedCTA>
            <div className="text-center mt-4">
                <p className="text-gray-400 text-xs">Don't miss out on this amazing event!</p>
            </div>
        </div>
    );
}

// Slim Sticky Bottom Timer Component
export function StickyBottomTimer({
    targetDate = "2025-06-28 12:30",
    className = ""
}: ClientTimerProps) {
    const [isFinished, setIsFinished] = React.useState(false);
    const [date, time] = targetDate.split(' ');
    React.useEffect(() => {
        const checkIfFinished = () => {
            const [datePart, timePart] = targetDate.split(' ');
            const [year, month, day] = datePart.split('-').map(Number);
            const [hours, minutes] = timePart.split(':').map(Number);
            
            const targetDateTime = new Date(year, month - 1, day, hours, minutes);
            const now = new Date();
            const difference = targetDateTime.getTime() - now.getTime();
            
            setIsFinished(difference <= 0);
        };

        checkIfFinished();
        const interval = setInterval(checkIfFinished, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className={`fixed bottom-0 left-0 right-0 z-50 sticky-bottom-timer ${isFinished ? 'timer-finished' : ''} ${className}`}>
            {/* Thin animated gradient strip above */}
            <div className={`h-1 ${isFinished ? 'finished-gradient' : 'timer-gradient'}`}></div>
            
            {/* Main timer bar */}
            <div className="bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        {/* Timer Section */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                                    isFinished 
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                                        : 'bg-gradient-to-r from-blue-500 to-purple-500'
                                }`}>
                                    {isFinished ? (
                                        <CheckCircle size={16} className="text-white" />
                                    ) : (
                                        <Clock size={16} className="text-white" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-gray-900 font-semibold text-sm">
                                        {isFinished ? 'Event Time Has Passed!' : 'Next Event Starts In'}
                                    </p>
                                    <p className="text-gray-600 text-xs">{date} • {time}</p>
                                </div>
                            </div>
                            
                            {/* Compact Timer or Finished Message */}
                            <div className="hidden md:flex items-center gap-3">
                                {isFinished ? (
                                    <div className="compact-timer-badge bg-gradient-to-r from-green-100 to-emerald-100 px-6 py-2 rounded-lg border border-green-200">
                                        <span className="font-bold text-green-700 flex items-center gap-2">
                                            <CheckCircle size={16} />
                                            Countdown Finished!
                                        </span>
                                    </div>
                                ) : (
                                    <CompactTimer targetDate={targetDate} />
                                )}
                            </div>
                        </div>
                        
                        {/* CTA Section */}
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:block text-right">
                                <p className="text-gray-900 font-bold text-sm">
                                    {isFinished ? 'Check Event Details!' : "Don't Miss Out!"}
                                </p>
                                <p className="text-gray-600 text-xs">
                                    {isFinished ? 'See what happened' : 'Reserve your spot now'}
                                </p>
                            </div>
                            <EnhancedCTA
                                href="/events"
                                variant="primary"
                                size="sm"
                                className={`text-white shadow-lg transform hover:scale-105 transition-all duration-300 ${
                                    isFinished 
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                                        : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                                }`}
                            >
                                {isFinished ? 'View Event Details →' : 'View Event →'}
                            </EnhancedCTA>
                        </div>
                    </div>
                    
                    {/* Mobile Timer or Finished Message */}
                    <div className="md:hidden mt-3 pt-3 border-t border-gray-200">
                        {isFinished ? (
                            <div className="text-center">
                                <div className="compact-timer-badge bg-gradient-to-r from-green-100 to-emerald-100 px-6 py-2 rounded-lg border border-green-200 inline-block">
                                    <span className="font-bold text-green-700 flex items-center gap-2">
                                        <CheckCircle size={16} />
                                        Countdown Finished!
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <CompactTimer targetDate={targetDate} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Compact Timer for the bottom bar
function CompactTimer({ targetDate }: { targetDate: string }) {
    const getTimeRemaining = () => {
        const [datePart, timePart] = targetDate.split(' ');
        const [year, month, day] = datePart.split('-').map(Number);
        const [hours, minutes] = timePart.split(':').map(Number);
        
        const targetDateTime = new Date(year, month - 1, day, hours, minutes);
        const now = new Date();
        const difference = targetDateTime.getTime() - now.getTime();
        
        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            return { days, hours, minutes, seconds, isFinished: false };
        }
        
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isFinished: true };
    };

    const [timeLeft, setTimeLeft] = React.useState(getTimeRemaining());

    React.useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeRemaining());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (timeLeft.isFinished) {
        return (
            <div className="compact-timer-badge bg-gradient-to-r from-green-100 to-emerald-100 px-6 py-2 rounded-lg border border-green-200">
                <span className="font-bold text-green-700 flex items-center gap-2">
                    <CheckCircle size={16} />
                    Countdown Finished!
                </span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 text-sm">
            {timeLeft.days > 0 && (
                <div className="compact-timer-badge bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1 rounded-lg">
                    <span className="font-bold text-blue-700">{timeLeft.days}</span>
                    <span className="text-blue-600 text-xs ml-1">D</span>
                </div>
            )}
            <div className="compact-timer-badge bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1 rounded-lg">
                <span className="font-bold text-blue-700">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="text-blue-600 text-xs ml-1">H</span>
            </div>
            <div className="compact-timer-badge bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1 rounded-lg">
                <span className="font-bold text-purple-700">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="text-purple-600 text-xs ml-1">M</span>
            </div>
            <div className="compact-timer-badge bg-gradient-to-r from-pink-100 to-rose-100 px-3 py-1 rounded-lg">
                <span className="font-bold text-pink-700">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="text-pink-600 text-xs ml-1">S</span>
            </div>
        </div>
    );
}