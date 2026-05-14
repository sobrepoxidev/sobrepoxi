import type { Database } from '@/shared/types/database';

type Product = Database['products'];
type Category = Database['categories'];

export interface DistributeProductsResult {
  gridByCategory: Record<number, Product[]>;
  gifts: Product[];
  featured: Product[];
}

export function distributeProducts(
  products: Product[],
  categories: Category[],
  maxFeatured = 9
): DistributeProductsResult {
  const usados = new Set<number>();
  const tomar = (
    lista: Product[],
    n: number,
    filtro?: (p: Product) => boolean,
    marcarUsado = true
  ) => {
    const r: Product[] = [];
    for (const p of lista) {
      if (r.length === n) break;
      if (marcarUsado && usados.has(p.id)) continue;
      if (filtro && !filtro(p)) continue;
      r.push(p);
      if (marcarUsado) usados.add(p.id);
    }
    return r;
  };

  const gridByCategory: Record<number, Product[]> = {};
  const principales = categories.slice(0, 6);
  principales.forEach(cat => {
    const propios = products.filter(p => p.category_id === cat.id);
    let candidatos: Product[] = propios;

    if (candidatos.length === 0) {
      const childIds = categories
        .filter(c => c.parent_id === cat.id)
        .map(c => c.id);

      if (childIds.length > 0) {
        candidatos = products.filter(p => childIds.includes(p.category_id ?? -1));
      }
    }

    const vieneDeHijas = candidatos !== propios;
    gridByCategory[cat.id] = tomar(
      candidatos,
      4,
      p => !!p.media?.length,
      !vieneDeHijas
    );
  });

  const reserva = products.filter(p => !usados.has(p.id) && p.media?.length);
  principales.forEach(cat => {
    const faltan = 4 - gridByCategory[cat.id].length;
    if (faltan > 0) gridByCategory[cat.id].push(...tomar(reserva, faltan));
  });

  const kitchenIds = categories
    .filter(c => c.name.toLowerCase().includes('kitchen'))
    .map(c => c.id);

  const gifts = tomar(
    products,
    12,
    p =>
      !!p.media?.length &&
      !kitchenIds.includes(p.category_id ?? -1)
  );

  const ordenPreferido = [
    ...products.filter(p => p.is_featured),
    ...products.sort((a, b) => (b.dolar_price ?? 0) - (a.dolar_price ?? 0)),
  ];

  const featured = tomar(ordenPreferido, maxFeatured);

  return { gridByCategory, gifts, featured };
}

export const distribuirProductos = distributeProducts;