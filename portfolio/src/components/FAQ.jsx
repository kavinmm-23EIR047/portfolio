import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FaQuestionCircle, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "What exact services does AK WebFlair Technologies provide?",
    answer: "We engineer full-stack web platforms, cross-platform mobile apps, cloud-native SaaS systems, and custom AI automation agents. We handle the complete lifecycle from initial architecture and UI/UX design to continuous cloud deployment."
  },
  {
    question: "How do you build custom AI & automation workflows?",
    answer: "We design tailored AI solutions utilizing leading LLM architectures, function calling, custom API integrations, and secure database connections to automate data processing, customer engagement, and internal business tasks."
  },
  {
    question: "What is the typical timeline for an end-to-end project?",
    answer: "A rapid prototype or modern corporate web application typically takes 2 to 4 weeks. Full-scale SaaS platforms or multi-service enterprise architectures are delivered in agile 4 to 8 week sprints with live milestones."
  },
  {
    question: "Do you provide dedicated maintenance and support post-launch?",
    answer: "Yes. Every client receives a comprehensive post-deployment warranty, continuous uptime monitoring, performance optimization, and SLA-backed support packages to guarantee flawless operations."
  },
  {
    question: "What technology stack do you specialize in?",
    answer: "Our core stack comprises React, Next.js, Node.js, Express, MongoDB/PostgreSQL, TailwindCSS, Python for AI services, and modern cloud deployment infrastructures (Vercel, Render, AWS, Docker)."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 px-5 md:px-10 lg:px-16 bg-[#F1F5F9] relative overflow-hidden">
      
      {/* Decorative Subtle Aura */}
      <div className="absolute top-0 left-0 w-[550px] h-[550px] bg-[#0A4FE0]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#CBD5E1]/40 rounded-full blur-[100px] pointer-events-none translate-y-1/2" />

      <div className="w-full max-w-[1500px] mx-auto relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        
        {/* Left Header Column (Sticky on Desktop) */}
        <div className="lg:w-5/12 lg:sticky lg:top-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-white text-[#0A4FE0] text-xs font-extrabold px-5 py-2 rounded-full tracking-widest mb-6 uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#0A4FE0]" />
              Frequently Asked Questions
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] leading-[1.12] tracking-tight mb-5">
              Got Questions? <br />
              <span className="text-[#0A4FE0]">We've Got Answers.</span>
            </h2>

            <p className="text-[#64748B] text-lg font-medium leading-relaxed mb-8">
              Everything you need to know about our engineering standards, delivery timelines, pricing structure, and ongoing support.
            </p>

            <div className="bg-white rounded-[2.5rem] p-7 shadow-[0_15px_40px_-15px_rgba(15,23,42,0.07)]">
              <p className="text-base font-extrabold text-[#0F172A] mb-1">Still have questions?</p>
              <p className="text-sm text-[#64748B] mb-5 font-medium">Our team is available 24/7 to discuss your project requirements.</p>
              <Link
                to="/support"
                className="inline-flex items-center gap-2 bg-[#0A4FE0] hover:bg-[#0639A8] text-white font-extrabold text-sm px-6 py-3.5 rounded-full shadow-md transition-all duration-200 hover:scale-105"
              >
                <span>Contact Our Team</span>
                <FaArrowRight size={12} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Accordion Column */}
        <div className="lg:w-7/12 w-full space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className={`rounded-[2rem] transition-all duration-300 overflow-hidden bg-white ${
                  isOpen
                    ? "shadow-[0_20px_50px_-12px_rgba(10,79,224,0.18)]"
                    : "shadow-[0_10px_30px_-12px_rgba(15,23,42,0.05)] hover:shadow-[0_15px_35px_-12px_rgba(15,23,42,0.1)]"
                }`}
              >
                <button
                  className="w-full px-6 sm:px-8 py-6 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-lg sm:text-xl font-extrabold pr-6 transition-colors duration-200 ${
                      isOpen ? "text-[#0A4FE0]" : "text-[#0F172A]"
                    }`}
                  >
                    {faq.question}
                  </span>
                  
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-[#0A4FE0] text-white rotate-180 shadow-md"
                        : "bg-[#F1F5F9] text-[#64748B]"
                    }`}
                  >
                    <ChevronDown size={18} strokeWidth={2.5} />
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 sm:px-8 pb-7 text-base font-medium text-[#64748B] leading-relaxed border-t border-[#F1F5F9] pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
