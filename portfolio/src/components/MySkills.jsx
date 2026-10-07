import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import {
  FaReact,
  FaServer,
  FaMobileAlt,
  FaDatabase,
  FaRobot,
  FaChartLine,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiPython,
  SiFigma,
  SiFlutter,
  SiReact,
  SiExpress,
} from "react-icons/si";

const expertise = [
  {
    icon: <SiReact size={30} className="text-[#61DAFB]" />,
    title: "MERN Full-Stack Development",
    description:
      "High-throughput RESTful APIs, asynchronous event loops, real-time WebSockets, and dynamic web applications powered by MongoDB, Express, React, and Node.js.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "REST / JWT"],
  },
  {
    icon: <SiPostgresql size={30} className="text-[#336791]" />,
    title: "PostgreSQL & Database Engineering",
    description:
      "Enterprise relational data modeling, complex SQL aggregation, ACID transaction safety, Prisma ORM, indexing, and high-concurrency database architecture.",
    stack: ["PostgreSQL", "Prisma ORM", "ACID Transactions", "SQL Indexing", "Data Security"],
  },
  {
    icon: <SiPython size={30} className="text-[#3776AB]" />,
    title: "Python & AI Automation Agents",
    description:
      "Autonomous AI agents, automated customer routing pipelines, LangChain integration, custom LLM agents, and smart webhook orchestrations.",
    stack: ["Python", "AI Agents", "LangChain / LLMs", "Automation Scripts", "FastAPI"],
  },
  {
    icon: <FaChartLine size={28} className="text-[#0A4FE0]" />,
    title: "CRM Platforms & UI Dashboards",
    description:
      "Custom business CRM software, real-time analytics control centers, sales pipelines, interactive charts, and role-based access portals.",
    stack: ["CRM Architecture", "UI Dashboards", "Analytics", "Pipeline Tracking", "Role-Based Auth"],
  },
  {
    icon: <SiNextdotjs size={30} className="text-[#0F172A]" />,
    title: "Landing, E-Commerce & SEO Optimization",
    description:
      "Ultra-fast landing pages, full-featured D2C/B2B e-commerce platforms, SSR/SSG rendering, Core Web Vitals optimization, and top search ranking SEO.",
    stack: ["Landing Pages", "E-Commerce Stores", "Razorpay Gateways", "Technical SEO", "Core Web Vitals"],
  },
  {
    icon: <SiFlutter size={28} className="text-[#0284C7]" />,
    title: "Flutter & React Native Mobile Apps",
    description:
      "Cross-platform iOS and Android mobile apps engineered with 60fps fluid UI, native device sensor access, offline sync, and app store deployment.",
    stack: ["Flutter", "React Native", "iOS & Android", "Offline Sync", "Mobile UI/UX"],
  },
];

const Expertise = () => {
  return (
    <section id="expertise" className="relative py-24 sm:py-32 px-5 md:px-10 lg:px-16 bg-[#F1F5F9] overflow-hidden">
      {/* Decorative Aura */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#0A4FE0]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white text-[#0A4FE0] text-xs font-extrabold px-5 py-2 rounded-full tracking-widest mb-6 uppercase shadow-sm border border-[#E2E8F0]/80">
            <span className="w-2 h-2 rounded-full bg-[#0A4FE0]" />
            Technology Spectrum
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
            Our Technical <span className="text-[#0A4FE0]">Expertise</span>
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-[#64748B] text-lg font-medium">
            We engineer production-ready CRM platforms, UI dashboards, landing & e-commerce stores, and AI automation agents using MERN, PostgreSQL, Python, Flutter, and React Native.
          </p>
        </motion.div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16"
        >
          {expertise.map((item, idx) => (
            <SwiperSlide key={idx} className="h-auto">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="h-full bg-white rounded-[2.5rem] p-8 shadow-[0_15px_40px_-15px_rgba(15,23,42,0.07)] hover:shadow-[0_25px_60px_-15px_rgba(10,79,224,0.16)] transition-all duration-300 flex flex-col justify-between group cursor-pointer border border-[#F1F5F9]"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] flex items-center justify-center mb-6 shadow-xs group-hover:bg-[#0A4FE0]/10 transition-colors">
                    {item.icon}
                  </div>

                  <h3 className="text-xl font-extrabold text-[#0F172A] group-hover:text-[#0A4FE0] transition-colors mb-3 tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#64748B] leading-relaxed mb-6 font-medium">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#F1F5F9]">
                  {item.stack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#F1F5F9] text-[#475569]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Expertise;