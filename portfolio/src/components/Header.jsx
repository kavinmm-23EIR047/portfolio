import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { id: "hero", label: "Home" },
  { id: "services", label: "About" },
  { id: "about", label: "Services" },
  { id: "myskills", label: "Skills" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight active section using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
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
      <div className="flex justify-between items-center px-5 py-4 max-w-6xl mx-auto text-white">
        <h1 className="text-xl md:text-2xl font-bold text-blue-200">Kavin's Portfolio</h1>

        <ul className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`transition-colors duration-200 ${
                  activeLink === link.id ? "text-yellow-300" : "hover:text-blue-300"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          className="md:hidden flex flex-col bg-gray-800 text-white px-5 pb-5"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setIsOpen(false)}
              className={`py-2 text-center border-b border-gray-700 ${
                activeLink === link.id ? "text-yellow-300" : "hover:text-blue-300"
              }`}
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Header;
