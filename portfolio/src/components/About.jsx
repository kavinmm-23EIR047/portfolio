import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaLaptopCode,
  FaBuilding,
  FaTrophy,
  FaHandshake,
} from "react-icons/fa";

/* DATA */

const education = [
  {
    title: "SSLC (2019–2021)",
    place: "Govt. High School, Pooluvapatti",
    icon: <FaGraduationCap className="text-sky-500" />,
  },
  {
    title: "HSC (2021–2023)",
    place: "Govt. Hr. Sec. School, Perumanallur",
    icon: <FaGraduationCap className="text-sky-500" />,
  },
  {
    title: "B.E EIE (2023–2027)",
    place: "Kongu Engineering College",
    icon: <FaGraduationCap className="text-sky-500" />,
  },
];

const achievements = [
  {
    icon: <FaTrophy className="text-yellow-500" />,
    text: "National Hackathon Finalist – Amrita University (2025)",
  },
  {
    icon: <FaLaptopCode className="text-green-500" />,
    text: "Completed 4+ Web Development Internships",
  },
  {
    icon: <FaBuilding className="text-sky-500" />,
    text: "Founded AK Web Flair Technologies (2024)",
  },
];

const trustedCompanies = [
  {
    name: "Memories Platform",
    logo: "https://memories-platform-holidays.vercel.app/logo.jpg",
    url: "https://memories-platform-holidays.vercel.app/",
  },
  {
    name: "Crazy Capture Studio",
    logo: "https://crazy-capture-studio.vercel.app/Crazylogo.jpg",
    url: "https://crazy-capture-studio.vercel.app/",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const About = () => {
  return (
    <section
      id="about"
      className="relative w-full pt-20 pb-16 px-5 bg-transparent"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">

        {/* TITLE */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center"
        >
         <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">
              Us
            </span>
          </h2>
          <div className="w-16 h-[2px] bg-sky-500 mx-auto mt-2" />
        </motion.div>

        {/* TOP */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* IMAGE */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            className="flex justify-center"
          >
            <img
              src="/images/about.jpg"
              alt="Kavin"
              className="w-72 sm:w-80 md:w-96 rounded-2xl border border-black/10 dark:border-white/10 shadow-xl hover:scale-105 transition"
            />
          </motion.div>

          {/* TEXT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            className="space-y-4"
          >
            <p className="text-gray-700 dark:text-gray-300">
              I’m <span className="text-sky-500 font-semibold">Kavin M M</span>,
              an aspiring Software Engineer & Electronics Engineer.
            </p>

            <p className="text-gray-600 dark:text-gray-400">
              Currently pursuing{" "}
              <span className="text-sky-500">
                B.E EIE at Kongu Engineering College
              </span>.
            </p>

            <p className="text-gray-600 dark:text-gray-400">
              Founded{" "}
              <span className="text-gray-900 dark:text-white font-semibold">
                AK Web Flair Technologies
              </span>{" "}
              in 2024.
            </p>
          </motion.div>
        </div>

        {/* EDUCATION */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show">
          <h3 className="text-xl font-semibold text-sky-500 text-center mb-6">
            Education
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {education.map((item, i) => (
              <div
                key={i}
                className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-xl p-5 flex gap-4 shadow-md hover:scale-105 transition"
              >
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <h4 className="text-gray-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    {item.place}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ACHIEVEMENTS */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show">
          <h3 className="text-xl font-semibold text-sky-500 text-center mb-6">
            Achievements
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {achievements.map((item, i) => (
              <div
                key={i}
                className="bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-5 flex gap-3 shadow-md hover:scale-105 transition"
              >
                {item.icon}
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CLIENTS */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show">
          <h3 className="text-xl font-semibold text-sky-500 text-center mb-6 flex justify-center items-center gap-2">
            <FaHandshake /> Trusted Clients
          </h3>

          <div className="flex flex-wrap justify-center gap-6">
            {trustedCompanies.map((company, i) => (
              <a
                key={i}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-44 bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-4 text-center shadow-md hover:scale-105 transition"
              >
                <div className="h-14 flex items-center justify-center">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-full object-contain group-hover:scale-110 transition"
                  />
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-300 mt-3">
                  {company.name}
                </p>
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;