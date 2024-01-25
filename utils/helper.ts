import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function tailwindMerge(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLightness(hexColor: string) {
  // Ensure the hexColor is in the format #RRGGBB
  hexColor = hexColor.replace(/^#/, '');

  // Convert hex to RGB
  const bigint = parseInt(hexColor, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Normalize RGB values to the range [0, 1]
  const normalizedR = r / 255;
  const normalizedG = g / 255;
  const normalizedB = b / 255;

  // Find the minimum and maximum values among the RGB components
  const max = Math.max(normalizedR, normalizedG, normalizedB);
  const min = Math.min(normalizedR, normalizedG, normalizedB);

  // Calculate the lightness
  const lightness = (max + min) / 2;

  return lightness;
}
