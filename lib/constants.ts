import {
  RiDiscordFill,
  RiFacebookFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiTwitterXFill,
  RiHomeLine,
  RiSearchLine,
  RiShoppingCart2Line,
  RiUserLine,
  RiSearchFill,
  RiHomeFill,
  RiShoppingCart2Fill,
  RiUserFill,
} from 'react-icons/ri';

// NAVBAR
export const navbarRoutes = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: "Booking",
    url: "/rent-field"
  },
  {
    name: 'News',
    path: '#',
  },
  {
    name: 'About Us',
    path: '#',
  },
];

export const navbarMobileRoutes = [
  {
    name: 'Home',
    path: '/',
    icon: RiHomeLine,
    activeIcon: RiHomeFill,
  },
  {
    name: 'Search',
    path: '/search',
    icon: RiSearchLine,
    activeIcon: RiSearchFill,
  },
  {
    name: 'Cart',
    path: '/cart',
    icon: RiShoppingCart2Line,
    activeIcon: RiShoppingCart2Fill,
  },
];

export const heroCategories = [
  {
    name: 'Basket',
    image: '/images/icons/basketball.svg',
  },
  {
    name: 'Pingpong',
    image: '/images/icons/pingpong.svg',
  },
  {
    name: 'Softball',
    image: '/images/icons/softball.svg',
  },
  {
    name: 'Track',
    image: '/images/icons/track.svg',
  },
  {
    name: 'Soccer',
    image: '/images/icons/soccer.svg',
  },
  {
    name: 'Baseball',
    image: '/images/icons/baseball.svg',
  },
  {
    name: 'Volley',
    image: '/images/icons/volleyball.svg',
  },
];

//CATEGORY__FILTER__MODAL
export const categoryFilter = [
  {
    name: "Basket",
    id: "Basket",
    value: "Basket",
    htmlFor: "Basket",
    text: "Basket"
  },
  {
    name: "Baseball",
    id: "Baseball",
    value: "Baseball",
    htmlFor: "Baseball",
    text: "Baseball"
  },
  {
    name: "Pingpong",
    id: "Pingpong",
    value: "Pingpong",
    htmlFor: "Pingpong",
    text: "Pingpong"
  },
  {
    name: "Soccer",
    id: "Soccer",
    value: "Soccer",
    htmlFor: "Soccer",
    text: "Soccer"
  },
  {
    name: "Softball",
    id: "Softball",
    value: "Softball",
    htmlFor: "Softball",
    text: "Softball"
  },
  {
    name: "Track",
    id: "Track",
    value: "Track",
    htmlFor: "Track",
    text: "Track"
  },
  {
    name: "Volley",
    id: "Volley",
    value: "Volley",
    htmlFor: "Volley",
    text: "Volley"
  },
]

//ORDER_BY__MODAL
export const orderByModal = [
  {
    name: "recommendation",
    id: "recommendation",
    value: "recommendation",
    htmlFor: "recommendation",
    text: "Recommendation",
  },
  {
    name: "lowest-price",
    id: "lowest-price",
    value: "lowest-price",
    htmlFor: "lowest-price",
    text: "Lowest Price",
  },
  {
    name: "highest-price",
    id: "highest-price",
    value: "highest-price",
    htmlFor: "highest-price",
    text: "Highest Price",
  },
  {
    name: "highest-rating",
    id: "highest-rating",
    value: "highest-rating",
    htmlFor: "highest-rating",
    text: "Highest Rating",
  },
]

// FOOTER
export const footerSocialMedia = [
  {
    name: 'OneSport - LinkedIn',
    icon: RiLinkedinFill,
    link: '/',
  },
  {
    name: 'OneSport - Instagram',
    icon: RiInstagramFill,
    link: '/',
  },
  {
    name: 'OneSport - Twitter',
    icon: RiTwitterXFill,
    link: '/',
  },
  {
    name: 'OneSport - Facebook',
    icon: RiFacebookFill,
    link: '/',
  },
  {
    name: 'OneSport - Discord',
    icon: RiDiscordFill,
    link: '/',
  },
];

export const footerColumnLinks = [
  {
    title: 'General',
    links: [
      {
        name: 'About Us',
        link: '/',
      },
      {
        name: 'Contact Us',
        link: '/',
      },
      {
        name: 'Pricing',
        link: '/',
      },
      {
        name: 'Consulting',
        link: '/',
      },
      {
        name: 'Privacy Policy',
        link: '/',
      },
    ],
  },
  {
    title: 'Services',
    links: [
      {
        name: 'Football',
        link: '/',
      },
      {
        name: 'Basketball',
        link: '/',
      },
      {
        name: 'Tennis',
        link: '/',
      },
      {
        name: 'Volleyball',
        link: '/',
      },
      {
        name: 'Golf',
        link: '/',
      },
    ],
  },
  {
    title: 'Resources',
    links: [
      {
        name: 'Blog',
        link: '/',
      },
      {
        name: 'FAQ',
        link: '/',
      },
      {
        name: 'Support',
        link: '/',
      },
    ],
  },
  {
    title: 'Legal',
    links: [
      {
        name: 'Terms & Conditions',
        link: '/',
      },
      {
        name: 'Privacy Policy',
        link: '/',
      },
      {
        name: 'Cookie Policy',
        link: '/',
      },
    ],
  },
];
