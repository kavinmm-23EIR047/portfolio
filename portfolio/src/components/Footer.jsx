import {
  FaEnvelope,
  FaPhone,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

const Footer = () => {
  const [openModal, setOpenModal] = useState(null);

  return (
    <>
      <footer className="relative pt-16 pb-10 px-5 bg-transparent border-t border-lightSubtext/20 dark:border-darkBorder font-mono">

        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

            {/* 🔥 BRAND */}
            <div>
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo.jpg"
                  alt="logo"
                  className="w-12 h-12 rounded-xl object-cover shadow-md"
                />

                <div>
                  <h2 className="text-lg font-bold text-primary dark:text-accent">
                    AK WebFlair
                  </h2>
                  <p className="text-xs text-lightSubtext">
                    TECHNOLOGIES
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-lightSubtext">
                Building SaaS, AI, automation systems and scalable business solutions.
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm text-green-500">
                <FaClock />
                24/7 Support
              </div>
            </div>

            {/* SERVICES */}
            <div>
              <h3 className="text-primary dark:text-accent font-semibold mb-4">
                Services
              </h3>

              <ul className="text-sm text-lightSubtext space-y-2">
                <li className="hover:text-primary dark:hover:text-white cursor-pointer">Web Development</li>
                <li className="hover:text-primary dark:hover:text-white cursor-pointer">AI Solutions</li>
                <li className="hover:text-primary dark:hover:text-white cursor-pointer">Automation</li>
                <li className="hover:text-primary dark:hover:text-white cursor-pointer">UI/UX Design</li>
              </ul>
            </div>

            {/* PROJECTS */}
            <div>
              <h3 className="text-primary dark:text-accent font-semibold mb-4">
                Projects
              </h3>

              <ul className="text-sm text-lightSubtext space-y-2">
                <a
                  href="https://memories-platform-holidays.vercel.app/"
                  target="_blank"
                  className="block hover:text-primary dark:hover:text-white"
                >
                  Memories Platform
                </a>

                <a
                  href="https://crazy-capture-studio.vercel.app"
                  target="_blank"
                  className="block hover:text-primary dark:hover:text-white"
                >
                  Crazy Capture Studio
                </a>
              </ul>
            </div>

            {/* COMPANY */}
            <div>
              <h3 className="text-primary dark:text-accent font-semibold mb-4">
                Company
              </h3>

              <ul className="text-sm text-lightSubtext space-y-2">
                <li
                  className="cursor-pointer hover:text-primary dark:hover:text-white"
                  onClick={() => setOpenModal("privacy")}
                >
                  Privacy Policy
                </li>

                <li
                  className="cursor-pointer hover:text-primary dark:hover:text-white"
                  onClick={() => setOpenModal("terms")}
                >
                  Terms & Conditions
                </li>
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h3 className="text-primary dark:text-accent font-semibold mb-4">
                Contact
              </h3>

              <div className="text-sm text-lightSubtext space-y-3">

                <div className="flex gap-2">
                  <FaEnvelope /> kavinmm200@gmail.com
                </div>

                <div className="flex gap-2">
                  <FaPhone /> +91 9600732162
                </div>

                <div className="flex gap-2">
                  <FaMapMarkerAlt /> Tiruppur, Tamil Nadu
                </div>

              </div>

              {/* SOCIAL */}
              <div className="flex gap-4 mt-5">
                {[
                  { icon: <FaGithub />, link: "https://github.com/kavinmm-23EIR047/" },
                  { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/kavin-m-m-710520272/" },
                  { icon: <FaInstagram />, link: "https://www.instagram.com/ak_webflair_technologies/" },
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.link}
                    target="_blank"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="
                      w-10 h-10 flex items-center justify-center rounded-lg

                      bg-lightCard/60 dark:bg-darkCard
                      border border-lightSubtext/20 dark:border-darkBorder

                      text-primary

                      transition

                      hover:bg-white hover:text-primary
                      dark:hover:bg-black dark:hover:text-white
                    "
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>
            </div>

          </div>

          {/* BOTTOM */}
          <div className="mt-10 text-center text-xs text-lightSubtext">
            © {new Date().getFullYear()} AK WebFlair Technologies
          </div>

        </div>
      </footer>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">

          <div className="bg-white dark:bg-darkCard rounded-2xl max-w-lg w-full p-6 font-mono">

            <h2 className="text-lg font-bold text-primary mb-4">
              {openModal === "privacy" ? "Privacy Policy" : "Terms & Conditions"}
            </h2>

            <p className="text-sm text-lightSubtext leading-relaxed">
              {openModal === "privacy"
                ? "AK WebFlair Technologies respects user privacy. We collect minimal data to improve services and ensure secure experiences. No third-party misuse of data."
                : "Using our services means agreement to professional terms. We deliver SaaS, AI and automation systems. Misuse or unauthorized changes are not our responsibility."}
            </p>

            <button
              onClick={() => setOpenModal(null)}
              className="mt-6 px-5 py-2 bg-primary text-white rounded-lg"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default Footer;