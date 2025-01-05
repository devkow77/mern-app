/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from "../components/index";
import { useState, useEffect } from "react";
import { Specialist, Post, Service } from "../lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";
import { Link } from "react-router";
import { GraphQLClient } from "graphql-request";
import axios from "axios";

const hygraph = new GraphQLClient(
  import.meta.env.VITE_HYGRAPH_API_KEY as string,
);

const Home = () => {
  return (
    <main className="space-y-12 py-8 dark:bg-zinc-900 dark:text-white md:py-16">
      <Services />
      <Content />
      <Specialists />
      <Blog />
    </main>
  );
};

export const Services = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/services`,
        );
        setServices(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchServices();
  }, []);

  return (
    <article>
      <Container>
        <h2 className="mb-4 font-semibold md:mb-6 md:text-xl">
          Niedawno dodane usługi
        </h2>
        <div>
          {services.length > 0 ? (
            <Carousel>
              <CarouselContent className="flex gap-6">
                {services.length > 0 &&
                  services.map((service: Service, index: number) => (
                    <CarouselItem
                      key={index}
                      className="flex aspect-video items-center justify-center rounded-xl bg-black/30 sm:basis-1/2 md:basis-1/3"
                    >
                      <div className="text-center">
                        <h3 className="font-semibold md:text-lg">
                          {service.name}
                        </h3>
                        <p className="text-sm">{service.address}</p>
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
            </Carousel>
          ) : (
            <h3 className="md:text-lg">Aktualnie brak usługodawców</h3>
          )}
        </div>
      </Container>
    </article>
  );
};

export const Content = () => {
  return (
    <article>
      <Container className="space-y-16 lg:space-y-32">
        <section className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-6 md:w-1/2 lg:space-y-16">
            <h2 className="text-2xl font-semibold lg:text-4xl">
              Umów się online
            </h2>
            <p className="text-sm leading-6 opacity-80">
              Chcesz umówić się do fryzjera, barbera, stylistki paznokci lub
              salonu masażu w okolicy? Szukasz miejsca, w którym najlepsi
              specjaliści zadbają o Twoją brodę, brwi lub zrobią relaksujący
              masaż?
              <br />
              <br />
              booking to darmowa aplikacja do rezerwacji, dzięki której z
              łatwością znajdziesz wolny termin i wygodnie umówisz się na
              wizytę. Bez dzwonienia — rezerwujesz o każdej porze i z dowolnego
              miejsca.
              <br />
              <br />
              <span className="font-semibold">
                Odkrywaj nowe miejsca w okolicy i umawiaj się na wizyty z
                booking!
              </span>
            </p>
          </div>
          <div className="max-w-sm md:w-1/2 md:max-w-md">
            <img src="/reservation.png" alt="reservation" />
          </div>
        </section>
        <section className="flex flex-col gap-8 md:flex-row-reverse md:items-center md:justify-between">
          <div className="space-y-6 md:w-1/2 lg:space-y-16">
            <h2 className="text-2xl font-semibold lg:text-4xl">
              Coś ci wypadło? Nie szkodzi!
            </h2>
            <p className="text-sm leading-6 opacity-80">
              Pobierz booking — darmową aplikację do rezerwacji — i zarządzaj
              swoimi wizytami, gdziekolwiek jesteś. Zmień termin wizyty lub
              odwołaj rezerwację bez dzwonienia.
              <br />
              <br />
              Wiemy, że każdego dnia dużo się u Ciebie dzieje, dlatego będziemy
              wysyłać Ci przypomnienia o nadchodzących wizytach. Dzięki nim
              nigdy nie przegapisz terminu!
            </p>
          </div>
          <div className="max-w-sm md:w-1/2 md:max-w-md">
            <img src="/forgot.png" alt="forgot" />
          </div>
        </section>
        <section className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-6 md:w-1/2 lg:space-y-16">
            <h2 className="text-2xl font-semibold lg:text-4xl">
              Najlepsi specjaliści w okolicy
            </h2>
            <p className="text-sm leading-6 opacity-80">
              Na booking znajdziesz najlepszych specjalistów z branży health &
              beauty w Twojej okolicy.
              <br />
              <br />
              Dowiedz się o nich więcej — sprawdź ich profile na booking,
              przeczytaj opinie innych klientów i przejrzyj portfolio.
              <br />
              <br />
              Oszczędzaj czas i niczym się nie przejmuj! Z booking rezerwacja
              wizyt jest darmowa i dziecinnie prosta.
            </p>
          </div>
          <div className="max-w-sm md:w-1/2 md:max-w-md">
            <img src="/best.png" alt="best" />
          </div>
        </section>
      </Container>
    </article>
  );
};

export const Specialists = () => {
  const cities = [
    "Kraków",
    "Warszawa",
    "Wrocław",
    "Poznań",
    "Łódź",
    "Katowice",
    "Bydgoszcz",
    "Gdańsk",
    "Zielona Góra",
  ];
  return (
    <article className="mb-6 lg:mb-12">
      <Container>
        <section className="space-y-4 lg:space-y-8">
          <h2 className="text-center text-2xl font-semibold lg:text-4xl">
            Znajdź specjalistę na Booking według miasta
          </h2>
          <div className="grid h-[300px] grid-cols-6 gap-6 rounded-xl bg-black/30 p-8 dark:bg-zinc-900">
            {cities.map((city) => (
              <div className="flex cursor-pointer items-center justify-center rounded-full bg-sky-600 font-semibold duration-200 hover:bg-sky-400">
                {city}
              </div>
            ))}
          </div>
        </section>
      </Container>
    </article>
  );
};

export const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const query = `
    query getPosts {
      posts{
        slug,
        image {
          url
        },
        title,
        content {
          html
        },
        createdAt,
      }
    }
  `;

  const getPosts = async () => {
    const { posts }: { posts: Post[] } = await hygraph.request(query);
    setPosts(posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <article>
      <Container className="space-y-6">
        <h2 className="text-2xl font-semibold lg:text-3xl">
          Polecane dla Ciebie
        </h2>
        <div>
          {posts.length > 0 ? (
            <Carousel>
              <CarouselContent>
                {posts.length > 0 &&
                  posts.map(
                    ({ slug, title, createdAt, image: { url } }: Post) => (
                      <CarouselItem
                        key={slug}
                        className="relative h-[300px] w-full rounded-xl sm:basis-1/2 md:h-[250px] md:basis-1/3"
                      >
                        <Link to={`/blog/${slug}`}>
                          <div className="relative h-2/3 w-full rounded-xl rounded-b-none">
                            <img
                              src={url}
                              alt={title}
                              className="absolute h-full w-full rounded-xl rounded-b-none object-cover object-center"
                            />
                          </div>
                          <div className="flex h-1/3 flex-col justify-center rounded-xl rounded-t-none px-4">
                            <h3 className="text-md font-semibold">{title}</h3>
                            <p className="text-sm opacity-80">
                              Data utworzenia:{" "}
                              <span className="font-semibold">
                                {new Date(createdAt).toLocaleDateString(
                                  "pl-PL",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )}
                              </span>
                            </p>
                          </div>
                        </Link>
                      </CarouselItem>
                    ),
                  )}
                ;
              </CarouselContent>
            </Carousel>
          ) : (
            <h3 className="md:text-lg">Aktualnie brak postów</h3>
          )}
        </div>
      </Container>
    </article>
  );
};

export default Home;
