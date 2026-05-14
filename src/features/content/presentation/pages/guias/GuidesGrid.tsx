"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

interface GuideCard {
  slug: string;
  title: string;
  metaDescription: string;
  readingTime: string;
  category: string;
  categorySlug: string;
  faqCount: number;
}

interface CategoryInfo {
  name: string;
  slug: string;
  count: number;
}

export default function GuidesGrid({
  guides,
  categories,
  locale,
  translations,
}: {
  guides: GuideCard[];
  categories: CategoryInfo[];
  locale: string;
  translations: {
    all: string;
    readMore: string;
    readingTime: string;
    noResults: string;
  };
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? guides.filter((g) => g.categorySlug === activeCategory)
    : guides;

  return (
    <>
      {/* ─── Category Filter ─── */}
      <section className="mx-auto max-w-6xl px-4 mt-2 mb-10">
        <div className="flex flex-wrap gap-3 justify-center">
          {/* "All" button */}
          <button
            onClick={() => setActiveCategory(null)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors cursor-pointer ${
              activeCategory === null
                ? "border-amber-500 text-amber-400 bg-amber-400/10"
                : "border-gray-700 text-gray-300 hover:border-amber-500 hover:text-amber-400"
            }`}
          >
            {translations.all}
            <span className="text-xs text-gray-500">({guides.length})</span>
          </button>

          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() =>
                setActiveCategory(
                  activeCategory === cat.slug ? null : cat.slug
                )
              }
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors cursor-pointer ${
                activeCategory === cat.slug
                  ? "border-amber-500 text-amber-400 bg-amber-400/10"
                  : "border-gray-700 text-gray-300 hover:border-amber-500 hover:text-amber-400"
              }`}
            >
              {cat.name}
              <span className="text-xs text-gray-500">({cat.count})</span>
            </button>
          ))}
        </div>
      </section>

      {/* ─── Guides Grid ─── */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-12">
            {translations.noResults}
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((guide) => (
              <article
                key={guide.slug}
                className="group flex flex-col rounded-xl border border-gray-800 bg-[#1a1a1a] overflow-hidden hover:border-amber-600/50 transition-colors"
              >
                <div className="flex-1 p-6">
                  <span className="inline-block text-xs font-medium text-amber-400 bg-amber-400/10 rounded-full px-2.5 py-0.5 mb-3">
                    {guide.category}
                  </span>

                  <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    <Link
                      href={`/${locale}/guias/${guide.slug}`}
                      className="hover:underline"
                    >
                      {guide.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                    {guide.metaDescription}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {guide.readingTime} {translations.readingTime}
                    </span>
                    <span>•</span>
                    <span>{guide.faqCount} FAQ</span>
                  </div>
                </div>

                <div className="border-t border-gray-800 px-6 py-3">
                  <Link
                    href={`/${locale}/guias/${guide.slug}`}
                    className="flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    {translations.readMore}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
