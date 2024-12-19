import { useContext } from "react";
import { UserContext } from "../context/user-context.js";
import { Navigate } from "react-router";
import { Navbar } from "../components/index";

const Profile = () => {
  const { user, ready } = useContext(UserContext);

  if (!ready && !user) {
    return <Navigate to={"/"} />;
  }

  return (
    <main>
      <Navbar />
      <div className="flex h-screen items-center justify-center">
        <div>
          <h2>Profil {user?.id}</h2>
          <h3>Nazwa użytkownika: {user?.name}</h3>
          <h3>Email: {user?.email}</h3>
        </div>
      </div>
    </main>
  );
};

export default Profile;
