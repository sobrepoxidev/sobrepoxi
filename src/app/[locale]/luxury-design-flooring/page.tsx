/* --------------------------------------------------------------------------
 *  /luxury-design-flooring → Redirects to /epoxy-floors
 *  Preserves SEO equity from existing Google indexed links
 * ----------------------------------------------------------------------- */

import { redirect } from "next/navigation";

export type tParams = Promise<{ id: string; locale: "es" | "en" }>;

export default async function LuxuryDesignFlooringRedirect({
  params,
}: {
  params: tParams;
}) {
  const { locale } = await params;
  redirect(`/${locale}/epoxy-floors`);
}
