# GiGi L Coiffure — Website & Admin Dashboard

Trilingual (FR / NL / EN) salon website with booking form, plus a password-protected admin
dashboard (`/admin`) with a leads list and a day/week reservation calendar.

Built with **Next.js 14**, **Tailwind CSS** and **Supabase**.

---

## 1. Quick start (local)

```bash
npm install
cp .env.example .env        # then fill in the values (see below)
npm run dev                 # → http://localhost:3000
```

- `/` redirects to `/fr` — also available: `/nl`, `/en`
- `/admin` — dashboard (asks for the password from `.env`)

## 2. Set up Supabase (free, ~5 minutes)

1. Create an account at https://supabase.com and create a new project.
2. Open **SQL Editor → New query**, paste the contents of `supabase/schema.sql`, click **Run**.
3. Go to **Project Settings → API** and copy:
   - **Project URL** → put it in `.env` as `NEXT_PUBLIC_SUPABASE_URL`
   - **service_role key** (under "Project API keys") → `SUPABASE_SERVICE_ROLE_KEY`
4. Choose a strong admin password → `ADMIN_PASSWORD`

> The service role key is only ever used on the server (API routes). It is never sent to
> the browser. Row Level Security is enabled on the table, so the database is not
> accessible directly from the public internet.

## 3. Deploy (Vercel recommended)

1. Push this folder to a GitHub repository.
2. Go to https://vercel.com → **New Project** → import the repo.
3. In **Environment Variables**, add the same three values from your `.env`.
4. Deploy. Then point the domain `gigilcoiffure.be` to Vercel (Vercel shows you the DNS records to add).

## 4. Replace the gallery placeholders

Drop your salon photos into `public/gallery/` as `1.jpg` … `6.jpg`, then in
`app/[lang]/page.tsx` replace the placeholder `<div>` tiles with:

```jsx
<img src="/gallery/1.jpg" alt="Tresses africaines réalisées au salon" loading="lazy"
     className="aspect-square object-cover border border-noir/10" />
```

Tip for SEO: write the `alt` text describing the hairstyle + "Tongres", e.g.
`alt="Box braids réalisées chez GiGi L Coiffure à Tongres"`.

## 5. How bookings flow

1. Visitor fills the form on the landing page → `POST /api/leads` → row in Supabase.
2. You open `/admin`, log in, and see it under **Demandes** (newest first).
3. Click **Confirmer** or **Annuler**. Confirmed/new bookings appear in the
   **Jour** / **Semaine** calendar views with their time slot.
4. The "agenda en ligne" link under the form still points to your existing
   `gigilcoiffure.be/rdv/` page as a backup — change or remove it in
   `components/BookingForm.tsx`.

## 6. Project map

```
app/[lang]/page.tsx        Landing page (hero+form, services, why us, gallery, FAQ, footer)
app/[lang]/layout.tsx      Per-language SEO metadata, hreflang, JSON-LD HairSalon schema
app/admin/page.tsx         Admin route (login → dashboard)
app/api/leads/route.ts     POST (public form) / GET + PATCH (admin only)
app/api/auth/route.ts      Password login (httpOnly cookie, 8h session)
components/                Header, BookingForm, Faq, AdminLogin, AdminDashboard
lib/i18n/dictionaries.ts   All FR / NL / EN texts — edit copy here
supabase/schema.sql        Database table
```

## 7. SEO checklist after going live

- [ ] Add the site to **Google Search Console** and submit `https://www.gigilcoiffure.be/sitemap.xml`
- [ ] Make sure the **Google Business Profile** website link points to the new site
- [ ] Keep collecting Google reviews — the schema markup advertises your 4.6★ rating
- [ ] Replace gallery placeholders with real photos + descriptive `alt` texts
