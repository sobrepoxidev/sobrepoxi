// src/app/feria-artesanias-terminos/page.tsx
export const metadata = { title: 'Términos y Condiciones' };

export default function Terminos() {
  return (
    <main className="mx-auto max-w-prose p-6 space-y-6 text-gray-800">
      <h1 className="text-2xl font-bold">Términos y Condiciones</h1>

      {/* Responsable y finalidad */}
      <p>
        Responsable del tratamiento:&nbsp;
        <strong>HandMadeArt</strong>. La finalidad es:
        <br />
        — Gestionar tu registro en la dinámica del&nbsp;
        <em>Photo Booth&nbsp;360°</em>.
        <br />
        — Facilitar tu participación en el sorteo del&nbsp;
        <strong>Marco de Espejo</strong>.
        <br />
        — Enviarte tu video 360° y, opcionalmente, novedades o promociones
        relacionadas con la marca.
        <br />
        Almacenaremos tu nombre, correo electrónico y número de teléfono. Podrás
        ejercer tus derechos de acceso, rectificación, cancelación u oposición
        (ARCO) escribiendo a&nbsp;
        <a
          className="underline text-teal-600"
          href="mailto:info@handmadeart.store"
          target="_blank"
          rel="noopener noreferrer"
        >
          info@handmadeart.store
        </a>
        .
      </p>

      {/* Bases del sorteo */}
      <h2 className="text-xl font-semibold">Bases del sorteo</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>
          <strong>Premio&nbsp;:</strong> 1&nbsp;Marco de Espejo.
        </li>
        <li>
          <strong>Fecha del sorteo&nbsp;:</strong>&nbsp;domingo&nbsp;15&nbsp;de&nbsp;junio&nbsp;de&nbsp;2025.
        </li>
        <li>
          <strong>Participaciones&nbsp;:</strong> obtienes 1&nbsp;entrada por
          registrarte y 1&nbsp;entrada adicional por cada red social seguida.
          Cada entrada equivale a un “papelito” con tu nombre en la tómbola.
        </li>
        <li>
          <strong>Selección del ganador&nbsp;:</strong> método aleatorio. El
          ganador será notificado por correo electrónico y/o WhatsApp el mismo
          día del sorteo.
        </li>
        <li>
          <strong>Requisitos&nbsp;:</strong> mayores de 18&nbsp;años y
          residentes en Costa Rica.
        </li>
        <li>
          <strong>Sin coste&nbsp;:</strong> la participación es totalmente
          gratuita y no requiere compra.
        </li>
        <li>
          <strong>Exoneración&nbsp;:</strong> Meta (Facebook e Instagram),
          TikTok y YouTube no patrocinan, avalan ni administran esta promoción.
        </li>
      </ul>

      {/* Conservación y baja */}
      <h2 className="text-xl font-semibold">Conservación de datos</h2>
      <p>
        Tus datos se conservarán durante la vigencia de la promoción y, en su
        caso, para el envío de futuras comunicaciones comerciales hasta que
        solicites la baja. Puedes darte de baja en cualquier momento haciendo
        clic en el enlace que se incluirá en cada correo o escribiendo a la
        dirección de contacto indicada.
      </p>
    </main>
  );
}

