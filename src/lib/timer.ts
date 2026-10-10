export const breakSteps = [
  {
    title: 'Meet the floor.',
    instruction:
      'Sit or stand with support. Notice your feet, gently shift pressure, and take a few easy breaths. Keep your toes relaxed.',
    time: 60,
  },
  {
    title: 'Say hello to your hips.',
    instruction:
      'If comfortable, try 3–5 supported chair squats. Rest between them. Or stay seated and gently alternate lifting your heels. You do not have to move for the whole minute.',
    time: 60,
  },
  {
    title: 'Take the scenic route.',
    instruction:
      'Walk or wheel comfortably for a little while. Staying put? Explore gentle seated marching or another comfortable position. Finish at your own pace.',
    time: 60,
  },
] as const;
export const totalSeconds = breakSteps.reduce((sum, step) => sum + step.time, 0);
export type TimerState = { elapsed: number; running: boolean; lastTick: number | null };
export type TimerAction =
  { type: 'start' | 'pause' | 'tick'; now: number } | { type: 'reset' | 'next' };
export const initialTimer: TimerState = { elapsed: 0, running: false, lastTick: null };
export const stepIndex = (elapsed: number) =>
  Math.min(breakSteps.length - 1, Math.floor(elapsed / 60));
export const timerReducer = (state: TimerState, action: TimerAction): TimerState => {
  switch (action.type) {
    case 'start':
      return state.elapsed >= totalSeconds
        ? state
        : { ...state, running: true, lastTick: action.now };
    case 'pause':
      return {
        ...timerReducer(state, { type: 'tick', now: action.now }),
        running: false,
        lastTick: null,
      };
    case 'reset':
      return { ...initialTimer };
    case 'next': {
      const elapsed = Math.min(totalSeconds, (stepIndex(state.elapsed) + 1) * 60);
      return { ...state, elapsed, running: false, lastTick: null };
    }
    case 'tick': {
      if (!state.running || state.lastTick === null) return state;
      const elapsed = Math.min(
        totalSeconds,
        state.elapsed + Math.max(0, action.now - state.lastTick) / 1000,
      );
      return {
        elapsed,
        running: elapsed < totalSeconds,
        lastTick: elapsed < totalSeconds ? action.now : null,
      };
    }
  }
};
export const formatTime = (seconds: number) =>
  `${Math.floor(Math.ceil(seconds) / 60)}:${String(Math.ceil(seconds) % 60).padStart(2, '0')}`;
