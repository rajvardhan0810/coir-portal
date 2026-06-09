export type NavItem = {
  label: string;
  href?: string;
  children?: NavItem[];
};

export const ROUTES = {
  home: "/",

  // Auth
  login: "/login",
  register: "/register",

  // Applicant
  dashboard: "/dashboard",
  profile: "/profile",
  applications: "/applications",
  schemes: "/schemes",

  // Homepage Sections
  about: "/#about",
  news: "/#news",
  registerSection: "/#register",
  connect: "/#connect",
  schemesSection: "/#schemes",
  successStories: "/#success-stories",
} as const;

export const navigationItems: NavItem[] = [
  {
    label: "Coir Board",
    children: [
      { label: "Board Members", href: ROUTES.about },
      { label: "Constitution", href: ROUTES.about },
      { label: "Organization Chart", href: ROUTES.about },
      { label: "Functions", href: ROUTES.about },
      { label: "Citizen Charter", href: ROUTES.about },
      {
        label: "Assistance",
        children: [
          {
            label: "Project Report Preparation",
            href: ROUTES.connect,
          },
          {
            label: "CI-EMS",
            href: ROUTES.login,
          },
          {
            label: "Coir-Connect",
            href: ROUTES.connect,
          },
          {
            label: "Franchise Management System",
            href: ROUTES.login,
          },
          {
            label: "Coir Products Sales App",
            href: ROUTES.login,
          },
          {
            label: "Tutorials",
            href: ROUTES.connect,
          },
        ],
      },
    ],
  },

  {
    label: "Schemes",
    children: [
      {
        label: "Coir Vikas Yojna",
        children: [
          {
            label: "Coir Industry Technology Upgradation Scheme",
            href: ROUTES.schemesSection,
          },
          {
            label: "Science and Technology",
            href: ROUTES.schemesSection,
          },
          {
            label: "Skill Upgradation and Mahila Coir Yojana",
            href: ROUTES.login,
          },
          {
            label: "Export Market Promotion",
            href: ROUTES.schemesSection,
          },
          {
            label: "Domestic Market Promotion",
            href: ROUTES.schemesSection,
          },
          {
            label:
              "Trade And Industry Related Functional Support Services",
            href: ROUTES.schemesSection,
          },
          {
            label: "Welfare Measures",
            href: ROUTES.schemesSection,
          },
        ],
      },

      {
        label: "SFURTI",
        href: ROUTES.schemesSection,
      },

      {
        label: "PMEGP",
        href: ROUTES.schemesSection,
      },

      {
        label: "ASPIRE",
        href: ROUTES.schemesSection,
      },
    ],
  },

  {
    label: "Coir Products",
    children: [
      {
        label: "Exports",
        href: ROUTES.registerSection,
      },
      {
        label: "Product Catalog",
        href: ROUTES.registerSection,
      },
      {
        label: "Products - Constructional Details",
        href: ROUTES.registerSection,
      },
      {
        label: "Coir Processing",
        href: ROUTES.registerSection,
      },
    ],
  },

  {
    label: "Ecosystem Connect",
    children: [
      {
        label: "COIR Manufacturers",
        href: ROUTES.register,
      },
      {
        label: "Exporters",
        href: ROUTES.register,
      },
      {
        label: "Clusters",
        href: ROUTES.register,
      },
      {
        label: "Coir Machinery",
        href: ROUTES.registerSection,
      },
      {
        label: "Trade Events",
        href: ROUTES.registerSection,
      },
    ],
  },

  {
    label: "Handholding",
    children: [
      {
        label: "Business Guidance Cell",
        href: ROUTES.connect,
      },
      {
        label: "Branch / Regional Offices",
        href: ROUTES.connect,
      },
      {
        label: "Showrooms",
        href: ROUTES.connect,
      },
      {
        label: "Research Centers",
        href: ROUTES.connect,
      },
      {
        label: "Training Centers",
        href: ROUTES.connect,
      },
      {
        label: "RTI",
        children: [
          {
            label: "CPIO Information",
            href: ROUTES.connect,
          },
          {
            label: "Projects",
            href: ROUTES.connect,
          },
          {
            label: "Plan Progress",
            href: ROUTES.connect,
          },
        ],
      },
    ],
  },

  {
    label: "Knowledge Hub",
    children: [
      {
        label: "Coir Industry Act / Rules / Bye-Laws",
        href: ROUTES.news,
      },
      {
        label: "Ministry News Letters",
        href: ROUTES.news,
      },
      {
        label: "Gazette Notifications",
        href: ROUTES.news,
      },
      {
        label: "Publications",
        href: ROUTES.news,
      },
      {
        label: "Image Gallery",
        href: ROUTES.successStories,
      },
      {
        label: "Videos",
        href: ROUTES.successStories,
      },
      {
        label: "Press Release",
        href: ROUTES.news,
      },
      {
        label: "Employee Corner",
        children: [
          {
            label: "Notifications",
            href: ROUTES.news,
          },
          {
            label: "Transfer Policy",
            href: ROUTES.news,
          },
          {
            label: "Circulars",
            href: ROUTES.news,
          },
          {
            label: "Office Orders",
            href: ROUTES.news,
          },
        ],
      },
    ],
  },

  {
    label: "Tender",
    children: [
      {
        label: "Tenders and Advertisement",
        href: ROUTES.news,
      },
      {
        label: "SFURTI Clusters Tenders",
        href: ROUTES.news,
      },
      {
        label: "GeM",
        href: ROUTES.news,
      },
      {
        label: "CPP",
        href: ROUTES.news,
      },
    ],
  },
];

export const quickLinks = [
  {
    label: "Coir Vikas Yojna",
    href: ROUTES.schemesSection,
  },
  {
    label: "SFURTI",
    href: ROUTES.schemesSection,
  },
  {
    label: "PMEGP",
    href: ROUTES.schemesSection,
  },
  {
    label: "ASPIRE",
    href: ROUTES.schemesSection,
  },
  {
    label: "FAQs",
    href: ROUTES.connect,
  },
  {
    label: "Privacy Policy",
    href: ROUTES.about,
  },
  {
    label: "RTI",
    href: ROUTES.connect,
  },
  {
    label: "Board Members",
    href: ROUTES.about,
  },
  {
    label: "Contact Us",
    href: ROUTES.connect,
  },
];
