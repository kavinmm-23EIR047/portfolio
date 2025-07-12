import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaGithub } from "react-icons/fa";
<<<<<<< HEAD
import { FiExternalLink } from "react-icons/fi";
=======
>>>>>>> e0321b1a1445198c1bd3c8519232507ee4cf8403

const projects = [
  {
    id: 1,
    title: "AI-POWERED-STUDENT-ASSESSMENT-TEST-WITH-CHATBOT",
    description:
      "AI-based assessment project built during a national-level hackathon.",
    img: "/images/project1.png",
    github:
      "https://github.com/kavinmm-23EIR047/AI-POWERED-STUDENT-ASSESSMENT-TEST-WITH-CHATBOT",
    website: "#",
  },
  {
    id: 6,
    title: "Memories Platform Holidays Pvt Ltd",
    description:
      "Built a feature-rich travel platform tailored for a happy travel agency client.",
    img: "/images/project6.png",
    github: "https://github.com/kavinmm-23EIR047/Memories-Platform-Holidays",
    website: "https://memories-platform-holidays.vercel.app",
  },
  {
    id: 2,
    title: "Internship @ Prodigy InfoTech",
    description:
      "Worked on multiple frontend projects during a 1-month internship program.",
    img: "/images/project3.png",
    github: "https://github.com/kavinmm-23EIR047/Prodigy-InfoTech",
    website: "#",
  },
  {
    id: 3,
    title: "Internship @ CodSoft",
    description:
      "Developed practical projects and learned web technologies.",
    img: "/images/project2.jpg",
    github: "https://github.com/kavinmm-23EIR047/Codsoft",
    website: "#",
  },
  {
    id: 4,
    title: "Food Order Website",
    description:
      "A responsive food delivery website developed during college tech activity.",
    img: "/images/project4.png",
    github: "https://github.com/kavinmm-23EIR047/food-order-website",
    website: "#",
  },
  {
    id: 5,
    title: "Internship @ CodeClause",
    description:
      "Built multiple mini-projects using HTML, CSS, JavaScript & React.",
    img: "/images/project5.jpg",
    github: "https://github.com/kavinmm-23EIR047/CodeClause-Internship",
    website: "#",
  },
];

const Portfolio = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
<<<<<<< HEAD
    <section className="py-16 bg-[#0f172a] text-white text-center relative">
      <h2 className="text-4xl font-bold mb-8 tracking-wide"><span className="text-blue-500">My </span>Work</h2>
=======
    <section className="py-16 bg-gray-900 text-white text-center relative">
      <h2 className="text-4xl font-bold mb-8">My Work</h2>
>>>>>>> e0321b1a1445198c1bd3c8519232507ee4cf8403

      <div className="max-w-[90%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[85%] xl:max-w-[85%] mx-auto relative">
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          pagination={{ clickable: true }}
<<<<<<< HEAD
          autoplay={{ delay: 3000, disableOnInteraction: false }}
=======
          autoplay={{ delay: 2500, disableOnInteraction: false }}
>>>>>>> e0321b1a1445198c1bd3c8519232507ee4cf8403
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
<<<<<<< HEAD
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 },
            480: { slidesPerView: 1.2 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
=======
          spaceBetween={15}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            480: { slidesPerView: 1.3, spaceBetween: 12 },
            640: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 2.5, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 25 },
            1280: { slidesPerView: 4, spaceBetween: 30 },
>>>>>>> e0321b1a1445198c1bd3c8519232507ee4cf8403
          }}
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
<<<<<<< HEAD
              <div className="bg-white/5 border border-gray-700 backdrop-blur-md p-5 rounded-xl shadow-xl transition-transform duration-300 hover:-translate-y-2 flex flex-col justify-between min-h-[380px]">
=======
              <div className="bg-gray-800 min-h-[370px] h-full p-5 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 flex flex-col justify-between">
>>>>>>> e0321b1a1445198c1bd3c8519232507ee4cf8403
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-md border border-gray-700"
                />
<<<<<<< HEAD
                <div className="mt-4 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <h3 className="text-lg font-semibold text-white truncate">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm mt-1 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-4 flex gap-2">
=======
                <div className="mt-4 text-center flex flex-col justify-between h-full">
                  <h3 className="text-base font-semibold line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mt-2 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-col sm:flex-row gap-3 w-full">
>>>>>>> e0321b1a1445198c1bd3c8519232507ee4cf8403
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
<<<<<<< HEAD
                      className="flex-1 flex items-center justify-center gap-2 bg-[#1f2937] hover:bg-[#374151] text-white px-4 py-2 rounded-lg text-sm transition-all"
                    >
                      <FaGithub className="text-base" />
=======
                      className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 w-full"
                    >
                      <FaGithub className="text-lg" />
>>>>>>> e0321b1a1445198c1bd3c8519232507ee4cf8403
                      GitHub
                    </a>
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
<<<<<<< HEAD
                      className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-all"
                    >
                      <FiExternalLink className="text-base" />
                      Visit
=======
                      className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600 w-full"
                    >
                      🌐 Website
>>>>>>> e0321b1a1445198c1bd3c8519232507ee4cf8403
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

<<<<<<< HEAD
          {/* Navigation Arrows */}
          <div
            ref={prevRef}
            className="swiper-button-prev font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center absolute top-1/2 left-0 transform -translate-y-1/2 z-50 cursor-pointer"
          />
          <div
            ref={nextRef}
            className="swiper-button-next font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center absolute top-1/2 right-0 transform -translate-y-1/2 z-50 cursor-pointer"
=======
          {/* Navigation Arrows (linked using ref) */}
          <div
            ref={prevRef}
            className="swiper-button-prev font-bold text-cyan-400 bg-blue-600 hover:bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center absolute top-1/2 left-0 transform -translate-y-1/2 z-50 cursor-pointer"
          />
          <div
            ref={nextRef}
            className="swiper-button-next font-bold text-cyan-400 bg-blue-600 hover:bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center absolute top-1/2 right-0 transform -translate-y-1/2 z-50 cursor-pointer"
>>>>>>> e0321b1a1445198c1bd3c8519232507ee4cf8403
          />
        </Swiper>
      </div>
    </section>
  );
};

export default Portfolio;
