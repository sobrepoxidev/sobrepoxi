"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FloatingTicket() {
  const [visible, setVisible] = useState(true);
  const t = useTranslations("floatingTicket");

  if (!visible) return null;

  return (
    <div style={{ backdropFilter: "blur(2px)" }} className="fixed top-20 right-4 bg-gradient-to-b from-white/40 via-white/70 to-white/40 z-50 text-gray-800 px-2 py-2 rounded-lg shadow-2xl border border-gray-700 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-[90%] sm:w-auto max-w-sm sm:max-w-none transition-all duration-300">
      
      {/* 🏆 Texto descriptivo */}
      <span className="text-sm sm:text-lg font-semibold tracking-wide text-center sm:text-left">
        {t("description")}
      </span>
      
      {/* 🎟️ Botón de comprar ticket */}
      <Link
        href="/poxicards"
        className="btn-primary hover:bg-secondary-hover text-white px-1 sm:px-2 py-1 ml-1 mr-1 text-sm font-bold rounded-lg transition-all w-full sm:w-auto text-center"
      >
        {t("buyButton")}
      </Link>
      
      {/* ❌ Botón de cerrar */}
      <button
        onClick={() => setVisible(false)}
        aria-label={t("close")}
        className="rounded-full hover:bg-gray-200 transition absolute ml-0 mr-0 pr-0 pl-0 top-0 right-0 sm:static sm:ml-auto"
      >
        <X className="w-5 h-5 opacity-80 hover:opacity-100 transition" />
      </button>
      
    </div>
  );
}
