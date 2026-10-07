import React from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaLaptopCode, FaBuilding, FaCheckCircle, FaStar, FaUserGraduate, FaCodeBranch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Award, Cpu, HeartHandshake, ShieldCheck, Users } from "lucide-react";
import { JourneyShowcase } from "./Hero";

const achievements = [
  { 
    icon: <FaTrophy />, 
    title: "National Finalist & Winner", 
    subtitle: "Awarded for high-performance software engineering & AI innovation in nationwide hackathons." 
  },
  { 
    icon: <FaLaptopCode />, 
    title: "Full-Stack & Mobile Mastery", 
    subtitle: "Specialized in MERN, PostgreSQL, Python AI agents, Flutter, and React Native architecture." 
  },
  { 
    icon: <FaBuilding />, 
    title: "Founder, WebFlair Technologies", 
    subtitle: "Building high-performance CRM platforms, UI dashboards, e-commerce stores, and AI automation workflows." 
  },
];

const LegacyAbout = () => {
  return (
    <section id="about" className="relative w-full py-24 sm:py-32 px-5 md:px-10 lg:px-16 bg-[#F1F5F9] overflow-hidden">
      
      {/* Decorative Aura */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#0A4FE0]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white text-[#0A4FE0] text-xs font-extrabold px-5 py-2 rounded-full tracking-widest mb-6 uppercase shadow-sm border border-[#CBD5E1]">
            <span className="w-2 h-2 rounded-full bg-[#0A4FE0]" />
            About WebFlair & Leadership
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] leading-tight tracking-tight">
            Engineering Tailored for <span className="text-[#0A4FE0]">Tomorrow</span>
          </h2>
          
          <p className="mt-4 text-[#64748B] text-lg font-medium">
            Discover the principles, engineering excellence, and background driving AK WebFlair Technologies.
          </p>
        </div>
        
        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* CARD 1: MAIN TEXT (Spans 2 columns) - Solid Royal Blue Block */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#0A4FE0] text-white rounded-[2.5rem] p-8 sm:p-12 shadow-[0_20px_50px_-15px_rgba(10,79,224,0.3)] flex flex-col justify-between relative overflow-hidden lg:col-span-2 min-h-[460px] border border-white/20"
          >
            {/* Subtle background glow effect */}
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/15 text-white border border-white/25 px-4 py-1.5 rounded-full text-xs font-bold w-fit mb-8 tracking-wider backdrop-blur-md">
                <FaUserGraduate size={13} /> Founder & Lead Engineer
              </div>
              
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-[1.15] tracking-tight">
                Engineering <br className="hidden sm:inline" />
                <span className="text-[#CBD5E1]">Without Compromise.</span>
              </h3>
              
              <p className="text-[#F1F5F9] leading-relaxed text-base sm:text-lg max-w-xl mb-10 font-medium">
                I'm <strong className="text-white font-extrabold">Kavin M M</strong>, an Electronics & Software Engineer. At WebFlair, our mission is clear: engineer custom CRM platforms, high-converting e-commerce & UI dashboards, intelligent Python AI automation agents, and scalable apps with MERN, PostgreSQL, Flutter, and React Native.
              </p>
            </div>

            {/* Pill Ratings & Badges */}
            <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-md border border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="flex gap-1 text-white text-lg">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#CBD5E1]">
                  5.0 Client Rating
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-white text-[#0A4FE0] text-xs font-extrabold shadow-sm">
                  Kongu Engg College
                </span>
                <span className="px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/20">
                  B.E EIE
                </span>
              </div>
            </div>
          </motion.div>

          {/* CARD 2: WHY OUR PRODUCTS (Spans 1 column) - Clean White Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-[0_15px_35px_-10px_rgba(15,23,42,0.08)] border border-[#CBD5E1] flex flex-col justify-between relative overflow-hidden group lg:col-span-1 min-h-[460px]"
          >
            <div>
              <div className="flex justify-between items-center w-full mb-6">
                <span className="bg-[#0A4FE0]/10 text-[#0A4FE0] text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                  Quality First
                </span>
                <span className="w-3 h-3 rounded-full bg-[#10B981]" />
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] leading-tight mb-4 tracking-tight">
                Software That Powers Growth
              </h3>
              
              <p className="text-sm text-[#64748B] font-medium leading-relaxed mb-6">
                We craft bespoke systems that eliminate technical debt and give founders full confidence in their infrastructure.
              </p>
            </div>

            <div className="w-full bg-[#F1F5F9] rounded-2xl border border-[#E2E8F0] p-4 flex flex-col gap-3">
              <img 
                src="/images/about.jpg" 
                alt="Quality engineering" 
                className="w-full h-32 object-cover rounded-xl border border-[#E2E8F0] shadow-sm" 
              />
              <div className="flex gap-2">
                <div className="flex-1 bg-white rounded-xl py-2.5 text-center text-xs font-bold text-[#0F172A] border border-[#E2E8F0]">
                  High Scalability
                </div>
                <div className="flex-1 bg-white rounded-xl py-2.5 text-center text-xs font-bold text-[#0F172A] border border-[#E2E8F0]">
                  24/7 Reliability
                </div>
              </div>
            </div>
          </motion.div>

          {/* CARDS 3, 4, 5: ACHIEVEMENTS - Clean White Cards */}
          {achievements.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-[2.2rem] p-8 shadow-[0_12px_30px_-10px_rgba(15,23,42,0.06)] border border-[#E2E8F0] hover:border-[#0A4FE0] flex flex-col items-start gap-5 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-14 h-14 bg-[#0A4FE0]/10 text-[#0A4FE0] group-hover:bg-[#0A4FE0] group-hover:text-white rounded-2xl flex items-center justify-center text-2xl transition-colors shadow-sm">
                {item.icon}
              </div>
              
              <div>
                <h4 className="font-extrabold text-[#0F172A] group-hover:text-[#0A4FE0] text-xl leading-tight mb-2 tracking-tight transition-colors">
                  {item.title}
                </h4>
                <p className="text-[#64748B] text-sm font-medium leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

const principles = [
  { title: "Built for the long term", text: "We make technical choices that keep products secure, maintainable, and ready to grow.", Icon: ShieldCheck },
  { title: "Clear collaboration", text: "You get direct communication, visible progress, and decisions grounded in your goals.", Icon: Users },
  { title: "Practical innovation", text: "We use AI and modern tools where they create real value for your team.", Icon: Cpu },
  { title: "Care in every detail", text: "From the first wireframe to support, quality is part of the process.", Icon: HeartHandshake },
];

const About = () => <><JourneyShowcase compact /><section className="about-principles"><div className="about-principles-shell"><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="about-lead"><span className="journey-eyebrow"><i />WHY WEBFLAIR</span><h2>Engineering partners who <em>care about the outcome.</em></h2><p>We bring together thoughtful design, dependable engineering, and a relationship-first approach to create digital products people enjoy using.</p><div className="about-rating"><Award /><span><b>Quality-led delivery</b><small>From strategy through support</small></span><ShieldCheck /></div></motion.div><div className="about-principle-grid">{principles.map(({ title, text, Icon }, index) => <motion.article key={title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}><span>{React.createElement(Icon, { size: 23 })}</span><h3>{title}</h3><p>{text}</p></motion.article>)}</div></div></section></>;

export default About;
