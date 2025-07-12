import { FaEnvelope, FaPhone, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left - Branding */}
        <div className="text-center md:text-left">
          <p className="text-lg font-semibold text-blue-400">© 2025 Kavin's Portfolio</p>
          <p className="text-sm text-gray-400">AK WebFlair Technologies</p>
        </div>

        {/* Center - Contact Info */}
        <div className="text-center space-y-1">
          <p className="flex items-center justify-center gap-2 text-gray-300">
            <FaEnvelope className="text-blue-400" />
            <a
              href="mailto:kavinmm200@gmail.com"
              className="hover:underline transition-all duration-200"
            >
              kavinmm200@gmail.com
            </a>
          </p>
          <p className="flex items-center justify-center gap-2 text-gray-300">
            <FaPhone className="text-blue-400" />
            +91 9600732162
          </p>
        </div>

        {/* Right - Socials */}
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/kavinmm200"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://linkedin.com/in/kavinmm200"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
