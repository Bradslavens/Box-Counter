import { describe, it, expect, vi } from 'vitest';
import { registerServiceWorker } from '../js/pwa.js';

describe('registerServiceWorker', () => {
  it('registers sw.js when service workers are supported', async () => {
    const register = vi.fn().mockResolvedValue({});
    await registerServiceWorker({
      serviceWorker: { register },
    });

    expect(register).toHaveBeenCalledWith('./sw.js', {
      scope: './',
      type: 'module',
    });
  });

  it('does nothing when service workers are unavailable', async () => {
    await expect(registerServiceWorker({})).resolves.toBeUndefined();
  });

  it('swallows registration errors', async () => {
    const register = vi.fn().mockRejectedValue(new Error('blocked'));
    await expect(
      registerServiceWorker({ serviceWorker: { register } }),
    ).resolves.toBeUndefined();
  });
});
