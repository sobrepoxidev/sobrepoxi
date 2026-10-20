#!/usr/bin/env node
// Sube las imágenes rehechas o escaladas de la web (19 oct 2026) a products/web-v2/ y
// reemplaza el media de los productos de piso que las usan.
// Uso: node scripts/catalog/replace-web-images.mjs [--apply]
// Sin --apply solo lista lo que haría. Vars de .env.local (nunca se imprimen):
//   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(HERE, '..', '..');
const SRC_DIR =
  process.env.WEB_IMG_DIR || join(REPO_ROOT, '..', 'sobrepoxi-contenido', 'web-imgs', 'out');
const APPLY = process.argv.includes('--apply');
const PREFIX = 'web-v2';

const FILES = [
  'industrial-floor', 'luxury-floor', 'muebles-banner',
  'pisob1', 'pisob2', 'pisog1', 'pisog2', 'pisog3',
  'shell-heroe', 'shell-cenital', 'shell-detalle', 'shell-borde', 'shell-proceso', 'shell-ambiente',
];

const PISOG = [
  ['pisog1', 'Acabado epóxico negro sparkle con destellos plateados'],
  ['pisog2', 'Local comercial con piso epóxico negro sparkle'],
  ['pisog3', 'Baño con piso epóxico negro sparkle'],
];
const PISOB = [
  ['pisob1', 'Piso epóxico beige con vetas doradas tipo mármol'],
  ['pisob2', 'Piso epóxico metálico gris y blanco con vetas doradas'],
];
const SHELL = [
  ['shell-heroe', 'Vista principal'],
  ['shell-cenital', 'Vista cenital'],
  ['shell-detalle', 'Detalle de las conchas encapsuladas'],
  ['shell-borde', 'Detalle del borde en el escalón'],
  ['shell-proceso', 'Trabajo en sitio'],
  ['shell-ambiente', 'El piso en la terraza'],
];
// product id -> media list
const PRODUCTS = { 9: PISOG, 13: PISOG, 8: PISOB, 14: PISOB, 30: SHELL };

function loadDotEnvLocal() {
  const env = {};
  const path = join(REPO_ROOT, '.env.local');
  if (!existsSync(path)) return env;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i < 0) continue;
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    env[t.slice(0, i).trim()] = v;
  }
  return env;
}

for (const f of FILES) {
  if (!existsSync(join(SRC_DIR, `${f}.webp`))) {
    console.error(`ERROR: falta ${f}.webp en ${SRC_DIR}`);
    process.exit(1);
  }
}
console.log(`${FILES.length} archivos listos en ${SRC_DIR}`);
if (!APPLY) {
  console.log('dry-run: agregá --apply para subir y actualizar', Object.keys(PRODUCTS).join(', '));
  process.exit(0);
}

const env = { ...loadDotEnvLocal(), ...process.env };
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const urls = {};
for (const f of FILES) {
  const path = `${PREFIX}/${f}.webp`;
  const { error } = await supabase.storage
    .from('products')
    .upload(path, readFileSync(join(SRC_DIR, `${f}.webp`)), { upsert: true, contentType: 'image/webp' });
  if (error) throw error;
  urls[f] = supabase.storage.from('products').getPublicUrl(path).data.publicUrl;
  const head = await fetch(urls[f], { method: 'HEAD' });
  console.log(`subido ${path} -> HTTP ${head.status}`);
  if (!head.ok) process.exit(1);
}

for (const [id, list] of Object.entries(PRODUCTS)) {
  const { data: rows, error: readErr } = await supabase.from('products').select('media').eq('id', id);
  if (readErr) throw readErr;
  // Keep any video that the product already had.
  const videos = (rows?.[0]?.media ?? []).filter((m) => m.type === 'video');
  const media = [
    ...list.map(([f, caption], i) => ({ url: urls[f], type: 'image', caption, featured: i === 0 })),
    ...videos,
  ];
  const { error } = await supabase.from('products').update({ media }).eq('id', id);
  if (error) throw error;
  console.log(`producto ${id}: ${list.length} imágenes${videos.length ? ` + ${videos.length} video` : ''}`);
}
