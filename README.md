# CompareAI MVP

Production-ready MVP affiliate site for **compareai.site** using:

- Next.js App Router
- Tailwind CSS
- Supabase database + auth + RLS
- GitHub codebase
- Cloudflare hosting using the official OpenNext adapter for Cloudflare Workers

## Features

- Homepage, tools listing, tool review pages, categories, reviews/blog, about, contact, legal pages
- Supabase-backed products, categories, and posts
- Protected admin dashboard at `/admin`
- Affiliate click tracking through `/go/[slug]`
- Affiliate-compliant links: `rel="nofollow sponsored noopener noreferrer"` and `target="_blank"`
- Sitemap and robots.txt
- Security headers via Cloudflare `_headers` and Next config
- RLS SQL migration included

## 1. Local setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

## 2. Supabase setup

1. Create a Supabase project.
2. Go to **SQL Editor**.
3. Run `supabase/migrations/001_initial_schema.sql`.
4. Run `supabase/seed.sql` for starter categories and one sample product.
5. Go to **Authentication > Users** and create your admin user.
6. Copy the user UUID.
7. In SQL Editor, run:

```sql
insert into public.admins (user_id, email)
values ('YOUR_AUTH_USER_UUID', 'your-email@example.com')
on conflict (user_id) do nothing;
```

8. Add environment variables locally and in Cloudflare Pages:

```txt
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
NEXT_PUBLIC_SITE_URL=https://compareai.site
```

Do **not** expose the Supabase service role key in frontend code. This project works without it for the MVP.

## 3. Admin usage

Visit `/admin`, log in with the Supabase Auth user you added to `public.admins`, then add:

- Categories
- Products/tools
- Review posts

Only `published` products/posts are visible publicly. Drafts are visible only to admins in the dashboard.

## 4. Cloudflare deployment

This project uses `@opennextjs/cloudflare`, the current recommended way to run modern Next.js on Cloudflare. It deploys as a Cloudflare Worker with static assets, which is production-friendly for dynamic routes like `/go/[slug]` and `/api/contact`.

### Option A: Deploy from your machine

```bash
npm install
npm run cf:build
npx wrangler login
npx wrangler deploy
```

Then add custom routes/domains in Cloudflare for:

```txt
compareai.site
www.compareai.site
```

### Option B: Deploy from GitHub Actions

A workflow is included at `.github/workflows/deploy.yml`. Add these GitHub repository secrets:

```txt
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Push to the `main` branch and GitHub Actions will build and deploy.

### Cloudflare environment

`NEXT_PUBLIC_*` variables are embedded at build time. Keep them in GitHub secrets and/or Cloudflare build settings. Do not commit `.env.local`.

Optional but recommended: add Cloudflare WAF/rate-limit rules for `/api/contact` and `/admin`.

## 5. Recommended Cloudflare security settings

In Cloudflare dashboard:

- SSL/TLS mode: **Full** or **Full (strict)**
- Always Use HTTPS: **On**
- Automatic HTTPS Rewrites: **On**
- Bot Fight Mode: **On** if available
- WAF custom rules:
  - Rate limit POST `/api/contact`
  - Challenge suspicious requests to `/admin`
- DNS/custom domain routes for `compareai.site` and `www` pointing to the deployed Cloudflare Worker

## 6. Production checklist before launch

- Replace sample product with real affiliate offers
- Verify affiliate program terms
- Keep Affiliate Disclosure, Privacy Policy, and Terms visible in footer
- Test `/go/product-slug` redirect and click logging
- Test admin create/edit/delete with RLS enabled
- Test contact form
- Run Lighthouse/PageSpeed
- Submit sitemap to Google Search Console: `https://compareai.site/sitemap.xml`

## 7. Important security notes

- Supabase RLS is enabled in the migration.
- Public visitors can only read published products/posts.
- Admin writes require Supabase Auth + row in `public.admins`.
- Rich text is rendered as plain text paragraphs to reduce XSS risk.
- Contact form validates input and includes a honeypot. Use Cloudflare rate limiting for stronger abuse protection.
- Affiliate links use sponsored/nofollow/noopener/noreferrer attributes.
