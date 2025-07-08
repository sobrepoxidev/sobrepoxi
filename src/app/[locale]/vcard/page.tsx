// src/app/vcard/page.tsx
// Server component – renders the vCard form

import type { Metadata } from "next";
import { buildTitle, getCommonMetadata } from "@/lib/seo";
import FormVCard from "./FormVCard";

export const dynamic = "force-dynamic"; // Always fresh – ensures form SSR

export const metadata: Metadata = getCommonMetadata("es", {
  // The helper already merges locale; /vcard is language-agnostic for now
  title: buildTitle("Crear vCard"),
  description:
    "Completa el formulario para enviarnos tu información de contacto y generar tu tarjeta vCard.",
  alternates: { canonical: "/vcard" },
});

export default function VCardPage() {
  return (
    <div className="w-full flex justify-center bg-[#121212] py-12 px-4 sm:px-6 lg:px-8">
      <section className="w-full max-w-xl bg-[#303030] shadow-md rounded-xl p-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold gold-gradient-bright mb-6 text-center">
          Crear vCard
        </h1>
        <FormVCard />
      </section>
    </div>
  );
}
