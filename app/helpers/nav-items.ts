export type NavItem = {
  label: string;
  href: string;
  exact?: boolean;
};

export const navItems: NavItem[] = [
  { label: 'Home', href: '/', exact: true },
  { label: 'Catalog', href: '/catalog', exact: true },
];

// Function for automatically determining the active tab
export function isItemActive(path: string, item: NavItem) {
  if (item.exact) {
    return path === item.href; // exact → exact match only
  }
  return path.startsWith(item.href); // not exact → active on subpages as well
}
