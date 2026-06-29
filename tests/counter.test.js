import { describe, it, expect } from 'vitest';
import { createCounter, increment } from '../js/counter.js';

describe('counter', () => {
  describe('createCounter', () => {
    it('starts at the given count', () => {
      const counter = createCounter(0);
      expect(counter.count).toBe(0);
    });

    it('accepts a non-zero initial count', () => {
      const counter = createCounter(42);
      expect(counter.count).toBe(42);
    });
  });

  describe('increment', () => {
    it('adds 1 by default', () => {
      const counter = createCounter(0);
      const next = increment(counter);
      expect(next.count).toBe(1);
    });

    it('adds to an existing count', () => {
      const counter = createCounter(10);
      const next = increment(counter);
      expect(next.count).toBe(11);
    });

    it('does not mutate the original counter', () => {
      const counter = createCounter(5);
      increment(counter);
      expect(counter.count).toBe(5);
    });
  });
});
