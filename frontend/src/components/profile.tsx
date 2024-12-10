import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Dialog, DialogTrigger } from "../components/ui/dialog";
import { AuthForm } from "../components/index";

const Profile = () => {
  const active: boolean = false;

  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-3">
        <Avatar>
          <AvatarImage
            src={
              active
                ? "/profile-default-avatar-active.jpg"
                : "/profile-default-avatar-unactive.jpg"
            }
            alt="profile img"
          />
        </Avatar>
        <h2 className="text-sm font-semibold">
          {active ? "Kacper Kowalski" : "Nie zalogowano"}
        </h2>
      </DialogTrigger>
      <AuthForm />
    </Dialog>
  );
};

export default Profile;
