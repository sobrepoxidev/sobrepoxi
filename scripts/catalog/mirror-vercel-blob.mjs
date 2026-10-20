#!/usr/bin/env node
// Copies every Vercel Blob file the site still references (src/ and products.media)
// to Supabase storage products/blob-mirror/<same path>, then rewrites the references.
// Leaving Vercel: the blob store belongs to the Vercel account we are dropping.
// Usage: node scripts/catalog/mirror-vercel-blob.mjs [--apply]
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const APPLY = process.argv.includes('--apply');
const BLOB = 'https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/';
const URL_RE = /https:\/\/hhn7iitaso3wzd0d\.public\.blob\.vercel-storage\.com\/[^"'\s)`]+/g;
const TYPES = { '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.mp4': 'video/mp4', '.svg': 'image/svg+xml' };

function loadEnv() {
  const env = {};
  const p = join(REPO_ROOT, '.env.local');
  if (!existsSync(p)) return env;
  for (const line of readFileSync(p, 'utf8').split('\n')) {
    const t = line.trim();
    const i = t.indexOf('=');
    if (!t || t.startsWith('#') || i < 0) continue;
    env[t.slice(0, i).trim()] = t.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  }
  return env;
}
const env = { ...loadEnv(), ...process.env };
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const srcFiles = execSync('git grep -l hhn7iitaso3wzd0d -- src', { cwd: REPO_ROOT, encoding: 'utf8' }).split('\n').filter(Boolean);
const urls = new Set();
for (const f of srcFiles) for (const m of readFileSync(join(REPO_ROOT, f), 'utf8').matchAll(URL_RE)) urls.add(m[0]);
const { data: products, error } = await supabase.from('products').select('id, media');
if (error) throw error;
for (const p of products) for (const m of JSON.stringify(p.media ?? []).matchAll(URL_RE)) urls.add(m[0]);
console.log(`${urls.size} URLs de Blob en ${srcFiles.length} archivos de src y en products.media`);

const map = {};
for (const u of urls) {
  const path = `blob-mirror/${decodeURIComponent(u.slice(BLOB.length))}`;
  map[u] = supabase.storage.from('products').getPublicUrl(path).data.publicUrl;
  if (!APPLY) { console.log(`  ${u.slice(BLOB.length)}`); continue; }
  // The blob CDN resets connections now and then: retry the whole download.
  let res, buf;
  for (let attempt = 1; ; attempt++) {
    try {
      res = await fetch(u, { signal: AbortSignal.timeout(60_000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      buf = Buffer.from(await res.arrayBuffer());
      break;
    } catch (e) {
      if (attempt >= 5) { console.error(`ERROR bajando ${u}: ${e.message}`); process.exit(1); }
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
  const { error: upErr } = await supabase.storage.from('products')
    .upload(path, buf, { upsert: true, contentType: TYPES[extname(path).toLowerCase()] ?? res.headers.get('content-type') ?? 'application/octet-stream' });
  if (upErr) throw upErr;
  const head = await fetch(map[u], { method: 'HEAD' });
  console.log(`  ${path} ${buf.length}B -> HTTP ${head.status}`);
  if (!head.ok) process.exit(1);
}
if (!APPLY) { console.log('dry-run: agregá --apply'); process.exit(0); }

for (const f of srcFiles) {
  const full = join(REPO_ROOT, f);
  const before = readFileSync(full, 'utf8');
  const after = before.replace(URL_RE, (u) => map[u] ?? u);
  if (after !== before) { writeFileSync(full, after); console.log(`src: ${f}`); }
}
for (const p of products) {
  const before = JSON.stringify(p.media ?? []);
  const after = before.replace(URL_RE, (u) => map[u] ?? u);
  if (after === before) continue;
  const { error: updErr } = await supabase.from('products').update({ media: JSON.parse(after) }).eq('id', p.id);
  if (updErr) throw updErr;
  console.log(`producto ${p.id}: media actualizado`);
}
