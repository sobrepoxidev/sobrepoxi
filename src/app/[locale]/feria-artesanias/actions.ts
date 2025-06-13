'use server';

import { supabase } from '@/lib/supabaseClient';
import type { Database } from '@/types-db';

/* Paso 1 : registrar lead */
export async function insertLead(
  name: string,
  email: string,
  phone: string
): Promise<{ id: string; entries: number }> {
  const { data, error } = await supabase
    .from('leads')
    .insert({ name, email, phone })
    .select('id, entries')
    .single();

  if (error) throw error;
  return data as { id: string; entries: number };
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

type FollowSummary = Record<Social, boolean>;

export async function sendSummaryMail(
  to: string,
  name: string,
  entries: number,
  followed: FollowSummary
) {
  // 1) Importar nodemailer solo en el servidor
  const nodemailer = (await import('nodemailer')).default;

  // 2) Listado de redes seguidas en HTML
  const followedList = Object.entries(followed)
    .filter(([, v]) => v)                           // solo las true
    .map(([k]) => {
      return k === 'facebook_followed'  ? '<li>Facebook</li>'
           : k === 'instagram_followed' ? '<li>Instagram</li>'
           : k === 'tiktok_followed'    ? '<li>TikTok</li>'
           : '<li>YouTube</li>';
    })
    .join('');

  // 3) Plantilla básica
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.4">
      <h2 style="color:#0f766e;margin:0 0 12px">
        ¡Gracias por registrarte, ${name}!
      </h2>
      <p>
        Ya estás participando por el <strong>Marco de Espejo</strong> y pronto
        grabarás tu video 360°.
      </p>
      <p><strong>Participaciones totales:</strong> ${entries}</p>
      ${
        followedList
          ? `<p><strong>Redes que seguiste:</strong></p><ul>${followedList}</ul>`
          : '<p>Aún puedes seguir nuestras redes para sumar más entradas.</p>'
      }
      <p style="margin-top:24px">
        ¡Nos vemos en el Photo&nbsp;Booth!<br/>— Equipo HandMadeArt
      </p>
    </div>`;

  // 4) Transporter Gmail (igual que el tuyo actual)
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