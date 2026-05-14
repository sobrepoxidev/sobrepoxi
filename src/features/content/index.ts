// Types
export type { ContactInfo, NavigationLink } from './application/distribute';

// Use cases
export { getContactInformation } from './application/use-cases/getContactInfo';
export { getNavigation } from './application/use-cases/getNavigationLinks';
export { getFooterNavigation } from './application/use-cases/getFooterNavigation';

// Guides
export { getGuides, getGuideBySlug, getAllGuideSlugs, getRelatedGuides, getGuideCategories } from './application/guides/data';

// Components
export { default as Navbar } from './presentation/components/Navbar';
export { default as NavbarClient } from './presentation/components/NavbarClient';
export { default as Footer } from './presentation/components/Footer';
export { default as WhatsAppBubble } from './presentation/components/WhatsAppBubble';
export { default as UserDropdown } from './presentation/components/UserDropdown';
export { default as FormMail } from './presentation/components/FormMail';
export { default as LocaleSwitcher } from './presentation/components/LocaleSwitcher';
export { default as LocaleSwitcherSelect } from './presentation/components/LocaleSwitcherSelect';
export { default as ScrollToTopButton } from './presentation/components/ScrollToTopButton'
export { default as OptimizedNew } from './presentation/components/OptimizedNew';;

// Providers & State
export { ContentProvider, useContentContext } from './presentation/state/ContentContext';
