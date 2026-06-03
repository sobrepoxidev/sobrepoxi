'use client';

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import {
  X, Save, Plus, Trash2, ArrowUp, ArrowDown, Star, StarOff,
  UploadCloud, Loader2, ChevronDown, ChevronUp, Film,
} from 'lucide-react';
import type { Database, MediaItem } from '@/shared/types/database';
import {
  uploadProductMedia, ACCEPTED_MIME, MAX_FILE_BYTES,
} from '../../application/productMedia';

type Product = Database['products'];
type Category = Database['categories'];

interface ProductEditorProps {
  locale: string;
  product: Product;
  categories: Category[];
  onSave: (updates: Partial<Product>) => Promise<{ success: boolean; error?: string }>;
  onCancel: () => void;
}

type SpecRow = { id: string; key: string; value: string };

function uid(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function ProductEditor({ locale, product, categories, onSave, onCancel }: ProductEditorProps) {
  const es = locale === 'es';
  const isNew = !product.id || product.id <= 0;

  // Stable storage folder for a brand-new product (no id yet).
  const newFolderRef = useRef<string>(`new-${uid()}`);
  const folder = isNew ? newFolderRef.current : product.id;

  // ── form state ──────────────────────────────────────────────
  const [nameEs, setNameEs] = useState(product.name_es ?? product.name ?? '');
  const [nameEn, setNameEn] = useState(product.name_en ?? '');
  const [descEs, setDescEs] = useState(product.description_es ?? product.description ?? '');
  const [descEn, setDescEn] = useState(product.description_en ?? '');
  const [colonPrice, setColonPrice] = useState<number | null>(product.colon_price);
  const [usdPrice, setUsdPrice] = useState<number | null>(product.dolar_price);
  const [discount, setDiscount] = useState<number | null>(product.discount_percentage);
  const [categoryId, setCategoryId] = useState<number | null>(product.category_id);
  const [sku, setSku] = useState(product.sku ?? '');
  const [brand, setBrand] = useState(product.brand ?? '');
  const [isActive, setIsActive] = useState<boolean>(product.is_active ?? true);
  const [isFeatured, setIsFeatured] = useState<boolean>(product.is_featured ?? false);
  const [tags, setTags] = useState<string[]>(product.tags ?? []);
  const [tagDraft, setTagDraft] = useState('');
  const [media, setMedia] = useState<MediaItem[]>(product.media ?? []);
  const [specs, setSpecs] = useState<SpecRow[]>(
    Object.entries(product.specifications ?? {}).map(([key, value]) => ({
      id: uid(), key, value: value === null ? '' : String(value),
    }))
  );

  const [showSpecs, setShowSpecs] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── category hierarchy (parent → child, indented) ───────────
  const orderedCategories = useMemo(() => {
    const roots = categories.filter((c) => c.parent_id == null);
    const byParent = new Map<number, Category[]>();
    for (const c of categories) {
      if (c.parent_id != null) {
        const arr = byParent.get(c.parent_id) ?? [];
        arr.push(c);
        byParent.set(c.parent_id, arr);
      }
    }
    const out: { cat: Category; depth: number }[] = [];
    const walk = (cat: Category, depth: number) => {
      out.push({ cat, depth });
      (byParent.get(cat.id) ?? []).forEach((child) => walk(child, depth + 1));
    };
    roots.forEach((r) => walk(r, 0));
    // include any orphans whose parent isn't in the list
    for (const c of categories) {
      if (!out.find((o) => o.cat.id === c.id)) out.push({ cat: c, depth: 0 });
    }
    return out;
  }, [categories]);

  // ── media handlers ──────────────────────────────────────────
  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    const incoming = Array.from(files);
    for (const file of incoming) {
      if (!ACCEPTED_MIME.includes(file.type)) {
        toast.error(`${es ? 'Tipo no permitido' : 'Type not allowed'}: ${file.name}`);
        continue;
      }
      if (file.size > MAX_FILE_BYTES) {
        toast.error(`${file.name}: ${es ? 'supera 15 MB' : 'exceeds 15 MB'}`);
        continue;
      }
      try {
        const item = await uploadProductMedia(file, folder);
        setMedia((prev) => [...prev, item]);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : (es ? 'Error al subir' : 'Upload error'));
      }
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const moveMedia = (index: number, dir: -1 | 1) => {
    setMedia((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };
  const makeCover = (index: number) => {
    setMedia((prev) => {
      if (index === 0) return prev;
      const next = [...prev];
      const [item] = next.splice(index, 1);
      next.unshift(item);
      return next;
    });
  };
  const removeMedia = (index: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };
  const setCaption = (index: number, caption: string) => {
    setMedia((prev) => prev.map((m, i) => (i === index ? { ...m, caption } : m)));
  };

  // ── tags / specs handlers ───────────────────────────────────
  const addTag = () => {
    const v = tagDraft.trim();
    if (!v) return;
    if (!tags.includes(v)) setTags([...tags, v]);
    setTagDraft('');
  };
  const removeTag = (t: string) => setTags(tags.filter((x) => x !== t));

  const addSpec = () => setSpecs([...specs, { id: uid(), key: '', value: '' }]);
  const updateSpec = (id: string, field: 'key' | 'value', val: string) =>
    setSpecs(specs.map((s) => (s.id === id ? { ...s, [field]: val } : s)));
  const removeSpec = (id: string) => setSpecs(specs.filter((s) => s.id !== id));

  // ── save ────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!nameEs.trim() && !nameEn.trim()) {
      toast.error(es ? 'El producto necesita al menos un nombre' : 'The product needs at least one name');
      return;
    }
    for (const [label, val] of [['₡', colonPrice], ['US$', usdPrice]] as const) {
      if (val != null && (isNaN(Number(val)) || Number(val) < 0)) {
        toast.error(`${es ? 'Precio inválido' : 'Invalid price'} (${label})`);
        return;
      }
    }
    if (discount != null && (discount < 0 || discount > 100)) {
      toast.error(es ? 'El descuento debe estar entre 0 y 100' : 'Discount must be between 0 and 100');
      return;
    }

    const specifications = specs.reduce<Record<string, string>>((acc, s) => {
      const k = s.key.trim();
      if (k) acc[k] = s.value;
      return acc;
    }, {});

    const cleanNameEs = nameEs.trim() || null;
    const cleanNameEn = nameEn.trim() || null;
    const cleanDescEs = descEs.trim() || null;
    const cleanDescEn = descEn.trim() || null;

    const payload: Partial<Product> = {
      name_es: cleanNameEs,
      name_en: cleanNameEn,
      name: cleanNameEs || cleanNameEn, // keep legacy/slug field in sync
      description_es: cleanDescEs,
      description_en: cleanDescEn,
      description: cleanDescEs || cleanDescEn, // legacy consumers (search/cart)
      colon_price: colonPrice,
      dolar_price: usdPrice,
      discount_percentage: discount,
      category_id: categoryId,
      sku: sku.trim() || null,
      brand: brand.trim() || null,
      is_active: isActive,
      is_featured: isFeatured,
      tags: tags.length ? tags : null,
      specifications: Object.keys(specifications).length ? specifications : null,
      media: media.length ? media : null,
    };

    setSaving(true);
    const result = await onSave(payload);
    setSaving(false);
    if (!result.success) {
      toast.error(result.error || (es ? 'Error al guardar' : 'Error saving'));
    }
  };

  // ── styles ──────────────────────────────────────────────────
  const inputCls =
    'w-full px-3 py-2 bg-[#121212] border border-white/10 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent';
  const labelCls = 'block text-sm font-medium text-gray-300 mb-1';
  const sectionCls = 'bg-[#121212] p-4 rounded-lg border border-white/10';

  return (
    <div className="p-5 sm:p-6 bg-[#1a1a1a] text-gray-200">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold gold-gradient-bright">
          {isNew ? (es ? 'Nuevo producto' : 'New product') : (es ? 'Editar producto' : 'Edit product')}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 rounded-full hover:bg-[#252525] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
          aria-label={es ? 'Cerrar' : 'Close'}
        >
          <X className="h-6 w-6 text-gray-400" />
        </button>
      </div>

      <div className="space-y-5">
        {/* ── Media manager ── */}
        <div className={sectionCls}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-amber-400">{es ? 'Imágenes y video' : 'Images & video'}</h3>
            <span className="text-xs text-gray-500">{media.length} {es ? 'archivo(s)' : 'file(s)'}</span>
          </div>

          {media.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-3">
              {media.map((item, index) => (
                <div key={item.url} className="relative group rounded-lg overflow-hidden border border-white/10 bg-[#1a1a1a]">
                  <div className="relative aspect-square">
                    {item.type === 'video' ? (
                      <video src={item.url} className="absolute inset-0 w-full h-full object-cover" muted />
                    ) : (
                      <Image src={item.url} alt={item.caption || `Media ${index + 1}`} fill sizes="200px" className="object-cover" />
                    )}
                    {index === 0 && (
                      <span className="absolute top-1 left-1 text-[10px] font-bold text-black bg-gold-gradient px-1.5 py-0.5 rounded">
                        {es ? 'Portada' : 'Cover'}
                      </span>
                    )}
                    {item.type === 'video' && (
                      <Film className="absolute bottom-1 right-1 h-4 w-4 text-white drop-shadow" />
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-0.5 p-1 bg-[#121212]">
                    <button type="button" onClick={() => moveMedia(index, -1)} disabled={index === 0}
                      className="p-1 rounded hover:bg-white/10 disabled:opacity-30" aria-label={es ? 'Mover antes' : 'Move earlier'}>
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button type="button" onClick={() => moveMedia(index, 1)} disabled={index === media.length - 1}
                      className="p-1 rounded hover:bg-white/10 disabled:opacity-30" aria-label={es ? 'Mover después' : 'Move later'}>
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                    <button type="button" onClick={() => makeCover(index)} disabled={index === 0}
                      className="p-1 rounded hover:bg-white/10 disabled:opacity-30 text-amber-400" aria-label={es ? 'Hacer portada' : 'Make cover'}>
                      {index === 0 ? <Star className="h-3.5 w-3.5 fill-amber-400" /> : <StarOff className="h-3.5 w-3.5" />}
                    </button>
                    <button type="button" onClick={() => removeMedia(index)}
                      className="p-1 rounded hover:bg-red-500/20 text-red-400" aria-label={es ? 'Eliminar' : 'Delete'}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <input
                    value={item.caption ?? ''}
                    onChange={(e) => setCaption(index, e.target.value)}
                    placeholder={es ? 'Descripción' : 'Caption'}
                    className="w-full px-2 py-1 text-xs bg-[#1a1a1a] border-t border-white/10 text-gray-300 placeholder-gray-600 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_MIME.join(',')}
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-white/20 rounded-lg text-gray-300 hover:border-amber-500/50 hover:text-amber-400 transition-colors disabled:opacity-60"
          >
            {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <UploadCloud className="h-5 w-5" />}
            {uploading ? (es ? 'Subiendo…' : 'Uploading…') : (es ? 'Subir imágenes / video' : 'Upload images / video')}
          </button>
          <p className="mt-1 text-[11px] text-gray-500">
            {es ? 'JPG, PNG, WebP, AVIF, GIF o MP4/WebM · máx. 15 MB · la primera es la portada' : 'JPG, PNG, WebP, AVIF, GIF or MP4/WebM · max 15 MB · first one is the cover'}
          </p>
        </div>

        {/* ── Names ── */}
        <div className={sectionCls}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>{es ? 'Nombre (Español)' : 'Name (Spanish)'}</label>
              <input value={nameEs} onChange={(e) => setNameEs(e.target.value)} className={inputCls} placeholder={es ? 'Mesa de resina…' : 'Resin table…'} />
            </div>
            <div>
              <label className={labelCls}>{es ? 'Nombre (Inglés)' : 'Name (English)'}</label>
              <input value={nameEn} onChange={(e) => setNameEn(e.target.value)} className={inputCls} placeholder="Resin table…" />
            </div>
          </div>
        </div>

        {/* ── Descriptions ── */}
        <div className={sectionCls}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>{es ? 'Descripción (Español)' : 'Description (Spanish)'}</label>
              <textarea value={descEs} onChange={(e) => setDescEs(e.target.value)} rows={4} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>{es ? 'Descripción (Inglés)' : 'Description (English)'}</label>
              <textarea value={descEn} onChange={(e) => setDescEn(e.target.value)} rows={4} className={inputCls} />
            </div>
          </div>
        </div>

        {/* ── Pricing ── */}
        <div className={sectionCls}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>{es ? 'Precio (₡)' : 'Price (₡)'}</label>
              <input type="number" min="0" step="100" value={colonPrice ?? ''} onChange={(e) => setColonPrice(e.target.value ? parseFloat(e.target.value) : null)} className={inputCls} placeholder="0" />
            </div>
            <div>
              <label className={labelCls}>{es ? 'Precio (US$)' : 'Price (US$)'}</label>
              <input type="number" min="0" step="0.01" value={usdPrice ?? ''} onChange={(e) => setUsdPrice(e.target.value ? parseFloat(e.target.value) : null)} className={inputCls} placeholder="0" />
            </div>
            <div>
              <label className={labelCls}>{es ? 'Descuento (%)' : 'Discount (%)'}</label>
              <input type="number" min="0" max="100" step="0.1" value={discount ?? ''} onChange={(e) => setDiscount(e.target.value ? parseFloat(e.target.value) : null)} className={inputCls} placeholder={es ? 'Sin descuento' : 'No discount'} />
            </div>
          </div>
        </div>

        {/* ── Classification ── */}
        <div className={sectionCls}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>{es ? 'Categoría' : 'Category'}</label>
              <select value={categoryId ?? ''} onChange={(e) => setCategoryId(e.target.value ? parseInt(e.target.value) : null)} className={inputCls}>
                <option value="">{es ? 'Sin categoría' : 'No category'}</option>
                {orderedCategories.map(({ cat, depth }) => (
                  <option key={cat.id} value={cat.id}>
                    {`${'  '.repeat(depth)}${depth > 0 ? '└ ' : ''}${es ? cat.name_es : cat.name_en}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>SKU</label>
                <input value={sku} onChange={(e) => setSku(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>{es ? 'Marca' : 'Brand'}</label>
                <input value={brand} onChange={(e) => setBrand(e.target.value)} className={inputCls} />
              </div>
            </div>
          </div>

          {/* tags */}
          <div className="mt-4">
            <label className={labelCls}>{es ? 'Etiquetas' : 'Tags'}</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-400/10 text-amber-400 text-xs rounded-full border border-amber-400/20">
                  {t}
                  <button type="button" onClick={() => removeTag(t)} aria-label={`${es ? 'Quitar' : 'Remove'} ${t}`}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={tagDraft}
                onChange={(e) => setTagDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                placeholder={es ? 'Añadir etiqueta y Enter' : 'Add tag and press Enter'}
                className={inputCls}
              />
              <button type="button" onClick={addTag} className="px-3 rounded-md bg-[#252525] hover:bg-[#303030] text-gray-200" aria-label={es ? 'Añadir etiqueta' : 'Add tag'}>
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* toggles */}
          <div className="mt-4 flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="h-4 w-4 accent-amber-500" />
              {es ? 'Activo (visible en la tienda)' : 'Active (visible in store)'}
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="h-4 w-4 accent-amber-500" />
              {es ? 'Destacado' : 'Featured'}
            </label>
          </div>
        </div>

        {/* ── Specifications (collapsible) ── */}
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setShowSpecs((s) => !s)}
            aria-expanded={showSpecs}
            className="w-full flex justify-between items-center p-4 bg-[#121212] hover:bg-[#252525] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-500/40"
          >
            <span className="font-medium text-sm">{es ? 'Especificaciones técnicas' : 'Technical specifications'} {specs.length > 0 && `(${specs.length})`}</span>
            {showSpecs ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
          </button>
          {showSpecs && (
            <div className="p-4 bg-[#1a1a1a] space-y-2">
              {specs.map((s) => (
                <div key={s.id} className="flex gap-2">
                  <input value={s.key} onChange={(e) => updateSpec(s.id, 'key', e.target.value)} placeholder={es ? 'Atributo' : 'Attribute'} className={`${inputCls} flex-1`} />
                  <input value={s.value} onChange={(e) => updateSpec(s.id, 'value', e.target.value)} placeholder={es ? 'Valor' : 'Value'} className={`${inputCls} flex-1`} />
                  <button type="button" onClick={() => removeSpec(s.id)} className="px-3 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-400" aria-label={es ? 'Eliminar fila' : 'Remove row'}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={addSpec} className="flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300">
                <Plus className="h-4 w-4" /> {es ? 'Añadir especificación' : 'Add specification'}
              </button>
            </div>
          )}
        </div>

        {/* ── Actions ── */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-white/10 rounded-md text-gray-300 bg-[#1a1a1a] hover:bg-[#121212] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
          >
            {es ? 'Cancelar' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || uploading}
            className="px-5 py-2 rounded-md font-bold text-black bg-gold-gradient hover:shadow-lg hover:shadow-amber-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
            {saving ? (es ? 'Guardando…' : 'Saving…') : isNew ? (es ? 'Crear producto' : 'Create product') : (es ? 'Guardar cambios' : 'Save changes')}
          </button>
        </div>
      </div>
    </div>
  );
}
