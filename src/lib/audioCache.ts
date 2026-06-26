const DB_NAME = 'ruqyah-audio';
const STORE = 'sheikhs';
const VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function withStore<T>(
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => IDBRequest<T> | Promise<T>,
): Promise<T> {
  const db = await openDB();
  return new Promise<T>((resolve, reject) => {
    const tx = db.transaction(STORE, mode);
    const store = tx.objectStore(STORE);
    let result: T;
    Promise.resolve(fn(store))
      .then((r) => {
        if (r && typeof (r as IDBRequest).onsuccess !== 'undefined') {
          const req = r as IDBRequest<T>;
          req.onsuccess = () => {
            result = req.result;
          };
          req.onerror = () => reject(req.error);
        } else {
          result = r as T;
        }
      })
      .catch(reject);
    tx.oncomplete = () => resolve(result);
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

export async function getCached(id: string): Promise<Blob | null> {
  try {
    const blob = await withStore<Blob | undefined>('readonly', (s) => s.get(id) as IDBRequest<Blob | undefined>);
    return blob ?? null;
  } catch {
    return null;
  }
}

export async function saveCached(id: string, blob: Blob): Promise<void> {
  await withStore('readwrite', (s) => s.put(blob, id));
}

export async function deleteCached(id: string): Promise<void> {
  try {
    await withStore('readwrite', (s) => s.delete(id));
  } catch {
    /* ignore */
  }
}

export async function hasCached(id: string): Promise<boolean> {
  try {
    const key = await withStore<IDBValidKey | undefined>('readonly', (s) => s.getKey(id) as IDBRequest<IDBValidKey | undefined>);
    return key !== undefined;
  } catch {
    return false;
  }
}

export async function listCached(): Promise<string[]> {
  try {
    const keys = await withStore<IDBValidKey[]>('readonly', (s) => s.getAllKeys() as IDBRequest<IDBValidKey[]>);
    return keys.map((k) => String(k));
  } catch {
    return [];
  }
}