import { createBrowserSupabaseClient } from '@/shared/supabase/client';
import type { MediaItem } from '@/shared/types/database';

const BUCKET = 'products';
const PUBLIC_MARKER = `/object/public/${BUCKET}/`;

export const MAX_FILE_BYTES = 15 * 1024 * 1024; // 15 MB
export const ACCEPTED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif', 'video/mp4', 'video/webm'];

function sanitizeName(name: string): string {
  const dot = name.lastIndexOf('.');
  const ext = dot > -1 ? name.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, '') : 'bin';
  const base = (dot > -1 ? name.slice(0, dot) : name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'file';
  return `${base}.${ext || 'bin'}`;
}

/**
 * Uploads a single file to the public `products` bucket and returns a MediaItem
 * with the resulting public URL. `folder` is the product id (existing) or a
 * generated id (new product) — it only scopes the storage path, the DB stores
 * the full public URL.
 */
export async function uploadProductMedia(file: File, folder: string | number): Promise<MediaItem> {
  if (file.size > MAX_FILE_BYTES) {
    throw new Error(`"${file.name}" supera el límite de 15 MB`);
  }
  const supabase = createBrowserSupabaseClient();
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${sanitizeName(file.name)}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '31536000',
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return {
    url: data.publicUrl,
    type: file.type.startsWith('video') ? 'video' : 'image',
  };
}

/**
 * Best-effort removal of a storage object given its public URL. Skips external
 * URLs (e.g. Vercel Blob) that don't live in this bucket. Never throws.
 */
export async function deleteProductMediaByUrl(url: string): Promise<void> {
  try {
    const idx = url.indexOf(PUBLIC_MARKER);
    if (idx === -1) return; // not in our bucket — leave it
    const path = decodeURIComponent(url.slice(idx + PUBLIC_MARKER.length).split('?')[0]);
    if (!path) return;
    const supabase = createBrowserSupabaseClient();
    await supabase.storage.from(BUCKET).remove([path]);
  } catch (err) {
    console.warn('No se pudo eliminar el archivo de storage:', err);
  }
}
