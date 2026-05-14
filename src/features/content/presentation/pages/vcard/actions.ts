// src/app/vcard/actions.ts
"use server";

import { createServerSupabaseClient } from '@/shared/supabase/server';

interface FormState {
  error?: string;
  success?: boolean;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function createVCard(prevState: FormState, formData: FormData): Promise<FormState> {
  const full_name = (formData.get("full_name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const phone = (formData.get("phone") as string)?.trim() || null;
  const company = (formData.get("company") as string)?.trim() || null;
  const job_title = (formData.get("job_title") as string)?.trim() || null;
  const website = (formData.get("website") as string)?.trim() || null;
  const notes = (formData.get("notes") as string)?.trim() || null;

  // Basic validation
  if (!full_name) {
    return { error: "El nombre es obligatorio" };
  }
  if (!email || !isValidEmail(email)) {
    return { error: "Email inválido" };
  }

  try {
    const supabase = await createServerSupabaseClient();

    const { error } = await supabase.from("vcards").insert({
      full_name,
      email,
      phone,
      company,
      job_title,
      website,
      notes,
    });

    if (error) return { error: error.message };

    return { success: true };
  } catch (err) {
    return { error: (err as Error).message };
  }
}
