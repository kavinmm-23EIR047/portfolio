import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "AI-Powered Student Assessment Platform",
    description:
      "AI-driven assessment platform with chatbot integration.",
    img: "/images/project1.png",
    github:
      "https://github.com/kavinmm-23EIR047/AI-POWERED-STUDENT-ASSESSMENT-TEST-WITH-CHATBOT",
    website: "#",
  },
  {
    id: 2,
    title: "Memories Platform Holidays",
    description:
      "Premium travel booking platform with modern UI.",
    img: "/images/project6.png",
    github: "https://github.com/kavinmm-23EIR047/Memories-Platform-Holidays",
    website: "https://memories-platform-holidays.vercel.app",
  },
  {
    id: 3,
    title: "Food Delivery Web Platform",
    description:
      "Responsive food ordering system with smooth UX.",
    img: "/images/project4.png",
    github: "https://github.com/kavinmm-23EIR047/food-order-website",
    website: "#",
  },
  {
    id: 4,
    title: "Frontend Internship Solutions",
    description:
      "Real-world frontend solutions during internships.",
    img: "/images/project3.png",
    github: "https://github.com/kavinmm-23EIR047/Prodigy-InfoTech",
    website: "#",
  },
];

const Portfolio = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section
      id="portfolio"
      className="relative py-20 bg-transparent"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-5">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sky-500 uppercase tracking-[4px] text-sm mb-3">
            Client Success
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Our{" "}
            <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
              Work
            </span>
          </h2>

          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mt-4 text-sm md:text-base">
            Explore innovative digital products and client platforms.
          </p>
        </motion.div>

        {/* Swiper */}
        <div className="relative">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500 }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            spaceBetween={24}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 1.4 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="
                  rounded-2xl overflow-hidden h-full
                  bg-white/70 dark:bg-white/5
                  backdrop-blur-xl
                  border border-black/10 dark:border-white/10
                  shadow-lg hover:shadow-sky-500/20
                  transition
                  "
                >
                  {/* Image */}
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-52 object-cover"
                  />

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-3 leading-6 min-h-[80px]">
                      {project.description}
                    </p>

                    {/* Buttons */}
                    <div className="mt-5 flex gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 px-4 py-2 rounded-xl text-sm"
                      >
                        <FaGithub /> Code
                      </a>

                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-xl text-sm"
                      >
                        <FiExternalLink /> Live
                      </a>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Arrows */}
          <button
            ref={prevRef}
            className="absolute top-1/2 -left-4 z-20 -translate-y-1/2 bg-sky-500 hover:bg-sky-600 text-white w-10 h-10 rounded-full"
          >
            ←
          </button>

          <button
            ref={nextRef}
            className="absolute top-1/2 -right-4 z-20 -translate-y-1/2 bg-sky-500 hover:bg-sky-600 text-white w-10 h-10 rounded-full"
          >
            →
          </button>
        </div>

      </div>
    </section>
  );
};

export default Portfolio;