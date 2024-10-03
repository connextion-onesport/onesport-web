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