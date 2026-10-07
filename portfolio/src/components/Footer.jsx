import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaArrowRight, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";

const Footer = () => {
  const [openModal, setOpenModal] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <>
      <footer className="bg-[#0639A8] pt-20 pb-12 px-5 md:px-10 lg:px-16 text-white overflow-hidden relative border-t-4 border-[#0A4FE0]">
        
        {/* Subtle Background Lighting */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0A4FE0]/20 rounded-full blur-[130px] pointer-events-none -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto relative z-10">
          
          {/* Clean Integrated Horizontal Newsletter & CTA Banner */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 mb-16 sm:mb-20 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)]">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-[#CBD5E1] mb-1.5 sm:mb-2 block">
                Stay Ahead in Tech
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-2 sm:mb-3 tracking-tight">
                Let's build something <span className="text-[#CBD5E1]">exceptional.</span>
              </h3>
              <p className="text-[#CBD5E1] font-medium text-xs sm:text-base lg:text-lg">
                Receive curated insights on AI platforms, React engineering, and scalable architecture.
              </p>
            </div>
            
            <form onSubmit={handleSubscribe} className="w-full lg:w-auto max-w-md lg:max-w-none">
              {/* Clean Horizontal Capsule Bar */}
              <div className="relative flex items-center bg-white/15 border border-white/25 rounded-full p-1.5 focus-within:border-white focus-within:bg-white/20 transition-all shadow-inner">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-transparent px-3.5 sm:px-5 py-2 sm:py-3 text-white placeholder-white/60 focus:outline-none font-medium text-xs sm:text-sm"
                />
                <button
                  type="submit"
                  className="px-4 sm:px-7 py-2.5 sm:py-3 bg-white text-[#0A4FE0] hover:bg-[#F1F5F9] font-extrabold text-xs sm:text-sm rounded-full flex items-center justify-center gap-1.5 sm:gap-2 shadow-md transition-all duration-200 hover:scale-105 cursor-pointer flex-shrink-0"
                >
                  <span className="flex items-center gap-1.5">
                    {subscribed ? (
                      <>
                        <span>Subscribed!</span>
                        <FiCheck size={14} />
                      </>
                    ) : (
                      "Subscribe"
                    )}
                  </span>
                  {!subscribed && <FaArrowRight size={11} />}
                </button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">

            {/* BRAND SUMMARY */}
            <div className="lg:col-span-2 pr-0 lg:pr-10">
              <Link to="/" className="flex items-center gap-3 mb-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md p-2 flex items-center justify-center border border-white/25 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <BrandLogo className="w-full h-full" primaryColor="#FFFFFF" accentColor="#0A4FE0" badgeColor="#FFFFFF" />
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-extrabold text-white tracking-tight">
                    WebFlair
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#CBD5E1] -mt-1">
                    Technologies
                  </span>
                </div>
              </Link>
              
              <p className="text-[#CBD5E1] font-medium text-sm leading-relaxed mb-8">
                Building scalable web platforms, custom AI automation agents, and modern cloud solutions for ambitious founders and enterprises.
              </p>
              
              {/* Silver Translucent Social Buttons */}
              <div className="flex gap-3">
                {[
                  { icon: <FaGithub size={18} />, link: "https://github.com/kavinmm-23EIR047/" },
                  { icon: <FaLinkedin size={18} />, link: "https://www.linkedin.com/in/kavin-m-m-710520272/" },
                  { icon: <FaInstagram size={18} />, link: "https://www.instagram.com/ak_webflair_technologies/" },
                  { icon: <FaWhatsapp size={18} />, link: "https://wa.me/919600732162" },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-white/10 hover:bg-white hover:text-[#0A4FE0] flex items-center justify-center transition-all duration-200 border border-white/15 text-white shadow-sm hover:scale-110"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* SERVICES */}
            <div>
              <h4 className="font-extrabold text-base mb-5 uppercase tracking-wider text-white">
                Solutions
              </h4>
              <ul className="space-y-3.5 text-sm font-medium text-[#CBD5E1]">
                <li>
                  <Link to="/services" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                    CRM & UI Dashboards
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                    Landing & E-Commerce
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                    Python AI Automation
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                    MERN & PostgreSQL
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                    Flutter & React Native
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                    SEO & Core Web Vitals
                  </Link>
                </li>
              </ul>
            </div>

            {/* COMPANY */}
            <div>
              <h4 className="font-extrabold text-base mb-5 uppercase tracking-wider text-white">
                Company
              </h4>
              <ul className="space-y-3.5 text-sm font-medium text-[#CBD5E1]">
                <li>
                  <Link to="/about" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                    About Our Team
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                    Product Templates
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={() => setOpenModal("privacy")}
                    className="hover:text-white hover:translate-x-1 inline-block transition-all cursor-pointer text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setOpenModal("terms")}
                    className="hover:text-white hover:translate-x-1 inline-block transition-all cursor-pointer text-left"
                  >
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h4 className="font-extrabold text-base mb-5 uppercase tracking-wider text-white">
                Contact & Support
              </h4>
              <ul className="space-y-3.5 text-sm font-medium text-[#CBD5E1]">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 text-white flex-shrink-0" size={16} />
                  <span>Tiruppur, Tamil Nadu, India</span>
                </li>
                <li>
                  <a href="mailto:akwebflairtechnologies@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors">
                    <FaEnvelope className="text-white flex-shrink-0" size={15} />
                    <span className="break-all">akwebflairtechnologies@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+919600732162" className="flex items-center gap-3 hover:text-white transition-colors">
                    <FaPhoneAlt className="text-white flex-shrink-0" size={14} />
                    <span>+91 96007 32162</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+919363265477" className="flex items-center gap-3 hover:text-white transition-colors">
                    <FaPhoneAlt className="text-white flex-shrink-0" size={14} />
                    <span>+91 93632 65477</span>
                  </a>
                </li>
                <li className="pt-1">
                  <a
                    href="https://wa.me/919600732162?text=Hi%20AK%20WebFlair%20Technologies%2C%20I%20want%20to%20enquire%20about%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-md hover:bg-[#20ba5a] transition-all hover:scale-105"
                  >
                    <FaWhatsapp size={15} />
                    <span>WhatsApp Direct Enquiry</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* BOTTOM COPYRIGHT */}
          <div className="pt-8 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-[#CBD5E1]">
            <div>
              © {new Date().getFullYear()} AK WebFlair Technologies. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => setOpenModal("privacy")} className="hover:text-white transition-colors cursor-pointer">
                Privacy
              </button>
              <button onClick={() => setOpenModal("terms")} className="hover:text-white transition-colors cursor-pointer">
                Terms
              </button>
              <Link to="/support" className="hover:text-white transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* POLICY MODAL */}
      <AnimatePresence>
        {openModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[100] px-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2.5rem] max-w-lg w-full p-8 sm:p-10 shadow-2xl border border-[#CBD5E1]"
            >
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-4">
                {openModal === "privacy" ? "Privacy Policy" : "Terms & Conditions"}
              </h3>
              
              <p className="text-[#64748B] text-sm font-medium leading-relaxed mb-8">
                {openModal === "privacy"
                  ? "AK WebFlair Technologies values your privacy. We process client information solely to provide custom software development, AI automation workflows, and technical support. Your data is protected by enterprise-grade encryption and is never sold to third parties."
                  : "By accessing and commissioning services from AK WebFlair Technologies, you agree to our standard software delivery terms, source code ownership milestones, and SLA guarantees for ongoing maintenance."}
              </p>
              
              <button
                onClick={() => setOpenModal(null)}
                className="w-full py-3.5 bg-[#0A4FE0] text-white font-extrabold text-sm rounded-full hover:bg-[#0639A8] transition-all shadow-md cursor-pointer"
              >
                Close Window
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;