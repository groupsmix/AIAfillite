import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { getCategoryBySlug, getProducts } from '@/lib/data';
import { makeMetadata } from '@/lib/seo';

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  return makeMetadata({ title: category?.name || 'Category', description: category?.description || 'Browse AI tools by category.', path: `/category/${slug}` });
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();
  const products = await getProducts({ categorySlug: slug });
  return (
    <section className="container section">
      <div className="grid-12">
        <div className="col-span-4 md:col-span-8 lg:col-span-7">
          <p className="eyebrow">Category</p>
          <h1 className="h1 mt-6">{category.name}</h1>
          <p className="lead mt-8 max-w-3xl">{category.description}</p>
        </div>
      </div>
      <div className="mt-16 grid-12">
        {products.length ? products.map((product, index) => (
          <div key={product.id} className="col-span-4 md:col-span-4 lg:col-span-4">
            <ProductCard product={product} rank={index + 1} />
          </div>
        )) : <p className="col-span-4 md:col-span-8 lg:col-span-12 body-copy">No tools in this category yet.</p>}
      </div>
    </section>
  );
}
