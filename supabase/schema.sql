-- GiGi L Coiffure — database schema
-- Run this in Supabase: SQL Editor → New query → paste → Run

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text,
  service text not null,
  booking_date date not null,
  booking_time time not null,
  message text,
  lang text not null default 'fr',
  status text not null default 'new' check (status in ('new', 'confirmed', 'cancelled')),
  category text check (category in ('coiffure', 'nails', 'microshading'))
);

create index if not exists bookings_date_idx on public.bookings (booking_date);
create index if not exists bookings_status_idx on public.bookings (status);

-- Row Level Security: locked down. The website talks to the database
-- exclusively through the server (service role key), never from the browser.
alter table public.bookings enable row level security;
