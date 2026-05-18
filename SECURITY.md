# CompareAI Security Notes

## Implemented

- Supabase Row Level Security migration
- Admin authorization via `public.admins` + Supabase Auth
- No service role key required in browser
- Input validation on contact route using Zod
- Honeypot spam field on contact form
- Plain-text rendering for post content to reduce XSS risk
- Security headers and baseline CSP
- Affiliate redirect route logs clicks without exposing admin data

## Required in production

- Store environment variables only in Cloudflare/Supabase dashboards
- Never commit `.env` files
- Use Cloudflare HTTPS and WAF rules
- Add Cloudflare rate limits for `/api/contact` and `/admin`
- Keep dependencies updated
- Review affiliate links and content before publishing
- Create only one or very few admin users

## Incident response

If credentials leak:

1. Rotate Supabase anon key if needed.
2. Rotate service role key if it was ever used.
3. Remove suspicious users from Supabase Auth.
4. Remove rows from `public.admins` for unauthorized users.
5. Review `affiliate_clicks` and `contact_messages` for abuse.
