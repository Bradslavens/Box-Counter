export function createCounter(initialCount = 0) {
  return { count: initialCount };
}

export function increment(counter, delta = 1) {
  return { count: counter.count + delta };
}
