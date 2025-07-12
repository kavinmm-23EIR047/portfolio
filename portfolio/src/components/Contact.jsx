import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FiUser, FiMail, FiMessageCircle, FiPhone } from "react-icons/fi";

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
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            comment: data.comment,
          }),
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
      console.error("Error:", error);
      setSuccessMessage("❌ Something went wrong!");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSuccessMessage(""), 4000);
    }
  };

  return (
    <section id="contact" className="py-20 px-5 bg-[#0a192f] text-white">
      <motion.h2
        className="text-4xl font-bold text-center mb-4 text-blue-400"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Get in Touch
      </motion.h2>

      <motion.p
        className="text-center text-sm text-gray-400 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Let’s build something amazing together. Reach out to discuss web dev, AI
        projects, or collaboration ideas!
      </motion.p>

      <motion.div
        className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {successMessage && (
          <motion.div
            className={`mb-4 text-center font-semibold ${
              successMessage.includes("✅")
                ? "text-green-400"
                : "text-red-400"
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {successMessage}
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Your Name"
              className="w-full pl-10 p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Your Email"
              className="w-full pl-10 p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              {...register("phone", { required: true })}
              placeholder="Your Phone"
              className="w-full pl-10 p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <FiMessageCircle className="absolute left-3 top-4 text-gray-400" />
            <textarea
              {...register("comment", { required: true })}
              placeholder="Your Message"
              className="w-full pl-10 p-3 bg-gray-700 text-white rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-3 rounded-md font-semibold transition-all duration-200 ${
              isSubmitting
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
