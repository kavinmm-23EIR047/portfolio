import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { motion } from "framer-motion";
import {
  FaReact,
  FaServer,
  FaCode,
  FaCogs,
  FaCloud,
} from "react-icons/fa";

const expertise = [
  {
    id: 1,
    icon: <FaReact size={42} className="text-sky-500" />,
    title: "Frontend Engineering",
    description: "Modern responsive interfaces and scalable frontend systems.",
    stack: ["React", "Flutter", "Tailwind", "JavaScript", "UI/UX"],
  },
  {
    id: 2,
    icon: <FaServer size={42} className="text-indigo-500" />,
    title: "Backend Systems",
    description: "Robust APIs, server-side architecture and databases.",
    stack: ["Node.js", "Express", "MongoDB", "SQL", "Firebase"],
  },
  {
    id: 3,
    icon: <FaCode size={42} className="text-emerald-500" />,
    title: "Software Development",
    description: "Business applications and enterprise-grade solutions.",
    stack: ["Java", "Python", "C", "JavaScript"],
  },
  {
    id: 4,
    icon: <FaCogs size={42} className="text-amber-500" />,
    title: "Automation & Embedded",
    description: "Industrial automation and intelligent hardware solutions.",
    stack: ["Embedded", "IoT", "PLC", "Robotics", "AI"],
  },
  {
    id: 5,
    icon: <FaCloud size={42} className="text-cyan-500" />,
    title: "Cloud & Deployment",
    description: "Deployment pipelines and cloud-ready platforms.",
    stack: ["GitHub", "Vercel", "Render", "Postman", "DevOps"],
  },
];

const Expertise = () => {
  return (
    <section
      id="expertise"
      className="relative py-24 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sky-500 text-sm uppercase tracking-[3px] mb-3">
            Technology Stack
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">
              Expertise
            </span>
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We leverage modern technologies to build scalable digital products.
          </p>
        </motion.div>

        {/* Slider */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{
            delay: 2800,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="pb-14"
        >
          {expertise.map((item) => (
            <SwiperSlide key={item.id}>
              <motion.div
                whileHover={{ y: -10, scale: 1.04 }}
                transition={{ duration: 0.3 }}
                className="
                h-full rounded-2xl p-6
                bg-white/70 dark:bg-white/5
                backdrop-blur-xl
                border border-black/10 dark:border-white/10
                shadow-lg
                hover:shadow-sky-500/20
                transition
                "
              >
                {/* Icon */}
                <div className="mb-5">{item.icon}</div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-7 mb-5">
                  {item.description}
                </p>

                {/* Stack */}
                <div className="flex flex-wrap gap-2">
                  {item.stack.map((tech, index) => (
                    <span
                      key={index}
                      className="
                      px-3 py-1 rounded-full text-xs
                      bg-white/70 dark:bg-slate-800/60
                      backdrop-blur-md
                      border border-black/10 dark:border-white/10
                      text-gray-800 dark:text-gray-300
                      "
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