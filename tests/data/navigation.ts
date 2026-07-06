export type NavigationItem = {
  label: string;
  path: string;
  external?: boolean;
};

export const expectedNavigationItems: NavigationItem[] = [
  { label: 'Explore', path: '/explore' },
  { label: 'Features', path: '/features' },
  { label: 'OTC Desk', path: '/features/otc-desk' },
  { label: 'Company', path: '/company' },
  { label: 'Support', path: '/support' },
  { label: '$MBG', path: 'https://token.multibankgroup.com/', external: true }
];

export const expectedMarketCategories = ['Top Gainers', 'Trending Now', 'Top Losers'];

export const expectedWhyMultibankSections = [
  {
    heading: 'Why MultiBank Group?',
    text: /trusted financial institutions/i
  },
  {
    heading: 'A tradition of global leadership',
    text: /Founded in 2005/i
  },
  {
    heading: 'Innovation with purpose',
    text: /technology should simplify finance/i
  },
  {
    heading: 'Integrity built into every decision',
    text: /Trust is earned through consistent action/i
  },
  {
    heading: 'The strength behind MultiBank Group',
    text: /Regulation at our core/i
  }
];
