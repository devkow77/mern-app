import { Container } from "./index";
import { links, Link } from "../lib/utils";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-800 py-8 text-white dark:bg-zinc-900">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <ul className="flex flex-wrap items-center gap-4 text-sm lg:gap-8">
            {links.map(({ name, href }: Link, index: number) => (
              <a
                href={href}
                key={index}
                className="font-semibold duration-200 hover:text-sky-500 hover:underline"
              >
                <li>{name}</li>
              </a>
            ))}
          </ul>
        </div>
        <div className="my-6 h-[2px] w-full bg-white/20" />
        <div className="flex flex-wrap items-center justify-between gap-8 lg:gap-16">
          <div className="max-w-2xl space-y-4">
            <h2 className="font-semibold">booking</h2>
            <p className="text-sm leading-6 opacity-80 lg:text-base lg:leading-8">
              Booking to darmowa aplikacja do rezerwacji, dzięki której z
              łatwością znajdziesz wolny termin i wygodnie umówisz się na
              wizytę. Bez dzwonienia — rezerwujesz o każdej porze i z dowolnego
              miejsca.
            </p>
          </div>
          <div className="flex items-center gap-4 text-2xl lg:block lg:space-y-5">
            <a
              href="https://www.instagram.com"
              target="_blank"
              className="block duration-200 hover:text-sky-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              className="block duration-200 hover:text-sky-500"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              className="block duration-200 hover:text-sky-500"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
