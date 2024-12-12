import { Link } from "react-router";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { HamburgerBtn, Profile } from "./index";

const Navbar = () => {
  const desktop = useMediaQuery("(min-width: 1024px)");

  // const distanceY = window.scrollY;

  return (
    <nav className="flex items-center justify-between">
      <Link to="/" className="font-semibold">
        booking
      </Link>
      {desktop ? (
        <Profile />
      ) : (
        <div className="flex items-center gap-4">
          <Profile />
          <HamburgerBtn />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
