// AddToCartButton.tsx (Client Component)
'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useSupabase } from '@/app/supabase-provider/provider';
import { ShoppingCartIcon } from 'lucide-react';

export default function AddToCartButton({ productId, quantity = 1 }: { productId: number, quantity?: number }) {
  const { addToCart } = useCart();
  const { supabase } = useSupabase();
  const [isLoading, setIsLoading] = useState(false);
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault(); 
    setIsLoading(true);
    try {
      const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();
      
      if (product) {
        addToCart(product, quantity);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isLoading}
      className="w-full rounded-lg bg-teal-600 hover:bg-teal-700 text-white py-2.5 flex items-center justify-center gap-2 transition font-medium"
    >
      <ShoppingCartIcon className="h-4 w-4" />
      {isLoading ? 'Agregando...' : 'Añadir al carrito'}
    </button>
  );
}