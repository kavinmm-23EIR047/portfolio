import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { id: "hero",      label: "Home",      type: "scroll" },
  { id: "about",     label: "About",     type: "scroll" },
  { id: "services",  label: "Services",  type: "scroll" },
  { id: "products",  label: "Products",  type: "coming" },
  { id: "portfolio", label: "Portfolio", type: "scroll" },
  { id: "reviews",   label: "Reviews",   type: "scroll" },
  { id: "contact",   label: "Contact",   type: "scroll" },
];

const Header = () => {
  const [isOpen, setIsOpen]           = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [active, setActive]           = useState("hero");
  const [darkMode, setDarkMode]       = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      const isDark = saved === "dark";
      document.documentElement.classList.toggle("dark", isDark);
      setDarkMode(isDark);
    } else {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", systemDark);
      setDarkMode(systemDark);
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !darkMode;
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
    setDarkMode(newDark);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      const scrollPos = window.scrollY + 120;
      navLinks.forEach((link) => {
        const el = document.getElementById(link.id);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActive(link.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (link) => {
    if (link.type === "coming") {
      setShowComingSoon(true);
      setTimeout(() => setShowComingSoon(false), 2000);
      return;
    }
    document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <>
      {/* ✅ z-50 so it's above Three.js canvas (z-0) and content (z-2) */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-slate-950/95 backdrop-blur-xl border-b border-gray-200 dark:border-sky-400/10"
          : "bg-white/60 dark:bg-slate-950/70 backdrop-blur-md"
      }`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 h-20 flex items-center justify-between">

          <div className="flex items-center gap-3 cursor-pointer">
            <img src="/images/logo.jpg" alt="Logo" className="w-11 h-11 rounded-xl object-cover shadow-md" />
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
                AK WebFlair
              </h1>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 tracking-widest">TECHNOLOGIES</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => handleNavClick(link)}
                className={`text-sm transition ${
                  active === link.id ? "text-primary" : "text-gray-700 dark:text-gray-300 hover:text-primary"
                }`}>
                {link.label}
              </button>
            ))}
            <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-100 dark:bg-white/10">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="px-5 py-2 rounded-full bg-primary text-white text-sm">Let's Talk</button>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-100 dark:bg-white/10">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="p-2 rounded-lg bg-gray-100 dark:bg-white/10" onClick={() => setIsOpen(true)}>
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {showComingSoon && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-primary text-white text-xs px-4 py-2 rounded-full shadow-lg">
          🚀 Coming Soon!
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div className="fixed inset-0 bg-black/40 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              className="fixed top-0 left-0 h-screen w-[80%] max-w-[320px] bg-white dark:bg-slate-950 z-50 p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-primary">Menu</span>
                <button onClick={() => setIsOpen(false)}><X /></button>
              </div>
              {navLinks.map((link) => (
                <button key={link.id} onClick={() => handleNavClick(link)}
                  className="text-left py-3 text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-white/5">
                  {link.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;