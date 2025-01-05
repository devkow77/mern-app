import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Dialog, DialogTrigger } from "../components/ui/dialog";
import { AuthForm } from "../components/index";
import { UserContext } from "../context/user-context";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setProfile(user);
    }
  }, [user]);

  const logout = async () => {
    await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/logout`);
    window.location.reload();
  };

  return (
    <Dialog>
      <div className="flex items-center gap-4">
        <DialogTrigger className="flex items-center gap-3">
          <div className="hidden text-right text-xs sm:block">
            <h2 className="font-semibold">
              {profile ? profile.name : "Nie jesteś zalogowany"}
            </h2>
            <h3>{profile ? profile.email : "Kliknij aby zalogować"}</h3>
          </div>
          <Avatar>
            <AvatarImage
              src={
                profile
                  ? "/profile-default-avatar-active.jpg"
                  : "/profile-default-avatar-unactive.jpg"
              }
              alt="profile img"
            />
          </Avatar>
        </DialogTrigger>
        {profile && (
          <div className="flex items-center gap-2">
            <Link
              to={"/account"}
              className="rounded-lg border-2 border-green-500 bg-transparent p-2 duration-200 hover:bg-green-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </Link>
            <div
              onClick={logout}
              className="cursor-pointer rounded-lg border-2 border-red-600 bg-red-600 p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
      <AuthForm />
    </Dialog>
  );
};

export default Profile;
