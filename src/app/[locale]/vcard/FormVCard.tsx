// src/app/vcard/FormVCard.tsx
"use client";

import React from "react";
import { createVCard } from "./actions";
import { useEffect, useRef } from "react";d

const initialState: { error?: string; success?: boolean } = { error: undefined, success: false };

export default function FormVCard() {
  const [state, formAction] = React.useActionState(createVCard, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form after success
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-4 text-gray-200"
      autoComplete="on"
    >
      {/* Name */}
      <div>
        <label htmlFor="full_name" className="block font-medium mb-1">
          Nombre completo
        </label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded-md bg-[#202020] border border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-md bg-[#202020] border border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block font-medium mb-1">
          Teléfono (opcional)
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="w-full rounded-md bg-[#202020] border border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500"
        />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block font-medium mb-1">
          Empresa (opcional)
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          className="w-full rounded-md bg-[#202020] border border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500"
        />
      </div>

      {/* Job Title */}
      <div>
        <label htmlFor="job_title" className="block font-medium mb-1">
          Cargo (opcional)
        </label>
        <input
          id="job_title"
          name="job_title"
          list="job-titles"
          type="text"
          autoComplete="organization-title"
          className="w-full rounded-md bg-[#202020] border border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500"
        />
        <datalist id="job-titles">
          <option value="Propietario" />
          <option value="CEO" />
          <option value="Gerente" />
          <option value="Arquitecto" />
          <option value="Diseñador" />
        </datalist>
      </div>

      {/* Website */}
      <div>
        <label htmlFor="website" className="block font-medium mb-1">
          Sitio web (opcional)
        </label>
        <input
          id="website"
          name="website"
          type="url"
          placeholder="https://example.com"
          autoComplete="url"
          className="w-full rounded-md bg-[#202020] border border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500"
        />
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block font-medium mb-1">
          Notas (opcional)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className="w-full rounded-md bg-[#202020] border border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500"
        />
      </div>

      {/* Feedback */}
      {state.error && (
        <p className="text-red-500 font-semibold">{state.error}</p>
      )}
      {state.success && (
        <p className="text-green-500 font-semibold">
          ¡vCard enviada correctamente!
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-gold-gradient-bright hover:bg-gold-gradient transition-colors text-black font-bold py-2 rounded-md disabled:opacity-50"
      >
        Enviar
      </button>
    </form>
  );
}
