import { motion } from "framer-motion";
import { useState } from "react";
import { MobileMenu } from "../components/index";

const HamburgerBtn = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <>
      <div
        onClick={() => setToggle((prev) => !prev)}
        className="relative z-50 cursor-pointer space-y-1.5 xl:hidden"
      >
        <motion.span
          animate={{ rotateZ: toggle ? 45 : 0, y: toggle ? 8 : 0 }}
          className="block h-0.5 w-6 bg-white"
        ></motion.span>
        <motion.span
          animate={{ width: toggle ? 0 : 16 }}
          className="block h-0.5 w-4 bg-white"
        ></motion.span>
        <motion.span
          animate={{ rotateZ: toggle ? -45 : 0, y: toggle ? -8 : 0 }}
          className="block h-0.5 w-6 bg-white"
        ></motion.span>
      </div>
      {toggle && <MobileMenu />}
    </>
  );
};

export default HamburgerBtn;
