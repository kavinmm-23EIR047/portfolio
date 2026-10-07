import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import {
  Bot,
  MessageCircle,
  Send,
  Sparkles,
  X,
  User,
  CheckCircle,
  Phone,
  Mail,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  BrainCircuit,
  RefreshCw,
  Loader2,
  Rocket,
  BarChart3,
  Cpu,
  Zap,
  Smartphone,
  PhoneCall,
  Coins,
  FileText,
  Smile,
  Check,
} from "lucide-react";
import { FaWhatsapp, FaRobot, FaRocket, FaChartLine, FaBolt, FaMobileAlt, FaPhoneAlt, FaFileAlt } from "react-icons/fa";
import { getAgentReply } from "../data/companyData";

const AIRobotAvatar = ({ className = "w-5 h-5 text-white" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <line x1="50" y1="10" x2="50" y2="24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <circle cx="50" cy="8" r="4" fill="#38BDF8" />
    <rect x="16" y="42" width="8" height="16" rx="4" fill="currentColor" opacity="0.85" />
    <rect x="76" y="42" width="8" height="16" rx="4" fill="currentColor" opacity="0.85" />
    <rect x="22" y="22" width="56" height="56" rx="20" fill="currentColor" />
    <rect x="28" y="34" width="44" height="30" rx="12" fill="#090D1A" />
    <circle cx="41" cy="49" r="4.5" fill="#38BDF8" />
    <circle cx="59" cy="49" r="4.5" fill="#38BDF8" />
    <line x1="36" y1="41" x2="46" y2="41" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="54" y1="41" x2="64" y2="41" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M43 57 Q50 62 57 57" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M38 78 H62 L58 88 H42 Z" fill="currentColor" opacity="0.9" />
  </svg>
);

const capabilityOptions = [
  "CRM Platforms & UI Dashboards",
  "Landing & E-Commerce Stores",
  "Python AI Automation Agents",
  "MERN & PostgreSQL Full-Stack",
  "Flutter & React Native Mobile Apps",
  "SEO & Core Web Vitals Optimization",
];

const budgetOptions = [
  "Under ₹50,000 (Fast 1-2 Weeks)",
  "₹50,000 - ₹1.5 Lakhs (2-4 Weeks)",
  "₹1.5 Lakhs - ₹3+ Lakhs (1-2 Months)",
  "Custom Enterprise Scope",
];

const quickStarters = [
  { label: "Request Project Quote", query: "Can I get a project estimate and cost outline?", icon: Rocket },
  { label: "CRM & Dashboards", query: "Tell me about your CRM platforms and UI dashboards", icon: BarChart3 },
  { label: "Python AI Agents", query: "How do Python AI automation agents work?", icon: Cpu },
  { label: "MERN & PostgreSQL", query: "Explain your MERN stack and PostgreSQL architecture", icon: Zap },
  { label: "Mobile Apps", query: "Do you build Flutter and React Native mobile apps?", icon: Smartphone },
  { label: "Direct WhatsApp Chat", query: "I want to chat on WhatsApp directly", icon: PhoneCall },
];

const analyzeClientMindset = (name, service, budget, notes) => {
  const fullText = (service + " " + budget + " " + notes).toLowerCase();
  
  let intentLevel = "High Intent (Ready to Procure)";
  if (fullText.includes("custom") || fullText.includes("enterprise")) {
    intentLevel = "Enterprise Intent (Custom Scope)";
  } else if (fullText.includes("explore") || fullText.includes("under ₹50,000")) {
    intentLevel = "Moderate Intent (Fast Delivery)";
  }

  let techStack = "React, Node.js, PostgreSQL";
  if (fullText.includes("python") || fullText.includes("ai") || fullText.includes("agent")) {
    techStack = "Python, LangChain, LLMs, FastAPI";
  } else if (fullText.includes("flutter") || fullText.includes("mobile") || fullText.includes("react native")) {
    techStack = "Flutter, React Native, Cross-Platform iOS/Android";
  } else if (fullText.includes("ecommerce") || fullText.includes("store")) {
    techStack = "Next.js, Razorpay, PostgreSQL, TailwindCSS";
  } else if (fullText.includes("crm") || fullText.includes("dashboard")) {
    techStack = "React, Node.js, Express, PostgreSQL / MongoDB";
  }

  return { intentLevel, techStack };
};

const CompanyChatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(1); // 1: Name, 2: Contact, 3: Service, 4: Budget, 5: Notes, 6: Complete
  const [isThinking, setIsThinking] = useState(false);
  
  const [leadData, setLeadData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "CRM Platforms & UI Dashboards",
    budget: "₹50,000 - ₹1.5 Lakhs (2-4 Weeks)",
    notes: "",
  });

  const [messages, setMessages] = useState([
    {
      id: "step-1",
      role: "agent",
      text: "Hi! I'm the **AK WebFlair AI Assistant & Lead Agent**.\n\nYou can ask any question about our **CRM platforms, Python AI agents, e-commerce, or mobile apps**, or let me guide your project step-by-step!\n\nTo start, what is your **Full Name**?",
      step: 1,
    },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, open, step, isThinking]);

  // Handle message or step submission
  const handleSend = (textToSend = null) => {
    const val = (textToSend || input).trim();
    if (!val && step !== 3 && step !== 4 && step !== 5) return;

    setInput("");
    const userMsgId = `user-${Date.now()}`;
    const updatedMessages = [...messages, { id: userMsgId, role: "user", text: val }];
    setMessages(updatedMessages);

    // Show AI thinking indicator
    setIsThinking(true);

    setTimeout(() => {
      let nextStepMsgs = [...updatedMessages];

      // Check if user asked a general knowledge question
      const isGeneralQuestion = /how|what|tell me|explain|price|cost|quote|budget|stack|mobile|crm|ai|python|mern|flutter|service|about|contact|call|phone|talk/i.test(val);

      if (isGeneralQuestion && step === 1 && !leadData.name) {
        // AI Answer to question
        const replyText = getAgentReply(val);
        nextStepMsgs.push({
          id: `agent-reply-${Date.now()}`,
          role: "agent",
          text: `${replyText}\n\n**Let's capture your project details so Founder Kavin M M can review your scope!** What is your **Full Name**?`,
          step: 1,
        });
      } else if (step === 1) {
        // Step 1: Client Name
        const clientName = val || "Client";
        setLeadData((prev) => ({ ...prev, name: clientName }));
        nextStepMsgs.push({
          id: `agent-step-2`,
          role: "agent",
          text: `Nice to meet you, **${clientName}**! Please share your **Phone Number & Email Address** so we can reach you with project details:`,
          step: 2,
        });
        setStep(2);
      } else if (step === 2) {
        // Step 2: Contact Phone/Email
        const contactText = val || "";
        const phoneMatch = contactText.match(/(\+?\d[\d\s-]{8,14}\d)/);
        const phone = phoneMatch ? phoneMatch[0] : contactText;
        const emailMatch = contactText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        const email = emailMatch ? emailMatch[0] : "";

        setLeadData((prev) => ({ ...prev, phone: phone || contactText, email }));
        nextStepMsgs.push({
          id: `agent-step-3`,
          role: "agent",
          text: `Got it! Which **Primary Capability** does your project require? Click an option below or type your choice:`,
          step: 3,
          showCapabilityOptions: true,
        });
        setStep(3);
      } else if (step === 3) {
        // Step 3: Service Selected
        const selectedService = val || leadData.service;
        setLeadData((prev) => ({ ...prev, service: selectedService }));
        nextStepMsgs.push({
          id: `agent-step-4`,
          role: "agent",
          text: `Great choice (**${selectedService}**)! What is your **Target Budget & Delivery Timeline**?`,
          step: 4,
          showBudgetOptions: true,
        });
        setStep(4);
      } else if (step === 4) {
        // Step 4: Budget Selected
        const selectedBudget = val || leadData.budget;
        setLeadData((prev) => ({ ...prev, budget: selectedBudget }));
        nextStepMsgs.push({
          id: `agent-step-5`,
          role: "agent",
          text: `Understood! Any **specific features, goals, or notes** you'd like us to know? (Or type your notes & hit **Submit Lead**)`,
          step: 5,
        });
        setStep(5);
      } else if (step === 5 || step === 6) {
        // Step 5: Final Submission
        const finalNotes = val || leadData.notes || "Client requested direct project discussion.";
        const currentLead = { ...leadData, notes: finalNotes };

        const mindset = analyzeClientMindset(
          currentLead.name,
          currentLead.service,
          currentLead.budget,
          finalNotes
        );

        const whatsappMsg =
          `*AK WEBFLAIR AI AGENT LEAD*\n\n` +
          `*Client Name:* ${currentLead.name || "Client"}\n` +
          `*Phone:* ${currentLead.phone || "N/A"}\n` +
          `*Email:* ${currentLead.email || "N/A"}\n` +
          `*Service Needed:* ${currentLead.service}\n` +
          `*Target Budget:* ${currentLead.budget}\n\n` +
          `*AI Mindset Analysis:*\n` +
          `• *Intent Level:* ${mindset.intentLevel}\n` +
          `• *Suggested Stack:* ${mindset.techStack}\n\n` +
          `*Project Scope Notes:*\n` +
          `"${finalNotes}"\n\n` +
          `*Automated & Saved to AK WebFlair Admin Panel*`;

        const encodedText = encodeURIComponent(whatsappMsg);
        const whatsappUrl = `https://wa.me/919600732162?text=${encodedText}`;

        // Save to Backend Database (/api/leads)
        try {
          const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";
          fetch(`${backendUrl}/api/leads`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: currentLead.name || "Client",
              phone: currentLead.phone || "N/A",
              email: currentLead.email || "",
              service: currentLead.service,
              budget: currentLead.budget,
              comment: finalNotes,
              mindsetIntent: mindset.intentLevel,
              suggestedStack: mindset.techStack,
              source: "Naukri-Style AI Agent",
            }),
          }).catch(() => null);
        } catch (err) {}

        // Direct WhatsApp Launch
        window.open(whatsappUrl, "_blank");

        nextStepMsgs.push({
          id: `agent-step-complete`,
          role: "agent",
          text: `**Lead Analysis Complete & Saved to Admin!**\n\nThank you **${currentLead.name || "Client"}**!\n\n**AI Mindset:** ${mindset.intentLevel}\n**Suggested Stack:** ${mindset.techStack}\n\nWe have saved your enquiry to our **Admin Portal** and opened WhatsApp for Founder **Kavin M M** (+91 96007 32162). Click below if WhatsApp didn't open automatically:`,
          isSuccess: true,
          whatsappUrl: whatsappUrl,
        });

        setStep(6);
      }

      setMessages(nextStepMsgs);
      setIsThinking(false);
    }, 550);
  };

  const handleResetChat = () => {
    setStep(1);
    setIsThinking(false);
    setLeadData({
      name: "",
      phone: "",
      email: "",
      service: "CRM Platforms & UI Dashboards",
      budget: "₹50,000 - ₹1.5 Lakhs (2-4 Weeks)",
      notes: "",
    });
    setMessages([
      {
        id: `step-1-${Date.now()}`,
        role: "agent",
        text: "Hi! I'm the **AK WebFlair AI Assistant & Lead Agent**.\n\nYou can ask any question about our **CRM platforms, Python AI agents, e-commerce, or mobile apps**, or let me guide your project step-by-step!\n\nTo start, what is your **Full Name**?",
        step: 1,
      },
    ]);
  };

  return (
    <div className="fixed right-3 bottom-3 sm:right-6 sm:bottom-6 z-[999] select-none font-sans">
      {/* CHAT WINDOW */}
      <AnimatePresence>
        {open && (
          <Motion.section
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-[4.8rem] right-3 left-3 sm:left-auto sm:right-0 sm:bottom-[4.5rem] w-auto sm:w-[400px] max-w-[calc(100vw-1.5rem)] h-[min(580px,calc(100vh-6.5rem))] bg-white rounded-[1.8rem] shadow-[0_25px_65px_-10px_rgba(10,79,224,0.3)] border border-[#CBD5E1] flex flex-col overflow-hidden"
          >
            {/* WINDOW HEADER */}
            <header className="bg-gradient-to-r from-[#0639A8] via-[#0A4FE0] to-[#1E6BFF] text-white px-4 py-3.5 flex items-center justify-between flex-shrink-0 shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center shadow-sm border border-white/30">
                  <AIRobotAvatar className="w-6 h-6 text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#10B981] border-2 border-white animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold tracking-tight text-white flex items-center gap-1.5">
                    WebFlair AI Lead Agent
                    <BrainCircuit size={15} className="text-white" />
                  </h3>
                  <p className="text-[10px] font-mono text-[#DBEAFE] font-medium">
                    Online • Mindset Analyzer & WhatsApp Lead Bot
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleResetChat}
                  title="Reset Conversation"
                  className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <RefreshCw size={13} className="text-white" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close Assistant"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>
            </header>

            {/* STEP PROGRESS BAR */}
            <div className="w-full bg-[#E2E8F0] h-1.5 flex-shrink-0">
              <div
                className="bg-[#0A4FE0] h-full transition-all duration-300"
                style={{ width: `${Math.min(100, (step / 5) * 100)}%` }}
              />
            </div>

            {/* MESSAGES SCROLL CONTAINER */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#F8FAFC]">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-2">
                  <div
                    className={`flex items-start gap-2 ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {msg.role === "agent" && (
                      <div className="w-8 h-8 rounded-xl bg-[#0A4FE0] text-white flex items-center justify-center flex-shrink-0 text-xs shadow-md border border-white/20 mt-0.5">
                        <AIRobotAvatar className="w-5 h-5 text-white" />
                      </div>
                    )}

                    <div
                      className={`max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#0A4FE0] text-white font-medium rounded-tr-none shadow-sm"
                          : msg.isSuccess
                          ? "bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] rounded-tl-none font-medium shadow-xs"
                          : "bg-white text-[#1E293B] border border-[#E2E8F0] rounded-tl-none font-medium shadow-xs"
                      }`}
                    >
                      <div className="whitespace-pre-line">
                        {msg.text.split("\n").map((line, lIdx) => {
                          const parts = line.split(/(\*\*.*?\*\*)/g);
                          return (
                            <p key={lIdx} className={lIdx > 0 ? "mt-1.5" : ""}>
                              {parts.map((part, pIdx) => {
                                if (part.startsWith("**") && part.endsWith("**")) {
                                  return (
                                    <strong key={pIdx} className="font-extrabold text-[#0F172A]">
                                      {part.slice(2, -2)}
                                    </strong>
                                  );
                                }
                                return part;
                              })}
                            </p>
                          );
                        })}
                      </div>

                      {/* STEP 3 CAPABILITY SELECTION PILLS */}
                      {msg.showCapabilityOptions && step === 3 && (
                        <div className="mt-3 space-y-1.5">
                          {capabilityOptions.map((cap, cIdx) => (
                            <button
                              key={cIdx}
                              onClick={() => handleSend(cap)}
                              className="w-full text-left px-3 py-2 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] text-[#0A4FE0] border border-[#CBD5E1] hover:border-[#0A4FE0] text-[11px] font-bold transition-all cursor-pointer flex items-center justify-between"
                            >
                              <span>{cap}</span>
                              <span className="w-5 h-5 rounded-full bg-[#0A4FE0] text-white flex items-center justify-center flex-shrink-0">
                                <ArrowRight size={11} className="text-white" />
                              </span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* STEP 4 BUDGET SELECTION PILLS */}
                      {msg.showBudgetOptions && step === 4 && (
                        <div className="mt-3 space-y-1.5">
                          {budgetOptions.map((bud, bIdx) => (
                            <button
                              key={bIdx}
                              onClick={() => handleSend(bud)}
                              className="w-full text-left px-3 py-2 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] text-[#0A4FE0] border border-[#CBD5E1] hover:border-[#0A4FE0] text-[11px] font-bold transition-all cursor-pointer flex items-center justify-between"
                            >
                              <span>{bud}</span>
                              <span className="w-5 h-5 rounded-full bg-[#0A4FE0] text-white flex items-center justify-center flex-shrink-0">
                                <ArrowRight size={11} className="text-white" />
                              </span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* DIRECT WHATSAPP BUTTON */}
                      {msg.whatsappUrl && (
                        <a
                          href={msg.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold px-4 py-2.5 rounded-xl text-xs shadow-md transition-all cursor-pointer"
                        >
                          <FaWhatsapp size={17} />
                          <span>Open WhatsApp Chat Now</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* AI THINKING LOADING ANIMATION */}
              {isThinking && (
                <div className="flex items-center gap-2 text-[#0A4FE0]">
                  <div className="w-8 h-8 rounded-xl bg-[#0A4FE0] text-white flex items-center justify-center flex-shrink-0 shadow-md border border-white/20">
                    <AIRobotAvatar className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white border border-[#CBD5E1] px-4 py-2.5 rounded-2xl text-xs font-bold text-[#0A4FE0] flex items-center gap-2 shadow-xs">
                    <Loader2 size={14} className="animate-spin text-[#0A4FE0]" />
                    <span>WebFlair AI is analyzing...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* QUICK STARTER CHIPS */}
            <div className="px-3 py-2 bg-white border-t border-[#F1F5F9] flex gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
              {quickStarters.map((starter, idx) => {
                const SIcon = starter.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSend(starter.query)}
                    className="flex-shrink-0 px-3 py-1.5 rounded-full bg-[#F8FAFC] hover:bg-[#EFF6FF] text-[#0A4FE0] border border-[#E2E8F0] hover:border-[#BFDBFE] text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#0A4FE0] text-white flex items-center justify-center flex-shrink-0">
                      <SIcon size={10} className="text-white" />
                    </span>
                    <span>{starter.label}</span>
                  </button>
                );
              })}
            </div>

            {/* INPUT FORM BAR */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white border-t border-[#E2E8F0] flex items-center gap-2 flex-shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  step === 1
                    ? "Type full name or ask any question..."
                    : step === 2
                    ? "Enter Phone & Email..."
                    : step === 5
                    ? "Type project details & hit send..."
                    : "Type message or ask question..."
                }
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#0A4FE0] focus:bg-white outline-none text-xs text-[#0F172A] font-medium placeholder-[#94A3B8]"
              />
              <button
                type="submit"
                disabled={!input.trim() && step !== 3 && step !== 4 && step !== 5}
                className="px-4 py-2.5 rounded-xl bg-[#0A4FE0] hover:bg-[#0639A8] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer flex-shrink-0 disabled:opacity-40"
              >
                <span>{step === 5 ? "Submit Lead" : "Send"}</span>
                <Send size={14} />
              </button>
            </form>
          </Motion.section>
        )}
      </AnimatePresence>

      {/* FLOATING CHAT LAUNCHER BUTTON */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2.5 bg-[#0A4FE0] hover:bg-[#0639A8] text-white px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-[0_12px_30px_rgba(10,79,224,0.4)] border border-white/30 transition-all duration-300 hover:scale-105 cursor-pointer"
        aria-label="Open WebFlair AI Assistant"
      >
        <div className="relative flex items-center justify-center">
          <AIRobotAvatar className="w-6 h-6 text-white" />
          <Sparkles size={12} className="absolute -top-1.5 -right-1.5 text-amber-300 fill-amber-300 animate-pulse" />
        </div>
        <span className="text-xs sm:text-sm font-extrabold tracking-wide text-white hidden xs:inline">
          {open ? "Close Assistant" : "Ask WebFlair AI"}
        </span>
      </button>
    </div>
  );
};

export default CompanyChatbot;
