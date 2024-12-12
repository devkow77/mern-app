import { useContext } from "react";
import { UserContext } from "../context/user-context.js";
import { Navigate } from "react-router";

const Profile = () => {
  const { user, ready } = useContext(UserContext);

  if (!user && !ready) {
    return <Navigate to={"/"} />;
  }

  if (!user && ready) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div>
        <h2>Profil {user?.id}</h2>
        <h3>Nazwa użytkownika: {user?.name}</h3>
        <h3>Email: {user?.email}</h3>
      </div>
    </div>
  );
};

export default Profile;
