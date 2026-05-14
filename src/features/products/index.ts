// Types
export type { Product, Category } from './application/hooks/useProducts';
export type { ProductsData } from './application/hooks/useProducts';
export { useProducts } from './application/hooks/useProducts';

// Schemas
export { productSearchParamsSchema, productIdSchema } from './application/schemas';

// Application functions (client-safe)
export { getCategoriesFromDB, getFeaturedProductsFromDB, getProductsByCategoryFromDB } from './application/categories';
export { getProductCategories, searchProductsFn as searchProducts } from './application/search';
export type { SearchResult } from './application/search';
export { getLocalViewedHistory, addProductToHistory, syncViewedHistoryWithServer, removeFromHistory, clearViewedHistory } from './application/viewed-history';
export type { ViewedProduct } from './application/viewed-history';
export { distributeProducts, distribuirProductos } from './application/distribute';

// Components
export { default as ProductCard } from './presentation/components/ProductCard';
export { default as ProductDetail } from './presentation/components/ProductDetail';
export { default as ProductsPageContent } from './presentation/components/ProductsPageContent';
export { default as ProductFilters } from './presentation/components/ProductFilters';
export { default as RelatedProducts } from './presentation/components/RelatedProducts';
export { default as RelatedProductsClient } from './presentation/components/RelatedProductsClient';
export { ProductCardModal } from './presentation/components/ProductModal';
export { ProductCardModalWithTracking } from './presentation/components/ProductModalWithTracking';
export { default as PaginationControls } from './presentation/components/PaginationControls';
export { default as LoadingGallery } from './presentation/components/LoadingGallery';
export { default as ReviewsList } from './presentation/components/ReviewsList';
export { default as ReviewForm } from './presentation/components/ReviewForm';
export { default as ViewedProductsHistory } from './presentation/components/ViewedProductsHistory';
export { default as ViewedHistoryTracker } from './presentation/components/ViewedHistoryTracker';
export { ExpandButton, MediaCarousel, FullscreenModal, GalleryModal } from './presentation/components/ClientComponents';

// Providers & State
export { ProductsProvider } from './presentation/providers/ProductsProvider';
export { useProductsContext } from './presentation/state/ProductsContext';

// Search components
export { default as SearchBar } from './presentation/components/search/SearchBar';
export { default as SearchResultsPage } from './presentation/components/search/SearchResultsPage';
export { default as SearchSuggestions } from './presentation/components/search/SearchSuggestions';
export { default as CategoryCarousel } from './presentation/components/search/CategoryCarousel';

// Card components
export { default as Card } from './presentation/components/cards/Card';
export { default as FeaturedProductsSection } from './presentation/components/cards/FeaturedProductsSection';
export { default as CarrucelSection } from './presentation/components/cards/CarrucelSection';
export { default as CarrucelSectionA } from './presentation/components/cards/CarrucelSectionA';
export { default as GiftsCarouselSection } from './presentation/components/cards/GiftsCarouselSection';
export { default as GridSection } from './presentation/components/cards/GridSection';
export { default as OptimizedGridSection } from './presentation/components/cards/OptimizedGridSection';
export { default as OptimizedCarrucelSection } from './presentation/components/cards/OptimizedCarrucelSection';
export { default as CarouselClient } from './presentation/components/cards/CarouselClient';


