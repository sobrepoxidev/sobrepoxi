import SearchResultsPage from "@/components/search/SearchResultsPage";

type tParams = Promise<{ locale: string }>;
export default async function SearchPage({ params }: { params: tParams }) {
    const { locale } = await params;
    return <SearchResultsPage locale={locale} />;
}
