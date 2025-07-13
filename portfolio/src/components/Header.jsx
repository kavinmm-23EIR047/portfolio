// Header.jsx
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "services", label: "Services" },
  { id: "myskills", label: "Skills" },
  { id: "portfolio", label: "Portfolio" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
      },
      { threshold: 0.6 }
    );
    navLinks.forEach((link) => {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 shadow-md transition-all duration-300 ${
        scrolled
          ? "bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900"
          : "bg-gray-900"
      }`}
    >
      <div className="flex justify-start items-center px-5 py-4 max-w-6xl mx-auto text-white relative">
        {/* Hamburger menu (shown only when closed) */}
        {!isOpen && (
          <button
            className="md:hidden text-white z-50 mr-4"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={28} />
          </button>
        )}

        <h3 className="text-lg md:text-xl font-bold text-blue-200">
          AK Web Flair Technologies
        </h3>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 ml-auto">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`transition-colors duration-200 ${
                  activeLink === link.id
                    ? "text-yellow-300"
                    : "hover:text-blue-300"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-[80%] h-screen bg-gray-900 text-white z-40 md:hidden shadow-xl overflow-y-auto"
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-blue-800">
              <h3 className="text-lg font-bold text-blue-300">
                AK Web Flair Technologies
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-white">
                <X size={24} />
              </button>
            </div>

            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="flex flex-col px-6 py-6 gap-6"
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.id}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`block text-lg font-medium tracking-wide transition-colors duration-200 ${
                      activeLink === link.id
                        ? "text-yellow-300"
                        : "text-white hover:text-blue-400"
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
