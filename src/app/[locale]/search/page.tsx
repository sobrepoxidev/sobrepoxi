import SearchResultsPage from "@/components/search/SearchResultsPage";
import type { Metadata } from "next";
import { getCommonMetadata, buildTitle } from "@/lib/seo";

type tParams = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: buildTitle(locale === "es" ? "Resultados de búsqueda" : "Search results"),
    ...getCommonMetadata(locale),
  };
}

export default async function SearchPage({ params }: { params: tParams }) {
    const { locale } = await params;
    return (
      <div className="bg-[#121212]">
        <SearchResultsPage locale={locale} />
      </div>
    );
}
