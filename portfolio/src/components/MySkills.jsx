// src/components/MySkills.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import {
  FaReact,
  FaServer,
  FaCode,
  FaCogs,
} from "react-icons/fa";

const skills = [
  {
    id: 1,
    icon: <FaReact size={50} className="text-cyan-400 animate-pulse" />,
    title: "Frontend",
    type: "Frontend Developer",
    children: [
      { name: "HTML", icon: "https://cdn.simpleicons.org/html5/E34F26" },
      { name: "CSS", icon: "https://cdn.simpleicons.org/css3/1572B6" },
      { name: "React.js", icon: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Flutter", icon: "https://cdn.simpleicons.org/flutter/02569B" },
      { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/38BDF8" },
    ],
  },
  {
    id: 2,
    icon: <FaServer size={50} className="text-yellow-400 animate-pulse" />,
    title: "Backend & Database",
    type: "Full Stack Developer",
    children: [
      { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
      { name: "Express.js", icon: "https://cdn.simpleicons.org/express/000000" },
      { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28" },
      { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
      { name: "SQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
    ],
  },
  {
    id: 4,
    icon: <FaCode size={50} className="text-green-400 animate-pulse" />,
    title: "Programming",
    type: "Software Developer",
    children: [
      { name: "C", icon: "https://cdn.simpleicons.org/c/00599C" },
      { name: "Java", icon: "https://cdn.simpleicons.org/java/007396" },
      { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
      { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
    ],
  },
  {
    id: 5,
    icon: <FaCogs size={50} className="text-indigo-400 animate-pulse" />,
    title: "Core Engineering",
    type: "Embedded/Automation Engineer",
    children: [
      { name: "Embedded Systems", icon: "https://cdn.simpleicons.org/arduino/00979D" },
      { name: "VLSI", icon: "https://cdn.simpleicons.org/xilinx/E21F26" },
      { name: "Industrial Automation", icon: "https://cdn.simpleicons.org/siemens/009999" },
      { name: "Robotics & AI", icon: "https://cdn.simpleicons.org/openai/412991" },
    ],
  },
  {
    id: 6,
    icon: <FaCogs size={50} className="text-orange-400 animate-pulse" />,
    title: "Tools & DevOps",
    type: "DevOps & Deployment",
    children: [
      { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
      { name: "GitHub", icon: "https://cdn.simpleicons.org/github/FFFFFF" },
      { name: "VS Code", icon: "https://cdn.simpleicons.org/visualstudiocode/007ACC" },
      { name: "Postman", icon: "https://cdn.simpleicons.org/postman/FF6C37" },
      { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28" },
      { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/FFFFFF" },
      { name: "Render", icon: "https://cdn.simpleicons.org/render/46E3B7" },
    ],
  },
];

const MySkills = () => {
  return (
    <section 
     id="myskills"
    className="py-20 px-4 bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      <motion.h2
        className="text-center text-3xl md:text-5xl font-extrabold mb-10"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        My <span className="text-blue-500">Skills</span>
      </motion.h2>

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
        navigation={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="w-full max-w-6xl mx-auto"
      >
        {skills.map((skill) => (
          <SwiperSlide key={skill.id}>
            <motion.div
              className="bg-gradient-to-b from-gray-800 to-gray-900 min-h-[360px] h-full p-6 rounded-2xl shadow-xl flex flex-col items-center justify-between text-center transition-transform duration-300 hover:scale-105"
              whileHover={{ scale: 1.07 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center gap-2">
                {skill.icon}
                <h3 className="text-xl font-semibold mt-2">{skill.title}</h3>
                <p className="text-sm text-gray-400">{skill.type}</p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mt-5">
                {skill.children.map((child, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1 bg-gray-700 px-3 py-1 rounded-full shadow-sm"
                  >
                    <img
                      src={child.icon}
                      alt={child.name}
                      className="h-4 w-4 object-contain"
                    />
                    <span className="text-sm text-white">{child.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default MySkills;
