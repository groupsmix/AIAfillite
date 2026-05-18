-- CompareAI production MVP schema
-- Run this in Supabase SQL Editor or via Supabase CLI.

create extension if not exists pgcrypto;

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  created_at timestamptz default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  short_description text,
  description text,
  category_id uuid references public.categories(id) on delete set null,
  image_url text,
  affiliate_url text not null,
  rating numeric check (rating is null or (rating >= 0 and rating <= 5)),
  featured boolean default false,
  pros text[] default '{}',
  cons text[] default '{}',
  features text[] default '{}',
  pricing_summary text,
  best_for text,
  seo_title text,
  seo_description text,
  status text default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  image_url text,
  seo_title text,
  seo_description text,
  status text default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.affiliate_clicks (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete cascade,
  clicked_at timestamptz default now(),
  referrer text,
  user_agent text
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  ip_address text,
  created_at timestamptz default now()
);

create index if not exists idx_products_status on public.products(status);
create index if not exists idx_products_slug on public.products(slug);
create index if not exists idx_products_category on public.products(category_id);
create index if not exists idx_posts_status on public.posts(status);
create index if not exists idx_posts_slug on public.posts(slug);
create index if not exists idx_clicks_product on public.affiliate_clicks(product_id);
create index if not exists idx_clicks_clicked_at on public.affiliate_clicks(clicked_at);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at before update on public.products for each row execute function public.set_updated_at();

drop trigger if exists set_posts_updated_at on public.posts;
create trigger set_posts_updated_at before update on public.posts for each row execute function public.set_updated_at();

alter table public.admins enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.posts enable row level security;
alter table public.affiliate_clicks enable row level security;
alter table public.contact_messages enable row level security;

-- Admins table: only admins can read admin list; inserts should be done manually from SQL editor/service role.
drop policy if exists "Admins can read admins" on public.admins;
create policy "Admins can read admins" on public.admins for select to authenticated using (public.is_admin());

-- Categories: public read, admin write.
drop policy if exists "Public can read categories" on public.categories;
create policy "Public can read categories" on public.categories for select to anon, authenticated using (true);
drop policy if exists "Admins can manage categories" on public.categories;
create policy "Admins can manage categories" on public.categories for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Products: public can read published; admins can manage all.
drop policy if exists "Public can read published products" on public.products;
create policy "Public can read published products" on public.products for select to anon, authenticated using (status = 'published' or public.is_admin());
drop policy if exists "Admins can insert products" on public.products;
create policy "Admins can insert products" on public.products for insert to authenticated with check (public.is_admin());
drop policy if exists "Admins can update products" on public.products;
create policy "Admins can update products" on public.products for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Admins can delete products" on public.products;
create policy "Admins can delete products" on public.products for delete to authenticated using (public.is_admin());

-- Posts: public can read published; admins can manage all.
drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts" on public.posts for select to anon, authenticated using (status = 'published' or public.is_admin());
drop policy if exists "Admins can insert posts" on public.posts;
create policy "Admins can insert posts" on public.posts for insert to authenticated with check (public.is_admin());
drop policy if exists "Admins can update posts" on public.posts;
create policy "Admins can update posts" on public.posts for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Admins can delete posts" on public.posts;
create policy "Admins can delete posts" on public.posts for delete to authenticated using (public.is_admin());

-- Affiliate clicks: anyone can insert via redirect route; only admins can read/delete.
drop policy if exists "Anyone can insert affiliate clicks" on public.affiliate_clicks;
create policy "Anyone can insert affiliate clicks" on public.affiliate_clicks for insert to anon, authenticated with check (true);
drop policy if exists "Admins can read affiliate clicks" on public.affiliate_clicks;
create policy "Admins can read affiliate clicks" on public.affiliate_clicks for select to authenticated using (public.is_admin());
drop policy if exists "Admins can delete affiliate clicks" on public.affiliate_clicks;
create policy "Admins can delete affiliate clicks" on public.affiliate_clicks for delete to authenticated using (public.is_admin());

-- Contact messages: anyone can insert; only admins can read/delete.
drop policy if exists "Anyone can insert contact messages" on public.contact_messages;
create policy "Anyone can insert contact messages" on public.contact_messages for insert to anon, authenticated with check (true);
drop policy if exists "Admins can read contact messages" on public.contact_messages;
create policy "Admins can read contact messages" on public.contact_messages for select to authenticated using (public.is_admin());
drop policy if exists "Admins can delete contact messages" on public.contact_messages;
create policy "Admins can delete contact messages" on public.contact_messages for delete to authenticated using (public.is_admin());
