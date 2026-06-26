// Service worker for persistent (sticky) notifications.
// The 'prayer-persistent' notification re-shows when the user swipes it away.
// Disabling it is only possible via an explicit message ('disable-persistent')
// from the Prayer Times page.

const STATE_CACHE = 'noor-sw-state-v1';
const STATE_REQ = '/__state/persistent-enabled';
const PERSISTENT_TAG = 'prayer-persistent';

// Any notification whose tag starts with one of these prefixes is treated as
// sticky: dismissing it from the system tray re-shows it. Only an explicit
// 'disable-persistent' message from the website actually clears it.
const PERSISTENT_TAG_PREFIXES = ['prayer-', 'prayer-persistent'];
function isPersistentTag(tag) {
  if (!tag) return false;
  return PERSISTENT_TAG_PREFIXES.some((p) => tag === p || tag.startsWith(p));
}

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

async function readEnabled() {
  try {
    const cache = await caches.open(STATE_CACHE);
    const res = await cache.match(STATE_REQ);
    if (!res) return false;
    const txt = await res.text();
    return txt === '1';
  } catch { return false; }
}

async function writeEnabled(value, snapshot) {
  const cache = await caches.open(STATE_CACHE);
  await cache.put(
    STATE_REQ,
    new Response(value ? '1' : '0', { headers: { 'Content-Type': 'text/plain' } })
  );
  if (snapshot) {
    await cache.put(
      '/__state/persistent-snapshot',
      new Response(JSON.stringify(snapshot), { headers: { 'Content-Type': 'application/json' } })
    );
  }
}

async function readSnapshot() {
  try {
    const cache = await caches.open(STATE_CACHE);
    const res = await cache.match('/__state/persistent-snapshot');
    if (!res) return null;
    return await res.json();
  } catch { return null; }
}

async function showPersistent(title, body) {
  await self.registration.showNotification(title, {
    body,
    tag: PERSISTENT_TAG,
    renotify: false,
    requireInteraction: true,
    silent: true,
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    dir: 'rtl',
    lang: 'ar',
  });
}

self.addEventListener('message', async (event) => {
  const data = event.data || {};
  if (data.type === 'show-persistent') {
    await writeEnabled(true, { title: data.title, body: data.body });
    await showPersistent(data.title, data.body);
  } else if (data.type === 'disable-persistent') {
    await writeEnabled(false);
    const notes = await self.registration.getNotifications({ tag: PERSISTENT_TAG });
    notes.forEach((n) => n.close());
  } else if (data.type === 'enable-persistent') {
    await writeEnabled(true);
  }
});

// Re-show the sticky notification whenever the user dismisses it,
// unless it was explicitly disabled from the Prayer Times page.
self.addEventListener('notificationclose', (event) => {
  const note = event.notification;
  if (!note) return;
  const tag = note.tag || '';
  const dataPersistent = !!(note.data && note.data.persistent);
  if (!dataPersistent && !isPersistentTag(tag)) return;
  const title = note.title;
  const body = note.body;
  const icon = note.icon || '/favicon.ico';
  const badge = note.badge || '/favicon.ico';
  const data = note.data || {};
  event.waitUntil((async () => {
    const enabled = await readEnabled();
    if (!enabled) return;
    await new Promise((r) => setTimeout(r, 400));
    const snap = await readSnapshot();
    await self.registration.showNotification(title || snap?.title || 'نور القرآن الكريم', {
      body: body || snap?.body || '',
      tag: tag || PERSISTENT_TAG,
      renotify: false,
      requireInteraction: true,
      silent: true,
      icon,
      badge,
      dir: 'rtl',
      lang: 'ar',
      data: { ...data, persistent: true },
    });
  })());
});

self.addEventListener('notificationclick', (event) => {
  const url = (event.notification && event.notification.data && event.notification.data.url) || '/more/prayer-times';
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const c of clients) {
        if ('focus' in c) {
          if ('navigate' in c) { try { c.navigate(url); } catch {} }
          return c.focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});

// ---- Background Web Push ----
// Delivers prayer-time and update notifications even when the site is closed.
self.addEventListener('push', (event) => {
  let payload = {};
  try { payload = event.data ? event.data.json() : {}; } catch { payload = {}; }
  const title = payload.title || '🕌 نور القرآن الكريم';
  const body = payload.body || '';
  const tag = payload.tag || 'noor-push';
  const url = payload.url || '/';
  const persistent = !!payload.persistent || isPersistentTag(tag);
  const playAdhan = !!payload.playAdhan;
  const prayerKey = payload.prayerKey || null;
  const reciterId = payload.reciterId || null;

  event.waitUntil(
    (async () => {
      // Ask any open client to play the adhan (SW itself cannot play audio).
      let focusedClient = null;
      if (playAdhan) {
        try {
          const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
          for (const c of all) {
            try { c.postMessage({ type: 'play-adhan', prayerKey, reciterId }); } catch {}
            if (!focusedClient && (c.visibilityState === 'visible' || c.focused)) {
              focusedClient = c;
            }
          }
          if (!focusedClient && all.length > 0) focusedClient = all[0];
        } catch {}
      }

      // If a visible client received the play-adhan message, skip showing a duplicate
      // notification — the page already renders its own adhan modal + audio.
      if (playAdhan && focusedClient && focusedClient.visibilityState === 'visible') {
        return;
      }

      if (persistent) {
        await writeEnabled(true, { title, body });
      }
      await self.registration.showNotification(title, {
        body,
        tag,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        requireInteraction: persistent || !!payload.requireInteraction,
        silent: !!payload.silent,
        dir: 'rtl',
        lang: 'ar',
        data: { url, persistent, playAdhan, prayerKey, reciterId },
      });
    })()
  );
});

// Re-subscribe if the browser rotates the push endpoint.
self.addEventListener('pushsubscriptionchange', (event) => {
  event.waitUntil((async () => {
    try {
      const oldEndpoint = event.oldSubscription && event.oldSubscription.endpoint;
      if (oldEndpoint) {
        try {
          await fetch('/api/public/push/unsubscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ endpoint: oldEndpoint }),
          });
        } catch {}
      }
      const sub = event.newSubscription;
      if (!sub) return;
      const json = sub.toJSON();
      await fetch('/api/public/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: json.endpoint,
          p256dh: json.keys && json.keys.p256dh,
          auth: json.keys && json.keys.auth,
        }),
      });
    } catch {}
  })());
});
