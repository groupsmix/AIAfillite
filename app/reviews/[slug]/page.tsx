import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/data';
import { makeMetadata } from '@/lib/seo';

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return makeMetadata({ title: post?.seo_title || post?.title || 'Review', description: post?.seo_description || post?.excerpt || 'CompareAI review.', path: `/reviews/${slug}`, image: post?.image_url });
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  return (
    <article className="container section">
      <div className="grid-12">
        <header className="col-span-4 md:col-span-8 lg:col-span-8">
          <p className="eyebrow">Review article</p>
          <h1 className="h1 mt-6">{post.title}</h1>
          <p className="lead mt-8 max-w-3xl">{post.excerpt}</p>
        </header>
        <div className="prose-lite col-span-4 mt-8 md:col-span-8 lg:col-span-7 lg:col-start-3">
          {(post.content || '').split('\n').filter(Boolean).map((p) => <p key={p}>{p}</p>)}
          <p className="mt-14 border-l-2 border-[#111827] bg-[#f3f4f6] p-5 text-sm text-[#111827]">Affiliate disclosure: this article may contain affiliate links. We may earn a commission at no extra cost to you.</p>
        </div>
      </div>
    </article>
  );
}
