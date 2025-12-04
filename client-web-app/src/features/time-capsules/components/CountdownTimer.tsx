'use client';

import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  unlockDate: Date;
  onUnlock?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export function CountdownTimer({ unlockDate, onUnlock, size = 'md' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const unlock = new Date(unlockDate).getTime();
    const difference = unlock - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isUnlocked: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      isUnlocked: false,
    };
  }

  useEffect(() => {
    if (timeLeft.isUnlocked) {
      onUnlock?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft.isUnlocked]);

  if (timeLeft.isUnlocked) {
    return (
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-75 animate-pulse" />
          <div className="relative px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full">
            <span className="text-white font-bold text-sm">Unlocked!</span>
          </div>
        </div>
      </div>
    );
  }

  const sizeClasses = {
    sm: 'text-xs gap-1',
    md: 'text-sm gap-2',
    lg: 'text-base gap-3',
  };

  const numberSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center ${sizeClasses[size]}`}>
      {timeLeft.days > 0 && (
        <TimeUnit value={timeLeft.days} label="Days" size={size} numberSize={numberSizeClasses[size]} />
      )}
      <TimeUnit value={timeLeft.hours} label="Hours" size={size} numberSize={numberSizeClasses[size]} />
      <TimeUnit value={timeLeft.minutes} label="Min" size={size} numberSize={numberSizeClasses[size]} />
      {timeLeft.days === 0 && (
        <TimeUnit value={timeLeft.seconds} label="Sec" size={size} numberSize={numberSizeClasses[size]} />
      )}
    </div>
  );
}

interface TimeUnitProps {
  value: number;
  label: string;
  size: 'sm' | 'md' | 'lg';
  numberSize: string;
}

function TimeUnit({ value, label, size, numberSize }: TimeUnitProps) {
  const formattedValue = value.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-blue-500/20 rounded-lg blur-sm" />
        <div className="relative glass px-3 py-2 rounded-lg border border-emerald-500/30">
          <div className={`${numberSize} font-bold bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent tabular-nums`}>
            {formattedValue}
          </div>
        </div>
      </div>
      <span className="text-gray-400 text-xs mt-1 uppercase tracking-wider">{label}</span>
    </div>
  );
}

