export const metadata = { title: 'Términos y condiciones' };

export default function Terminos() {
  return (
    <main className="mx-auto max-w-prose p-6 space-y-4">
      <h1 className="text-2xl font-bold">Términos y Condiciones</h1>
      <p>
        Responsable del tratamiento: <strong>HandMadeArt</strong>. Finalidad:
        gestionar tu participación en el sorteo y enviarte tu video 360°. Almacenaremos
        tu nombre, correo y teléfono. Podrás ejercer tus derechos ARCO escribiendo a
        <a className="text-teal-600" href="mailto:privacy@handmadeart.store">
          {' '}
          privacy@handmadeart.store
        </a>
        .
      </p>
      <h2 className="text-xl font-semibold">Bases del sorteo</h2>
      <ul className="list-disc list-inside">
        <li>Premio: 1 Marco de Espejo.</li>
        <li>Participación gratuita. Se asigna 1 entrada por registro y 1 por cada red seguida.</li>
        <li>El ganador se elegirá al azar y será notificado por correo.</li>
        <li>Mayores de 18 años residentes en Costa Rica.</li>
      </ul>
    </main>
  );
}
