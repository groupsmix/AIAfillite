export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at?: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  category_id: string | null;
  category?: Category | null;
  image_url: string | null;
  affiliate_url: string;
  rating: number | null;
  featured: boolean;
  pros: string[] | null;
  cons: string[] | null;
  features: string[] | null;
  pricing_summary: string | null;
  best_for: string | null;
  seo_title: string | null;
  seo_description: string | null;
  status: 'draft' | 'published';
  created_at?: string;
  updated_at?: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  status: 'draft' | 'published';
  created_at?: string;
  updated_at?: string;
};
