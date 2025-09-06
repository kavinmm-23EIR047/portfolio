import { motion } from "framer-motion";
import { FaGraduationCap, FaLaptopCode, FaBuilding, FaTrophy, FaHandshake } from "react-icons/fa";

const education = [
  {
    title: "SSLC (2019–2021)",
    place: "Govt. High School, Pooluvapatti, Tiruppur",
    icon: <FaGraduationCap className="text-blue-400" />,
  },
  {
    title: "HSC (2021–2023)",
    place: "Govt. Hr. Sec. School, Perumanallur, Tiruppur",
    icon: <FaGraduationCap className="text-blue-400" />,
  },
  {
    title: "B.E EIE (2023–2027)",
    place: "Kongu Engineering College, Perundurai, Erode",
    icon: <FaGraduationCap className="text-blue-400" />,
  },
];


const achievements = [
  {
    icon: <FaTrophy className="text-yellow-400" />,
    text: "Finalist in a National Level Hackathon organized by Amrita University (2025)",
  },
  {
    icon: <FaLaptopCode className="text-green-400" />,
    text: "Completed 4+ hands-on internships in web development",
  },
  {
    icon: <FaBuilding className="text-blue-400" />,
    text: "Established AK Web Flair Technologies in 2024 to deliver tech-driven freelance services",
  },
];


const trustedCompanies = [
  {
    name: "Memories Platform Holidays",
    logo: "https://memories-platform-holidays.vercel.app/logo.jpg",
    url: "https://memories-platform-holidays.vercel.app/",
  },
  {
    name: "Crazy Capture Studio",
    logo: "https://crazy-capture-studio.vercel.app/Crazylogo.jpg",
    url: "https://crazy-capture-studio.vercel.app/",
  },
  // {
  //   name: "Client C",
  //   logo: "/images/companies/client3.png",
  //   url: "https://clientC.org",
  // },
];


const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen w-full bg-gradient-to-b from-gray-950 to-black text-white py-20 px-4"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl font-extrabold text-blue-500 mb-2">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
        </motion.div>

        {/* Top Content: Image + Summary */}
        <div className="flex flex-col md:flex-row items-center gap-14">
          {/* Image */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src="/images/about.jpg"
              alt="Kavin M M"
              className="rounded-2xl shadow-[0_0_40px_#2563EB50] w-72 sm:w-80 md:w-96 border border-blue-500/20 hover:scale-105 transition duration-300"
            />
          </motion.div>

          {/* Summary */}
          <motion.div
            className="w-full md:w-1/2 space-y-5"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
           <p className="text-gray-300 text-lg leading-relaxed">
  I’m <span className="text-blue-400 font-semibold">Kavin M M</span>, an aspiring{" "}
  <span className="font-mono text-blue-300">Software Development Engineer (SDE)</span>,{" "}
  <span className="font-mono text-blue-300">Industrial Automation Engineer</span>, and{" "}
  <span className="font-mono text-blue-300">Electronics Engineer</span>. I’m currently pursuing a Bachelor of Engineering in{" "}
  <span className="text-blue-400 font-semibold">Electronics & Instrumentation Engineering</span> at Kongu Engineering College.
</p>

<p className="text-gray-300 text-lg leading-relaxed mt-4">
  In early <span className="text-white font-semibold">2024</span>, I founded{" "}
  <span className="text-blue-400 font-semibold">AK Web Flair Technologies</span> to begin my freelance journey. Through this initiative, I’ve been delivering high-quality services in{" "}
  <span className="text-blue-300 font-semibold">web development</span>,{" "}
  <span className="text-blue-300 font-semibold">mobile app development</span>,{" "}
  <span className="text-blue-300 font-semibold">graphic design</span>, and{" "}
  <span className="text-blue-300 font-semibold">video editing</span>, catering to a wide range of clients and startups.
</p>
          </motion.div>
        </div>

        {/* Education Cards */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-blue-400 mb-6 text-center">Education</h3>
          <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {education.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 p-6 rounded-xl border border-blue-500/10 backdrop-blur-md shadow-inner flex items-start gap-4"
              >
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <h4 className="text-white font-semibold text-lg">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.place}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-blue-400 mb-6 text-center">Achievements</h3>
          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {achievements.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 p-6 rounded-xl border border-blue-500/10 shadow-md flex gap-3 items-start"
              >
                <div className="text-xl">{item.icon}</div>
                <p className="text-gray-300">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

      {/* Trusted Clients */}
<motion.div
  className="w-full"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <h3 className="text-2xl font-bold text-blue-400 mb-6 text-center flex justify-center items-center gap-2">
    <FaHandshake /> Trusted Companies
  </h3>

  <div className="flex flex-wrap justify-center items-center gap-6 max-w-5xl mx-auto">
    {trustedCompanies.map((company, index) => (
      <a
        key={index}
        href={company.url}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white/10 p-4 rounded-xl border border-white/10 hover:shadow-lg transition hover:bg-white/20 text-center w-32"
      >
        <img
          src={company.logo}
          alt={company.name}
          className="w-full h-12 object-contain mx-auto transition"
        />
        <p className="text-sm text-gray-200 mt-2 font-medium">{company.name}</p>
      </a>
    ))}
  </div>
</motion.div>


      </div>
    </section>
  );
};

export default About;
