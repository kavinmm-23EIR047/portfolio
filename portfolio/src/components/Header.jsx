import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Sparkles, ArrowRight, Layers, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLaptopCode,
  FaRobot,
  FaPalette,
  FaPhoneAlt,
  FaLayerGroup,
  FaCube,
  FaLink,
  FaHeadset,
  FaCode,
  FaChartLine,
  FaRocket,
  FaMobileAlt,
  FaSearch,
} from "react-icons/fa";
import { SiReact, SiPostgresql, SiPython, SiNextdotjs, SiFlutter, SiFigma } from "react-icons/si";
import { Link, useLocation } from "react-router-dom";
import BrandLogo from "./BrandLogo";

const navLinks = [
  { path: "/", label: "Home", icon: FaLaptopCode },
  { path: "/services", label: "Services & Capabilities", icon: FaLayerGroup, hasDropdown: true },
  { path: "/products", label: "Products", icon: FaCube },
  { path: "/about", label: "About Us", icon: FaRobot },
  { path: "/support", label: "Support & Contact", icon: FaHeadset },
];

const mobileServiceCapabilities = [
  {
    title: "CRM & UI Dashboards",
    desc: "Custom CRM, executive analytics & sales pipelines.",
    path: "/services",
    icon: FaChartLine,
    color: "#0A4FE0",
    bg: "bg-[#EFF6FF]",
  },
  {
    title: "Landing & E-Commerce",
    desc: "D2C storefronts, Razorpay checkout & technical SEO.",
    path: "/services",
    icon: FaRocket,
    color: "#059669",
    bg: "bg-[#ECFDF5]",
  },
  {
    title: "Python AI Agents",
    desc: "Autonomous workflow agents & 24/7 bots.",
    path: "/services",
    icon: FaRobot,
    color: "#D97706",
    bg: "bg-[#FFFBEB]",
  },
  {
    title: "MERN & PostgreSQL",
    desc: "Relational database models & RESTful API engines.",
    path: "/services",
    icon: SiReact,
    color: "#10AA50",
    bg: "bg-[#F0FDF4]",
  },
  {
    title: "Flutter & React Native",
    desc: "60fps iOS/Android cross-platform apps.",
    path: "/services",
    icon: SiFlutter,
    color: "#0284C7",
    bg: "bg-[#F0F9FF]",
  },
  {
    title: "SEO & Core Web Vitals",
    desc: "100/100 speed benchmarks & technical markup.",
    path: "/services",
    icon: FaSearch,
    color: "#7C3AED",
    bg: "bg-[#F5F3FF]",
  },
];

