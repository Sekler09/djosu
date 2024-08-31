import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateString = (dateString: string) => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const filterDuplicatesById = <T extends { id: string | number }>(items: T[]) => {
  const seen = new Set();
  return items.filter((item) => {
    const duplicate = seen.has(item.id);
    seen.add(item.id);
    return !duplicate;
  });
};
