import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

export const Route = createFileRoute('/auth')({
  head: () => ({
    meta: [
      { title: 'تسجيل الدخول — نور القرآن الكريم' },
      { name: 'description', content: 'سجّل الدخول لحفظ تقدّمك في القراءة والاستماع ومزامنته عبر أجهزتك.' },
      { property: 'og:title', content: 'تسجيل الدخول — نور القرآن الكريم' },
      { property: 'og:description', content: 'سجّل الدخول لحفظ تقدّمك في القراءة والاستماع.' },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: '/progress' });
  }, [user, loading, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success('تم إنشاء الحساب! تحقّق من بريدك لتأكيد التسجيل.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success('مرحباً بك — تمت مزامنة تقدّمك.');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ، حاول مرة أخرى.';
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, #0a3d1e 0%, #030a06 70%)' }}
    >
      <div className="w-full max-w-md rounded-2xl border border-amber-700/30 bg-black/40 p-8 backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-amber-200 text-center mb-2">
          {mode === 'signin' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
        </h1>
        <p className="text-center text-emerald-100/70 text-sm mb-6">
          احفظ تقدّمك في القراءة والاستماع ومزامنته عبر أجهزتك
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-emerald-100 mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              dir="ltr"
              className="w-full px-4 py-2.5 rounded-lg bg-emerald-950/50 border border-amber-700/30 text-white focus:outline-none focus:border-amber-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-emerald-100 mb-1">كلمة المرور</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              dir="ltr"
              className="w-full px-4 py-2.5 rounded-lg bg-emerald-950/50 border border-amber-700/30 text-white focus:outline-none focus:border-amber-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="w-full py-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-black font-semibold disabled:opacity-50 transition-colors"
          >
            {busy ? '...' : mode === 'signin' ? 'تسجيل الدخول' : 'إنشاء حساب'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          className="w-full mt-4 text-sm text-emerald-200 hover:text-amber-300 transition-colors"
        >
          {mode === 'signin' ? 'ليس لديك حساب؟ أنشئ حساباً جديداً' : 'لديك حساب؟ سجّل الدخول'}
        </button>

        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-emerald-100/60 hover:text-amber-200">
            العودة إلى الرئيسية
          </Link>
        </div>
      </div>
    </main>
  );
}