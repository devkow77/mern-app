import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// twMerge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// interfaces
export interface Service {
  _id?: string;
  owner?: string;
  name: string;
  address: string;
  phoneNumber: string;
  photos: string[];
  category: string;
  price: string;
  workingHours: {
    [key: string]: string;
  };
}
export interface User {
  _id?: string;
  name: string;
  email: string;
  phoneNumber: string;
}
export interface Reservation {
  _id: string;
  user: string;
  service: {
    name: string;
  };
  name: string;
  phoneNumber: string;
  date: string;
  time: string;
  status: string;
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
  {
    name: "Wszystkie usługi",
    href: "/services",
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
