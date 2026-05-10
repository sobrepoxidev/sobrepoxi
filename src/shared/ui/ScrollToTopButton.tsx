"use client";
import React from "react";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

export default function ScrollToTopButton() {
  const locale = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-1 right-8 z-50 bg-amber-500 text-white px-2 py-1 rounded-full shadow-lg hover:bg-amber-600 transition hidden md:block animate-fade-in"
      aria-label="Volver arriba"
      tabIndex={0}
    >
     ↑ {locale === 'es' ? ' Arriba' : ' Top'} 
    </button>
  );
}

