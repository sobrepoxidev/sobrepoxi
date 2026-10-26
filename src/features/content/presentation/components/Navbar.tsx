// components/layout/Navbar/index.tsx
// Componente principal SSR
import { Link } from '@/shared/i18n/navigation';
import Image from 'next/image';
import NavbarClient from './NavbarClient';
import NavbarSearchArea from './NavbarSearchArea';
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function Navbar({ locale }: { locale: string }) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignore
          }
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()


  return (
    <header className="relative z-40 bg-[#121212]">
      {/* Top Bar */}
      <div className="container mx-auto flex items-center justify-between px-2 md:px-4 py-0 bg-[#121212]">
        {/* Logo - SSR (Left) */}

        <div className="lg:hidden bg-[#121212]">
          <Link href="/" className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40 rounded" aria-label={locale === 'es' ? 'SobrePoxi - Inicio' : 'SobrePoxi - Home'}>
            <div className="relative overflow-hidden flex items-center gap-3">

              {/* <div className="lg:hidden">
              <Image
                src="https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/blob-mirror/public/logo_sobrepoxi-bU2or8H7kNX2ViS8sklfTK4Nk7BENo.webp"
                alt="Hand Made Art Logo"
                width={65}
                height={0}
                className="w-[40px] md:w-[65px] object-cover"
                priority
                unoptimized
              />
              </div>
              <div className="hidden lg:block">
              <Image
                src="https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/blob-mirror/public/logo_sobrepoxi-bU2or8H7kNX2ViS8sklfTK4Nk7BENo.webp"
                alt="Hand Made Art Logo"
                width={65}
                height={0}
                className="w-[40px] md:w-[65px] object-cover"
                priority
                unoptimized
              />
              </div> */}
              <Image
                src="https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/blob-mirror/public/logo_sobrepoxi-bU2or8H7kNX2ViS8sklfTK4Nk7BENo.webp"
                alt={locale === 'es' ? "Logo SobrePoxi - Muebles de lujo y pisos epóxicos Costa Rica" : "SobrePoxi Logo - Luxury furniture and epoxy floors Costa Rica"}
                width={51}
                height={43}
                className="w-[51px] h-[43px] md:w-[57px] md:h-[48px] object-contain ml-1.5"
                priority
                unoptimized
              />

              <span
                className="
                  flex items-center gap-0
                  text-lg md:text-3xl font-extrabold tracking-wider
                  gold-gradient-bright
                  drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]
                  motion-safe:animate-shine sr-only"


              >
                SobrePoxi
              </span>
            </div>
          </Link>
        </div>


        {/* Client-side interactivity (Center and Right) */}
        <div className="flex-grow flex items-center justify-end">
          <NavbarClient
            locale={locale}
            session={session}
          />
        </div>
      </div>

      {/* Second row: product search on catalogue routes, quote funnel everywhere
          else. It used to be the search bar on every page, which pushed the hero
          down on mobile without helping anyone outside the shop. */}
      <div className="lg:hidden bg-[#121212]">
        <NavbarSearchArea locale={locale} variant="mobile" />
      </div>
    </header>
  );
}