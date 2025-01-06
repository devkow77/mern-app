import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user-context.js";
import { Link, Navigate, useParams } from "react-router";
import { Container, ServiceForm } from "../components/index.js";
import { Place, User } from "../lib/utils.js";
import axios from "axios";

const Account = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <main>
      <Content user={user} />
    </main>
  );
};

const Content = ({ user }: { user: User | null }) => {
  const { section } = useParams();

  useEffect(() => {
    console.log(section);
  }, [section]);

  return (
    <article className="py-8 text-sm lg:py-16 lg:text-base">
      <Container className="relative flex flex-col gap-12 md:flex-row">
        <section className="flex h-full flex-col items-center md:sticky md:top-28 md:w-2/5 md:items-start">
          <div className="relative mb-4 h-32 w-32 rounded-full lg:h-64 lg:w-64">
            <img
              src="/profile-default-avatar-active.jpg"
              alt="profile img"
              className="absolute h-full w-full rounded-full object-cover object-center"
            />
          </div>
          <div className="mb-4 text-center md:text-left">
            <h2 className="font-bold">{user?.name}</h2>
            <h3>{user?.email}</h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 md:flex-col md:items-start md:gap-3">
            <Link
              to={"/account"}
              className="rounded-2xl bg-sky-500 px-4 py-1 duration-200 hover:bg-sky-700 lg:px-8"
            >
              Moje usługi
            </Link>
            <Link
              to={"/account/bookings"}
              className="rounded-2xl bg-yellow-500 px-4 py-1 duration-200 hover:bg-yellow-700 lg:px-8"
            >
              Historia rezerwacji
            </Link>
            <Link
              to={"/account/edit"}
              className="rounded-2xl bg-violet-500 px-4 py-1 duration-200 hover:bg-violet-700 lg:px-8"
            >
              Edytuj konto
            </Link>
            <Link
              to={"/account/delete"}
              className="rounded-2xl bg-red-500 px-4 py-1 duration-200 hover:bg-red-700 lg:px-8"
            >
              Usuń konto
            </Link>
          </div>
        </section>
        {section == undefined && <Places />}
        {section == "bookings" && <Bookings />}
        {section == "edit" && <Edit />}
        {section == "delete" && <Delete />}
      </Container>
    </article>
  );
};

const Places = () => {
  const [places, setPlaces] = useState<Place[]>([]);

  const handleUserPlaces = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/places/user`,
    );
    setPlaces(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    handleUserPlaces();
  }, []);

  return (
    <section className="md:w-3/5">
      {places.length ? (
        <div>
          <h1 className="mb-2 text-lg font-bold md:mb-4 md:text-2xl">
            Moje dodane usługi
          </h1>
          <div className="mb-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            {places.map((place, index: number) => (
              <div
                key={index}
                className="relative aspect-video rounded-2xl bg-zinc-700"
              >
                <img
                  src={`http://localhost:3000/routes/uploads/${place.photos[0]}`}
                  alt={place.title}
                  className="absolute h-full w-full rounded-2xl object-cover object-center"
                />
              </div>
            ))}
            <div className="aspect-video rounded-2xl bg-zinc-800"></div>
            <div className="aspect-video rounded-2xl bg-zinc-800"></div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/account/places/new"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 duration-200 hover:bg-green-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <p className="font-semibold">Dodaj kolejne usługi</p>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="mb-4">
            <span className="font-bold"> Brak aktualnie dodanych usług </span>
            <br /> Kliknij zielony przycisk poniżej aby dodać pierwszą usługe
          </h2>
          <Link
            to="/account/places/new"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 duration-200 hover:bg-green-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
};

const Bookings = () => {
  return (
    <section className="md:w-3/5">
      <h1 className="mb-2 text-lg font-bold md:mb-4 md:text-2xl">
        Historia Rezerwacji
      </h1>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="aspect-video rounded-2xl bg-zinc-700"></div>
        <div className="aspect-video rounded-2xl bg-zinc-700"></div>
        <div className="aspect-video rounded-2xl bg-zinc-700"></div>
        <div className="aspect-video rounded-2xl bg-zinc-700"></div>
      </div>
    </section>
  );
};

const Edit = () => {
  const { section } = useParams();

  return (
    <section className="md:w-3/5">
      <h2 className="mb-4 text-center font-bold lg:text-lg">
        {section ? "Edytuj usługe" : "Dodaj nową usługe"}
      </h2>
      <ServiceForm />
    </section>
  );
};

const Delete = () => {
  return (
    <section className="h-[800px] w-full rounded-2xl bg-zinc-700 md:w-3/5">
      <h1>Usun</h1>
    </section>
  );
};

export default Account;
