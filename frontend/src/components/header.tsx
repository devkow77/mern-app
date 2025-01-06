import { services, typedText } from "../lib/utils";
import { Container, Navbar } from "./index";
import { ReactTyped } from "react-typed";
import { Input } from "./ui/input";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="relative h-[600px] w-full text-white">
      <div className="absolute z-10 h-full w-full bg-black/40" />
      <video
        autoPlay
        loop
        muted
        className="absolute h-full w-full object-cover"
      >
        <source src="/header.mp4" type="video/mp4" />
      </video>
      <Container className="relative z-10 h-full">
        <Navbar />
        <Content />
        <ServiceList />
      </Container>
    </header>
  );
};

export const Content = () => {
  return (
    <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center">
      <div className="w-full space-y-2 px-6 text-center lg:space-y-6">
        <ReactTyped
          strings={typedText}
          typeSpeed={40}
          backDelay={2500}
          backSpeed={5}
          loop
          className="text-2xl font-bold md:text-3xl lg:text-5xl"
        />
        <p className="text-sm md:text-base">
          Odkryj najlepsze miejsca w okolicy i zarezerwuj wizytę online!
        </p>
        <div className="mx-auto flex items-center rounded-lg bg-white md:w-[50%]">
          <div className="py-3 pl-4 pr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="rgba(0, 0, 0, 0.6)"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <Input
            placeholder="Szukaj usług lub biznesów"
            className="dark:bg-white dark:text-black"
          />
        </div>
      </div>
    </div>
  );
};

export const ServiceList = () => {
  return (
    <section className="absolute bottom-6 w-full">
      <ul className="flex items-center gap-8 overflow-x-scroll whitespace-nowrap text-sm font-semibold lg:justify-center lg:gap-12 lg:overflow-x-hidden">
        {services.length > 0 &&
          services.map((service: string, index: number) => (
            <Link
              to="/"
              className="duration-200 hover:text-sky-500 hover:underline"
              key={index}
            >
              {service}
            </Link>
          ))}
      </ul>
    </section>
  );
};

export default Header;
