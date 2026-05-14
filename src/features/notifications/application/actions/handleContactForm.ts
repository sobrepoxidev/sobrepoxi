"use server";

import { sendContactEmail, type ContactFormData } from "@/features/notifications";

export async function handleContactForm(
  _: unknown,
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const data: ContactFormData = {
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    message: formData.get("message")?.toString() || "",
    phone: formData.get("phone")?.toString() || undefined,
  };

  if (!data.name || !data.email || !data.message) {
    return {
      success: false,
      message: "Por favor, completa todos los campos requeridos",
    };
  }

  const result = await sendContactEmail(data);

  return {
    success: result.success,
    message: result.success
      ? "Mensaje enviado exitosamente"
      : result.error || "Error al enviar el mensaje",
  };
}