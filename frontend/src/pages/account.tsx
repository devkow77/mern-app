import { AccountForm, Container } from "../components/index";
import { useContext, useState } from "react";
import { UserContext } from "../context/user-context";
import { Link, useParams } from "react-router";
import { Button } from "../components/ui/button";
import axios from "axios";
import { Service } from "../lib/utils";

const Account = () => {
  const { user } = useContext(UserContext);
  const { section } = useParams();

  return (
    <main>
      <Container className="flex flex-col justify-center gap-8 py-8 sm:flex-row sm:justify-end md:py-16">
        <section className="top-28 h-full text-sm sm:sticky sm:w-1/2 md:text-base">
          <h2 className="mb-4 text-base font-bold md:text-xl">
            Informacje o koncie
          </h2>
          <div className="relative mb-4 aspect-square max-w-[150px] rounded-2xl bg-zinc-800 md:max-w-[200px]">
            <img
              src="/profile-default-avatar-active.jpg"
              alt="avatar"
              className="absolute h-full w-full rounded-2xl object-cover object-center"
            />
          </div>
          <div className="mb-4 space-y-1">
            <h3>
              Nazwa: <span className="font-semibold">{user?.name}</span>
            </h3>
            <h3>
              Email: <span className="font-semibold">{user?.email}</span>
            </h3>
          </div>
          <div className="flex flex-col gap-2 font-medium">
            <Link
              to="/account"
              className="w-40 rounded-2xl bg-blue-500 py-1 text-center md:w-52"
            >
              Moje usługi
            </Link>
            <Link
              to="/account/edit"
              className="w-40 rounded-2xl bg-green-500 py-1 text-center md:w-52"
            >
              Edytuj konto
            </Link>
            <Link
              to="/account/delete"
              className="w-40 rounded-2xl bg-red-500 py-1 text-center md:w-52"
            >
              Usuń konto
            </Link>
          </div>
        </section>
        {section === undefined && <MyServices />}
        {section === "edit" && <EditAccount />}
        {section === "delete" && <DeleteAccount />}
      </Container>
    </main>
  );
};

const MyServices = () => {
  const [services] = useState<Service[]>([
    {
      name: "Fryzjer",
      address: "ul. Wielkopolska 1, Warszawa",
      phoneNumber: 123456789,
      photos: [],
      category: "Fryzjer",
      works: [],
    },
  ]);

  return (
    <section className="sm:w-1/2">
      <h2 className="mb-4 text-base font-bold md:text-xl">Moje usługi</h2>
      {services.length ? (
        <>
          <div className="mb-6 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            <div className="min-h-40 rounded-2xl bg-zinc-800"></div>
            <div className="min-h-40 rounded-2xl bg-zinc-800"></div>
            <div className="min-h-40 rounded-2xl bg-zinc-800"></div>
          </div>
          <Link to="/account/services/new">
            <Button variant={"success"}>Dodaj kolejną usługę</Button>
          </Link>
        </>
      ) : (
        <div>
          <h3 className="font-semibold">Aktualnie nie masz żadnych usług</h3>
          <p className="mb-4">
            Aby dodać usługe, kliknij w zielony przycisk poniżej
          </p>
          <Link to="/account/services/new">
            <Button variant={"success"}>Dodaj usługę</Button>
          </Link>
        </div>
      )}
    </section>
  );
};

const EditAccount = () => {
  return (
    <section className="sm:w-1/2">
      <h2 className="mb-4 text-base font-bold md:text-xl">Edytuj konto</h2>
      <AccountForm />
    </section>
  );
};

const DeleteAccount = () => {
  const handleDeleteAccount = async () => {
    await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/delete`);
  };

  return (
    <section className="sm:w-1/2">
      <h2 className="mb-4 text-base font-bold md:text-xl">
        Czy napewno chcesz usunąć konto?
      </h2>
      <div className="flex items-center gap-2">
        <Link to="/account">
          <Button variant={"success"}>Nie</Button>
        </Link>
        <Button variant={"destructive"} onClick={handleDeleteAccount}>
          Tak
        </Button>
      </div>
    </section>
  );
};

export default Account;
