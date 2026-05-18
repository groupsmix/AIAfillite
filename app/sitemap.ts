import type { MetadataRoute } from 'next';
import { getCategories, getPosts, getProducts } from '@/lib/data';
import { siteUrl } from '@/lib/env';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, posts] = await Promise.all([getProducts(), getCategories(), getPosts()]);
  const staticRoutes = ['', '/tools', '/categories', '/reviews', '/about', '/contact', '/affiliate-disclosure', '/privacy-policy', '/terms'];
  return [
    ...staticRoutes.map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date() })),
    ...products.map((p) => ({ url: `${siteUrl}/tools/${p.slug}`, lastModified: new Date(p.updated_at || Date.now()) })),
    ...categories.map((c) => ({ url: `${siteUrl}/category/${c.slug}`, lastModified: new Date() })),
    ...posts.map((p) => ({ url: `${siteUrl}/reviews/${p.slug}`, lastModified: new Date(p.updated_at || Date.now()) }))
  ];
}
