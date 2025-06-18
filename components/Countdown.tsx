import React, { Component } from 'react';

import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

class Completed extends Component {
  render() {
    return (
      <div className="text-center py-8">
        <p className="text-xl font-bold text-white mb-2">🎉 Event Has Started!</p>
        <p className="text-gray-300">Check back for our next amazing event</p>
      </div>
    );
  }
}

interface TimerProps {
  targetDate?: string; // Date string in format "YYYY-MM-DD HH:MM"
}

export class Timer extends Component<TimerProps> {
  getTargetTimestamp() {
    const { targetDate = "2025-06-18 23:04" } = this.props;
    
    // Parse the date string and create a proper Date object
    const [datePart, timePart] = targetDate.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);
    
    const targetDateTime = new Date(year, month - 1, day, hours, minutes);
    
    return targetDateTime.getTime();
  }

  render() {
    const targetTimestamp = this.getTargetTimestamp();
    
    return (
      <div className="flex justify-center">
        <FlipClockCountdown
          to={targetTimestamp}
          labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
          labelStyle={{ 
            fontSize: 10, 
            fontWeight: 600, 
            textTransform: 'uppercase',
            color: '#e5e7eb', // gray-200
            letterSpacing: '0.1em'
          }}
          digitBlockStyle={{ 
            width: 40, 
            height: 60, 
            fontSize: 24,
            fontWeight: 'bold',
            backgroundColor: '#1f2937', // gray-800
            color: '#ffffff',
            borderRadius: '8px',
            border: '2px solid #374151', // gray-700
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
          }}
          dividerStyle={{ 
            color: '#9ca3af', // gray-400
            height: 2
          }}
          separatorStyle={{ 
            color: '#10b981', // emerald-500
            size: '6px',
            fontWeight: 'bold'
          }}
          duration={0.8}
          className="countdown-enhanced"
        >
          <Completed />
        </FlipClockCountdown>
      </div>
    );
  }
}