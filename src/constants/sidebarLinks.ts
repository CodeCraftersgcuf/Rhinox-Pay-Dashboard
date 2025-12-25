import images from "./images";

export const Sidebar_links = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: images.dashboard,
    sublinks: [],
  },
 {
  name: 'User Managment',
  link: '/user/management',
  icon: images.user,
  sublinks: [
    {
      name: "social",
      link: "/social",
    },
    {
      name: "connect",
      link: "/connect",
    },
    {
      name: "Market",
      link: "/market",
    },
    {
      name: "Gym Hub",
      link: "/gymhub",
    },
  ],
 },
 {
  name: 'Transactions',
  link: '/transaction',
  icon: images.transaction,
  sublinks: [],
 },
 
 {
  name: 'Subcriptions',
  link: '/subcription',
  icon: images.subcription,
  sublinks: [],
 },
 
 {
  name: 'Verifications',
  link: '/verification',
  icon: images.verification,
  sublinks: [],
 },
 
 {
  name: 'Ads Managment',
  link: '/ads',
  icon: images.ads,
  sublinks: [],
 },
 
 {
  name: 'Social Managment',
  link: '/social',
  icon: images.social,
  sublinks: [],
 },
 
 {
  name: 'Connect Managment',
  link: '/connect',
  icon: images.love,
  sublinks: [],
 },
 
 {
  name: 'Market Managment',
  link: '/market',
  icon: images.market,
  sublinks: [],
 },
 {
  name: 'Gym Paddy Managment',
  link: '/gym',
  icon: images.gym,
  sublinks: [],
 },
 {
  name: 'Analytics & Report',
  link: '/analytics',
  icon: images.report,
  sublinks: [],
 },
  {
    name: "Support",
    link: "/support",
    icon: images.support,
    sublinks: [],
  },
  {
    name: "notification",
    link: "/notification",
    icon: images.Bell,
    sublinks: [],
  },
  {
    name: "Settings",
    link: "/settings",
    icon: images.setting,
    sublinks: [],
  },
];
