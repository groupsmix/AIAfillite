import { AdminApp } from '@/components/AdminApp';
import { makeMetadata } from '@/lib/seo';

export const metadata = makeMetadata({ title: 'Admin', description: 'CompareAI admin dashboard.', path: '/admin' });

export default function AdminPage() {
  return <AdminApp />;
}
