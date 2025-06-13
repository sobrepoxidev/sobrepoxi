'use client';

import { useState } from 'react';
import { insertLead, addFollow, sendSummaryMail, Social } from './actions';




const socials = {
  facebook_followed: 'https://www.facebook.com/share/1Au8nNA2ho/',
  instagram_followed:
    'https://www.instagram.com/handmadeart.store?utm_source=qr&igsh=MThjbTBhdGVxZ2FnNQ==',
  tiktok_followed: 'https://www.tiktok.com/@handmadeart.store',
  youtube_followed: 'https://www.youtube.com/@handmadeartcr',
} as const;

export default function FeriaArtesaniasPage() {
  /* paso: 0=form | 1=social | 2=thanks */
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [leadId, setLeadId] = useState<string>();
  const [entries, setEntries] = useState(1);
  const [followed, setFollowed] = useState<Record<string, boolean>>({});
  const [userInfo, setUserInfo] = useState<{ name: string; email: string }>({
    name: '',
    email: ''
  });

  /* ------- paso 1 ------- */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get('name') as string;
    const email = form.get('email') as string;
    const phone = form.get('phone') as string;

    const lead = await insertLead(name, email, phone);
    setLeadId(lead.id);
    setEntries(lead.entries);
    setUserInfo({ name, email });
    setStep(1);
  }

  /* ------- paso 2 ------- */
  async function handleFollow(key: keyof typeof socials) {
    window.open(socials[key], '_blank', 'noopener,noreferrer');
    if (!followed[key] && leadId) {
      await addFollow(leadId, key, entries + 1);
      setFollowed(prev => ({ ...prev, [key]: true }));
      setEntries(entries + 1);
    }
  }

  return (
    <main className="mx-auto max-w-sm px-4 py-8">
      {step === 0 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            ¡Toma tu video 360° <span className="text-teal-600">GRATIS</span>!
          </h1>

          <input name="name" placeholder="Nombre" className="input text-gray-800" required />
          <input name="email" type="email" placeholder="Correo" className="input text-gray-800" required />
          <input name="phone" placeholder="Celular" className="input text-gray-800" required />

          <button className="btn-primary w-full">Continuar</button>
        </form>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center text-gray-800">
            ¡Ya tienes <span className="text-teal-600">{entries}</span> participación!
          </h2>
          <p className="text-center text-gray-800">Sigue nuestras redes y gana más:</p>

          {Object.entries(socials).map(([key, url]) => (
            <button
              key={key}
              onClick={() => handleFollow(key as keyof typeof socials)}
              className={`btn-outline w-full ${followed[key] ? 'bg-teal-600 text-white' : ''}`}
            >
              {followed[key] ? '✓ Seguido' : `Seguir en ${new URL(url).hostname.split('.')[1]}`}
            </button>
          ))}

          <button
            onClick={async () => {
              // 1) Enviar el mail (no bloquea la UI si falla)
              if (leadId) {
                await sendSummaryMail(
                  userInfo.email,
                  userInfo.name,
                  entries,
                  followed as Record<Social, boolean>   // pasamos el objeto de redes
                ).catch(console.error);
              }
              // 2) Cambiar al paso final
              setStep(2);
            }}
            className="btn-primary w-full mt-4"
          >
            Listo
          </button>

        </div>
      )}

      {step === 2 && (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">¡Gracias!</h2>
          <p className="text-gray-800">
            Estás participando por el Marco de Espejo y puedes disfrutar del Photo Booth.
          </p>
          <p className="text-gray-800">Te enviaremos tu video a tu correo o WhatsApp.</p>
          <p className="text-sm text-teal-600">Participaciones acumuladas: {entries}</p>
        </div>
      )}
    </main>
  );
}
