import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getCheckInResult, type Experience, type Context } from '../src/lib/check-in';
import { initialTimer, timerReducer, formatTime, stepIndex } from '../src/lib/timer';

test('emergency and concerning symptoms always take priority over exercise preferences', () => {
  for (const experience of ['stiff', 'strength', 'curious'] as Experience[]) {
    for (const context of ['desk', 'active', 'mixed'] as Context[]) {
      for (const safety of ['urgent', 'concern'] as const) {
        const result = getCheckInResult({ safety, experience, context });
        assert.equal(result.kind, safety);
        assert.equal(result.route, 'learn/#get-help');
        assert.doesNotMatch(result.label, /Try|movement guide/i);
      }
    }
  }
});
test('clear check-ins offer distinct, non-diagnostic next steps', () => {
  assert.equal(
    getCheckInResult({ safety: 'clear', experience: 'stiff', context: 'desk' }).route,
    'reset/',
  );
  assert.equal(
    getCheckInResult({ safety: 'clear', experience: 'strength', context: 'active' }).route,
    'moves/',
  );
  assert.equal(
    getCheckInResult({ safety: 'clear', experience: 'curious', context: 'mixed' }).route,
    'learn/',
  );
});
test('timer uses elapsed wall time, supports pause/resume, and never counts time while paused', () => {
  const started = timerReducer(initialTimer, { type: 'start', now: 1000 });
  const delayed = timerReducer(started, { type: 'tick', now: 11500 });
  assert.equal(delayed.elapsed, 10.5);
  const paused = timerReducer(delayed, { type: 'pause', now: 12000 });
  assert.equal(paused.elapsed, 11);
  assert.deepEqual(timerReducer(paused, { type: 'tick', now: 99000 }), paused);
  const resumed = timerReducer(paused, { type: 'start', now: 100000 });
  assert.equal(timerReducer(resumed, { type: 'tick', now: 102000 }).elapsed, 13);
});
test('skip pauses at the next invitation; completion clamps at 180 seconds and reset clears state', () => {
  const started = timerReducer(initialTimer, { type: 'start', now: 0 });
  const skipped = timerReducer(started, { type: 'next' });
  assert.equal(skipped.elapsed, 60);
  assert.equal(skipped.running, false);
  assert.equal(stepIndex(skipped.elapsed), 1);
  const completed = timerReducer(started, { type: 'tick', now: 999999 });
  assert.equal(completed.elapsed, 180);
  assert.equal(completed.running, false);
  assert.equal(completed.lastTick, null);
  assert.deepEqual(timerReducer(completed, { type: 'start', now: 1000000 }), completed);
  assert.deepEqual(timerReducer(completed, { type: 'reset' }), initialTimer);
});
test('clock formatting rounds up without negative values at boundaries', () => {
  assert.equal(formatTime(60), '1:00');
  assert.equal(formatTime(0.2), '0:01');
  assert.equal(formatTime(0), '0:00');
});
