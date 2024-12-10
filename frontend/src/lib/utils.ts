import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// twMerge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// interfaces
export interface Link {
  name: string;
  href: string;
}
export interface Specialist {
  name: string;
  address: string;
}
export interface Post {
  slug: string;
  title: string;
  image: {
    url: string;
  };
  content: {
    html: string;
  };
  createdAt: string;
}

// Header
export const services: string[] = [
  "Fryzjer",
  "Barber shop",
  "Salon kosmetyczny",
  "Paznokcie",
  "Brwi i rzęsy",
  "Masaż",
  "Fizjoterapia",
  "Więcej...",
];

export const typedText: string[] = [
  "Zarezerwuj czas dla siebie",
  "Podkreśl swoje piękno",
  "Odważ się na zmiany",
  "Poznaj tysiące możliwości",
  "Znajdz najlepsze okazje",
];

// Footer
export const links: Link[] = [
  {
    name: "Strona główna",
    href: "/",
  },
  {
    name: "Faq",
    href: "/faq",
  },
  {
    name: "Kontakt",
    href: "/contact",
  },
];
