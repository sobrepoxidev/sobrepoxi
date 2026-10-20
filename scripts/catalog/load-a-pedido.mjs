// Carga idempotente de los 16 productos a pedido (scripts/catalog/a-pedido.json)
// + los 6 videos educativos (espejo de VIDEO_SLUGS en
// src/features/content/application/guides/videos.ts).
// Por defecto DRY-RUN: valida el JSON y los archivos locales e imprime lo que haría.
// Con --apply: crea las 2 categorías nuevas si no existen, sube los webp al bucket
// `products` (upsert), inserta el producto si no existe ese `name`, crea el
// inventory { quantity: 0 } si no existe, sube los 12 archivos de video
// (6 .mp4 + 6 .jpg) a products/videos/ (upsert, contentType correcto) y hace
// HEAD a cada URL pública. Sin --apply NO escribe nada en Supabase.
//
// Uso:
//   node scripts/catalog/load-a-pedido.mjs            # dry-run
//   node scripts/catalog/load-a-pedido.mjs --apply    # escritura real
//
// Vars (leídas de .env.local, nunca se imprimen):
//   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// Opcional: A_PEDIDO_CONTENT_DIR (por defecto ../sobrepoxi-contenido/tienda junto al repo).

import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const APPLY = process.argv.includes('--apply');
const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(HERE, '..', '..');
const CONTENT_DIR =
  process.env.A_PEDIDO_CONTENT_DIR || join(REPO_ROOT, '..', 'sobrepoxi-contenido', 'tienda');

const CATEGORY_DEFS = {
  coastal: { id: 1, create: null },
  tables: { id: 2, create: null },
  custom: {
    id: null,
    create: { name: 'custom-furniture', name_es: 'Muebles a la medida', name_en: 'Custom Furniture', parent_id: null },
  },
  decor: {
    id: null,
    create: { name: 'resin-decor', name_es: 'Decoración en resina', name_en: 'Resin Decor', parent_id: null },
  },
  floors: { id: 4, create: null },
};

function loadDotEnvLocal() {
  // Minimal .env.local parser (KEY=VALUE, ignora comentarios y comillas). No imprime valores.
  const env = {};
  const path = join(REPO_ROOT, '.env.local');
  if (!existsSync(path)) return env;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i < 0) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    env[k] = v;
  }
  return env;
}

function fail(msg) {
  console.error(`ERROR: ${msg}`);
  process.exit(1);
}

const catalog = JSON.parse(readFileSync(join(HERE, 'a-pedido.json'), 'utf8'));
const products = catalog.products;
if (!Array.isArray(products) || products.length !== 16) {
  fail(`a-pedido.json debe tener exactamente 16 productos (tiene ${products?.length ?? 'N/A'})`);
}

// ---- Validación offline (corre también sin service key) ----
const BANNED = ['concepto', 'render', 'ilustrativo', 'ilustrativa', 'ia', 'todavía', 'todavia', 'diseño propuesto', 'diseno propuesto'];
const errors = [];
const seenNames = new Set();
const seenSkus = new Set();
for (const [idx, p] of products.entries()) {
  const tag = p.sku || `#${idx}`;
  for (const f of ['name', 'name_es', 'name_en', 'description_es', 'description_en', 'category', 'sku', 'brand', 'media_dir']) {
    if (!p[f]) errors.push(`${tag}: falta campo ${f}`);
  }
  if (seenNames.has(p.name)) errors.push(`${tag}: name duplicado ${p.name}`);
  if (seenSkus.has(p.sku)) errors.push(`${tag}: sku duplicado ${p.sku}`);
  seenNames.add(p.name);
  seenSkus.add(p.sku);
  if (!['coastal', 'tables', 'custom', 'decor', 'floors'].includes(p.category)) errors.push(`${tag}: categoría inválida ${p.category}`);
  if (p.dolar_price !== 0 || p.colon_price !== 0) errors.push(`${tag}: precios deben ser 0`);
  if (p.is_active !== true || p.is_featured !== false) errors.push(`${tag}: is_active debe ser true, is_featured false`);
  if (!Array.isArray(p.tags) || !p.tags.includes('a-pedido') || !p.tags.includes('a-la-medida')) {
    errors.push(`${tag}: tags deben incluir a-pedido y a-la-medida`);
  }
  const blob = `${p.description_es} ${p.description_en}`.toLowerCase();
  for (const w of BANNED) {
    if (w === 'ia' ? /\bia\b/.test(blob) : blob.includes(w)) errors.push(`${tag}: copy con palabra prohibida "${w}"`);
  }
  if (!Array.isArray(p.media_files) || p.media_files.length !== 6) {
    errors.push(`${tag}: media_files debe tener 6 tomas`);
  }
}

