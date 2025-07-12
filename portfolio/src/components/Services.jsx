import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaMobileAlt,
  FaPaintBrush,
  FaVideo,
} from "react-icons/fa";

const services = [
  {
    id: 1,
    icon: <FaLaptopCode size={40} className="text-blue-400" />,
    title: "Web Design",
    description: "Modern, responsive websites tailored for performance and scalability.",
  },
  {
    id: 2,
    icon: <FaMobileAlt size={40} className="text-green-400" />,
    title: "App Development",
    description: "Cross-platform mobile apps using Flutter and React Native.",
  },
  {
    id: 3,
    icon: <FaPaintBrush size={40} className="text-yellow-400" />,
    title: "Graphic Design",
<<<<<<< HEAD
    description: "Creative branding, banners, and logo designs using Figma & Adobe.",
=======
    description: "Logos, banners, animate and branding.",
>>>>>>> e0321b1a1445198c1bd3c8519232507ee4cf8403
  },
  {
    id: 4,
    icon: <FaVideo size={40} className="text-red-400" />,
    title: "Video Editing",
    description: "High-quality, dynamic video editing with motion graphics.",
  },
  {
    id: 5,
    icon: <FaPaintBrush size={40} className="text-purple-400" />,
    title: "Advanced UI/UX",
    description: "Clean, modern UI/UX with interactive prototypes and animations.",
  },
  {
    id: 5,
    icon: <FaPaintBrush size={50} className="text-purple-400" />,
    title: "Advanced UI/UX",
    description: "Interactive and clean modern UI/UX design.",
  },
];

const Services = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      <motion.h2
        className="text-center text-3xl md:text-5xl font-extrabold mb-10"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        My <span className="text-blue-500">Services</span>
      </motion.h2>

<<<<<<< HEAD
      <div className="max-w-7xl mx-auto">
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            600: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
            1300: { slidesPerView: 4 },
          }}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
=======
      {/* Wrapper to allow navigation arrows */}
      <div className="relative w-full max-w-6xl mx-auto px-4">
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            550: { slidesPerView: 2 },
            800: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          className="w-full"
>>>>>>> e0321b1a1445198c1bd3c8519232507ee4cf8403
        >
          {services.map((service) => (
            <SwiperSlide key={service.id}>
              <motion.div
<<<<<<< HEAD
                className="bg-gray-800/50 border border-gray-700/30 backdrop-blur-lg p-6 rounded-2xl shadow-xl text-center h-full flex flex-col justify-between hover:shadow-blue-500/20 transition-shadow duration-300"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col items-center">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-blue-300 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{service.description}</p>
                </div>
=======
                className="bg-gray-800 min-h-[300px] h-full p-6 rounded-xl shadow-lg flex flex-col items-center justify-between text-center transition-transform duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {service.icon}
                <h3 className="text-xl font-semibold mt-4">{service.title}</h3>
                <p className="text-gray-400 mt-2">{service.description}</p>
>>>>>>> e0321b1a1445198c1bd3c8519232507ee4cf8403
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Services;
