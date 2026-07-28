-- Migration: 0002 — secure catalog tables with admin-only writes (RLS)
-- Created: 2026-06-17
-- Description:
--   The `products` table (and the rest of the catalog) had permissive RLS that
--   let the public `anon` key INSERT/UPDATE/DELETE rows. Confirmed in prod:
--   `DELETE /rest/v1/products` with the anon key returned 204, and UPDATE
--   succeeded. Since the anon key ships in the client bundle, anyone could
--   rewrite or wipe the catalog.
--
--   This migration keeps catalog reads public (the storefront needs them) but
--   restricts writes to authenticated admins. "Admin" is an email allowlist in
--   `public.admin_emails`, matched against the JWT email claim — it mirrors the
--   app's ADMIN_EMAILS env used by requireAdmin(). The admin dashboard keeps
--   working unchanged because it writes while logged in as an allowlisted email.
--
-- Reversible: see the rollback block at the bottom (commented out).

-- ─────────────────────────────────────────────────────────────────────────
-- 1. Admin allowlist + helper
-- ─────────────────────────────────────────────────────────────────────────

-- Allowlist of admin emails. Locked down: RLS on with no policies, so only the
-- service_role / SECURITY DEFINER functions can read it. Seed it below.
CREATE TABLE IF NOT EXISTS public.admin_emails (
  email text PRIMARY KEY
);
ALTER TABLE public.admin_emails ENABLE ROW LEVEL SECURITY;

-- ⚠️ SEED THE ADMINS — replace with the same addresses as the ADMIN_EMAILS env.
-- (Edit before running. Re-runnable: ON CONFLICT DO NOTHING.)
INSERT INTO public.admin_emails (email) VALUES
  ('REEMPLAZAR-con-tu-email-admin@example.com')
ON CONFLICT (email) DO NOTHING;

-- is_admin(): true when the current request's JWT email is in the allowlist.
-- SECURITY DEFINER so it can read admin_emails despite that table's RLS.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_emails
    WHERE email = (auth.jwt() ->> 'email')
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM public;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;

-- ─────────────────────────────────────────────────────────────────────────
-- 2. Reset + re-apply policies on each catalog table
--    (drops ALL existing policies dynamically so leftover permissive ones
--     can't keep granting access — RLS combines permissive policies with OR.)
-- ─────────────────────────────────────────────────────────────────────────

DO $$
DECLARE
  tbl  text;
  pol  record;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['products', 'categories', 'inventory']
  LOOP
    -- enable RLS (no-op if already on)
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', tbl);

    -- drop every existing policy on the table
    FOR pol IN
      SELECT policyname
      FROM pg_policies
      WHERE schemaname = 'public' AND tablename = tbl
    LOOP
      EXECUTE format('DROP POLICY %I ON public.%I', pol.policyname, tbl);
    END LOOP;

    -- public read (storefront/catalog is public)
    EXECUTE format(
      'CREATE POLICY %I ON public.%I FOR SELECT TO anon, authenticated USING (true)',
      tbl || '_select_public', tbl
    );

    -- admin-only writes
    EXECUTE format(
      'CREATE POLICY %I ON public.%I FOR INSERT TO authenticated WITH CHECK (public.is_admin())',
      tbl || '_insert_admin', tbl
    );
    EXECUTE format(
      'CREATE POLICY %I ON public.%I FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin())',
      tbl || '_update_admin', tbl
    );
    EXECUTE format(
      'CREATE POLICY %I ON public.%I FOR DELETE TO authenticated USING (public.is_admin())',
      tbl || '_delete_admin', tbl
    );
  END LOOP;
END $$;

-- ─────────────────────────────────────────────────────────────────────────
-- 3. Verify (run manually after applying)
-- ─────────────────────────────────────────────────────────────────────────
-- SELECT tablename, policyname, cmd, roles
-- FROM pg_policies
-- WHERE schemaname = 'public' AND tablename IN ('products','categories','inventory')
-- ORDER BY tablename, cmd;
--
-- With the anon key (no session) these must now fail with 401/403:
--   curl -X DELETE "$URL/rest/v1/products?id=eq.-1" -H "apikey: $ANON" -H "Authorization: Bearer $ANON"
--   curl -X PATCH  "$URL/rest/v1/products?id=eq.15" -H "apikey: $ANON" -H "Authorization: Bearer $ANON" -d '{"name":"x"}'

-- ─────────────────────────────────────────────────────────────────────────
-- Rollback (re-open writes — NOT recommended; here for completeness)
-- ─────────────────────────────────────────────────────────────────────────
-- DO $$
-- DECLARE tbl text; pol record; BEGIN
--   FOREACH tbl IN ARRAY ARRAY['products','categories','inventory'] LOOP
--     FOR pol IN SELECT policyname FROM pg_policies WHERE schemaname='public' AND tablename=tbl LOOP
--       EXECUTE format('DROP POLICY %I ON public.%I', pol.policyname, tbl);
--     END LOOP;
--     EXECUTE format('CREATE POLICY %I ON public.%I FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)', tbl||'_open', tbl);
--   END LOOP;
-- END $$;
-- DROP FUNCTION IF EXISTS public.is_admin();
-- DROP TABLE IF EXISTS public.admin_emails;
