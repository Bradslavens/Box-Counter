import { describe, it, expect, beforeEach } from 'vitest';
import 'fake-indexeddb/auto';
import { openDb, getCount, setCount, incrementCount, resetDbForTests } from '../js/db.js';

describe('db', () => {
  beforeEach(async () => {
    resetDbForTests();
    await new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase('box-counter');
      request.onsuccess = () => resolve();
      request.onblocked = () => resolve();
      request.onerror = () => reject(request.error);
    });
  });

  describe('getCount', () => {
    it('returns 0 when no count has been saved', async () => {
      await openDb();
      expect(await getCount()).toBe(0);
    });

    it('returns the saved count', async () => {
      await openDb();
      await setCount(42);
      expect(await getCount()).toBe(42);
    });
  });

  describe('setCount', () => {
    it('persists the count across reads', async () => {
      await openDb();
      await setCount(100);
      expect(await getCount()).toBe(100);
    });

    it('overwrites a previous count', async () => {
      await openDb();
      await setCount(10);
      await setCount(25);
      expect(await getCount()).toBe(25);
    });
  });

  describe('incrementCount', () => {
    it('increments from 0 by 1 by default', async () => {
      await openDb();
      const result = await incrementCount();
      expect(result).toBe(1);
      expect(await getCount()).toBe(1);
    });

    it('increments an existing count', async () => {
      await openDb();
      await setCount(5);
      const result = await incrementCount();
      expect(result).toBe(6);
      expect(await getCount()).toBe(6);
    });

    it('accepts a custom delta', async () => {
      await openDb();
      await setCount(10);
      const result = await incrementCount(3);
      expect(result).toBe(13);
    });
  });
});
