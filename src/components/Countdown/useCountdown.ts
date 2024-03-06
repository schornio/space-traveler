import { useEffect, useRef, useState } from "react";

export function useCountdown(
  initialSeconds: number,
  onCountdownEnd?: () => void
) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) {
      onCountdownEnd?.();
    }
  }, [secondsLeft, onCountdownEnd]);

  const reset = () => {
    setSecondsLeft(initialSeconds);
  };

  return {
    reset,
    secondsLeft,
  };
}
