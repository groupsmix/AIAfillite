insert into public.categories (name, slug, description) values
('AI Writing Tools', 'ai-writing-tools', 'Tools for blog posts, ads, email writing, and copywriting.'),
('AI Image Tools', 'ai-image-tools', 'Tools for image generation, editing, and creative design.'),
('AI Video Tools', 'ai-video-tools', 'Tools for video generation, editing, and repurposing.'),
('SEO Tools', 'seo-tools', 'Tools for keyword research, content optimization, and rankings.'),
('AI Coding Tools', 'ai-coding-tools', 'Tools for coding assistance and developer productivity.'),
('Productivity Tools', 'productivity-tools', 'Tools for automation, notes, meetings, and workflows.')
on conflict (slug) do nothing;

insert into public.products (
  name, slug, short_description, description, category_id, affiliate_url, rating, featured,
  pros, cons, features, pricing_summary, best_for, seo_title, seo_description, status
) values (
  'Example AI Writer',
  'example-ai-writer',
  'A sample AI writing tool card. Replace it with your first real affiliate product.',
  'This is a starter product used to verify that CompareAI is connected to Supabase and publishing content correctly.',
  (select id from public.categories where slug = 'ai-writing-tools'),
  'https://example.com',
  4.7,
  true,
  array['Easy to use', 'Fast content drafts', 'Good for beginners'],
  array['Replace placeholder before launch', 'Verify real pricing'],
  array['Blog outlines', 'Ad copy', 'Email drafts'],
  'Add real pricing details from the official product page.',
  'Creators, marketers, and founders testing AI writing tools.',
  'Example AI Writer Review',
  'Read this placeholder AI writer review and replace it with your real affiliate content.',
  'published'
) on conflict (slug) do nothing;
