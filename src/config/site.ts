export interface NavItemBase {
   href: string;
   label: string;
   important?: boolean;
   description?: string;
   badge?: number;
   icon?: string;
   disabled?: boolean;
   isVisible?: (isLoading: boolean | null, isAuthenticated: boolean | null) => boolean;
}

export interface NavItem extends NavItemBase {
   subItems?: NavItemBase[];
}

export interface SiteConfig {
   title: string;
   description: string;
   baseUrl: string;
   faviconVersion: number;
   author: {
      name: string;
      email: string;
      website: string;
      twitter: string;
   };
   navItems: NavItem[];
   userMenuItems: NavItem[][];
   links: {
      discord: string;
   };
}

export const siteConfig: SiteConfig = {
   title: 'Pokéflou',
   description:
      'Challenge yourself in Pokéflou! Guess the name of pixelated Pokémon, with the image becoming clearer after each wrong guess. Can you name them before your 5th try?',
   baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
   faviconVersion: 1,
   author: {
      name: 'Matthieu Locussol',
      email: 'dev.matthieu.locussol@gmail.com',
      website: 'https://www.matthieu-locussol.com',
      twitter: '@m_lcssl',
   },
   links: {
      discord: 'https://discord.gg/9b6yyZKmH4',
   },
   navItems: [
      {
         label: 'Leaderboard',
         href: '/leaderboard',
         icon: 'solar:pen-new-square-bold-duotone',
         isVisible: () => true,
      },
   ],
   userMenuItems: [
      [
         {
            label: 'Statistics',
            href: '/stats',
            icon: 'solar:settings-bold-duotone',
            description: 'Visualize your statistics',
            disabled: true,
            isVisible: (isLoading, isAuthenticated) => !isLoading && isAuthenticated === true,
         },
      ],
   ],
};

export const getNavigationItem = (label: string): NavItem => {
   const item = siteConfig.navItems.find((item) => item.label === label);

   if (item === undefined) {
      throw new Error(`Item ${label} not found in siteConfig.navItems`);
   }

   return item;
};

export const getUserMenuItem = (label: string): NavItem => {
   const item = siteConfig.userMenuItems
      .find((items) => items.find((item) => item.label === label))
      ?.flat()[0];

   if (item === undefined) {
      throw new Error(`Item ${label} not found in siteConfig.userMenuItems`);
   }

   return item;
};