// Archivos locales esperados: <CONTENT_DIR>/<media_dir>/<file>
let filesOk = 0;
let filesMissing = 0;
const missingSamples = [];
const foundPerProduct = [];
for (const p of products) {
  let ok = 0;
  for (const m of p.media_files || []) {
    const fp = join(CONTENT_DIR, p.media_dir, m.file);
    if (existsSync(fp)) {
      filesOk++;
      ok++;
    } else {
      filesMissing++;
      if (missingSamples.length < 10) missingSamples.push(`${p.media_dir}/${m.file}`);
    }
  }
  foundPerProduct.push({ sku: p.sku, name_es: p.name_es, category: p.category, medida: p.specifications?.['Medida de referencia'] || '—', ok, total: (p.media_files || []).length });
}

const CAT_LABEL = {
  coastal: 'Serie Costa de Resina (id 1)',
  tables: 'Mesas (id 2)',
  custom: 'Muebles a la medida (nueva)',
  decor: 'Decoración en resina (nueva)',
  floors: 'Pisos de Resina Epóxica (id 4)',
};

console.log(`== load-a-pedido ${APPLY ? '--apply' : '(dry-run)'} ==`);
console.log(`productos en JSON: ${products.length}`);
try {
  const st = statSync(CONTENT_DIR);
  if (!st.isDirectory()) {
    console.log(`CONTENT_DIR no es un directorio: ${CONTENT_DIR}`);
  } else {
    console.log(`CONTENT_DIR OK: ${readdirSync(CONTENT_DIR).length} entradas en ${CONTENT_DIR}`);
  }
} catch (e) {
  console.log(`CONTENT_DIR inaccesible (${e.code || e.message}): ${CONTENT_DIR}`);
}
// ---- Videos educativos: <CONTENT_DIR>/videos/<slug>.mp4 + <slug>.jpg ----
// Misma lista que VIDEO_SLUGS (src/features/content/application/guides/videos.ts).
const VIDEO_SLUGS = [
  'que-es-mesa-rio',
  'asi-nace',
  'escoger-su-mesa',
  'mida-su-espacio',
  'que-podemos-hacer',
  'la-resina-es-arte',
];
const VIDEOS_DIR = join(CONTENT_DIR, 'videos');
const VIDEO_FILES = VIDEO_SLUGS.flatMap((slug) => [
  { file: `${slug}.mp4`, contentType: 'video/mp4' },
  { file: `${slug}.jpg`, contentType: 'image/jpeg' },
]);

let videosOk = 0;
let videosMissing = 0;
const videosMissingSamples = [];
for (const v of VIDEO_FILES) {
  if (existsSync(join(VIDEOS_DIR, v.file))) {
    videosOk++;
  } else {
    videosMissing++;
    if (videosMissingSamples.length < 12) videosMissingSamples.push(`videos/${v.file}`);
  }
}

console.log(`archivos webp: ok=${filesOk} faltantes=${filesMissing}`);
console.log(`videos ok=${videosOk} faltantes=${videosMissing}`);
if (videosMissingSamples.length) {
  console.log('ej. videos faltantes:');
  for (const s of videosMissingSamples) console.log(`  - ${s}`);
}
if (missingSamples.length) {
  console.log('ej. faltantes:');
  for (const s of missingSamples) console.log(`  - ${s}`);
}
if (errors.length) {
  console.log(`errores de validación: ${errors.length}`);
  for (const e of errors.slice(0, 30)) console.log(`  ! ${e}`);
  fail('validación fallida');
}
console.log('validación JSON: OK (16 productos, campos, tags, precios 0, copy sin palabras prohibidas)');
console.log('--- tabla: sku | name_es | categoría | medida de referencia | media encontradas ---');
for (const r of foundPerProduct) {
  console.log(`${r.sku} | ${r.name_es} | ${CAT_LABEL[r.category]} | ${r.medida} | ${r.ok}/${r.total}`);
}

const envLocal = loadDotEnvLocal();
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || envLocal.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || envLocal.SUPABASE_SERVICE_ROLE_KEY;

if (!APPLY) {
  console.log('--- dry-run: lo que se haría con --apply ---');
  console.log('- categorías: verificar id 1 (coastal), id 2 (tables), id 4 (floors); crear si faltan: custom-furniture, resin-decor (por name)');
  console.log('- storage: subir 96 webp a products/a-pedido/<slug>/<archivo> (upsert, image/webp)');
  console.log('- productos: insertar si no existe ese name (idempotente; si existe, no duplicar)');
  console.log('- inventory: crear { product_id, quantity: 0 } si no existe');
  console.log('- videos: subir 12 archivos (6 .mp4 video/mp4 + 6 .jpg image/jpeg) a products/videos/<archivo> (upsert) y HEAD a cada URL pública');
  if (!SERVICE_KEY || !URL) {
    console.log('(sin service key: solo se validaron archivos y JSON; no se contactó Supabase)');
  }
  if (filesMissing > 0) fail(`faltan ${filesMissing} webp en ${CONTENT_DIR}`);
  if (videosMissing > 0) fail(`faltan ${videosMissing} videos en ${VIDEOS_DIR}`);
  console.log('dry-run OK: sin escrituras.');
  process.exit(0);
}