const megaSections = [
  {
    id: "web",
    label: "Web Apps",
    Icon: FaLaptopCode,
    title: "Web Platforms & Applications",
    description: "Scalable web applications and modern dashboards tailored for your business needs.",
    features: [
      ["Custom Web Apps", "Tailored solutions for your business."],
      ["Business Portals", "Secure & scalable platforms."],
      ["Admin Dashboards", "Real-time analytics & insights."],
      ["Web Integrations", "Connect with third-party tools."],
      ["E-Commerce Solutions", "Feature-rich online stores."],
      ["Maintenance & Support", "Reliable long-term support."],
    ],
  },
  {
    id: "automation",
    label: "Automation & AI",
    Icon: FaRobot,
    title: "Automation & AI Solutions",
    description: "Intelligent workflows that reduce manual effort and create more time for meaningful work.",
    features: [
      ["AI Assistants", "Always-on, helpful experiences."],
      ["Workflow Automation", "Remove repetitive business tasks."],
      ["Smart Integrations", "Connect your systems together."],
      ["AI Content Tools", "Create faster with reliable context."],
      ["Data Intelligence", "Turn signals into clear decisions."],
      ["Ongoing Optimisation", "Improve as your business grows."],
    ],
  },
  {
    id: "design",
    label: "UI/UX Design",
    Icon: FaPalette,
    title: "UI/UX & Product Design",
    description: "Clear, thoughtful interfaces that turn complex products into simple customer journeys.",
    features: [
      ["Product Discovery", "Clarify the right product direction."],
      ["Design Systems", "A consistent visual foundation."],
      ["Responsive Interfaces", "Designed for every screen."],
      ["Interactive Prototypes", "Validate ideas early."],
      ["User Flows", "Make every action intuitive."],
      ["Design Support", "Keep the product evolving."],
    ],
  },
  {
    id: "products",
    label: "SaaS Templates",
    Icon: FaCube,
    title: "SaaS Products & Templates",
    description: "A faster path to launch with adaptable product foundations built for modern teams.",
    features: [
      ["Starter Kits", "Launch with strong foundations."],
      ["Dashboard Templates", "Polished, practical interfaces."],
      ["Auth & Billing", "Essential SaaS flows included."],
      ["API Foundations", "Built to extend with confidence."],
      ["Deployment Setup", "Ready for your cloud workflow."],
      ["Product Support", "Guidance after launch."],
    ],
  },
  {
    id: "integration",
    label: "Integration",
    Icon: FaLink,
    title: "Integrations & Connected Systems",
    description: "Bring your tools, teams, and customer data together in one reliable workflow.",
    features: [
      ["API Development", "Reliable service connections."],
      ["CRM Integration", "Keep customer data in sync."],
      ["Payment Systems", "Safe, smooth transactions."],
      ["Cloud Services", "Connect your modern stack."],
      ["Data Migration", "Move data without the mess."],
      ["System Audits", "Find smarter ways to connect."],
    ],
  },
  {
    id: "support",
    label: "Support & Consulting",
    Icon: FaHeadset,
    title: "Support & Technical Consulting",
    description: "Hands-on guidance and dependable support for each stage of your digital product.",
    features: [
      ["Technical Strategy", "Choose the right next step."],
      ["Product Audits", "Reveal opportunities to improve."],
      ["Performance Tuning", "Keep products fast and stable."],
      ["Security Reviews", "Protect what matters."],
      ["Team Enablement", "Help teams work with confidence."],
      ["Dedicated Support", "A reliable partner when needed."],
    ],
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeMegaSection, setActiveMegaSection] = useState("web");
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const location = useLocation();
  const activeMega = megaSections.find((section) => section.id === activeMegaSection) || megaSections[0];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A4FE0]/95 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(10,79,224,0.4)] border-b border-white/15 py-3 md:py-4"
            : "bg-[#0A4FE0] border-b border-white/10 py-4 md:py-5"
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-6 lg:px-10 flex items-center justify-between">
          
          {/* BRAND LOGO */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-white/15 backdrop-blur-md p-1 flex items-center justify-center border border-white/25 shadow-md group-hover:scale-105 transition-transform duration-300 overflow-hidden">
              <BrandLogo className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-1">
                WebFlair
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#CBD5E1] -mt-0.5 hidden sm:block">
                Technologies
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3 bg-white/10 p-1.5 rounded-full border border-white/20 backdrop-blur-md">
            
            {/* EXPLORE SERVICES DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 text-sm font-bold tracking-wide px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                  dropdownOpen || location.pathname === "/services"
                    ? "bg-white text-[#0A4FE0] shadow-sm"
                    : "text-white hover:bg-white/15"
                }`}
              >
                <span>Explore</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.985 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 grid w-[min(92vw,1160px)] grid-cols-[220px_minmax(340px,1fr)_300px] overflow-hidden rounded-[1.75rem] border border-white/70 bg-white shadow-[0_30px_75px_-18px_rgba(4,45,130,0.38)] z-50"
                  >
                    <aside className="border-r border-[#e1ebfa] bg-[#f7faff] p-4">
                      <p className="mb-3 px-3 pt-1 text-[10px] font-extrabold tracking-[.16em] text-[#7185aa]">
                        EXPLORE SERVICES
                      </p>
                      <div className="space-y-1">
                        {megaSections.map(({ id, label, Icon }) => (
                          <button
                            key={id}
                            onMouseEnter={() => setActiveMegaSection(id)}
                            onFocus={() => setActiveMegaSection(id)}
                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold transition-all ${
                              activeMega.id === id
                                ? "bg-[#e9f1ff] text-[#0956ed] shadow-sm"
                                : "text-[#122452] hover:bg-white hover:text-[#0956ed]"
                            }`}
                          >
                            <span
                              className={`grid h-9 w-9 place-items-center rounded-lg ${
                                activeMega.id === id
                                  ? "bg-white text-[#0a58ee]"
                                  : "bg-transparent text-[#193a7a]"
                              }`}
                            >
                              <Icon size={19} />
                            </span>
                            <span className="flex-1">{label}</span>
                            <ArrowRight size={15} className={activeMega.id === id ? "opacity-100" : "opacity-0"} />
                          </button>
                        ))}
                      </div>
                    </aside>
                    <section className="p-8">
                      <p className="mb-2 text-[10px] font-extrabold tracking-[.16em] text-[#7587aa]">
                        {activeMega.label.toUpperCase()}
                      </p>
                      <h2 className="text-[1.45rem] font-extrabold tracking-tight text-[#0a1c52]">
                        {activeMega.title}
                      </h2>
                      <p className="mt-1 max-w-[480px] text-sm leading-relaxed text-[#6579a3]">
                        {activeMega.description}
                      </p>
                      <div className="mt-6 grid grid-cols-2 gap-x-7 gap-y-5">
                        {activeMega.features.map(([title, copy]) => (
                          <Link
                            key={title}
                            to="/services"
                            onClick={() => setDropdownOpen(false)}
                            className="group flex gap-3"
                          >
                            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#edf4ff] text-[#0956ed] group-hover:bg-[#0956ed] group-hover:text-white">
                              <FaCode size={15} />
                            </span>
                            <span>
                              <b className="block text-sm text-[#112452] group-hover:text-[#0956ed]">{title}</b>
                              <small className="mt-0.5 block text-xs leading-relaxed text-[#7284a7]">{copy}</small>
                            </span>
                          </Link>
                        ))}
                      </div>
                      <Link
                        to="/services"
                        onClick={() => setDropdownOpen(false)}
                        className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-[#0956ed] hover:gap-3"
                      >
                        View all {activeMega.label.toLowerCase()} solutions <ArrowRight size={16} />
                      </Link>
                    </section>
                    <aside className="relative overflow-hidden bg-gradient-to-br from-[#eaf2ff] via-[#f7faff] to-[#d5e3ff] p-8">
                      <div className="absolute -right-16 -top-12 h-56 w-56 rounded-full bg-[#9bbcff]/35 blur-2xl" />
                      <span className="relative inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-extrabold text-[#0956ed] shadow-sm">
                        <Sparkles size={14} className="text-amber-400" /> Popular
                      </span>
                      <h3 className="relative mt-6 max-w-[220px] text-[1.75rem] font-extrabold leading-[1.08] tracking-tight text-[#081a4b]">
                        Build Scalable Web Solutions
                      </h3>
                      <p className="relative mt-3 max-w-[240px] text-sm leading-relaxed text-[#58709c]">
                        Turn your ideas into powerful web applications with a product team that stays close.
                      </p>
                      <Link
                        to="/support"
                        onClick={() => setDropdownOpen(false)}
                        className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-[#0a56ed] px-5 py-3 text-sm font-extrabold text-white shadow-[0_10px_22px_rgba(10,86,237,.28)]"
                      >
                        Get Started <ArrowRight size={16} />
                      </Link>
                      <img
                        src="/images/mega-menu-laptop-illustration.png"
                        alt="Illustrated laptop dashboard"
                        className="pointer-events-none absolute bottom-[-45px] right-[-37px] w-[340px] drop-shadow-[0_22px_18px_rgba(31,93,201,.2)]"
                      />
                    </aside>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* DIRECT LINKS */}
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-bold tracking-wide px-5 py-2.5 rounded-full transition-all duration-200 ${
                    isActive ? "bg-white text-[#0A4FE0] shadow-sm" : "text-white hover:bg-white/15"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT ACTION BUTTONS */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/support"
              className="inline-flex items-center gap-2 bg-white text-[#0A4FE0] hover:bg-[#F1F5F9] font-extrabold text-sm px-6 py-3 rounded-full shadow-[0_4px_20px_rgba(255,255,255,0.25)] hover:scale-105 transition-all duration-200"
            >
              <FaPhoneAlt size={13} />
              <span>Contact Us</span>
            </Link>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              className="w-11 h-11 bg-white/15 border border-white/20 rounded-full flex items-center justify-center text-white cursor-pointer"
              onClick={() => setIsOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0A4FE0]/80 backdrop-blur-md z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[88%] max-w-[360px] z-50 p-5 sm:p-6 flex flex-col justify-between bg-white shadow-2xl border-l border-[#E2E8F0] overflow-y-auto"
            >
              <div>
                {/* DRAWER HEADER */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#0A4FE0] p-2 flex items-center justify-center shadow-md">
                      <BrandLogo className="w-full h-full" primaryColor="#FFFFFF" accentColor="#0A4FE0" badgeColor="#FFFFFF" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-black text-xl text-[#0F172A] leading-none">WebFlair</span>
                      <span className="text-[9px] uppercase font-bold text-[#0A4FE0] tracking-widest mt-0.5">
                        Technologies
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-9 h-9 bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-full flex items-center justify-center text-[#0F172A] transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* MOBILE NAV ITEMS */}
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    const Icon = link.icon;

                    if (link.hasDropdown) {
                      return (
                        <div key={link.path} className="flex flex-col">
                          {/* DROPDOWN TRIGGER BUTTON */}
                          <div
                            className={`flex items-center justify-between py-3 px-4 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                              isActive || mobileServicesOpen
                                ? "bg-[#EFF6FF] text-[#0A4FE0] border border-[#BFDBFE]"
                                : "text-[#0F172A] hover:bg-[#F8FAFC]"
                            }`}
                            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs ${
                                  isActive || mobileServicesOpen
                                    ? "bg-[#0A4FE0] text-white"
                                    : "bg-[#F1F5F9] text-[#64748B]"
                                }`}
                              >
                                <Icon size={14} />
                              </div>
                              <span className="font-extrabold">{link.label}</span>
                            </div>

                            <ChevronDown
                              size={16}
                              className={`transition-transform duration-300 ${
                                mobileServicesOpen ? "rotate-180 text-[#0A4FE0]" : "text-[#94A3B8]"
                              }`}
                            />
                          </div>

                          {/* ANIMATED SERVICES ACCORDION */}
                          <AnimatePresence>
                            {mobileServicesOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="overflow-hidden pl-3 pr-1 py-1.5 space-y-1.5 border-l-2 border-[#0A4FE0]/30 ml-6 my-1"
                              >
                                {mobileServiceCapabilities.map((item, cIdx) => {
                                  const CIcon = item.icon;
                                  return (
                                    <Link
                                      key={cIdx}
                                      to={item.path}
                                      onClick={() => {
                                        setIsOpen(false);
                                        setMobileServicesOpen(false);
                                      }}
                                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors group"
                                    >
                                      <div
                                        className={`w-7 h-7 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0 text-xs mt-0.5`}
                                        style={{ color: item.color }}
                                      >
                                        <CIcon size={13} />
                                      </div>
                                      <div>
                                        <p className="text-xs font-black text-[#0F172A] group-hover:text-[#0A4FE0] leading-snug">
                                          {item.title}
                                        </p>
                                        <p className="text-[10px] text-[#64748B] font-medium leading-tight mt-0.5">
                                          {item.desc}
                                        </p>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 py-3 px-4 rounded-2xl font-bold text-sm transition-all ${
                          isActive
                            ? "bg-[#0A4FE0] text-white shadow-md"
                            : "text-[#0F172A] hover:bg-[#F8FAFC]"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs ${
                            isActive ? "bg-white/20 text-white" : "bg-[#F1F5F9] text-[#64748B]"
                          }`}
                        >
                          <Icon size={14} />
                        </div>
                        <span className="font-extrabold">{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* DRAWER FOOTER WITH DIRECT CONTACT ACTIONS */}
              <div className="pt-4 border-t border-[#E2E8F0] space-y-2.5">
                {/* DIRECT PHONE CHIP */}
                <a
                  href="tel:+919600732162"
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-[#0F172A] hover:bg-[#EFF6FF] transition-colors"
                >
                  <div className="flex items-center gap-2 text-[#0A4FE0]">
                    <PhoneCall size={14} />
                    <span className="font-extrabold">+91 96007 32162</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#059669] font-extrabold bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                    Direct
                  </span>
                </a>

                {/* PRIMARY CTA */}
                <Link
                  to="/support"
                  onClick={() => setIsOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0A4FE0] hover:bg-[#0639A8] text-white font-extrabold py-3.5 px-6 rounded-full shadow-md text-xs sm:text-sm transition-all hover:scale-105"
                >
                  <FaPhoneAlt size={13} />
                  <span>Start Project / Let's Talk</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
