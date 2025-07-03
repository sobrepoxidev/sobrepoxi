// 👉 productsDistributor.ts
import { Product, Category } from "@/lib/hooks/useProducts";

export function distribuirProductos(
    products: Product[],
    categories: Category[],
    maxFeatured = 9
  ) {
    const usados = new Set<number>();              // <– memoria global
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
  
    /* 1️⃣  GRID principal: 0-5 primeras categorías */
    const gridByCategory: Record<number, Product[]> = {};
    const principales = categories.slice(0, 6);
    principales.forEach(cat => {
      // Productos directamente asociados a la categoría
      const propios = products.filter(p => p.category_id === cat.id);

      let candidatos: Product[] = propios;

      // Si la categoría no tiene productos, buscamos en sus sub-categorías
      if (candidatos.length === 0) {
        const childIds = categories
          .filter(c => c.parent_id === cat.id)
          .map(c => c.id);

        if (childIds.length > 0) {
          candidatos = products.filter(p => childIds.includes(p.category_id ?? -1));
        }
      }

      // Si los candidatos provienen de sub-categorías, no marcamos como usados
      const vieneDeHijas = candidatos !== propios;
      gridByCategory[cat.id] = tomar(
        candidatos,
        4,
        p => !!p.media?.length,
        !vieneDeHijas // marcarUsado = false cuando vienen de hijas
      );
    });
  
    /* Rellenar huecos si alguna categoría tiene <4 */
    const reserva = products.filter(p => !usados.has(p.id) && p.media?.length);
    principales.forEach(cat => {
      const faltan = 4 - gridByCategory[cat.id].length;
      if (faltan > 0) gridByCategory[cat.id].push(...tomar(reserva, faltan));
    });
  
    /* 2️⃣  GIFTS – máximo 12, evitando cocina y grid */
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
  
    /* 3️⃣  FEATURED – destacados primero, luego caros, máx. 9 */
    const ordenPreferido = [
      ...products.filter(p => p.is_featured),
      ...products.sort((a, b) => (b.dolar_price ?? 0) - (a.dolar_price ?? 0)),
    ];
  
    const featured = tomar(ordenPreferido, maxFeatured);
  
    return { gridByCategory, gifts, featured };
  }
  