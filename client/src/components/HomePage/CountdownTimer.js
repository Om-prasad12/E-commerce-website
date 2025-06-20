import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center space-x-4 ">
      <div className="flex flex-col items-center">
        <span className="text-sm font-semibold ">Days</span>
        <span className="text-xl font-bold">{timeLeft.days}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-sm font-semibold">Hours</span>
        <span className="text-xl font-bold">{timeLeft.hours}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-sm font-semibold">Minutes</span>
        <span className="text-xl font-bold">{timeLeft.minutes}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-sm font-semibold">Seconds</span>
        <span className="text-xl font-bold">{timeLeft.seconds}</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
