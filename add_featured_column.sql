-- Añadir columna is_featured a la tabla products
ALTER TABLE products 
ADD COLUMN is_featured BOOLEAN DEFAULT FALSE;

-- Actualizar algunos productos para marcarlos como destacados
-- Puedes ajustar esta consulta para seleccionar los productos que quieras destacar
UPDATE products 
SET is_featured = TRUE 
WHERE id IN (
  -- Selecciona los 8 productos más recientes para marcarlos como destacados
  SELECT id FROM products ORDER BY created_at DESC LIMIT 8
);

-- Crear un índice para mejorar el rendimiento de las consultas que filtran por is_featured
CREATE INDEX idx_products_is_featured ON products(is_featured);
