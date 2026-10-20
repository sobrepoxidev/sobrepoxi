"""Convierte las 6 PNG de cada diseño a WebP (calidad 82, lado largo 1600 px).

Origen (fuera del repo, C:\\dev\\Proyectos\\sobrepoxi-contenido):
  nuevos2\\<diseno>\\<diseno>.png            -> heroe (portada)
  nuevos2\\serie\\<diseno>-<toma>\\<diseno>-<toma>.png -> cenital, detalle, canto, proceso, ambiente
  tanda2\\... (misma estructura)

Destino: <tienda>\\<slug>\\NN-<toma>.webp  (héroe primero = portada)

Uso (ejemplo):
  python scripts/catalog/convert-a-pedido.py --src ..\\sobrepoxi-contenido\\nuevos2 --dst ..\\sobrepoxi-contenido\\tienda
  python scripts/catalog/convert-a-pedido.py --src ..\\sobrepoxi-contenido\\tanda2 --dst ..\\sobrepoxi-contenido\\tienda

Requiere: Pillow  (pip install pillow)
"""

import argparse
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("ERROR: falta Pillow. Instale con: pip install pillow")

# Orden canonico de tomas: heroe = portada, luego cenital, detalle, canto, proceso, ambiente.
TOMA_ORDER = ["cenital", "detalle", "canto", "proceso", "ambiente"]
OUT_NAMES = {
    "heroe": "01-heroe",
    "cenital": "02-cenital",
    "detalle": "03-detalle",
    "canto": "04-canto",
    "proceso": "05-proceso",
    "ambiente": "06-ambiente",
}

# diseno (carpeta origen) -> slug de tienda (debe coincidir con media_dir de a-pedido.json)
DESIGN_TO_SLUG = {
    # Tanda 1 (nuevos2)
    "laguna-taller": "laguna-reef-dining-table",
    "isla-casa": "home-river-kitchen-island",
    "barra-taller": "workshop-river-bar-counter",
    "consola-atardecer": "sunset-reef-console-table",
    "escritorio-arenal": "sandbank-river-desk",
    "banca-manglar": "mangrove-river-bench",
    "tablas-conchal": "shell-reef-serving-boards",
    "isla-cocina-papagayo": "papagayo-river-kitchen-island",
    "mesa-pacifico-doble": "double-pacific-reef-table",
    "mesa-noche-charco": "tidepool-reef-nightstand",
    # Tanda 2 (tanda2)
    "repisas-rio": "river-reef-floating-shelves",
    "cabecera-oleaje": "surf-reef-bed-headboard",
    "mesa-bar-arrecife": "reef-bar-table",
    "cubierta-bano": "river-bathroom-vanity-top",
    "piso-terraza-conchal": "shell-reef-terrace-floor",
    "reloj-rodaja": "wood-slice-reef-clock",
}

LONG_SIDE = 1600
QUALITY = 82


def convert_one(src: Path, dst: Path) -> tuple[int, int]:
    with Image.open(src) as im:
        if im.mode in ("RGBA", "LA"):
            bg = Image.new("RGB", im.size, (255, 255, 255))
            bg.paste(im, mask=im.split()[-1])
            im = bg
        else:
            im = im.convert("RGB")
        w, h = im.size
        scale = min(1.0, LONG_SIDE / max(w, h))
        if scale < 1.0:
            im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
        dst.parent.mkdir(parents=True, exist_ok=True)
        im.save(dst, "WEBP", quality=QUALITY, method=6)
        return im.size


def toma_key(folder_name: str, design: str) -> str | None:
    """Extrae la toma desde '<diseno>-<toma>'. Devuelve None si no calza."""
    # Only this design's folders: falling back to any folder made every design take
    # the series of the first one in alphabetical order (19-oct-2026).
    if not folder_name.startswith(design + "-"):
        return None
    rest = folder_name[len(design) + 1 :]
    rest = rest.lower()
    for toma in TOMA_ORDER:
        if toma in rest:
            return toma
    return None


def process_design(src_root: Path, dst_root: Path, design: str) -> list[str]:
    slug = DESIGN_TO_SLUG.get(design, design)
    out_dir = dst_root / slug
    made: list[str] = []

    hero = src_root / design / f"{design}.png"
    if not hero.exists():
        print(f"  ! {design}: falta heroe {hero}")
        return made
    w, h = convert_one(hero, out_dir / f"{OUT_NAMES['heroe']}.webp")
    made.append(f"{slug}/01-heroe.webp ({w}x{h})")

    serie = src_root / "serie"
    found: dict[str, Path] = {}
    if serie.is_dir():
        for sub in sorted(serie.iterdir()):
            if not sub.is_dir():
                continue
            toma = toma_key(sub.name, design)
            if toma and toma not in found:
                cand = sub / f"{sub.name}.png"
                if cand.exists():
                    found[toma] = cand
    for toma in TOMA_ORDER:
        if toma not in found:
            print(f"  ! {design}: falta toma '{toma}' en serie/")
            continue
        w, h = convert_one(found[toma], out_dir / f"{OUT_NAMES[toma]}.webp")
        made.append(f"{slug}/{OUT_NAMES[toma]}.webp ({w}x{h})")
    return made


def main() -> None:
    ap = argparse.ArgumentParser(description="Convierte PNG a WebP q82 / 1600px para la tienda.")
    ap.add_argument("--src", required=True, help="Carpeta de la tanda (nuevos2 o tanda2)")
    ap.add_argument("--dst", required=True, help="Carpeta tienda de destino")
    ap.add_argument("--designs", default="", help="Lista coma-separada de disenos (por defecto: todos los conocidos presentes)")
    args = ap.parse_args()

    src_root = Path(args.src)
    dst_root = Path(args.dst)
    if not src_root.is_dir():
        sys.exit(f"ERROR: no existe --src {src_root}")

    if args.designs:
        designs = [d.strip() for d in args.designs.split(",") if d.strip()]
    else:
        designs = [d for d in DESIGN_TO_SLUG if (src_root / d).is_dir()]
        if not designs:
            sys.exit(f"ERROR:ninguna carpeta de diseno conocida en {src_root}")

    total = 0
    for design in designs:
        print(f"* {design} -> {DESIGN_TO_SLUG.get(design, design)}")
        for line in process_design(src_root, dst_root, design):
            print(f"    {line}")
            total += 1
    print(f"listo: {total} webp en {dst_root}")


if __name__ == "__main__":
    main()
