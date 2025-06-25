import { headers } from "next/headers";

export async function defaultLocale() {
    const h = await headers();
    const host = h.get('x-forwarded-host')?.trim().toString() ?? h.get('host')?.trim().toString();
    return host === 'artehechoamano.com' ? 'es' : 'en';
}

