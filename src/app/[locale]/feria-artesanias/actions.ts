'use server';

import { supabase } from '@/lib/supabaseClient';
import type { Database } from '@/types-db';
import { sendMail } from '@/lib/email';

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



type Social =
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
export async function sendThankYouMail(subject: string, html: string, to: string) {
  const nodemailer = (await import('nodemailer')).default;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

}