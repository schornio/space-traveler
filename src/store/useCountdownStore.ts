import { create } from "zustand";

const ONE_SECOND = 1000;

type CountdownStore = {
  secondsLeft: number;
  intervalRef: number | null;
  setSecondsLeft: (seconds: number) => void;
  startCountdown: (
    initialSeconds: number,
    onCountdownEnd?: () => void
  ) => () => void;
  resetCountdown: (initialSeconds: number) => void;
  stopCountdown: () => void;
};

export const useCountdownStore = create<CountdownStore>((set, get) => ({
  secondsLeft: 0,
  intervalRef: null,

  setSecondsLeft: (seconds) => set({ secondsLeft: seconds }),

  startCountdown: (initialSeconds, onCountdownEnd) => {
    set({ secondsLeft: initialSeconds });

    const interval = setInterval(() => {
      const currentSeconds = get().secondsLeft;

      if (currentSeconds > 0) {
        set({ secondsLeft: currentSeconds - 1 });
      } else {
        clearInterval(interval);
        set({ intervalRef: null });
        onCountdownEnd?.();
      }
    }, ONE_SECOND);

    set({ intervalRef: interval });

    return () => {
      clearInterval(interval);
      set({ intervalRef: null });
    };
  },

  resetCountdown: (initialSeconds) => {
    const { intervalRef } = get();
    if (intervalRef) {
      clearInterval(intervalRef);
    }
    set({ secondsLeft: initialSeconds, intervalRef: null });
  },

  stopCountdown: () => {
    const { intervalRef } = get();
    if (intervalRef) {
      clearInterval(intervalRef);
    }
    set({ intervalRef: null });
  },
}));