// ---- --apply: escritura real ----
if (!URL || !SERVICE_KEY) fail('faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY para --apply');
const { createClient } = await import('@supabase/supabase-js');
const supabase = createClient(URL, SERVICE_KEY);

async function resolveCategory(key) {
  const def = CATEGORY_DEFS[key];
  if (def.id) {
    const { data, error } = await supabase.from('categories').select('id').eq('id', def.id).maybeSingle();
    if (error) throw error;
    if (!data) fail(`categoría id=${def.id} (${key}) no existe en Supabase`);
    return def.id;
  }
  const { data: existing, error: selErr } = await supabase
    .from('categories')
    .select('id')
    .eq('name', def.create.name)
    .maybeSingle();
  if (selErr) throw selErr;
  if (existing) return existing.id;
  const { data: created, error: insErr } = await supabase.from('categories').insert({ id: await nextId('categories'), ...def.create }).select('id').single();
  if (insErr) throw insErr;
  console.log(`categoría creada: ${def.create.name} (id=${created.id})`);
  return created.id;
}

// The catalog tables were seeded with explicit ids, so their identity sequences lag behind: pick max(id)+1.
async function nextId(table) {
  const { data, error } = await supabase.from(table).select('id').order('id', { ascending: false }).limit(1);
  if (error) throw error;
  return (data?.[0]?.id ?? 0) + 1;
}

const catIds = {};
for (const key of ['coastal', 'tables', 'custom', 'decor', 'floors']) {
  catIds[key] = await resolveCategory(key);
}
console.log(`categorías: coastal=${catIds.coastal} tables=${catIds.tables} custom=${catIds.custom} decor=${catIds.decor} floors=${catIds.floors}`);

const rows = [];
for (const p of products) {
  // 1) subir media (upsert)
  const media = [];
  for (const m of p.media_files) {
    const localPath = join(CONTENT_DIR, p.media_dir, m.file);
    if (!existsSync(localPath)) fail(`falta archivo local: ${p.media_dir}/${m.file}`);
    const buf = readFileSync(localPath);
    const storagePath = `a-pedido/${p.name}/${m.file}`;
    const { error: upErr } = await supabase.storage
      .from('products')
      .upload(storagePath, buf, { upsert: true, contentType: 'image/webp' });
    if (upErr) throw upErr;
    const { data } = supabase.storage.from('products').getPublicUrl(storagePath);
    media.push({ url: data.publicUrl, type: 'image', caption: m.caption_es });
  }
  // 2) producto idempotente por name
  let productId;
  const { data: existing, error: selErr } = await supabase.from('products').select('id').eq('name', p.name).maybeSingle();
  if (selErr) throw selErr;
  if (existing) {
    productId = existing.id;
  } else {
    const { data: inserted, error: insErr } = await supabase
      .from('products')
      .insert({
        id: await nextId('products'),
        name: p.name,
        name_es: p.name_es,
        name_en: p.name_en,
        description: p.description_es,
        description_es: p.description_es,
        description_en: p.description_en,
        category_id: catIds[p.category],
        media,
        colon_price: 0,
        dolar_price: 0,
        discount_percentage: 0,
        tags: p.tags,
        specifications: p.specifications,
        sku: p.sku,
        brand: p.brand,
        is_active: true,
        is_featured: false,
      })
      .select('id')
      .single();
    if (insErr) throw insErr;
    productId = inserted.id;
  }
  // 3) inventory quantity 0 si no existe
  const { data: inv, error: invSelErr } = await supabase
    .from('inventory')
    .select('id')
    .eq('product_id', productId)
    .maybeSingle();
  if (invSelErr) throw invSelErr;
  if (!inv) {
    const { error: invInsErr } = await supabase.from('inventory').insert({ id: await nextId('inventory'), product_id: productId, quantity: 0 });
    if (invInsErr) throw invInsErr;
  }
  rows.push({ slug: p.name, id: productId, media: media.length });
}

console.log('--- resultado ---');
console.log('slug -> id -> nº media');
for (const r of rows) console.log(`${r.slug} -> ${r.id} -> ${r.media}`);

// 4) videos educativos (upsert + HEAD a la URL pública)
console.log('--- videos educativos ---');
for (const v of VIDEO_FILES) {
  const localPath = join(VIDEOS_DIR, v.file);
  if (!existsSync(localPath)) fail(`falta archivo local: videos/${v.file}`);
  const buf = readFileSync(localPath);
  const storagePath = `videos/${v.file}`;
  const { error: upErr } = await supabase.storage
    .from('products')
    .upload(storagePath, buf, { upsert: true, contentType: v.contentType });
  if (upErr) throw upErr;
  const { data } = supabase.storage.from('products').getPublicUrl(storagePath);
  const head = await fetch(data.publicUrl, { method: 'HEAD' });
  console.log(`${v.file} -> status=${head.status} content-length=${head.headers.get('content-length') ?? '?'}`);
}
