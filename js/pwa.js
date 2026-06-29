export async function registerServiceWorker(navigatorLike = globalThis.navigator) {
  if (!navigatorLike?.serviceWorker?.register) {
    return;
  }

  try {
    await navigatorLike.serviceWorker.register('./sw.js', {
      scope: './',
      type: 'module',
    });
  } catch {
    // Offline dev or unsupported context — app still works without SW
  }
}
