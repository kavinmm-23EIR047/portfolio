import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-950 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-14">

        {/* Left: Image */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="/images/about.jpg"
            alt="Kavin M M"
            className="rounded-2xl shadow-2xl w-72 sm:w-80 md:w-96 border border-blue-500/30 hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        {/* Right: Text Content */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-400 mb-2">
            About <span className="text-white">Me</span>
          </h2>
          <div className="w-16 h-1 bg-blue-500 mb-6 rounded"></div>

          <div className="bg-gray-800/60 p-6 sm:p-8 rounded-2xl shadow-inner backdrop-blur-md">
            <p className="text-gray-300 text-base sm:text-lg mb-4 leading-relaxed">
              I’m <span className="text-blue-400 font-semibold">Kavin M M</span>, an aspiring{" "}
              <span className="font-mono bg-blue-500/10 px-1 py-0.5 rounded text-blue-300">
                Software Development Engineer
              </span>{" "}
              and{" "}
              <span className="font-mono bg-blue-500/10 px-1 py-0.5 rounded text-blue-300">
                Industrial Automation Engineer
              </span>. I'm currently pursuing a BE in Electronics and Instrumentation Engineering (EIE).
            </p>

            <p className="text-gray-300 text-base sm:text-lg mb-4 leading-relaxed">
              I'm the founder of <span className="text-blue-400 font-semibold">AK WebFlair Technologies</span> and work as a dedicated{" "}
              <span className="text-blue-400 font-semibold">freelancer</span>, blending innovation and tech in real-world applications.
            </p>

            <p className="text-gray-300 text-base sm:text-lg mb-4 leading-relaxed">
              I’ve completed 4+ internships and participated in the national hackathon at{" "}
              <span className="text-blue-400 font-semibold">Amrita University</span>. My projects span across software development, AI, and automation.
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {[
                "Java",
                "Python",
                "MERN Stack",
                "Figma",
                "Photoshop",
                "Premiere Pro",
                "AI & ML",
                "Embedded Systems"
              ].map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-600/20 text-blue-300 text-sm sm:text-base font-mono px-3 py-1 rounded-full shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
