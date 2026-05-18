import { getSupabaseOrNull } from './supabase';
import type { Category, Product, Post } from './types';

const sampleCategory: Category = {
  id: 'sample-ai-writing',
  name: 'AI Writing Tools',
  slug: 'ai-writing-tools',
  description: 'Tools for copywriting, blogging, and content creation.'
};

export const sampleProducts: Product[] = [
  {
    id: 'sample-1',
    name: 'Example AI Writer',
    slug: 'example-ai-writer',
    short_description: 'A placeholder AI writing assistant for your first affiliate card.',
    description: 'Replace this sample product with a real AI tool from your Supabase admin dashboard.',
    category_id: sampleCategory.id,
    category: sampleCategory,
    image_url: null,
    affiliate_url: 'https://example.com',
    rating: 4.7,
    featured: true,
    pros: ['Fast setup', 'Good templates', 'Beginner friendly'],
    cons: ['Placeholder content', 'Replace before launch'],
    features: ['Blog drafts', 'Ad copy', 'Email writing'],
    pricing_summary: 'Add real pricing information in the admin dashboard.',
    best_for: 'Creators, marketers, and small teams testing AI writing tools.',
    seo_title: null,
    seo_description: null,
    status: 'published'
  }
];

export const sampleCategories: Category[] = [sampleCategory];

export async function getCategories(): Promise<Category[]> {
  const supabase = getSupabaseOrNull();
  if (!supabase) return sampleCategories;
  const { data, error } = await supabase.from('categories').select('*').order('name');
  if (error) return sampleCategories;
  return data || [];
}

export async function getProducts(options?: { featured?: boolean; categorySlug?: string; limit?: number }): Promise<Product[]> {
  const supabase = getSupabaseOrNull();
  if (!supabase) return sampleProducts;

  let query = supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('status', 'published')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (options?.featured) query = query.eq('featured', true);
  if (options?.limit) query = query.limit(options.limit);

  const { data, error } = await query;
  if (error) return [];
  let products = (data || []) as Product[];
  if (options?.categorySlug) products = products.filter((p) => p.category?.slug === options.categorySlug);
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getSupabaseOrNull();
  if (!supabase) return sampleProducts.find((p) => p.slug === slug) || null;
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();
  if (error) return null;
  return data as Product | null;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) || null;
}

export async function getPosts(limit?: number): Promise<Post[]> {
  const supabase = getSupabaseOrNull();
  if (!supabase) return [];
  let query = supabase.from('posts').select('*').eq('status', 'published').order('created_at', { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) return [];
  return (data || []) as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = getSupabaseOrNull();
  if (!supabase) return null;
  const { data, error } = await supabase.from('posts').select('*').eq('slug', slug).eq('status', 'published').maybeSingle();
  if (error) return null;
  return data as Post | null;
}
