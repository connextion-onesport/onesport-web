import {PiBasketball, PiSoccerBall, PiTennisBall, PiVolleyball} from 'react-icons/pi';
import {GiShuttlecock, GiSoccerKick} from 'react-icons/gi';
import {FaTableTennisPaddleBall} from 'react-icons/fa6';
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
    name: 'Badminton',
    image: '/images/icons/basketball.svg',
    icon: GiShuttlecock,
  },
  {
    name: 'Basket',
    image: '/images/icons/pingpong.svg',
    icon: PiBasketball,
  },
  {
    name: 'Futsal',
    image: '/images/icons/softball.svg',
    icon: GiSoccerKick,
  },
  {
    name: 'Sepak Bola',
    image: '/images/icons/track.svg',
    icon: PiSoccerBall,
  },
  {
    name: 'Tenis',
    image: '/images/icons/soccer.svg',
    icon: PiTennisBall,
  },
  {
    name: 'Tenis Meja',
    image: '/images/icons/baseball.svg',
    icon: FaTableTennisPaddleBall,
  },
  {
    name: 'Voli',
    image: '/images/icons/volleyball.svg',
    icon: PiVolleyball,
  },
];

export const venueListCategoryNames = ['Futsal', 'Basket', 'Sepak Bola', 'Badminton', 'Tenis'];

//CATEGORY__FILTER__MODAL
export const categoryFilter = [
  'Badminton',
  'Basket',
  'Futsal',
  'Sepak Bola',
  'Tenis Meja',
  'Tenis',
  'Voli',
];

//ORDER_BY__DIALOG
export const orderFilter = [
  {
    id: 'rekomendasi',
    value: 'recommendation',
    htmlFor: 'rekomendasi',
    text: 'Rekomendasi',
  },
  {
    id: 'harga-tertinggi',
    value: 'highest-price',
    htmlFor: 'harga-tertinggi',
    text: 'Harga Tertinggi',
  },
  {
    id: 'rating-tertinggi',
    value: 'highest-rating',
    htmlFor: 'rating-tertinggi',
    text: 'Rating Tertinggi',
  },
  {
    id: 'harga-terendah',
    value: 'lowest-price',
    htmlFor: 'harga-terendah',
    text: 'Harga Terendah',
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
