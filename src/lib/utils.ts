import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const diffMilliseconds = now.getTime() - targetDate.getTime();

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto', style: 'long' });

  const seconds = Math.round(diffMilliseconds / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const months = Math.round(days / 30.436875); // Average days in a month
  const years = Math.round(days / 365.25); // Average days in a year

  if (Math.abs(seconds) < 60) {
    return rtf.format(-seconds, 'second');
  } else if (Math.abs(minutes) < 60) {
    return rtf.format(-minutes, 'minute');
  } else if (Math.abs(hours) < 24) {
    return rtf.format(-hours, 'hour');
  } else if (Math.abs(days) < 30) { // Up to roughly a month
    return rtf.format(-days, 'day');
  } else if (Math.abs(months) < 12) {
    return rtf.format(-months, 'month');
  } else {
    return rtf.format(-years, 'year');
  }
}