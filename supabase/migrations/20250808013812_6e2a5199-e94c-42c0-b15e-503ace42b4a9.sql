-- Create crews table
create table if not exists public.crews (
  id uuid primary key default gen_random_uuid(),
  employee_id text unique not null,
  first_name text not null,
  last_name text not null,
  rank text,
  nationality text,
  birth_date date,
  email text,
  phone text,
  photo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create sea_services table
create table if not exists public.sea_services (
  id uuid primary key default gen_random_uuid(),
  crew_id uuid not null references public.crews(id) on delete cascade,
  vessel_name text,
  imo text,
  rank text,
  sign_on date,
  sign_off date,
  reason_sign_off text,
  remarks text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create performance_evaluations table
create table if not exists public.performance_evaluations (
  id uuid primary key default gen_random_uuid(),
  crew_id uuid not null references public.crews(id) on delete cascade,
  evaluation_date date,
  score int,
  evaluator text,
  comments text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create branding_settings table (singleton row)
create table if not exists public.branding_settings (
  id text primary key default 'default',
  company_name text,
  logo_url text,
  watermark text,
  paper_size text not null default 'A4',
  margin_top int not null default 20,
  margin_right int not null default 15,
  margin_bottom int not null default 20,
  margin_left int not null default 15,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.crews enable row level security;
alter table public.sea_services enable row level security;
alter table public.performance_evaluations enable row level security;
alter table public.branding_settings enable row level security;

-- Read-only public access for now (no auth required to view). Writes will be restricted until auth/roles are added.
create policy if not exists "Public can read crews"
  on public.crews for select
  using (true);

create policy if not exists "Public can read sea services"
  on public.sea_services for select
  using (true);

create policy if not exists "Public can read performance"
  on public.performance_evaluations for select
  using (true);

create policy if not exists "Public can read branding settings"
  on public.branding_settings for select
  using (true);

-- Update triggers for updated_at
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_crews_updated
before update on public.crews
for each row execute function public.update_updated_at_column();

create trigger trg_sea_services_updated
before update on public.sea_services
for each row execute function public.update_updated_at_column();

create trigger trg_performance_updated
before update on public.performance_evaluations
for each row execute function public.update_updated_at_column();

create trigger trg_branding_settings_updated
before update on public.branding_settings
for each row execute function public.update_updated_at_column();

-- Seed default branding row (id = 'default') if not exists
insert into public.branding_settings (id, company_name, watermark)
values ('default', 'Your Company', 'CONFIDENTIAL')
on conflict (id) do nothing;