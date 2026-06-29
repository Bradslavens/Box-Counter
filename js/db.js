const DB_NAME = 'box-counter';
const DB_VERSION = 1;
const STORE_NAME = 'counter';
const COUNT_KEY = 'total';

let dbPromise = null;
let dbInstance = null;

/** @internal Test-only reset for module-level DB cache */
export function resetDbForTests() {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
  dbPromise = null;
}

export function openDb() {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };

      request.onsuccess = () => {
        dbInstance = request.result;
        resolve(dbInstance);
      };
      request.onerror = () => reject(request.error);
    });
  }
  return dbPromise;
}

async function readCount(db) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(COUNT_KEY);

    request.onsuccess = () => resolve(request.result ?? 0);
    request.onerror = () => reject(request.error);
  });
}

async function writeCount(db, count) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(count, COUNT_KEY);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getCount() {
  const db = await openDb();
  return readCount(db);
}

export async function setCount(count) {
  const db = await openDb();
  await writeCount(db, count);
}

export async function incrementCount(delta = 1) {
  const db = await openDb();
  const current = await readCount(db);
  const next = current + delta;
  await writeCount(db, next);
  return next;
}
