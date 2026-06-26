// Subscribes the current device to Web Push and syncs settings to the server.
// Safe to call multiple times — it upserts by endpoint.

import { useCallback } from 'react';
import { VAPID_PUBLIC_KEY, urlBase64ToUint8Array } from '@/lib/push/vapid';

const PRAYER_KEY = 'prayer-settings-v1';

function isPreviewHost(): boolean {
  if (typeof window === 'undefined') return true;
  const host = window.location.hostname;
  const inIframe = window.self !== window.top;
  return (
    inIframe ||
    host.startsWith('id-preview--') ||
    host.startsWith('preview--') ||
    host.endsWith('.lovableproject.com') ||
    host.endsWith('.lovableproject-dev.com')
  );
}

async function getRegistration(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return null;
  if (isPreviewHost()) return null;
  try {
    const existing = await navigator.serviceWorker.getRegistration('/notification-sw.js');
    if (existing) return existing;
    return await navigator.serviceWorker.register('/notification-sw.js', { scope: '/' });
  } catch {
    return null;
  }
}

async function getCurrentLocation(): Promise<{ latitude: number; longitude: number } | null> {
  // Use the unified location helper — reads the cached fix if available, so
  // we don't trigger a second permission prompt right after the user enabled
  // notifications.
  try {
    const { getLocation } = await import('@/lib/native/location');
    const fix = await getLocation({ timeoutMs: 6000, highAccuracy: false });
    if (!fix) return null;
    return { latitude: fix.latitude, longitude: fix.longitude };
  } catch {
    return null;
  }
}

function readLocalSettings() {
  try {
    const raw = localStorage.getItem(PRAYER_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      reciterId: typeof parsed.reciterId === 'string' ? parsed.reciterId : undefined,
      enabledPrayers: parsed.enabledPrayers && typeof parsed.enabledPrayers === 'object'
        ? parsed.enabledPrayers as Record<string, boolean>
        : undefined,
    };
  } catch {
    return { reciterId: undefined, enabledPrayers: undefined };
  }
}

export function useWebPush() {
  const subscribe = useCallback(async (): Promise<boolean> => {
    if (typeof window === 'undefined') return false;
    if (!('Notification' in window) || Notification.permission !== 'granted') return false;
    const reg = await getRegistration();
    if (!reg) return false;
    if (!('pushManager' in reg)) return false;

    await navigator.serviceWorker.ready;

    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      try {
        const key = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: key.buffer.slice(key.byteOffset, key.byteOffset + key.byteLength) as ArrayBuffer,
        });
      } catch {
        return false;
      }
    }
    if (!sub) return false;

    const json = sub.toJSON() as { endpoint?: string; keys?: { p256dh?: string; auth?: string } };
    if (!json.endpoint || !json.keys?.p256dh || !json.keys?.auth) return false;

    const loc = await getCurrentLocation();
    const local = readLocalSettings();
    const timezone = (() => {
      try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch { return undefined; }
    })();

    try {
      await fetch('/api/public/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: json.endpoint,
          p256dh: json.keys.p256dh,
          auth: json.keys.auth,
          user_agent: navigator.userAgent.slice(0, 500),
          latitude: loc?.latitude ?? null,
          longitude: loc?.longitude ?? null,
          timezone,
          reciter_id: local.reciterId ?? null,
          enabled_prayers: local.enabledPrayers,
          notify_updates: true,
        }),
        keepalive: true,
      });
      try { localStorage.setItem('web-push-subscribed', '1'); } catch {}
      return true;
    } catch {
      return false;
    }
  }, []);

  const unsubscribe = useCallback(async (): Promise<void> => {
    const reg = await getRegistration();
    if (!reg) return;
    const sub = await reg.pushManager.getSubscription();
    if (!sub) return;
    const endpoint = sub.endpoint;
    try { await sub.unsubscribe(); } catch {}
    try {
      await fetch('/api/public/push/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint }),
        keepalive: true,
      });
    } catch {}
    try { localStorage.removeItem('web-push-subscribed'); } catch {}
  }, []);

  return { subscribe, unsubscribe };
}
