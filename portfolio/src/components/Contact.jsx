import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setStatus(null);

    // Format pre-filled WhatsApp enquiry message
    const formattedMessage =
      `*New Project Enquiry — AK WebFlair Technologies*\n\n` +
      `*Name:* ${data.name || "Client"}\n` +
      `*Email:* ${data.email || "N/A"}\n` +
      `*Phone:* ${data.phone || "N/A"}\n` +
      `*Project Scope:* ${data.comment || "Interested in custom software development."}\n\n` +
      `*Sent via WebFlair Direct Portal*`;

    const encodedText = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/919600732162?text=${encodedText}`;

    // Background sync to backend leads database
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        phone: data.phone,
        email: data.email,
        comment: data.comment,
        service: "Direct Contact Portal",
        source: "Website Contact Form",
        mindsetIntent: "High Intent (Contact Form Submission)",
        suggestedStack: "React, Node.js, PostgreSQL",
      }),
    }).catch(() => null);

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => null);

    // Instant direct WhatsApp launch
    window.open(whatsappUrl, "_blank");

    setStatus({
      type: "success",
      message: "Opening WhatsApp... Your project details are pre-filled! Just click send in WhatsApp.",
    });

    setIsSubmitting(false);
    reset();
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-5 md:px-10 lg:px-16 bg-[#F1F5F9] relative overflow-hidden select-none">
      {/* Decorative Aura */}
      <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-[#0A4FE0]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white text-[#0A4FE0] text-xs font-extrabold px-5 py-2 rounded-full tracking-widest mb-6 uppercase shadow-sm border border-[#CBD5E1]">
            <span className="w-2 h-2 rounded-full bg-[#0A4FE0]" />
            Direct WhatsApp Enquiry
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
            Start Your Project with <span className="text-[#0A4FE0]">WebFlair</span>
          </h2>

          <p className="mt-4 text-[#64748B] text-lg font-medium max-w-2xl mx-auto">
            Fill out your project details below to automatically open WhatsApp and chat directly with Founder Kavin M M.
          </p>
        </div>

        {/* Dual-Tone Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(15,23,42,0.12)] border border-[#CBD5E1] overflow-hidden flex flex-col md:flex-row"
        >
          {/* LEFT: Solid Royal Blue Info Panel */}
          <div className="bg-[#0A4FE0] p-8 sm:p-10 md:w-5/12 flex flex-col justify-between text-white relative overflow-hidden">
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#CBD5E1] mb-2 block">
                Direct Communication
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 tracking-tight">
                Contact Details
              </h3>
              <p className="text-[#CBD5E1] text-sm font-medium leading-relaxed mb-8">
                Reach out directly via WhatsApp or phone. We provide immediate technical analysis and scope planning.
              </p>

              <div className="space-y-5 text-sm font-medium">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white flex-shrink-0 border border-white/20 shadow-sm">
                    <FaMapMarkerAlt size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#CBD5E1]">Office Location</p>
                    <p className="font-bold text-white text-sm mt-0.5">Tiruppur, Tamil Nadu, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white flex-shrink-0 border border-white/20 shadow-sm">
                    <FaPhoneAlt size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#CBD5E1]">Direct Phone Lines</p>
                    <a href="tel:+919600732162" className="font-bold text-white hover:underline text-sm mt-0.5 block">
                      +91 96007 32162
                    </a>
                    <a href="tel:+919363265477" className="font-bold text-white hover:underline text-sm mt-0.5 block">
                      +91 93632 65477
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white flex-shrink-0 border border-white/20 shadow-sm">
                    <FaEnvelope size={15} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#CBD5E1]">Official Email</p>
                    <a
                      href="mailto:akwebflairtechnologies@gmail.com"
                      className="font-bold text-white hover:underline text-sm mt-0.5 block break-all"
                    >
                      akwebflairtechnologies@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Quick Link */}
            <div className="mt-8 pt-6 border-t border-white/20 relative z-10">
              <a
                href="https://wa.me/919600732162?text=Hi%20AK%20WebFlair%20Technologies%2C%20I%20want%20to%20enquire%20about%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-sm transition-all duration-200 shadow-md hover:scale-105 cursor-pointer"
              >
                <FaWhatsapp size={20} /> Open Direct WhatsApp
              </a>
            </div>
          </div>

          {/* RIGHT: Direct WhatsApp Form */}
          <div className="p-8 sm:p-10 md:w-7/12 flex flex-col justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0F172A] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    {...register("name", { required: true })}
                    placeholder="e.g. John Doe"
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-2xl px-4 py-3 text-sm text-[#0F172A] font-medium placeholder-[#94A3B8] focus:outline-none focus:border-[#0A4FE0] transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0F172A] mb-1.5">
                    Email Address
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-2xl px-4 py-3 text-sm text-[#0F172A] font-medium placeholder-[#94A3B8] focus:outline-none focus:border-[#0A4FE0] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0F172A] mb-1.5">
                  Phone Number *
                </label>
                <input
                  {...register("phone", { required: true })}
                  placeholder="+91 96007 32162"
                  className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-2xl px-4 py-3 text-sm text-[#0F172A] font-medium placeholder-[#94A3B8] focus:outline-none focus:border-[#0A4FE0] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0F172A] mb-1.5">
                  Project Scope & Details *
                </label>
                <textarea
                  {...register("comment", { required: true })}
                  rows={4}
                  placeholder="Describe your CRM, E-Commerce, AI Agent, or Mobile App requirements..."
                  className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-2xl px-4 py-3 text-sm text-[#0F172A] font-medium placeholder-[#94A3B8] resize-none focus:outline-none focus:border-[#0A4FE0] transition"
                />
              </div>

              {status && (
                <div className="p-4 rounded-2xl text-xs font-bold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold py-4 px-8 rounded-full transition-all duration-300 shadow-md hover:scale-[1.02] flex justify-center items-center gap-2.5 text-sm cursor-pointer"
              >
                <FaWhatsapp size={18} />
                <span>Send Enquiry to WhatsApp</span>
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;