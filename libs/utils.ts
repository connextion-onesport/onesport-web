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
