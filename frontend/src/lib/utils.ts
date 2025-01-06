import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// twMerge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// interfaces
export interface Place {
  name: string;
  title: string;
  address: string;
  photos: string[];
  description: string;
  perks: string[];
  extraInfo: string;
  checkIn: number;
  checkOut: number;
  maxGuests: number;
  price: number;
}
export interface User {
  id: number;
  name: string;
  email: string;
}

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
  createdBy: {
    name: string;
    picture: string;
  };
  author: {
    slug: string;
    name: string;
    image: {
      url: string;
    };
    description: string;
  };
}

export interface Author {
  slug: string;
  name: string;
  image: {
    url: string;
  };
  description: string;
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
  "Świąteczne promocje czekają",
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
  {
    name: "Autorzy Blogów",
    href: "/blog/authors",
  },
];

// Faq
export const faqLinks: string[] = [
  "O nas",
  "Regulamin",
  "Polityka prywatności",
  "Kontakt",
  "Informacje prawne",
  "Projekty Unijne",
  "Bezpieczeństwo",
];
