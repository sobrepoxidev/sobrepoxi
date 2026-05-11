import { getNavigationLinks, type NavigationLink } from '../distribute';

export function getNavigation(locale: string): NavigationLink[] {
  return getNavigationLinks(locale);
}