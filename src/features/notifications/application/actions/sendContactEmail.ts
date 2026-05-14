"use server";

import { contactFormSchema, type ContactFormData } from "../schemas";
import { renderContactHtml } from "../templates/contact";
import { sendMail } from "../../infrastructure/transport/nodemailer.server";

const COMPANY_EMAIL = "info@sobrepoxi.com";

export async function sendContactEmail(
  input: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const parsed = contactFormSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, error: "Invalid input" };
    }

    const html = renderContactHtml(parsed.data);

    await sendMail({
      to: COMPANY_EMAIL,
      subject: "Nuevo mensaje de contacto - SobrePoxi",
      html,
    });

    return { success: true };
  } catch (error) {
    console.error("[sendContactEmail]", error);
    return { success: false, error: "Error al enviar el mensaje" };
  }
}