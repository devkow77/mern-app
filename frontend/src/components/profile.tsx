import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Dialog, DialogTrigger } from "../components/ui/dialog";
import { AuthForm } from "../components/index";
import { UserContext } from "../context/user-context";
import { useContext } from "react";

const Profile = () => {
  const { ready, user } = useContext(UserContext);

  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-3">
        <Avatar>
          <AvatarImage
            src={
              ready
                ? "/profile-default-avatar-active.jpg"
                : "/profile-default-avatar-unactive.jpg"
            }
            alt="profile img"
          />
        </Avatar>
        <h2 className="text-sm font-semibold">
          {ready ? user?.name : "Kliknij, aby zalogować"}
        </h2>
      </DialogTrigger>
      <AuthForm />
    </Dialog>
  );
};

export default Profile;
