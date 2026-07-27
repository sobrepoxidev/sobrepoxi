/**
 * Sanitiza un valor que se usará como destino de redirección interna.
 *
 * Previene **open redirect / phishing via redirect** (política de
 * "Páginas engañosas" de Google Safe Browsing): un atacante puede construir
 * enlaces como `?next=//evil.com` o `?next=https://evil.com` para que tu
 * dominio de confianza sirva de pasarela hacia un sitio malicioso.
 *
 * Reglas:
 * - Solo se permiten rutas **relativas al sitio** (empiezan con una sola `/`).
 * - Se rechazan URLs absolutas, esquemas (`//`, `/\`, `https:`), protocolos
 *   especiales (`javascript:`, `data:`) y trampas de normalización.
 * - Si el valor no es seguro, se devuelve `fallback` (por defecto `/`).
 *
 * @param value    Valor crudo proveniente de la query string / input de usuario.
 * @param fallback Ruta segura a usar cuando `value` no lo es (default `/`).
 */
export function getSafeRedirectPath(value: string | null | undefined, fallback = '/'): string {
  if (!value) return fallback;

  // Decodifica intentos de ofuscación (%2F%2Fevil.com, etc.).
  let candidate = value;
  try {
    // Decodificamos hasta dos veces para cubrir doble-encoding.
    candidate = decodeURIComponent(candidate);
    candidate = decodeURIComponent(candidate);
  } catch {
    // Si falla la decodificación, usamos el valor original.
  }

  // Quita espacios y caracteres de control que pueden engañar al parser.
  candidate = candidate.replace(/[\s\x00-\x1f]/g, '');

  // Debe empezar con exactamente una barra.
  if (!candidate.startsWith('/')) return fallback;

  // Prohíbe "//" y "/\" → redirección a host externo (//evil.com, /\evil.com).
  if (candidate.startsWith('//') || candidate.startsWith('/\\')) return fallback;

  // Prohíbe esquemas peligrosos embebidos tras la barra inicial.
  // Ej: /javascript:alert(1) o /https://evil.com como pathname absoluto
  // ya quedan descartados por las reglas anteriores, pero reforzamos:
  if (/^(\/)+(javascript|data|vbscript|file|https?|mailto):/i.test(candidate)) {
    return fallback;
  }

  // Rechaza cualquier aparición de un esquema URL absoluto al inicio.
  // A este punto candidate empieza con "/" (una sola) y no con "//".
  // Validamos que no contenga "://" de forma que pueda escalar a host.
  // (Una ruta interna normal nunca contiene "://".)
  if (/^[^?]*:\/\//.test(candidate)) return fallback;

  return candidate;
}
