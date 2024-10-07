import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number) {
  return Intl.NumberFormat('id-Id').format(num);
}

export function scrollIntoTheView(id: string) {
  let element = document.getElementById(id) as HTMLElement;
  if (!element) return;

  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
  });

  window.scrollBy(0, -72);
}

export const getInitials = (name: string) => {
  const parts = name.split(' ');
  let initials = '';

  for (let i = 0; i < Math.min(2, parts.length); i++) {
    initials += parts[i].charAt(0).toUpperCase();
  }

  return initials;
};

export function convertHourToDate(date: Date, hour: number) {
  const newDate = new Date(date);
  newDate.setHours(hour, 0, 0, 0);
  return newDate;
}

export function formatPrice(price: number) {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);

  return formattedPrice.replace(/\s/g, '');
}

export function getReviewCount(reviewCount: number) {
  switch (true) {
    case reviewCount > 1000:
      return '1K+ Reviews';
    case reviewCount > 100:
      return '100+ Reviews';
    case reviewCount === 1:
      return '1 Review';
    default:
      return `${reviewCount} Reviews`;
  }
}

export function splitFullName(fullName: string): {firstName: string; lastName: string} {
  const nameParts = fullName.trim().split(' '); // Split the full name by spaces
  const firstName = nameParts[0]; // The first part is always the first name
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ''; // Join the rest for the last name

  return {firstName, lastName};
}

export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

export function obfuscateEmail(email: string) {
  const [username, domain] = email.split('@');
  const obfuscatedUsername =
    username.charAt(0) + '*'.repeat(5) + username.charAt(username.length - 1);
  return obfuscatedUsername + '@' + domain;
};

export function getCurrentLocation(setLatitude: (latitude: number) => void, setLongitude: (longitude: number) => void) {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
      const {latitude, longitude} = position.coords;
      
      setLatitude(latitude);
      setLongitude(longitude);
    }, (error) => {
      console.error('Error getting location', error);
    });
  } else {
    console.error('Geolocation is not supported by this browser');
  }
}

export function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export function getFacilityImage(name: string) {
  switch (name) {
    case 'Cafe & Resto': {
      return '/images/venues/cafe&resto.png';
    }
    case 'Hot Shower': {
      return '/images/venues/hot_shower.png';
    }
    case 'Jual Makanan Ringan': {
      return '/images/venues/jual_makanan_ringan.png';
    }
    case "Jual Minuman": {
      return '/images/venues/jual_minuman.png';
    }
    case "Musholla": {
      return '/images/venues/musholla.png';
    }
    case "Parkir Mobil": {
      return '/images/venues/parkir_mobil.png';
    }
    case "Parkir Motor": {
      return '/images/venues/parkir_motor.png';
    }
    case "Ruang Ganti": {
      return '/images/venues/ruang_ganti.png';
    }
    case "Shower": {
      return '/images/venues/shower.png';
    }
    case "Toko Olahraga": {
      return '/images/venues/toko_olahraga.png';
    }
    case "Toilet": {
      return '/images/venues/toilet.png';
    }
    case "Tribun Penonton": {
      return '/images/venues/tribun_penonton.png';
    }
    case "Wi-Fi": {
      return '/images/venues/wifi.png';
    }
    default: {
      return '/images/venues/others.png';
    }
  }
}