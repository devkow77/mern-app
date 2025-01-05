import {
  Container,
  MyServices,
  EditAccount,
  MyReservations,
} from "../components/index";
import { useContext } from "react";
import { UserContext } from "../context/user-context";
import { Link, Navigate, useParams } from "react-router";
import { Button } from "../components/ui/button";
import axios from "axios";

const Account = () => {
  const { user } = useContext(UserContext);
  const { section } = useParams();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <main>
      <Container className="flex flex-col justify-center gap-8 py-8 sm:flex-row sm:justify-end md:py-16">
        <section className="top-28 h-full text-sm sm:sticky sm:w-1/2 md:text-base">
          <h2 className="mb-4 text-base font-bold md:text-xl">
            Informacje o koncie
          </h2>
          <div className="relative mb-4 aspect-square max-w-[150px] rounded-full bg-zinc-800 md:max-w-[200px]">
            <img
              src="/profile-default-avatar-active.jpg"
              alt="avatar"
              className="absolute h-full w-full rounded-full object-cover object-center"
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
              className="w-40 rounded-2xl bg-blue-500 py-2 text-center text-sm duration-200 hover:bg-blue-700 md:w-52"
            >
              Moje usługi
            </Link>
            <Link
              to="/account/reservations"
              className="w-40 rounded-2xl bg-purple-500 py-2 text-center text-sm duration-200 hover:bg-purple-700 md:w-52"
            >
              Moje rezerwacje
            </Link>
            <Link
              to="/account/edit"
              className="w-40 rounded-2xl bg-green-500 py-2 text-center text-sm duration-200 hover:bg-green-700 md:w-52"
            >
              Edytuj konto
            </Link>
            <Link
              to="/account/delete"
              className="w-40 rounded-2xl bg-red-500 py-2 text-center text-sm duration-200 hover:bg-red-700 md:w-52"
            >
              Usuń konto
            </Link>
          </div>
        </section>
        {section === undefined && <MyServices />}
        {section === "reservations" && <MyReservations />}
        {section === "edit" && <EditAccount />}
        {section === "delete" && <DeleteAccount />}
      </Container>
    </main>
  );
};

const DeleteAccount = () => {
  const handleDeleteAccount = async () => {
    await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/users/delete`);
    window.location.reload();
  };

  return (
    <section className="sm:w-1/2">
      <img src="/delete.png" alt="delete account image" className="w-2/3" />
      <h2 className="mb-2 text-base font-bold md:text-xl">
        Czy napewno chcesz usunąć konto?
      </h2>
      <p className="mb-4 text-sm md:text-base">
        Zostaną usunięte wszystkie twoje dane, a także wszystkie rezerwacje oraz
        usługi.
      </p>
      <div className="flex items-center gap-2">
        <Link to="/account">
          <Button variant={"success"}>Nie</Button>
        </Link>
        <Button variant={"destructive"} onClick={handleDeleteAccount}>
          Tak, usuń konto
        </Button>
      </div>
    </section>
  );
};

export default Account;
