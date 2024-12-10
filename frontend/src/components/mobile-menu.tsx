import { motion } from "framer-motion";

const links: { name: string; href: string }[] = [
  {
    name: "Usługi",
    href: "/",
  },
  {
    name: "Moje rezerwacje",
    href: "/",
  },
  {
    name: "Faq",
    href: "/",
  },
  {
    name: "Kontakt",
    href: "/",
  },
  {
    name: "Pomoc",
    href: "/",
  },
];

const menuMotion = {
  visible: {
    top: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
  hidden: {
    top: -100,
  },
};

const itemMotion = {
  visible: {
    x: 0,
    opacity: 1,
  },
  hidden: {
    x: -100,
    opacity: 0,
  },
};

const MobileMenu = () => {
  return (
    <motion.section
      className="fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-black/90 md:hidden"
      variants={menuMotion}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col gap-6 font-semibold">
        {links.map(({ name, href }, index: number) => (
          <a
            href={href}
            key={index}
            className="duration-200 hover:text-sky-500"
          >
            <motion.p variants={itemMotion}>{name}</motion.p>
          </a>
        ))}
      </div>
    </motion.section>
  );
};

export default MobileMenu;
