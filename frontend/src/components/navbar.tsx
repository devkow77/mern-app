import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { HamburgerBtn, Profile, Container } from "./index";

const Navbar = () => {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const [active, setActive] = useState<boolean>(false);

  const handleScroll = () => {
    if (window.scrollY > 150) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${active ? "bg-white text-black shadow-2xl dark:bg-zinc-900 dark:text-white" : "bg-transparent"} fixed left-0 top-0 z-50 w-full bg-transparent py-6`}
    >
      <Container className="flex items-center justify-between">
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
      </Container>
    </nav>
  );
};

export default Navbar;
