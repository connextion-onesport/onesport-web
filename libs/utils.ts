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
