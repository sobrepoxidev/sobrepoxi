import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

// Memoize the browser client at the module level. createBrowserClient internally
// constructs a GoTrueClient that uses localStorage; instantiating it more than
// once in the same browser context triggers a "Multiple GoTrueClient instances
// detected" warning and can produce undefined behavior when concurrent calls
// share the same storage key. A single shared instance is safe because the
// client is stateless from the caller's perspective and reads cookies/localStorage
// for session state.
let browserClient: SupabaseClient | null = null

export function createBrowserSupabaseClient(): SupabaseClient {
  if (browserClient) return browserClient
  browserClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  return browserClient
}
