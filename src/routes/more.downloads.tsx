import { createFileRoute } from '@tanstack/react-router';
import DownloadsPageClient from '@/components/more/DownloadsPageClient';

export const Route = createFileRoute('/more/downloads')({
  head: () => ({
    meta: [
      { title: 'التحميلات للاستخدام بدون نت' },
      { name: 'description', content: 'حمّل سور القرآن بصوت قارئك المفضل للاستماع بدون إنترنت.' },
    ],
  }),
  component: DownloadsPageClient,
});
