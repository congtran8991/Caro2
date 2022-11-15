import { useState } from "react";
const useTimer = (startTime) => {
  const [time, setTime] = useState(startTime);
  const hasTimerEnded = time <= 0;
  let invalidInterval;

  const startTimer = () => {
    if (!hasTimerEnded) {
      invalidInterval = setInterval(() => {
        setTime((t) => t - 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(invalidInterval);
  };

  const resetStartTime = (newStartTime) => {
    if (hasTimerEnded) {
      setTime(newStartTime)
    }
  }

  return {
    time,
    startTimer,
    stopTimer,
    resetStartTime
  };
};

export default useTimer;
