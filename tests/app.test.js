import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initApp } from '../js/app.js';
import { resetDbForTests } from '../js/db.js';

function createDom() {
  document.body.innerHTML = `
    <main>
      <p id="total" aria-live="polite">0</p>
      <button id="increment" type="button">+ 1 Box</button>
    </main>
  `;
}

describe('app', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    resetDbForTests();
  });

  it('displays the count loaded from storage on init', async () => {
    createDom();
    const db = {
      getCount: vi.fn().mockResolvedValue(42),
      incrementCount: vi.fn(),
    };

    await initApp(db);

    expect(document.getElementById('total').textContent).toBe('42');
  });

  it('increments count and updates display when button is clicked', async () => {
    createDom();
    const db = {
      getCount: vi.fn().mockResolvedValue(5),
      incrementCount: vi.fn().mockResolvedValue(6),
    };

    await initApp(db);
    document.getElementById('increment').click();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(db.incrementCount).toHaveBeenCalledOnce();
    expect(document.getElementById('total').textContent).toBe('6');
  });
});
