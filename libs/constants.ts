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

export const API_URL = 'http://cymint.cloud:3000/api';

// NAVBAR
export const navbarRoutes = [
  {
    name: 'Beranda',
    path: '/',
  },
  {
    name: 'Sewa Lapangan',
    path: '/venues',
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

export const fieldImagesOutdoor = [
  'https://plus.unsplash.com/premium_photo-1667598736309-1ea3b0fb1afa?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1586428268321-8e067843a113?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1684713510655-e6e31536168d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1684106554224-1df87e5c2e29?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1684446464405-71867f88356b?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1708119178805-321dec8ba9cf?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

export const fieldImages = [
  'https://plus.unsplash.com/premium_photo-1667598736309-1ea3b0fb1afa?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1586428268321-8e067843a113?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1684713510655-e6e31536168d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1684106554224-1df87e5c2e29?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1684446464405-71867f88356b?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1708119178805-321dec8ba9cf?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1559369064-c4d65141e408?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1555688695-bd7b47dd8a8a?q=80&w=1896&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1695950695168-f4038b55a9ca?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1708696237327-5fd6598707ae?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1709303662600-1aa5938933e3?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds',
];

export const fieldImagesIndoor = [
  'https://images.unsplash.com/photo-1559369064-c4d65141e408?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1555688695-bd7b47dd8a8a?q=80&w=1896&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1695950695168-f4038b55a9ca?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1708696237327-5fd6598707ae?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1709303662600-1aa5938933e3?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds',
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
    title: 'Olahraga',
    links: [
      {
        name: 'Sepak Bola',
        link: '#',
      },
      {
        name: 'Futsal',
        link: '#',
      },
      {
        name: 'Bulu Tangkis',
        link: '#',
      },
      {
        name: 'Bola Basket',
        link: '#',
      },
      {
        name: 'Bola Voli',
        link: '#',
      },
      {
        name: 'Tenis',
        link: '#',
      },
      {
        name: 'Tenis Meja',
        link: '#',
      },
    ],
  },
  {
    title: 'Tentang',
    links: [
      {
        name: 'Info Perusahaan',
        link: '#',
      },
      {
        name: 'Karier',
        link: '#',
      },
      {
        name: 'Tim Kami',
        link: '#',
      },
      {
        name: 'Syarat Layanan',
        link: '#',
      },
      {
        name: 'Kebijakan Privasi',
        link: '#',
      },
    ],
  },
  {
    title: 'Komunitas',
    links: [
      {
        name: 'Forum',
        link: '#',
      },
      {
        name: 'Local Events',
        link: '#',
      },
      {
        name: 'Blog',
        link: '#',
      },
      {
        name: 'Social Media',
        link: '#',
      },
      {
        name: 'Join a Team',
        link: '#',
      },
    ],
  },
  {
    title: 'Dukungan',
    links: [
      {
        name: 'Pusat Bantuan',
        link: '#',
      },
      {
        name: 'FAQ',
        link: '#',
      },
      {
        name: 'Hubungi Kami',
        link: '#',
      },
      {
        name: 'Panduan Pengguna',
        link: '#',
      },
      {
        name: 'Laporkan Masalah',
        link: '#',
      },
    ],
  },
];
