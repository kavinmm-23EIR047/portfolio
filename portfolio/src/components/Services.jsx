import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaMobileAlt,
  FaPaintBrush,
  FaVideo,
  FaRocket,
  FaCloud,
} from "react-icons/fa";

const services = [
  {
    id: 1,
    icon: <FaLaptopCode size={38} className="text-sky-500" />,
    title: "Web Development",
    description:
      "Scalable business websites, admin dashboards, portfolio sites, and enterprise web platforms.",
    price: "₹3,999",
  },
  {
    id: 2,
    icon: <FaMobileAlt size={38} className="text-indigo-500" />,
    title: "App Development",
    description:
      "Modern Android, iOS, and cross-platform mobile apps with premium UI and backend integration.",
    price: "₹4,999",
  },
  {
    id: 3,
    icon: <FaCloud size={38} className="text-cyan-500" />,
    title: "SaaS Solutions",
    description:
      "Cloud-based scalable SaaS platforms for startups, clients, and business automation.",
    price: "₹14,999",
  },
  {
    id: 4,
    icon: <FaPaintBrush size={38} className="text-pink-500" />,
    title: "UI / UX Design",
    description:
      "Premium product interfaces, wireframes, design systems, and clickable prototypes.",
    price: "₹2,999",
  },
  {
    id: 5,
    icon: <FaVideo size={38} className="text-amber-500" />,
    title: "Media Solutions",
    description:
      "Professional video editing, reels, branding videos, and motion graphics solutions.",
    price: "₹1,999",
  },
  {
    id: 6,
    icon: <FaRocket size={38} className="text-emerald-500" />,
    title: "Product Development",
    description:
      "Complete end-to-end product engineering from concept to deployment.",
    price: "₹14,999",
  },
];

const Services = () => {
  return (
    <section
      id="services"
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
          <p className="text-sky-500 text-sm uppercase tracking-[3px] mb-3 font-semibold">
            What We Offer
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">
              Services
            </span>
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-7">
            Premium business solutions designed for startups, clients, and enterprises.
          </p>
        </motion.div>

        {/* Slider */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
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
          {services.map((service) => (
            <SwiperSlide key={service.id}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="h-[320px] rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md p-6 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="mb-5">{service.icon}</div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-7">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10">
                  <p className="text-xs uppercase tracking-[2px] text-gray-500 dark:text-gray-400">
                    Starting From
                  </p>

                  <h4 className="text-xl font-bold text-sky-500 mt-1">
                    {service.price}
                  </h4>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Product Update */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md p-8 text-center shadow-xl"
        >
          <p className="text-sm text-amber-500 mb-2 uppercase tracking-[3px] font-semibold">
            Product Update
          </p>

          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            🚀 Our SaaS Product is Coming Soon
          </h3>

          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-7">
            We are building an advanced AI + SaaS scalable platform.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default Services;