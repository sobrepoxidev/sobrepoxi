-- Migration: 0001 — add featured column to products
-- Created: 2026-05-11
-- Description: Adds is_featured boolean column to products table for featured product筛选
-- Reversible: ALTER TABLE products DROP COLUMN is_featured;

-- Añadir columna is_featured a la tabla products
ALTER TABLE products
ADD COLUMN is_featured BOOLEAN DEFAULT FALSE;

-- Actualizar algunos productos para marcarlos como destacados
UPDATE products
SET is_featured = TRUE
WHERE id IN (
  SELECT id FROM products ORDER BY created_at DESC LIMIT 8
);

-- Crear un índice para mejorar el rendimiento
CREATE INDEX idx_products_is_featured ON products(is_featured);