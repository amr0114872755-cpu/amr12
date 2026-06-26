import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let unsubscribe: (() => void) | undefined;

    try {
      // Set up listener FIRST to avoid missing the initial event
      const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!mounted) return;
        setUser(session?.user ?? null);
        setLoading(false);
      });
      unsubscribe = () => sub.subscription.unsubscribe();

      // Then hydrate current session. If no account is connected, keep using local progress only.
      supabase.auth
        .getSession()
        .then(({ data }) => {
          if (!mounted) return;
          setUser(data.session?.user ?? null);
          setLoading(false);
        })
        .catch(() => {
          if (!mounted) return;
          setUser(null);
          setLoading(false);
        });
    } catch {
      if (mounted) {
        setUser(null);
        setLoading(false);
      }
    }

    return () => {
      mounted = false;
      unsubscribe?.();
    };
  }, []);

  return { user, loading };
}

export async function signOut() {
  try {
    await supabase.auth.signOut();
  } catch {}
}