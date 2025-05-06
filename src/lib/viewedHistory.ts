// src/lib/viewedHistory.ts
import { supabase } from './supabaseClient';

// Definición del tipo para los productos vistos
export interface ViewedProduct {
  id: number;
  name: string;
  price: number | null;
  category: string | null;
  imageUrl: string;
  viewedAt: Date;
}

// Clave para almacenar el historial en localStorage
const LOCAL_STORAGE_KEY = 'hands-made-art:viewed-history';

/**
 * Obtiene el historial de productos vistos desde localStorage
 */
export function getLocalViewedHistory(): ViewedProduct[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const historyString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!historyString) return [];
    
    return JSON.parse(historyString);
  } catch (error) {
    console.error('Error al obtener el historial de visualización:', error);
    return [];
  }
}

/**
 * Añade un producto al historial de productos vistos
 */
export async function addProductToHistory(product: {
  id: number;
  name: string | null;
  price: number | null;
  category: string | null;
  media?: Array<{ url: string, type: string }> | null;
}): Promise<void> {
  if (typeof window === 'undefined' || !product) return;
  
  try {
    // Obtener el historial existente en localStorage
    const history = getLocalViewedHistory();
    
    // Comprobar si el producto ya está en el historial
    const existingIndex = history.findIndex(item => item.id === product.id);
    
    // Crear el nuevo registro con la fecha actual
    const currentTime = new Date();
    const newEntry: ViewedProduct = {
      id: product.id,
      name: product.name || 'Producto sin nombre',
      price: product.price,
      category: product.category,
      imageUrl: product.media?.[0]?.url || '/product-placeholder.png',
      viewedAt: currentTime
    };
    
    // Si el producto ya está en el historial local, lo eliminamos para añadirlo al principio
    if (existingIndex !== -1) {
      history.splice(existingIndex, 1);
    }
    
    // Añadir el producto al principio del array local
    history.unshift(newEntry);
    
    // Limitar a 20 productos en el historial local
    const limitedHistory = history.slice(0, 20);
    
    // Guardar en localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(limitedHistory));
    
    // Si el usuario está autenticado, registrar también en la base de datos
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      // Registrar vista en la tabla view_history
      await supabase.from('view_history').upsert({
        user_id: session.user.id,
        product_id: product.id,
        viewed_at: currentTime.toISOString()
      }, {
        onConflict: 'user_id,product_id',
        ignoreDuplicates: false
      });
    }
  } catch (error) {
    console.error('Error al añadir producto al historial:', error);
  }
}

/**
 * Sincroniza el historial local con el servidor si el usuario está autenticado
 */
export async function syncViewedHistoryWithServer(): Promise<boolean> {
  try {
    // Verificar si el usuario está autenticado
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) return false;
    
    const userId = session.session.user.id;
    const localHistory = getLocalViewedHistory();
    
    // Si no hay historial local, no hay nada que sincronizar
    if (localHistory.length === 0) return true;
    
    // Convertir el historial local a formato para guardar en la base de datos
    const historyToSync = localHistory.map(item => ({
      user_id: userId,
      product_id: item.id,
      viewed_at: new Date(item.viewedAt).toISOString() // Asegurar que la fecha esté en formato ISO
    }));

    // Insertar registros en la tabla view_history
    const { error } = await supabase
      .from('view_history')
      .upsert(historyToSync, { 
        onConflict: 'user_id,product_id', // En caso de conflicto, actualizar
        ignoreDuplicates: false // No ignorar duplicados, actualiza la fecha
      });
      
    if (error) {
      console.error('Error al sincronizar historial con Supabase:', error);
      return false;
    }
    
    console.log('Historial sincronizado correctamente con Supabase');
    return true;
  } catch (error) {
    console.error('Error al sincronizar historial:', error);
    return false;
  }
}

/**
 * Elimina un producto del historial
 */
export function removeFromHistory(productId: number): void {
  if (typeof window === 'undefined') return;
  
  try {
    const history = getLocalViewedHistory();
    const filteredHistory = history.filter(item => item.id !== productId);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredHistory));
  } catch (error) {
    console.error('Error al eliminar producto del historial:', error);
  }
}

/**
 * Limpia todo el historial
 */
export function clearViewedHistory(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
  } catch (error) {
    console.error('Error al limpiar historial:', error);
  }
}
