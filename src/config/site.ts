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
   vocabulary: {
      decks: {
         itemsPerPage: number;
      };
   };
   navItems: NavItem[];
   userMenuItems: NavItem[][];
   footerItems: NavItem[];
   links: {
      discord: string;
   };
}

export const siteConfig: SiteConfig = {
   title: 'Frencheers',
   description:
      'Learn to speak french fast with Frencheers: study French grammar, using an interactive input-based SRS system. With a lot of sample sentences, audio, verb conjugations and more!',
   baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
   faviconVersion: 1,
   author: {
      name: 'Matthieu Locussol',
      email: 'dev.matthieu.locussol@gmail.com',
      website: 'https://www.matthieu-locussol.com',
      twitter: '@m_lcssl',
   },
   vocabulary: {
      decks: {
         itemsPerPage: 81,
      },
   },
   links: {
      discord: 'https://discord.gg/9b6yyZKmH4',
   },
   navItems: [
      {
         label: 'Learn',
         href: '/learn',
         description: 'Learn new items',
         badge: 13,
         important: true,
         icon: 'solar:notebook-minimalistic-bold-duotone',
         disabled: true,
         isVisible: (isLoading, isAuthenticated) => !isLoading && isAuthenticated === true,
      },
      {
         label: 'Reviews',
         href: '/reviews',
         description: 'Study your items',
         badge: 45,
         important: true,
         icon: 'solar:bill-list-bold-duotone',
         isVisible: (isLoading, isAuthenticated) => !isLoading && isAuthenticated === true,
      },
      {
         label: 'About',
         href: '/about',
         icon: 'solar:user-hand-up-bold-duotone',
         isVisible: (isLoading, isAuthenticated) => !isLoading && !isAuthenticated,
      },
      {
         label: 'Pricing',
         href: '/pricing',
         icon: 'solar:star-fall-2-bold-duotone',
         isVisible: (isLoading, isAuthenticated) => !isLoading && !isAuthenticated,
      },
      {
         label: 'Blog',
         href: '/blog',
         icon: 'solar:pen-new-square-bold-duotone',
         isVisible: () => true,
      },
      {
         label: 'Content',
         href: '#',
         isVisible: () => true,
         subItems: [
            {
               label: 'Grammar',
               href: '/grammar',
               icon: 'solar:notebook-bookmark-bold-duotone',
               description: 'All grammar rules',
               disabled: true,
               isVisible: () => true,
            },
            {
               label: 'Vocabulary',
               href: '/vocabulary',
               icon: 'solar:chat-line-bold-duotone',
               description: 'All vocabulary words',
               isVisible: () => true,
            },
            {
               label: 'Conjugations',
               href: '/conjugations',
               icon: 'solar:checklist-bold-duotone',
               description: 'Drill conjugations',
               disabled: true,
               isVisible: () => true,
            },
            {
               label: 'Reading practice',
               href: '/readings',
               icon: 'solar:notebook-bold-duotone',
               description: 'Graded CEFR readings for all levels',
               disabled: true,
               isVisible: () => true,
            },
            {
               label: 'Mocked exams',
               href: '/mocks',
               icon: 'solar:notes-bold-duotone',
               description: 'Mocked DELF & DALF',
               disabled: true,
               isVisible: () => true,
            },
         ],
      },
   ],
   userMenuItems: [
      [
         {
            label: 'Profile',
            href: '/profile',
            icon: 'solar:user-id-bold-duotone',
            description: 'Edit your profile',
            disabled: true,
            isVisible: (isLoading, isAuthenticated) => !isLoading && isAuthenticated === true,
         },
         {
            label: 'Community',
            href: '/community',
            icon: 'solar:users-group-two-rounded-bold-duotone',
            description: 'Access the forums',
            disabled: true,
            isVisible: (isLoading, isAuthenticated) => !isLoading && isAuthenticated === true,
         },
         {
            label: 'Feedbacks',
            href: '/feedbacks',
            icon: 'solar:letter-bold-duotone',
            description: 'Tell us what you think!',
            disabled: true,
            isVisible: (isLoading, isAuthenticated) => !isLoading && isAuthenticated === true,
         },
      ],
      [
         {
            label: 'Settings',
            href: '/settings',
            icon: 'solar:settings-bold-duotone',
            description: 'Personalize your experience',
            disabled: true,
            isVisible: (isLoading, isAuthenticated) => !isLoading && isAuthenticated === true,
         },
         {
            label: 'Subscription',
            href: '/subscription',
            icon: 'solar:star-fall-2-bold-duotone',
            description: 'Manage your subscription',
            disabled: true,
            isVisible: (isLoading, isAuthenticated) => !isLoading && isAuthenticated === true,
         },
      ],
   ],
   footerItems: [
      {
         label: 'Home',
         href: '/',
      },
      {
         label: 'About',
         href: '/about',
      },
      {
         label: 'Blog',
         href: '/blog',
      },
      {
         label: 'Third party',
         href: '/third-party',
      },
      {
         label: 'Feedbacks',
         href: '/feedbacks',
      },
      {
         label: 'Contact us',
         href: '/contact-us',
      },
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

export const getFooterItem = (label: string): NavItem => {
   const item = siteConfig.footerItems.find((item) => item.label === label);

   if (item === undefined) {
      throw new Error(`Item ${label} not found in siteConfig.footerItems`);
   }

   return item;
};
