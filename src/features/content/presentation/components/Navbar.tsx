import NavbarClient from './NavbarClient';

export default async function Navbar({ locale }: { locale: string }) {
  return <NavbarClient locale={locale} />;
}
