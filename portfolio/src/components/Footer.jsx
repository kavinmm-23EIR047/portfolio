import { FaEnvelope, FaPhone, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-10 px-4 mt-10 shadow-inner">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Branding */}
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-xl font-bold text-blue-400">AK Web Flair Technologies</h2>
          <p className="text-sm text-gray-400">
            We build reliable web, app, and automation solutions to help your business scale.
          </p>
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        {/* Contact */}
        <div className="space-y-3 text-center">
          <p className="flex items-center justify-center gap-2 text-gray-300">
            <FaEnvelope className="text-blue-400" />
            <a
              href="mailto:kavinmm200@gmail.com"
              className="hover:underline hover:text-white transition-all duration-200"
            >
              kavinmm200@gmail.com
            </a>
          </p>
          <p className="flex items-center justify-center gap-2 text-gray-300">
            <FaPhone className="text-blue-400" />
            <span>+91 9600732162</span>
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-end gap-6">
          <a
            href="https://github.com/kavinmm-23EIR047/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/kavin-m-m-710520272/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
