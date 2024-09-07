import {
  RiDiscordFill,
  RiFacebookFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiTwitterXFill,
  RiHomeLine,
  RiHomeFill,
  RiTicket2Line,
  RiTicket2Fill,
} from 'react-icons/ri';

export const API_URL = 'http://localhost:5000';

// NAVBAR
export const navbarRoutes = [
  {
    name: 'Beranda',
    path: '/',
  },
  {
    name: 'Sewa Lapangan',
    path: '/fields',
  },
];

export const navbarMobileRoutes = [
  {
    name: 'Beranda',
    path: '/',
    icon: RiHomeLine,
    activeIcon: RiHomeFill,
  },
  {
    name: 'Pesanan',
    path: '#',
    icon: RiTicket2Line,
    activeIcon: RiTicket2Fill,
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
    name: 'Basket',
    id: 'Basket',
    value: 'Basket',
    htmlFor: 'Basket',
    text: 'Basket',
  },
  {
    name: 'Baseball',
    id: 'Baseball',
    value: 'Baseball',
    htmlFor: 'Baseball',
    text: 'Baseball',
  },
  {
    name: 'Pingpong',
    id: 'Pingpong',
    value: 'Pingpong',
    htmlFor: 'Pingpong',
    text: 'Pingpong',
  },
  {
    name: 'Soccer',
    id: 'Soccer',
    value: 'Soccer',
    htmlFor: 'Soccer',
    text: 'Soccer',
  },
  {
    name: 'Softball',
    id: 'Softball',
    value: 'Softball',
    htmlFor: 'Softball',
    text: 'Softball',
  },
  {
    name: 'Track',
    id: 'Track',
    value: 'Track',
    htmlFor: 'Track',
    text: 'Track',
  },
  {
    name: 'Volley',
    id: 'Volley',
    value: 'Volley',
    htmlFor: 'Volley',
    text: 'Volley',
  },
];

//ORDER_BY__MODAL
export const orderByModal = [
  {
    name: 'recommendation',
    id: 'recommendation',
    value: 'recommendation',
    htmlFor: 'recommendation',
    text: 'Recommendation',
  },
  {
    name: 'highest-price',
    id: 'highest-price',
    value: 'highest-price',
    htmlFor: 'highest-price',
    text: 'Highest Price',
  },
  {
    name: 'highest-rating',
    id: 'highest-rating',
    value: 'highest-rating',
    htmlFor: 'highest-rating',
    text: 'Highest Rating',
  },
  {
    name: 'lowest-price',
    id: 'lowest-price',
    value: 'lowest-price',
    htmlFor: 'lowest-price',
    text: 'Lowest Price',
  },
];

//FASILITAS__DUMMY
export const fasilitasDummy = [
  {
    name: 'Musholla',
    icon: '/images/icons/mosque.svg',
  },
  {
    name: 'Loker',
    icon: '/images/icons/loker.svg',
  },
  {
    name: 'Loker',
    icon: '/images/icons/loker.svg',
  },
  {
    name: 'Cafe',
    icon: '/images/icons/cafe.svg',
  },
  {
    name: 'Parkir',
    icon: '/images/icons/parkir.svg',
  },
  {
    name: 'Shower',
    icon: '/images/icons/shower.svg',
  },
  {
    name: 'Toilet',
    icon: '/images/icons/toilet.svg',
  },
  {
    name: 'Shower',
    icon: '/images/icons/shower.svg',
  },
];

//SCHEDULE DUMMY DATA
export const scheduleDummyData = [
  {
    id: 1,
    hour: '09.00 - 10.00',
    availability: 'Available',
    price: 500000,
  },
  {
    id: 2,
    hour: '10.00 - 11.00',
    availability: 'Available',
    price: 500000,
  },
  {
    id: 3,
    hour: '11.00 - 12.00',
    availability: 'Available',
    price: 500000,
  },
  {
    id: 4,
    hour: '13.00 - 14.00',
    availability: 'Available',
    price: 500000,
  },
  {
    id: 5,
    hour: '14.00 - 15.00',
    availability: 'Available',
    price: 500000,
  },
  {
    id: 6,
    hour: '16.00 - 17.00',
    availability: 'Booked',
    price: 500000,
  },
  {
    id: 7,
    hour: '18.00 - 19.00',
    availability: 'Booked',
    price: 500000,
  },
  {
    id: 8,
    hour: '19.00 - 20.00',
    availability: 'Available',
    price: 500000,
  },
  {
    id: 9,
    hour: '20.00 - 21.00',
    availability: 'Booked',
    price: 500000,
  },
  {
    id: 10,
    hour: '21.00 - 22.00',
    availability: 'Booked',
    price: 500000,
  },
];

//RATING_AND_REVIEW DUMMY DATA
export const ratingAndReview = [
  {
    id: 1,
    name: 'Faza Abdillah',
    date: '15 Juli 2024',
    rating: 4.6,
    comments: '“Enak banget tempatnya, cocok main bareng teman teman”',
  },
  {
    id: 2,
    name: 'Faza Abdillah',
    date: '15 Juli 2024',
    rating: 4.6,
    comments: '“Enak banget tempatnya, cocok main bareng teman teman”',
  },
  {
    id: 3,
    name: 'Faza Abdillah',
    date: '15 Juli 2024',
    rating: 4.6,
    comments: '“Enak banget tempatnya, cocok main bareng teman teman”',
  },
];

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
