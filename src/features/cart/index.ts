// Types
export type { CartItem, CartContextProps, Product } from './application/types';

// State & Providers
export { CartProvider } from './presentation/providers/CartProvider';
export { CartContext, useCart } from './presentation/state/CartContext';
export type { UseCartReturn } from './presentation/state/CartContext';

// Application helpers
export { encodeCartToBase64, decodeCartFromBase64 } from './application/encode';
export type { EncodedCartItem } from './application/encode';

// Use cases
export { addToCartUseCase } from './application/use-cases/addToCart';
export { removeFromCartUseCase } from './application/use-cases/removeFromCart';
export { updateCartQuantityUseCase } from './application/use-cases/updateCartQuantity';
export { rebuildCartFromIds } from './application/use-cases/rebuildCartFromIds';
export { syncCartWithDB } from './application/use-cases/syncCartWithDB';

// Distribute
export { distributeCart, accionesCarrito } from './application/distribute';
export type { DistributeCartResult } from './application/distribute';

// Components
export { default as CartWidget } from './presentation/components/CartWidget';
export { default as CartItemCard } from './presentation/components/CartItemCard';
export { default as CartDrawer } from './presentation/components/CartDrawer';
