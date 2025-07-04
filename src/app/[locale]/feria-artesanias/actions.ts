'use server';

import { supabase } from '@/lib/supabaseClient';
import type { Database } from '@/types-db';

/* Paso 1 : registrar lead */
export async function insertLead(
  name: string,
  email: string,
  phone: string
): Promise<
  | { ok: true; id: string; entries: number }
  | { ok: false; reason: 'duplicate' }
> {
  const { data, error } = await supabase
    .from('leads')
    .insert({ name, email, phone })
    .select('id, entries')
    .single();

  if (!error) {
    return { ok: true, id: data!.id, entries: data!.entries };
  }

  // Detectar violación de clave única (código 23505)
  if (error.code === '23505') {
    return { ok: false, reason: 'duplicate' };
  }

  // para otros errores - propagar
  throw error;
}

export type Social =
  | 'facebook_followed'
  | 'instagram_followed'
  | 'tiktok_followed'
  | 'youtube_followed';

/**
 * Marca la red social como seguida y actualiza el contador `entries`
 */
export async function addFollow(
  id: string,
  social: Social,
  nextEntries: number
) {
  const updates: Partial<Database['leads']> = {
    [social]: true,
    entries: nextEntries
  } as never;

  const { error } = await supabase.from('leads').update(updates).eq('id', id);
  if (error) throw error;
}


export async function sendSummaryMail(
  to: string,
  name: string,
  entries: number,
  followed: Record<Social, boolean>
) {
  const nodemailer = (await import('nodemailer')).default;

  const followedList = Object.entries(followed)
    .filter(([, v]) => v)
    .map(([k]) =>
      k === 'facebook_followed'  ? '<li>Facebook</li>'  :
      k === 'instagram_followed' ? '<li>Instagram</li>' :
      k === 'tiktok_followed'    ? '<li>TikTok</li>'    :
                                   '<li>YouTube</li>'
    )
    .join('');

  /* 👉 Plantilla con fecha y “papelitos” */
  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.4">
    <h2 style="color:#0f766e;margin:0 0 12px">
      ¡Gracias por registrarte, ${name}!
    </h2>

    <p>
      Ya estás participando por el <strong>Marco de Espejo</strong>.
      El sorteo se realizará el <strong>domingo&nbsp;15&nbsp;de&nbsp;junio&nbsp;de&nbsp;2025</strong>.
    </p>

    <p>
      <strong>Participaciones totales:</strong> ${entries}<br/>
      (${entries === 1 ? 'Tienes 1 papelito' : `Tienes ${entries} papelitos`} con tu nombre en la tómbola)
    </p>

    ${
      followedList
        ? `<p><strong>Redes que seguiste:</strong></p><ul>${followedList}</ul>`
        : '<p>Aún puedes seguir nuestras redes para sumar más papelitos.</p>'
    }

    <p style="margin-top:24px">
      Pronto grabarás tu video 360° en nuestro Photo&nbsp;Booth.
      ¡Nos vemos en la feria!<br/>— Equipo HandMadeArt
    </p>
  </div>`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });

  await transporter.sendMail({
    from: `"HANDMADE ART" <${process.env.EMAIL_USER}>`,
    to,
    subject: `¡Gracias por registrarte, ${name}!`,
    html
  });
}