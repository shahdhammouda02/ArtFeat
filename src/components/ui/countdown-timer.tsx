import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  endTime: Date;
  className?: string;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endTime, className = "" }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0, isExpired: false });

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const endTimeMs = endTime.getTime();
    const difference = endTimeMs - now;

    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds, isExpired: false };
  };

  useEffect(() => {
    // Calculate initial time
    setTimeLeft(calculateTimeLeft());

    // Set up interval to update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [endTime]);

  const formatTime = (time: TimeLeft): string => {
    if (time.isExpired) {
      return "Auction Ended";
    }

    const { hours, minutes, seconds } = time;
    return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
  };

  return (
    <p className={`flex items-center gap-1 text-sm font-semibold ${timeLeft.isExpired ? 'text-red-600' : 'text-sky-600'} ${className}`}>
      <Clock
        size={16}
        className={`transition-colors duration-200 ${timeLeft.isExpired ? 'text-red-500' : 'text-gray-500 group-hover:text-sky-500'}`}
      />
      Auction ends in: <span className={timeLeft.isExpired ? 'text-red-600 font-bold' : 'font-bold'}>{formatTime(timeLeft)}</span>
    </p>
  );
};

export default CountdownTimer;
