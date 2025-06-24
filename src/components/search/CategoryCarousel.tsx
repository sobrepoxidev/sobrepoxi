

// CategoryCarousel.tsx
// Horizontal scrollable list of product categories similar to Amazon bottom bar.
// Clicking a category redirects to the search results page filtered by that category.
// Mobile-first, works on desktop too.

import { use } from "react";
import Link from "next/link";
import { getProductCategories } from "@/lib/search";

interface Category {
  id: number;
  name?: string; // fallback generic name
  name_es?: string;
  name_en?: string;
}

interface Props {
  locale: string;
  /**
   * Optionally pre-loaded categories to avoid re-fetching when they are already available.
   */
  categories?: Category[];
  className?: string;
}

export default function CategoryCarousel({ locale, categories, className = "" }: Props) {
  const cats: Category[] = categories ?? use(getProductCategories(locale));
  



  const displayName = (cat: Category) => {
    if (locale === "es") return cat.name_es ?? cat.name ?? "";
    return cat.name_en ?? cat.name ?? "";
  };

  if (cats.length === 0) return null;

  return (
    <div className={`overflow-x-auto whitespace-nowrap scrollbar-hide w-full ${className}`}>
      <div className="flex space-x-4 px-1 py-1">
        {cats.map((cat) => {
          const name = displayName(cat);
          const href = `/search?category=${encodeURIComponent(name)}&categoryId=${cat.id}`;
          return (
            <Link
              key={cat.id}
              href={href}
              className="flex-shrink-0 text-sm font-medium text-gray-200 bg-[#303030]  hover:text-white px-2 rounded-md mb-0.5"
            >
              {name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
