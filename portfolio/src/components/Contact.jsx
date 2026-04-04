import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiMessageCircle,
  FiPhone,
  FiMapPin,
  FiClock,
} from "react-icons/fi";

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccessMessage("✅ Message sent successfully!");
        reset();
      } else {
        setSuccessMessage("❌ Failed to send message!");
      }
    } catch (error) {
      setSuccessMessage("❌ Something went wrong!");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSuccessMessage(""), 4000);
    }
  };

  return (
    <section id="contact" className="relative py-20 px-5 bg-transparent">
      
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Contact{" "}
          <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
            Us
          </span>
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
          Let’s build scalable digital products together.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="rounded-2xl p-8 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg"
        >
          <h3 className="text-2xl font-semibold mb-6 text-sky-500">
            AK Web Flair Technologies
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-8">
            We provide web, app, SaaS, AI and enterprise solutions.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <FiMapPin className="text-sky-500 text-xl" />
              <a
                href="https://maps.app.goo.gl/qjS4WGGvsoYLscfK9"
                target="_blank"
                className="text-gray-600 dark:text-gray-400 hover:text-sky-500"
              >
                View Location →
              </a>
            </div>

            <div className="flex gap-4">
              <FiClock className="text-sky-500 text-xl" />
              <p className="text-gray-600 dark:text-gray-400">
                24/7 Support
              </p>
            </div>

            <div className="flex gap-4">
              <FiPhone className="text-sky-500 text-xl" />
              <p className="text-gray-600 dark:text-gray-400">
                Always available
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="rounded-2xl p-8 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-xl"
        >
          {successMessage && (
            <div className="mb-5 text-center font-semibold text-green-500">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <input
              {...register("name")}
              placeholder="Name"
              className="w-full p-3 rounded-xl bg-white/80 dark:bg-slate-800 border border-black/10 dark:border-white/10"
            />

            <input
              {...register("email")}
              placeholder="Email"
              className="w-full p-3 rounded-xl bg-white/80 dark:bg-slate-800 border border-black/10 dark:border-white/10"
            />

            <input
              {...register("phone")}
              placeholder="Phone"
              className="w-full p-3 rounded-xl bg-white/80 dark:bg-slate-800 border border-black/10 dark:border-white/10"
            />

            <textarea
              {...register("comment")}
              placeholder="Message"
              className="w-full p-3 rounded-xl h-32 bg-white/80 dark:bg-slate-800 border border-black/10 dark:border-white/10"
            />

            <button
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;