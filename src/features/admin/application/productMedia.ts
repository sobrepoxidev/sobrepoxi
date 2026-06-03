// Application-layer entry point for product media storage. Presentation imports
// from here (presentation → application → infrastructure) to satisfy the
// Clean Architecture boundaries enforced by eslint-plugin-boundaries.
export {
  uploadProductMedia,
  deleteProductMediaByUrl,
  ACCEPTED_MIME,
  MAX_FILE_BYTES,
} from '../infrastructure/productMediaStorage';
