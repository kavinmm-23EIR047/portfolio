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
  Mic,
  Volume2,
} from "lucide-react";
import { FaWhatsapp, FaRobot, FaRocket, FaChartLine, FaBolt, FaMobileAlt, FaPhoneAlt, FaFileAlt } from "react-icons/fa";

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

const chatLanguages = {
  en: {
    label: "English", locale: "en-IN", assistant: "AI Assistant",
    welcome: "Hi! I'm the **AK WebFlair AI Assistant & Lead Agent**.\n\nYou can ask any question about our **CRM platforms, Python AI agents, e-commerce, or mobile apps**, or let me guide your project step-by-step!\n\nTo start, what is your **Full Name**?",
    name: "Nice to meet you", nameQuestion: "What is your **Full Name**?", contact: "Please share your **Phone Number & Email Address** so we can reach you with project details:",
    contactDone: "Got it! Which **Primary Capability** does your project require? Click an option below or type your choice:",
    service: "Great choice", budget: "What is your **Target Budget & Delivery Timeline**?",
    budgetDone: "Understood! Any **specific features, goals, or notes** you'd like us to know? (Or type your notes & hit **Submit Lead**)",
    send: "Send", submit: "Submit Lead", placeholder: "Type message or ask a question...",
    namePlaceholder: "Type your full name or ask a question...", contactPlaceholder: "Enter phone and email...",
    notesPlaceholder: "Type project details and hit send...", thinking: "WebFlair AI is analyzing...",
    voiceHint: "Choose a language. Use the microphone to dictate a message; tap Send to submit it.",
    voiceToggleOn: "Enable spoken replies", voiceToggleOff: "Disable spoken replies",
    listening: "Listening… speak now, then tap Send.", voiceDisclosure: "Voice recognition is browser-provided and may require internet; there is no offline translation.",
    voiceUnsupported: "Voice input is not available in this browser. Try the latest Chrome or Edge.",
    success: "Thank you", saved: "Your enquiry has been saved to our Admin Portal.",
    saveFailed: "We could not save your enquiry to the admin panel. Please contact us directly.",
    faqKeywords: {
      greeting: ["hello", "hi", "hey", "good morning", "good evening"],
      crm: ["crm", "dashboard", "dashboards", "lead pipeline"],
      ai: ["python", " ai ", "agent", "automation", "chatbot"],
      fullstack: ["mern", "postgres", "database", "node", "backend"],
      mobile: ["mobile", "flutter", "react native", "android", "ios"],
      ecommerce: ["e-commerce", "ecommerce", "online store", "shop", "landing page"],
      price: ["price", "cost", "budget", "quote", "estimate"],
      timeline: ["timeline", "how long", "duration", "delivery time"],
      contact: ["contact", "phone", "email", "call", "talk"],
    },
    faqAnswers: {
      greeting: "Hello! I can help with project planning, pricing, and WebFlair services.",
      crm: "We build custom CRM systems and dashboards with lead pipelines, analytics, and role-based access.",
      ai: "We build Python automation and AI workflows. The exact features depend on your project requirements.",
      fullstack: "We build full-stack applications with React, Node.js, MongoDB, and PostgreSQL.",
      mobile: "We build cross-platform iOS and Android apps using Flutter or React Native.",
      ecommerce: "We build e-commerce stores and landing pages with catalogues, checkout, and payment integrations.",
      price: "Pricing depends on scope, features, and timeline. Choose a budget option and we can prepare an estimate.",
      timeline: "Delivery time depends on scope. Share your requirements and we can suggest a practical timeline.",
      contact: "You can reach us at +91 96007 32162 or akwebflairtechnologies@gmail.com.",
      default: "I can help with CRM, AI automation, e-commerce, full-stack and mobile app projects. Please share a little more detail.",
    },
    analysisLabel: "Project assessment", stackLabel: "Suggested technology",
    whatsappOpen: "We have opened WhatsApp for the WebFlair team.",
    quick: ["Request Project Quote", "CRM & Dashboards", "Python AI Agents", "MERN & PostgreSQL", "Mobile Apps", "Direct WhatsApp Chat"],
  },
  ta: {
    label: "தமிழ்", locale: "ta-IN", assistant: "AI உதவியாளர்",
    welcome: "வணக்கம்! நான் **AK WebFlair AI உதவியாளர் மற்றும் வாடிக்கையாளர் வழிகாட்டி**.\n\n**CRM தளங்கள், Python AI முகவர்கள், இணைய விற்பனை அல்லது மொபைல் செயலிகள்** பற்றி கேட்கலாம்.\n\nதொடங்க, உங்கள் **முழுப் பெயர்** என்ன?",
    name: "உங்களைச் சந்தித்ததில் மகிழ்ச்சி", nameQuestion: "உங்கள் **முழுப் பெயர்** என்ன?", contact: "திட்ட விவரங்களைப் பகிர உங்கள் **தொலைபேசி எண் மற்றும் மின்னஞ்சல் முகவரியை** வழங்கவும்:",
    contactDone: "நன்றி! உங்கள் திட்டத்திற்குத் தேவையான **முக்கிய சேவையை** தேர்ந்தெடுக்கவும் அல்லது தட்டச்சு செய்யவும்:",
    service: "நல்ல தேர்வு", budget: "உங்கள் **பட்ஜெட் மற்றும் திட்ட காலக்கெடு** என்ன?",
    budgetDone: "உங்கள் **அம்சங்கள், இலக்குகள் அல்லது குறிப்புகள்** ஏதேனும் உள்ளதா? அவற்றைத் தட்டச்சு செய்து **விசாரணையை அனுப்பவும்**.",
    send: "அனுப்பு", submit: "விசாரணையை அனுப்பு", placeholder: "செய்தியைத் தட்டச்சு செய்யவும்...",
    namePlaceholder: "முழுப் பெயரைத் தட்டச்சு செய்யவும்...", contactPlaceholder: "தொலைபேசி மற்றும் மின்னஞ்சலை உள்ளிடவும்...",
    notesPlaceholder: "திட்ட விவரங்களை உள்ளிடவும்...", thinking: "WebFlair AI ஆய்வு செய்கிறது...",
    voiceHint: "மொழியைத் தேர்ந்தெடுத்து மைக்ரோஃபோனில் பேசுங்கள்; அனுப்ப தட்டவும்.",
    voiceToggleOn: "குரல் பதில்களை இயக்கு", voiceToggleOff: "குரல் பதில்களை நிறுத்து",
    listening: "கேட்கிறது… பேசிவிட்டு அனுப்பு என்பதைத் தட்டவும்.", voiceDisclosure: "குரல் அடையாளம் உலாவி வழியாகச் செயல்பட்டு இணையம் தேவைப்படலாம்; ஆஃப்லைன் மொழிபெயர்ப்பு இல்லை.",
    voiceUnsupported: "இந்த உலாவியில் குரல் உள்ளீடு கிடைக்கவில்லை. Chrome அல்லது Edge-ஐ முயற்சிக்கவும்.",
    success: "நன்றி", saved: "உங்கள் விசாரணை நிர்வாகப் பக்கத்தில் சேமிக்கப்பட்டது.",
    saveFailed: "உங்கள் விசாரணையை நிர்வாகப் பக்கத்தில் சேமிக்க முடியவில்லை. நேரடியாக எங்களைத் தொடர்புகொள்ளவும்.",
    faqKeywords: {
      greeting: ["வணக்கம்", "ஹலோ", "நமஸ்காரம்", "வணக்கம்"],
      crm: ["crm", "டாஷ்போர்டு", "டாஷ்போர்டுகள்", "வாடிக்கையாளர் மேலாண்மை"],
      ai: ["python", "ஏஐ", "ai", "முகவர்", "தானியங்கி"],
      fullstack: ["mern", "postgres", "தரவுத்தளம்", "node", "backend"],
      mobile: ["மொபைல்", "செயலி", "ஆண்ட்ராய்டு", "ஐஓஎஸ்"],
      ecommerce: ["இணைய விற்பனை", "கடை", "இ-காமர்ஸ்", "வலைத்தளம்"],
      price: ["விலை", "செலவு", "பட்ஜெட்", "கட்டணம்", "மதிப்பீடு"],
      timeline: ["எவ்வளவு நாள்", "காலக்கெடு", "எப்போது", "நேரம்"],
      contact: ["தொடர்பு", "தொலைபேசி", "மின்னஞ்சல்", "அழைப்பு"],
    },
    faqAnswers: {
      greeting: "வணக்கம்! திட்டம், விலை மற்றும் WebFlair சேவைகள் பற்றி உதவுகிறேன்.",
      crm: "லீட் பைப்லைன், பகுப்பாய்வு மற்றும் பயனர் அனுமதிகளுடன் தனிப்பயன் CRM மற்றும் டாஷ்போர்டுகளை உருவாக்குகிறோம்.",
      ai: "Python தானியங்கி மற்றும் AI பணிச்சூழல்களை உருவாக்குகிறோம். அம்சங்கள் உங்கள் தேவைகளைப் பொறுத்தது.",
      fullstack: "React, Node.js, MongoDB மற்றும் PostgreSQL கொண்டு முழு-அடுக்கு செயலிகளை உருவாக்குகிறோம்.",
      mobile: "Flutter அல்லது React Native மூலம் Android மற்றும் iOS மொபைல் செயலிகளை உருவாக்குகிறோம்.",
      ecommerce: "பொருள் பட்டியல், checkout மற்றும் கட்டண இணைப்புகளுடன் இணைய விற்பனைத் தளங்களை உருவாக்குகிறோம்.",
      price: "விலை திட்டத்தின் அளவு, அம்சங்கள் மற்றும் காலக்கெடுவைப் பொறுத்தது. பட்ஜெட்டைத் தேர்ந்தெடுக்கவும்; மதிப்பீடு தருகிறோம்.",
      timeline: "திட்டத்தின் அளவைப் பொறுத்து காலக்கெடு மாறும். தேவைகளைப் பகிர்ந்தால் நடைமுறை காலக்கெடு தருகிறோம்.",
      contact: "எங்களை +91 96007 32162 அல்லது akwebflairtechnologies@gmail.com மூலம் தொடர்புகொள்ளலாம்.",
      default: "CRM, AI தானியக்கம், இணைய விற்பனை, முழு-அடுக்கு மற்றும் மொபைல் செயலிகள் பற்றி உதவ முடியும். மேலும் விவரிக்கவும்.",
    },
    analysisLabel: "திட்ட மதிப்பீடு", stackLabel: "பரிந்துரைக்கப்பட்ட தொழில்நுட்பம்",
    whatsappOpen: "WebFlair குழுவுடன் WhatsApp திறக்கப்பட்டுள்ளது.",
    quick: ["திட்ட விலை", "CRM மற்றும் டாஷ்போர்டுகள்", "Python AI", "MERN மற்றும் PostgreSQL", "மொபைல் செயலிகள்", "WhatsApp"],
  },
  kn: {
    label: "ಕನ್ನಡ", locale: "kn-IN", assistant: "AI ಸಹಾಯಕ",
    welcome: "ನಮಸ್ಕಾರ! ನಾನು **AK WebFlair AI ಸಹಾಯಕ ಮತ್ತು ಲೀಡ್ ಏಜೆಂಟ್**.\n\nನಮ್ಮ **CRM ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗಳು, Python AI ಏಜೆಂಟ್‌ಗಳು, ಇ-ಕಾಮರ್ಸ್ ಅಥವಾ ಮೊಬೈಲ್ ಅಪ್ಲಿಕೇಶನ್‌ಗಳ** ಬಗ್ಗೆ ಕೇಳಿ.\n\nಪ್ರಾರಂಭಿಸಲು ನಿಮ್ಮ **ಪೂರ್ಣ ಹೆಸರು** ತಿಳಿಸಿ.",
    name: "ನಿಮ್ಮನ್ನು ಭೇಟಿಯಾಗಿ ಸಂತೋಷವಾಯಿತು", nameQuestion: "ನಿಮ್ಮ **ಪೂರ್ಣ ಹೆಸರು** ಏನು?", contact: "ಯೋಜನೆಯ ವಿವರಗಳಿಗಾಗಿ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಲು **ಫೋನ್ ಸಂಖ್ಯೆ ಮತ್ತು ಇಮೇಲ್ ವಿಳಾಸ** ನೀಡಿ:",
    contactDone: "ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಯೋಜನೆಗೆ ಬೇಕಾದ **ಮುಖ್ಯ ಸೇವೆಯನ್ನು** ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ:",
    service: "ಉತ್ತಮ ಆಯ್ಕೆ", budget: "ನಿಮ್ಮ **ಗುರಿ ಬಜೆಟ್ ಮತ್ತು ವಿತರಣಾ ಸಮಯ** ತಿಳಿಸಿ:",
    budgetDone: "ನಿಮ್ಮ **ವೈಶಿಷ್ಟ್ಯಗಳು, ಗುರಿಗಳು ಅಥವಾ ಟಿಪ್ಪಣಿಗಳನ್ನು** ಹಂಚಿಕೊಳ್ಳಿ. ನಂತರ **ಲೀಡ್ ಸಲ್ಲಿಸಿ** ಒತ್ತಿರಿ.",
    send: "ಕಳುಹಿಸಿ", submit: "ಲೀಡ್ ಸಲ್ಲಿಸಿ", placeholder: "ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ...",
    namePlaceholder: "ಪೂರ್ಣ ಹೆಸರನ್ನು ಟೈಪ್ ಮಾಡಿ...", contactPlaceholder: "ಫೋನ್ ಮತ್ತು ಇಮೇಲ್ ನಮೂದಿಸಿ...",
    notesPlaceholder: "ಯೋಜನೆಯ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ...", thinking: "WebFlair AI ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ...",
    voiceHint: "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ. ಮೈಕ್ರೊಫೋನ್‌ನಲ್ಲಿ ಮಾತನಾಡಿ, ಕಳುಹಿಸಲು ಒತ್ತಿರಿ.",
    voiceToggleOn: "ಧ್ವನಿ ಉತ್ತರಗಳನ್ನು ಆನ್ ಮಾಡಿ", voiceToggleOff: "ಧ್ವನಿ ಉತ್ತರಗಳನ್ನು ಆಫ್ ಮಾಡಿ",
    listening: "ಕೇಳುತ್ತಿದೆ… ಮಾತನಾಡಿ, ನಂತರ ಕಳುಹಿಸಿ ಒತ್ತಿರಿ.", voiceDisclosure: "ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ಬ್ರೌಸರ್ ಸೇವೆಯನ್ನು ಬಳಸುತ್ತದೆ ಮತ್ತು ಇಂಟರ್ನೆಟ್ ಬೇಕಾಗಬಹುದು; ಆಫ್‌ಲೈನ್ ಅನುವಾದವಿಲ್ಲ.",
    voiceUnsupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಲಭ್ಯವಿಲ್ಲ. Chrome ಅಥವಾ Edge ಪ್ರಯತ್ನಿಸಿ.",
    success: "ಧನ್ಯವಾದಗಳು", saved: "ನಿಮ್ಮ ವಿಚಾರಣೆಯನ್ನು ನಿರ್ವಾಹಕ ಪುಟದಲ್ಲಿ ಉಳಿಸಲಾಗಿದೆ.",
    saveFailed: "ನಿಮ್ಮ ವಿಚಾರಣೆಯನ್ನು ನಿರ್ವಾಹಕ ಪುಟದಲ್ಲಿ ಉಳಿಸಲಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ನಮ್ಮನ್ನು ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಿ.",
    faqKeywords: {
      greeting: ["ನಮಸ್ಕಾರ", "ಹಲೋ", "ಹಾಯ್"],
      crm: ["crm", "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", "ಲೀಡ್"],
      ai: ["python", "ಎಐ", "ai", "ಏಜೆಂಟ್", "ಆಟೊಮೇಷನ್"],
      fullstack: ["mern", "postgres", "ಡೇಟಾಬೇಸ್", "node", "backend"],
      mobile: ["ಮೊಬೈಲ್", "ಆಪ್", "ಅಪ್ಲಿಕೇಶನ್", "ಆಂಡ್ರಾಯ್ಡ್"],
      ecommerce: ["ಇ-ಕಾಮರ್ಸ್", "ಆನ್‌ಲೈನ್ ಸ್ಟೋರ್", "ಅಂಗಡಿ"],
      price: ["ಬೆಲೆ", "ವೆಚ್ಚ", "ಬಜೆಟ್", "ದರ"],
      timeline: ["ಎಷ್ಟು ದಿನ", "ಸಮಯ", "ಅವಧಿ", "ಡೆಲಿವರಿ"],
      contact: ["ಸಂಪರ್ಕ", "ಫೋನ್", "ಇಮೇಲ್", "ಕರೆ"],
    },
    faqAnswers: {
      greeting: "ನಮಸ್ಕಾರ! ಯೋಜನೆ, ಬೆಲೆ ಮತ್ತು WebFlair ಸೇವೆಗಳ ಬಗ್ಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.",
      crm: "ಲೀಡ್ ಪೈಪ್‌ಲೈನ್, ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಬಳಕೆದಾರ ಅನುಮತಿಗಳೊಂದಿಗೆ CRM ಮತ್ತು ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗಳನ್ನು ನಿರ್ಮಿಸುತ್ತೇವೆ.",
      ai: "Python ಆಟೊಮೇಷನ್ ಮತ್ತು AI ವರ್ಕ್‌ಫ್ಲೋಗಳನ್ನು ನಿರ್ಮಿಸುತ್ತೇವೆ. ವೈಶಿಷ್ಟ್ಯಗಳು ನಿಮ್ಮ ಅಗತ್ಯಗಳನ್ನು ಅವಲಂಬಿಸಿವೆ.",
      fullstack: "React, Node.js, MongoDB ಮತ್ತು PostgreSQL ಬಳಸಿ ಫುಲ್-ಸ್ಟ್ಯಾಕ್ ಅಪ್ಲಿಕೇಶನ್‌ಗಳನ್ನು ನಿರ್ಮಿಸುತ್ತೇವೆ.",
      mobile: "Flutter ಅಥವಾ React Native ಬಳಸಿ Android ಮತ್ತು iOS ಅಪ್ಲಿಕೇಶನ್‌ಗಳನ್ನು ನಿರ್ಮಿಸುತ್ತೇವೆ.",
      ecommerce: "ಉತ್ಪನ್ನ ಕ್ಯಾಟಲಾಗ್, ಚೆಕ್‌ಔಟ್ ಮತ್ತು ಪಾವತಿ ಸೌಲಭ್ಯಗಳಿರುವ ಆನ್‌ಲೈನ್ ಸ್ಟೋರ್‌ಗಳನ್ನು ನಿರ್ಮಿಸುತ್ತೇವೆ.",
      price: "ಬೆಲೆ ಯೋಜನೆಯ ವ್ಯಾಪ್ತಿ, ವೈಶಿಷ್ಟ್ಯಗಳು ಮತ್ತು ಸಮಯವನ್ನು ಅವಲಂಬಿಸಿದೆ. ಬಜೆಟ್ ಆಯ್ಕೆಮಾಡಿ; ಅಂದಾಜು ನೀಡುತ್ತೇವೆ.",
      timeline: "ವಿತರಣಾ ಸಮಯ ಯೋಜನೆಯ ವ್ಯಾಪ್ತಿಯನ್ನು ಅವಲಂಬಿಸಿದೆ. ನಿಮ್ಮ ಅಗತ್ಯಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.",
      contact: "+91 96007 32162 ಅಥವಾ akwebflairtechnologies@gmail.com ಮೂಲಕ ಸಂಪರ್ಕಿಸಿ.",
      default: "CRM, AI ಆಟೊಮೇಷನ್, ಇ-ಕಾಮರ್ಸ್, ಫುಲ್-ಸ್ಟ್ಯಾಕ್ ಮತ್ತು ಮೊಬೈಲ್ ಆ್ಯಪ್‌ಗಳಲ್ಲಿ ಸಹಾಯ ಮಾಡಬಹುದು. ಇನ್ನಷ್ಟು ವಿವರಿಸಿ.",
    },
    analysisLabel: "ಯೋಜನೆಯ ಮೌಲ್ಯಮಾಪನ", stackLabel: "ಶಿಫಾರಸು ತಂತ್ರಜ್ಞಾನ",
    whatsappOpen: "WebFlair ತಂಡದ WhatsApp ತೆರೆಯಲಾಗಿದೆ.",
    quick: ["ಯೋಜನೆಯ ಬೆಲೆ", "CRM ಮತ್ತು ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗಳು", "Python AI", "MERN ಮತ್ತು PostgreSQL", "ಮೊಬೈಲ್ ಅಪ್ಲಿಕೇಶನ್‌ಗಳು", "WhatsApp"],
  },
  te: {
    label: "తెలుగు", locale: "te-IN", assistant: "AI సహాయకుడు",
    welcome: "నమస్కారం! నేను **AK WebFlair AI సహాయకుడు మరియు లీడ్ ఏజెంట్**.\n\nమా **CRM ప్లాట్‌ఫారమ్‌లు, Python AI ఏజెంట్లు, ఈ-కామర్స్ లేదా మొబైల్ యాప్‌ల** గురించి అడగండి.\n\nప్రారంభించడానికి మీ **పూర్తి పేరు** చెప్పండి.",
    name: "మిమ్మల్ని కలవడం సంతోషం", nameQuestion: "మీ **పూర్తి పేరు** ఏమిటి?", contact: "ప్రాజెక్ట్ వివరాల కోసం మిమ్మల్ని సంప్రదించడానికి మీ **ఫోన్ నంబర్ మరియు ఇమెయిల్ చిరునామా** ఇవ్వండి:",
    contactDone: "ధన్యవాదాలు! మీ ప్రాజెక్ట్‌కు అవసరమైన **ప్రధాన సేవను** ఎంచుకోండి లేదా టైప్ చేయండి:",
    service: "మంచి ఎంపిక", budget: "మీ **లక్ష్య బడ్జెట్ మరియు డెలివరీ సమయం** ఏమిటి?",
    budgetDone: "మీ **ఫీచర్లు, లక్ష్యాలు లేదా గమనికలు** ఏమైనా ఉన్నాయా? టైప్ చేసి **లీడ్‌ను సమర్పించండి**.",
    send: "పంపండి", submit: "లీడ్ సమర్పించండి", placeholder: "సందేశాన్ని టైప్ చేయండి...",
    namePlaceholder: "పూర్తి పేరు టైప్ చేయండి...", contactPlaceholder: "ఫోన్ మరియు ఇమెయిల్ నమోదు చేయండి...",
    notesPlaceholder: "ప్రాజెక్ట్ వివరాలు నమోదు చేయండి...", thinking: "WebFlair AI విశ్లేషిస్తోంది...",
    voiceHint: "భాషను ఎంచుకోండి. మైక్రోఫోన్‌లో మాట్లాడి, పంపడానికి నొక్కండి.",
    voiceToggleOn: "వాయిస్ సమాధానాలు ఆన్ చేయండి", voiceToggleOff: "వాయిస్ సమాధానాలు ఆఫ్ చేయండి",
    listening: "వింటోంది… మాట్లాడి, పంపండి నొక్కండి.", voiceDisclosure: "వాయిస్ గుర్తింపు బ్రౌజర్ సేవ ద్వారా పనిచేస్తుంది; ఇంటర్నెట్ అవసరం కావచ్చు. ఆఫ్‌లైన్ అనువాదం లేదు.",
    voiceUnsupported: "ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ అందుబాటులో లేదు. Chrome లేదా Edge ప్రయత్నించండి.",
    success: "ధన్యవాదాలు", saved: "మీ విచారణ అడ్మిన్ పేజీలో సేవ్ చేయబడింది.",
    saveFailed: "మీ విచారణను అడ్మిన్ పేజీలో సేవ్ చేయలేకపోయాం. దయచేసి మమ్మల్ని నేరుగా సంప్రదించండి.",
    faqKeywords: {
      greeting: ["నమస్కారం", "హలో", "హాయ్"],
      crm: ["crm", "డాష్‌బోర్డ్", "లీడ్"],
      ai: ["python", "ఏఐ", "ai", "ఏజెంట్", "ఆటోమేషన్"],
      fullstack: ["mern", "postgres", "డేటాబేస్", "node", "backend"],
      mobile: ["మొబైల్", "యాప్", "అప్లికేషన్", "ఆండ్రాయిడ్"],
      ecommerce: ["ఈ-కామర్స్", "ఆన్‌లైన్ స్టోర్", "షాప్"],
      price: ["ధర", "ఖర్చు", "బడ్జెట్", "కోటేషన్"],
      timeline: ["ఎన్ని రోజులు", "సమయం", "టైమ్‌లైన్", "డెలివరీ"],
      contact: ["సంప్రదించు", "ఫోన్", "ఇమెయిల్", "కాల్"],
    },
    faqAnswers: {
      greeting: "నమస్కారం! ప్రాజెక్ట్, ధరలు మరియు WebFlair సేవల గురించి సహాయం చేస్తాను.",
      crm: "లీడ్ పైప్‌లైన్‌లు, విశ్లేషణలు మరియు యూజర్ అనుమతులతో CRM, డాష్‌బోర్డ్‌లను రూపొందిస్తాము.",
      ai: "Python ఆటోమేషన్ మరియు AI వర్క్‌ఫ్లోలను రూపొందిస్తాము. ఫీచర్లు మీ అవసరాలపై ఆధారపడి ఉంటాయి.",
      fullstack: "React, Node.js, MongoDB మరియు PostgreSQLతో ఫుల్-స్టాక్ అప్లికేషన్‌లను రూపొందిస్తాము.",
      mobile: "Flutter లేదా React Nativeతో Android, iOS యాప్‌లను రూపొందిస్తాము.",
      ecommerce: "ప్రొడక్ట్ కేటలాగ్, చెక్అవుట్, పేమెంట్ ఇంటిగ్రేషన్‌లతో ఆన్‌లైన్ స్టోర్‌లను రూపొందిస్తాము.",
      price: "ధర ప్రాజెక్ట్ పరిధి, ఫీచర్లు, సమయంపై ఆధారపడి ఉంటుంది. బడ్జెట్ ఎంచుకోండి; అంచనా అందిస్తాము.",
      timeline: "డెలివరీ సమయం ప్రాజెక్ట్ పరిధిపై ఆధారపడి ఉంటుంది. మీ అవసరాలు పంచుకోండి.",
      contact: "+91 96007 32162 లేదా akwebflairtechnologies@gmail.com ద్వారా సంప్రదించండి.",
      default: "CRM, AI ఆటోమేషన్, ఈ-కామర్స్, ఫుల్-స్టాక్, మొబైల్ యాప్‌లలో సహాయం చేస్తాను. మరిన్ని వివరాలు చెప్పండి.",
    },
    analysisLabel: "ప్రాజెక్ట్ విశ్లేషణ", stackLabel: "సూచించిన సాంకేతికత",
    whatsappOpen: "WebFlair బృందం కోసం WhatsApp తెరిచాం.",
    quick: ["ప్రాజెక్ట్ ధర", "CRM & డాష్‌బోర్డ్‌లు", "Python AI", "MERN & PostgreSQL", "మొబైల్ యాప్‌లు", "WhatsApp"],
  },
  ml: {
    label: "മലയാളം", locale: "ml-IN", assistant: "AI സഹായി",
    welcome: "നമസ്കാരം! ഞാൻ **AK WebFlair AI സഹായിയും ലീഡ് ഏജന്റുമാണ്**.\n\nഞങ്ങളുടെ **CRM പ്ലാറ്റ്‌ഫോമുകൾ, Python AI ഏജന്റുകൾ, ഇ-കൊമേഴ്‌സ്, മൊബൈൽ ആപ്പുകൾ** എന്നിവയെക്കുറിച്ച് ചോദിക്കാം.\n\nതുടങ്ങാൻ നിങ്ങളുടെ **പൂർണ്ണ പേര്** പറയൂ.",
    name: "നിങ്ങളെ പരിചയപ്പെട്ടതിൽ സന്തോഷം", nameQuestion: "നിങ്ങളുടെ **പൂർണ്ണ പേര്** എന്താണ്?", contact: "പദ്ധതി വിവരങ്ങൾക്കായി നിങ്ങളെ ബന്ധപ്പെടാൻ **ഫോൺ നമ്പറും ഇമെയിൽ വിലാസവും** നൽകുക:",
    contactDone: "നന്ദി! നിങ്ങളുടെ പദ്ധതിക്ക് ആവശ്യമായ **പ്രധാന സേവനം** തിരഞ്ഞെടുക്കുകയോ ടൈപ്പ് ചെയ്യുകയോ ചെയ്യൂ:",
    service: "നല്ല തിരഞ്ഞെടുപ്പ്", budget: "നിങ്ങളുടെ **ബജറ്റും ഡെലിവറി സമയപരിധിയും** എന്താണ്?",
    budgetDone: "നിങ്ങളുടെ **സവിശേഷതകൾ, ലക്ഷ്യങ്ങൾ, കുറിപ്പുകൾ** എന്നിവ പങ്കിടൂ. ശേഷം **ലീഡ് സമർപ്പിക്കുക** അമർത്തൂ.",
    send: "അയയ്ക്കുക", submit: "ലീഡ് സമർപ്പിക്കുക", placeholder: "സന്ദേശം ടൈപ്പ് ചെയ്യുക...",
    namePlaceholder: "പൂർണ്ണ പേര് ടൈപ്പ് ചെയ്യുക...", contactPlaceholder: "ഫോണും ഇമെയിലും നൽകുക...",
    notesPlaceholder: "പദ്ധതി വിവരങ്ങൾ നൽകുക...", thinking: "WebFlair AI വിശകലനം ചെയ്യുന്നു...",
    voiceHint: "ഭാഷ തിരഞ്ഞെടുക്കുക. മൈക്രോഫോണിൽ സംസാരിച്ച് അയയ്ക്കുക അമർത്തുക.",
    voiceToggleOn: "ശബ്ദ മറുപടികൾ ഓൺ ചെയ്യുക", voiceToggleOff: "ശബ്ദ മറുപടികൾ ഓഫ് ചെയ്യുക",
    listening: "കേൾക്കുന്നു… സംസാരിച്ചു അയയ്ക്കുക അമർത്തുക.", voiceDisclosure: "ശബ്ദ തിരിച്ചറിയൽ ബ്രൗസർ സേവനമാണ്; ഇന്റർനെറ്റ് വേണ്ടിവന്നേക്കാം. ഓഫ്‌ലൈൻ വിവർത്തനം ലഭ്യമല്ല.",
    voiceUnsupported: "ഈ ബ്രൗസറിൽ ശബ്ദ ഇൻപുട്ട് ലഭ്യമല്ല. Chrome അല്ലെങ്കിൽ Edge പരീക്ഷിക്കുക.",
    success: "നന്ദി", saved: "നിങ്ങളുടെ അന്വേഷണം അഡ്മിൻ പേജിൽ സംരക്ഷിച്ചു.",
    saveFailed: "നിങ്ങളുടെ അന്വേഷണം അഡ്മിൻ പേജിൽ സംരക്ഷിക്കാനായില്ല. ദയവായി ഞങ്ങളെ നേരിട്ട് ബന്ധപ്പെടുക.",
    faqKeywords: {
      greeting: ["നമസ്കാരം", "ഹലോ", "ഹായ്"],
      crm: ["crm", "ഡാഷ്ബോർഡ്", "ലീഡ്"],
      ai: ["python", "എഐ", "ai", "ഏജന്റ്", "ഓട്ടോമേഷൻ"],
      fullstack: ["mern", "postgres", "ഡാറ്റാബേസ്", "node", "backend"],
      mobile: ["മൊബൈൽ", "ആപ്പ്", "ആൻഡ്രോയിഡ്"],
      ecommerce: ["ഇ-കൊമേഴ്‌സ്", "ഓൺലൈൻ സ്റ്റോർ", "കട"],
      price: ["വില", "ചെലവ്", "ബജറ്റ്", "നിരക്ക്"],
      timeline: ["എത്ര ദിവസം", "സമയം", "കാലപരിധി", "ഡെലിവറി"],
      contact: ["ബന്ധപ്പെടുക", "ഫോൺ", "ഇമെയിൽ", "വിളി"],
    },
    faqAnswers: {
      greeting: "നമസ്കാരം! പദ്ധതി, വില, WebFlair സേവനങ്ങൾ എന്നിവയിൽ സഹായിക്കാം.",
      crm: "ലീഡ് പൈപ്പ്‌ലൈനുകൾ, അനലിറ്റിക്സ്, ഉപയോക്തൃ അനുമതികൾ എന്നിവയുള്ള CRM, ഡാഷ്ബോർഡുകൾ നിർമ്മിക്കുന്നു.",
      ai: "Python ഓട്ടോമേഷനും AI വർക്ക്ഫ്ലോകളും നിർമ്മിക്കുന്നു. സവിശേഷതകൾ നിങ്ങളുടെ ആവശ്യങ്ങളെ ആശ്രയിക്കും.",
      fullstack: "React, Node.js, MongoDB, PostgreSQL എന്നിവ ഉപയോഗിച്ച് ഫുൾ-സ്റ്റാക്ക് ആപ്പുകൾ നിർമ്മിക്കുന്നു.",
      mobile: "Flutter അല്ലെങ്കിൽ React Native ഉപയോഗിച്ച് Android, iOS ആപ്പുകൾ നിർമ്മിക്കുന്നു.",
      ecommerce: "ഉൽപ്പന്ന പട്ടിക, checkout, പേയ്‌മെന്റ് സൗകര്യങ്ങളുള്ള ഓൺലൈൻ സ്റ്റോറുകൾ നിർമ്മിക്കുന്നു.",
      price: "വില പദ്ധതി പരിധി, സവിശേഷതകൾ, സമയപരിധി എന്നിവയെ ആശ്രയിക്കും. ബജറ്റ് തിരഞ്ഞെടുക്കൂ; കണക്ക് നൽകാം.",
      timeline: "ഡെലിവറി സമയം പദ്ധതിയുടെ പരിധിയെ ആശ്രയിക്കുന്നു. ആവശ്യങ്ങൾ പങ്കിടൂ.",
      contact: "+91 96007 32162 അല്ലെങ്കിൽ akwebflairtechnologies@gmail.com വഴി ബന്ധപ്പെടാം.",
      default: "CRM, AI ഓട്ടോമേഷൻ, ഇ-കൊമേഴ്‌സ്, ഫുൾ-സ്റ്റാക്ക്, മൊബൈൽ ആപ്പുകൾ എന്നിവയിൽ സഹായിക്കാം. കൂടുതൽ വിവരങ്ങൾ പങ്കിടൂ.",
    },
    analysisLabel: "പദ്ധതി വിലയിരുത്തൽ", stackLabel: "ശുപാർശ ചെയ്യുന്ന സാങ്കേതികവിദ്യ",
    whatsappOpen: "WebFlair ടീമിനായുള്ള WhatsApp തുറന്നിട്ടുണ്ട്.",
    quick: ["പദ്ധതി വില", "CRM & ഡാഷ്ബോർഡുകൾ", "Python AI", "MERN & PostgreSQL", "മൊബൈൽ ആപ്പുകൾ", "WhatsApp"],
  },
  hi: {
    label: "हिन्दी", locale: "hi-IN", assistant: "AI सहायक",
    welcome: "नमस्ते! मैं **AK WebFlair AI सहायक और लीड एजेंट** हूँ।\n\nहमारे **CRM प्लेटफ़ॉर्म, Python AI एजेंट, ई-कॉमर्स या मोबाइल ऐप** के बारे में पूछें।\n\nशुरू करने के लिए अपना **पूरा नाम** बताइए।",
    name: "आपसे मिलकर खुशी हुई", nameQuestion: "आपका **पूरा नाम** क्या है?", contact: "प्रोजेक्ट की जानकारी के लिए आपसे संपर्क करने हेतु अपना **फ़ोन नंबर और ईमेल पता** दें:",
    contactDone: "धन्यवाद! अपने प्रोजेक्ट के लिए **मुख्य सेवा** चुनें या टाइप करें:",
    service: "अच्छा चुनाव", budget: "आपका **बजट और डिलीवरी की समय-सीमा** क्या है?",
    budgetDone: "अपनी **सुविधाएँ, लक्ष्य या नोट्स** साझा करें और **लीड सबमिट करें** दबाएँ।",
    send: "भेजें", submit: "लीड सबमिट करें", placeholder: "संदेश लिखें...",
    namePlaceholder: "अपना पूरा नाम लिखें...", contactPlaceholder: "फ़ोन और ईमेल दर्ज करें...",
    notesPlaceholder: "प्रोजेक्ट का विवरण लिखें...", thinking: "WebFlair AI विश्लेषण कर रहा है...",
    voiceHint: "भाषा चुनें। माइक्रोफ़ोन में बोलें और भेजने के लिए दबाएँ।",
    voiceToggleOn: "बोले गए जवाब चालू करें", voiceToggleOff: "बोले गए जवाब बंद करें",
    listening: "सुन रहा है… बोलें, फिर भेजें दबाएँ।", voiceDisclosure: "वॉइस पहचान ब्राउज़र सेवा से होती है और इंटरनेट चाहिए हो सकता है; ऑफ़लाइन अनुवाद नहीं है।",
    voiceUnsupported: "इस ब्राउज़र में वॉइस इनपुट उपलब्ध नहीं है। Chrome या Edge आज़माएँ।",
    success: "धन्यवाद", saved: "आपकी पूछताछ एडमिन पेज पर सेव हो गई है।",
    saveFailed: "आपकी पूछताछ एडमिन पेज पर सेव नहीं हो सकी। कृपया हमसे सीधे संपर्क करें।",
    faqKeywords: {
      greeting: ["नमस्ते", "नमस्कार", "हैलो", "हाय"],
      crm: ["crm", "डैशबोर्ड", "लीड", "ग्राहक प्रबंधन"],
      ai: ["python", "एआई", "ai", "एजेंट", "ऑटोमेशन"],
      fullstack: ["mern", "postgres", "डेटाबेस", "node", "बैकएंड"],
      mobile: ["मोबाइल", "ऐप", "एप्लिकेशन", "एंड्रॉइड"],
      ecommerce: ["ई-कॉमर्स", "ऑनलाइन स्टोर", "दुकान"],
      price: ["कीमत", "मूल्य", "खर्च", "बजट", "कोटेशन"],
      timeline: ["कितने दिन", "समय", "अवधि", "डिलीवरी"],
      contact: ["संपर्क", "फ़ोन", "ईमेल", "कॉल"],
    },
    faqAnswers: {
      greeting: "नमस्ते! मैं प्रोजेक्ट, कीमत और WebFlair सेवाओं के बारे में मदद कर सकता हूँ।",
      crm: "हम लीड पाइपलाइन, एनालिटिक्स और उपयोगकर्ता अनुमतियों वाले कस्टम CRM और डैशबोर्ड बनाते हैं।",
      ai: "हम Python ऑटोमेशन और AI वर्कफ़्लो बनाते हैं। सुविधाएँ आपकी ज़रूरतों पर निर्भर करती हैं।",
      fullstack: "हम React, Node.js, MongoDB और PostgreSQL से फुल-स्टैक ऐप बनाते हैं।",
      mobile: "हम Flutter या React Native से Android और iOS ऐप बनाते हैं।",
      ecommerce: "हम उत्पाद सूची, चेकआउट और भुगतान सुविधा वाले ऑनलाइन स्टोर बनाते हैं।",
      price: "कीमत प्रोजेक्ट के दायरे, सुविधाओं और समय पर निर्भर है। बजट चुनें; हम अनुमान तैयार करेंगे।",
      timeline: "डिलीवरी का समय प्रोजेक्ट के दायरे पर निर्भर है। अपनी ज़रूरतें साझा करें।",
      contact: "+91 96007 32162 या akwebflairtechnologies@gmail.com पर संपर्क करें।",
      default: "मैं CRM, AI ऑटोमेशन, ई-कॉमर्स, फुल-स्टैक और मोबाइल ऐप के बारे में मदद कर सकता हूँ। कृपया और जानकारी दें।",
    },
    analysisLabel: "प्रोजेक्ट आकलन", stackLabel: "सुझाई गई तकनीक",
    whatsappOpen: "WebFlair टीम के लिए WhatsApp खोल दिया है।",
    quick: ["प्रोजेक्ट की कीमत", "CRM और डैशबोर्ड", "Python AI", "MERN और PostgreSQL", "मोबाइल ऐप", "WhatsApp"],
  },
};

const localizedChoices = {
  ta: {
    capabilities: ["CRM தளங்கள் மற்றும் டாஷ்போர்டுகள்", "இணைய விற்பனைத் தளங்கள்", "Python AI தானியங்கி முகவர்கள்", "MERN மற்றும் PostgreSQL", "Flutter மற்றும் React Native செயலிகள்", "SEO மற்றும் இணைய வேக மேம்பாடு"],
    budgets: ["₹50,000-க்கு கீழ் (1-2 வாரங்கள்)", "₹50,000 - ₹1.5 லட்சம் (2-4 வாரங்கள்)", "₹1.5 லட்சம் - ₹3+ லட்சம் (1-2 மாதங்கள்)", "தனிப்பயன் நிறுவனத் திட்டம்"],
  },
  kn: {
    capabilities: ["CRM ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗಳು ಮತ್ತು ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗಳು", "ಇ-ಕಾಮರ್ಸ್ ಸ್ಟೋರ್‌ಗಳು", "Python AI ಆಟೊಮೇಷನ್ ಏಜೆಂಟ್‌ಗಳು", "MERN ಮತ್ತು PostgreSQL", "Flutter ಮತ್ತು React Native ಅಪ್ಲಿಕೇಶನ್‌ಗಳು", "SEO ಮತ್ತು ವೆಬ್ ವೇಗ ಸುಧಾರಣೆ"],
    budgets: ["₹50,000 ಕ್ಕಿಂತ ಕಡಿಮೆ (1-2 ವಾರಗಳು)", "₹50,000 - ₹1.5 ಲಕ್ಷ (2-4 ವಾರಗಳು)", "₹1.5 - ₹3+ ಲಕ್ಷ (1-2 ತಿಂಗಳು)", "ಕಸ್ಟಮ್ ಎಂಟರ್‌ಪ್ರೈಸ್ ವ್ಯಾಪ್ತಿ"],
  },
  te: {
    capabilities: ["CRM ప్లాట్‌ఫారమ్‌లు & డాష్‌బోర్డ్‌లు", "ఈ-కామర్స్ స్టోర్‌లు", "Python AI ఆటోమేషన్ ఏజెంట్లు", "MERN & PostgreSQL", "Flutter & React Native యాప్‌లు", "SEO & వెబ్ వేగ మెరుగుదల"],
    budgets: ["₹50,000 లోపు (1-2 వారాలు)", "₹50,000 - ₹1.5 లక్షలు (2-4 వారాలు)", "₹1.5 - ₹3+ లక్షలు (1-2 నెలలు)", "కస్టమ్ ఎంటర్‌ప్రైజ్ పరిధి"],
  },
  ml: {
    capabilities: ["CRM പ്ലാറ്റ്‌ഫോമുകളും ഡാഷ്ബോർഡുകളും", "ഇ-കൊമേഴ്‌സ് സ്റ്റോറുകൾ", "Python AI ഓട്ടോമേഷൻ ഏജന്റുകൾ", "MERN & PostgreSQL", "Flutter & React Native ആപ്പുകൾ", "SEO, വെബ് വേഗ മെച്ചപ്പെടുത്തൽ"],
    budgets: ["₹50,000-ൽ താഴെ (1-2 ആഴ്ച)", "₹50,000 - ₹1.5 ലക്ഷം (2-4 ആഴ്ച)", "₹1.5 - ₹3+ ലക്ഷം (1-2 മാസം)", "കസ്റ്റം എന്റർപ്രൈസ് പരിധി"],
  },
  hi: {
    capabilities: ["CRM प्लेटफ़ॉर्म और डैशबोर्ड", "ई-कॉमर्स स्टोर", "Python AI ऑटोमेशन एजेंट", "MERN और PostgreSQL", "Flutter और React Native ऐप", "SEO और वेब गति सुधार"],
    budgets: ["₹50,000 से कम (1-2 सप्ताह)", "₹50,000 - ₹1.5 लाख (2-4 सप्ताह)", "₹1.5 - ₹3+ लाख (1-2 महीने)", "कस्टम एंटरप्राइज़ स्कोप"],
  },
};

const voiceMessages = {
  en: {
    permission: "Microphone permission is blocked. Allow it in your browser settings.",
    network: "Browser speech recognition needs an internet connection and may be unavailable. Try again online or type your message.",
    tryTyping: "Try typing your message.",
    noMatch: "Speech was not recognized. Speak clearly, then try again.",
    playback: "Speech playback failed. Check that your device has a voice installed for this language.",
    noSpeechVoice: "No English voice is installed on this device. Install an English speech voice in system settings.",
  },
  ta: {
    permission: "மைக்ரோஃபோன் அனுமதி தடுக்கப்பட்டுள்ளது. உலாவி அமைப்புகளில் அனுமதிக்கவும்.",
    network: "உலாவி குரல் அடையாளத்திற்கு இணையம் தேவைப்படலாம். மீண்டும் முயற்சிக்கவும் அல்லது தட்டச்சு செய்யவும்.",
    tryTyping: "தட்டச்சு செய்து அனுப்பவும்.",
    noMatch: "குரலை அடையாளம் காண முடியவில்லை. தெளிவாகப் பேசி மீண்டும் முயற்சிக்கவும்.",
    playback: "குரல் ஒலிக்கவில்லை. இந்த மொழிக்கான குரல் உங்கள் சாதனத்தில் உள்ளதா எனச் சரிபார்க்கவும்.",
    noSpeechVoice: "தமிழ் குரல் நிறுவப்படவில்லை. சாதன மொழி அமைப்புகளில் தமிழ் பேச்சுக் குரலை நிறுவவும்.",
  },
  kn: {
    permission: "ಮೈಕ್ರೊಫೋನ್ ಅನುಮತಿ ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ. ಬ್ರೌಸರ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳಲ್ಲಿ ಅನುಮತಿಸಿ.",
    network: "ಬ್ರೌಸರ್ ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆಗೆ ಇಂಟರ್ನೆಟ್ ಬೇಕಾಗಬಹುದು. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ.",
    tryTyping: "ಟೈಪ್ ಮಾಡಿ ಕಳುಹಿಸಿ.",
    noMatch: "ಮಾತನ್ನು ಗುರುತಿಸಲಾಗಲಿಲ್ಲ. ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    playback: "ಧ್ವನಿ ಪ್ಲೇ ಆಗಲಿಲ್ಲ. ಈ ಭಾಷೆಯ ಧ್ವನಿ ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ಇದೆಯೇ ಪರಿಶೀಲಿಸಿ.",
    noSpeechVoice: "ಕನ್ನಡ ಧ್ವನಿ ಸ್ಥಾಪನೆಯಾಗಿಲ್ಲ. ಸಾಧನದ ಭಾಷಾ ಸೆಟ್ಟಿಂಗ್‌ಗಳಲ್ಲಿ ಕನ್ನಡ ಧ್ವನಿಯನ್ನು ಸ್ಥಾಪಿಸಿ.",
  },
  te: {
    permission: "మైక్రోఫోన్ అనుమతి నిరోధించబడింది. బ్రౌజర్ సెట్టింగ్‌లలో అనుమతించండి.",
    network: "బ్రౌజర్ వాయిస్ గుర్తింపుకు ఇంటర్నెట్ అవసరం కావచ్చు. మళ్లీ ప్రయత్నించండి లేదా టైప్ చేయండి.",
    tryTyping: "టైప్ చేసి పంపండి.",
    noMatch: "మాట గుర్తించబడలేదు. స్పష్టంగా మాట్లాడి మళ్లీ ప్రయత్నించండి.",
    playback: "వాయిస్ ప్లేబ్యాక్ విఫలమైంది. ఈ భాష వాయిస్ మీ పరికరంలో ఉందో చూడండి.",
    noSpeechVoice: "తెలుగు వాయిస్ ఇన్‌స్టాల్ కాలేదు. పరికర భాషా సెట్టింగ్‌లలో తెలుగు స్పీచ్ వాయిస్‌ను ఇన్‌స్టాల్ చేయండి.",
  },
  ml: {
    permission: "മൈക്രോഫോൺ അനുമതി തടഞ്ഞിരിക്കുന്നു. ബ്രൗസർ ക്രമീകരണങ്ങളിൽ അനുവദിക്കുക.",
    network: "ബ്രൗസർ ശബ്ദ തിരിച്ചറിയലിന് ഇന്റർനെറ്റ് ആവശ്യമായേക്കാം. വീണ്ടും ശ്രമിക്കുക അല്ലെങ്കിൽ ടൈപ്പ് ചെയ്യുക.",
    tryTyping: "ടൈപ്പ് ചെയ്ത് അയയ്ക്കുക.",
    noMatch: "സംസാരം തിരിച്ചറിയാനായില്ല. വ്യക്തമായി സംസാരിച്ചു വീണ്ടും ശ്രമിക്കുക.",
    playback: "ശബ്ദം പ്ലേ ചെയ്തില്ല. ഈ ഭാഷയുടെ ശബ്ദം ഉപകരണത്തിൽ ഉണ്ടെന്ന് ഉറപ്പാക്കുക.",
    noSpeechVoice: "മലയാളം ശബ്ദം ഇൻസ്റ്റാൾ ചെയ്തിട്ടില്ല. ഉപകരണ ഭാഷാ ക്രമീകരണങ്ങളിൽ മലയാളം ശബ്ദം ഇൻസ്റ്റാൾ ചെയ്യുക.",
  },
  hi: {
    permission: "माइक्रोफ़ोन अनुमति बंद है। ब्राउज़र सेटिंग में अनुमति दें।",
    network: "ब्राउज़र वॉइस पहचान के लिए इंटरनेट चाहिए हो सकता है। फिर कोशिश करें या टाइप करें।",
    tryTyping: "टाइप करके भेजें।",
    noMatch: "आवाज़ पहचानी नहीं गई। साफ़ बोलकर फिर कोशिश करें।",
    playback: "आवाज़ नहीं चल सकी। जाँचें कि इस भाषा की आवाज़ आपके डिवाइस में उपलब्ध है।",
    noSpeechVoice: "हिन्दी आवाज़ इंस्टॉल नहीं है। डिवाइस की भाषा सेटिंग में हिन्दी स्पीच वॉइस इंस्टॉल करें।",
  },
};

const sharedQuestionKeywords = {
  greeting: ["hello", "hi", "hey", "namaste", "vanakkam", "namaskara", "namaskaram"],
  crm: ["crm", "dashboard", "lead", "pipeline"],
  ai: ["python", " ai ", "agent", "automation", "chatbot"],
  fullstack: ["mern", "postgres", "database", "node", "backend"],
  mobile: ["mobile", "flutter", "react native", "android", "ios", "app"],
  ecommerce: ["ecommerce", "e-commerce", "online store", "shop"],
  price: ["price", "cost", "budget", "quote", "estimate", "rate"],
  timeline: ["timeline", "how long", "duration", "delivery time"],
  contact: ["contact", "phone", "email", "call", "talk", "whatsapp"],
};

const quickTopics = ["price", "crm", "ai", "fullstack", "mobile", "contact"];

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
  const [languageCode, setLanguageCode] = useState(() => localStorage.getItem("ak_chat_language") || "en");
  const [isListening, setIsListening] = useState(false);
  const [voiceRepliesOn, setVoiceRepliesOn] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [voiceError, setVoiceError] = useState("");
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
  const recognitionRef = useRef(null);
  const language = chatLanguages[languageCode] || chatLanguages.en;
  const capabilityLabels = localizedChoices[languageCode]?.capabilities || capabilityOptions;
  const budgetLabels = localizedChoices[languageCode]?.budgets || budgetOptions;
  const voiceText = voiceMessages[languageCode] || voiceMessages.en;

  useEffect(() => () => {
    recognitionRef.current?.abort();
    window.speechSynthesis?.cancel();
  }, []);

  useEffect(() => {
    if (step === 1 && messages.length === 1) {
      setMessages([{
        id: "step-1",
        role: "agent",
        text: language.welcome,
        step: 1,
      }]);
    }
  }, [language.welcome, messages.length, step]);

  const changeLanguage = (code) => {
    setLanguageCode(code);
    localStorage.setItem("ak_chat_language", code);
    setVoiceError("");
    recognitionRef.current?.abort();
    setIsListening(false);
    setInterimTranscript("");
  };

  const startVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceError(language.voiceUnsupported);
      return;
    }

    setVoiceError("");
    recognitionRef.current?.abort();
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = language.locale;
    recognition.interimResults = true;
    recognition.continuous = false;
    setInterimTranscript("");
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      let finalTranscript = "";
      let partialTranscript = "";
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const transcript = event.results[index][0].transcript;
        if (event.results[index].isFinal) finalTranscript += transcript;
        else partialTranscript += transcript;
      }
      if (partialTranscript) setInterimTranscript(partialTranscript);
      if (finalTranscript.trim()) {
        setInput((current) => `${current}${current ? " " : ""}${finalTranscript.trim()}`);
        setInterimTranscript("");
        setIsListening(false);
      }
    };
    recognition.onerror = (event) => {
      setIsListening(false);
      if (event.error !== "aborted") {
        setVoiceError(event.error === "not-allowed"
          ? voiceText.permission
          : event.error === "network"
            ? voiceText.network
            : `Voice input failed (${event.error}). ${voiceText.tryTyping}`);
      }
    };
    recognition.onnomatch = () => {
      setVoiceError(voiceText.noMatch);
    };
    recognition.onend = () => setIsListening(false);
    try {
      recognition.start();
    } catch {
      setIsListening(false);
      setVoiceError("Could not start microphone. Check browser microphone permissions.");
    }
  };

  const speakMessage = (text) => {
    if (!("speechSynthesis" in window) || typeof window.SpeechSynthesisUtterance === "undefined") {
      setVoiceError("Speech playback is not available in this browser.");
      return;
    }
    const utterance = new window.SpeechSynthesisUtterance(text.replace(/\*\*/g, ""));
    utterance.lang = language.locale;
    const availableVoices = window.speechSynthesis.getVoices();
    const voice = availableVoices.find(
      (candidate) => candidate.lang.toLowerCase() === language.locale.toLowerCase()
        || candidate.lang.toLowerCase().startsWith(`${language.locale.split("-")[0].toLowerCase()}-`)
    );
    if (!voice) {
      setVoiceError(voiceText.noSpeechVoice);
      return;
    }
    utterance.voice = voice;
    utterance.onerror = () => setVoiceError(voiceText.playback);
    setVoiceError("");
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const toggleVoiceReplies = () => {
    const enabled = !voiceRepliesOn;
    setVoiceRepliesOn(enabled);
    if (enabled) {
      const lastAgentMessage = [...messages].reverse().find((message) => message.role === "agent");
      if (lastAgentMessage) speakMessage(lastAgentMessage.text);
    } else {
      window.speechSynthesis?.cancel();
    }
  };

  const getLocalizedQuestionTopic = (question) => {
    const normalize = (value) => value.toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
    const normalizedQuestion = ` ${normalize(question)} `;
    const topics = new Set([
      ...Object.keys(sharedQuestionKeywords),
      ...Object.keys(language.faqKeywords),
    ]);

    return [...topics].find((topic) => {
      const keywords = [
        ...(sharedQuestionKeywords[topic] || []),
        ...(language.faqKeywords[topic] || []),
      ];
      return keywords.some((keyword) => {
        const normalizedKeyword = normalize(keyword);
        return normalizedKeyword && normalizedQuestion.includes(` ${normalizedKeyword} `);
      });
    });
  };

  const answerLocalizedQuestion = (question) =>
    language.faqAnswers[getLocalizedQuestionTopic(question)] || language.faqAnswers.default;

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

    setTimeout(async () => {
      let nextStepMsgs = [...updatedMessages];

      // Check if user asked a general knowledge question
      const isGeneralQuestion = Boolean(getLocalizedQuestionTopic(val));

      if (isGeneralQuestion && step === 1 && !leadData.name) {
        // AI Answer to question
        const replyText = answerLocalizedQuestion(val);
        nextStepMsgs.push({
          id: `agent-reply-${Date.now()}`,
          role: "agent",
          text: `${replyText}\n\n${language.nameQuestion}`,
          step: 1,
        });
      } else if (step === 1) {
        // Step 1: Client Name
        const clientName = val || "Client";
        setLeadData((prev) => ({ ...prev, name: clientName }));
        nextStepMsgs.push({
          id: `agent-step-2`,
          role: "agent",
          text: `${language.name}, **${clientName}**! ${language.contact}`,
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
          text: language.contactDone,
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
          text: `${language.service} (**${selectedService}**)! ${language.budget}`,
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
          text: language.budgetDone,
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
        let leadSaveError = "";
        try {
          const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";
          const response = await fetch(`${backendUrl}/api/leads`, {
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
              source: "Website Chatbot",
              language: language.label,
            }),
          });
          const result = await response.json();
          if (!response.ok || !result.success) {
            throw new Error(result.message || "The server rejected the lead.");
          }
        } catch (error) {
          console.error("Failed to save chatbot lead:", error);
          leadSaveError = ` ${language.saveFailed}`;
        }

        // Direct WhatsApp Launch
        window.open(whatsappUrl, "_blank");

        nextStepMsgs.push({
          id: `agent-step-complete`,
          role: "agent",
          text: `**${language.success}, ${currentLead.name || "Client"}!**\n\n${leadSaveError || language.saved}\n\n**${language.analysisLabel}:** ${mindset.intentLevel}\n**${language.stackLabel}:** ${mindset.techStack}\n\n${language.whatsappOpen}`,
          isSuccess: true,
          whatsappUrl: whatsappUrl,
        });

        setStep(6);
      }

      setMessages(nextStepMsgs);
      setIsThinking(false);
      if (voiceRepliesOn) {
        const lastAgentMessage = [...nextStepMsgs].reverse().find((message) => message.role === "agent");
        if (lastAgentMessage) speakMessage(lastAgentMessage.text);
      }
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
        text: language.welcome,
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
                <label className="sr-only" htmlFor="webflair-chat-language">Choose chat language</label>
                <select
                  id="webflair-chat-language"
                  value={languageCode}
                  onChange={(event) => changeLanguage(event.target.value)}
                  aria-label="Choose chat language"
                  className="max-w-[100px] rounded-lg border border-white/30 bg-[#0A4FE0] px-2 py-2 text-[11px] font-bold text-white outline-none focus:ring-2 focus:ring-white"
                >
                  {Object.entries(chatLanguages).map(([code, option]) => (
                    <option key={code} value={code} className="bg-white text-slate-900">{option.label}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={toggleVoiceReplies}
                  aria-label={voiceRepliesOn ? language.voiceToggleOff : language.voiceToggleOn}
                  aria-pressed={voiceRepliesOn}
                  title={voiceRepliesOn ? language.voiceToggleOff : language.voiceToggleOn}
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                    voiceRepliesOn ? "bg-white text-blue-700" : "bg-white/20 text-white hover:bg-white/35"
                  }`}
                >
                  <Volume2 size={15} />
                </button>
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
                      {msg.role === "agent" && (
                        <button
                          type="button"
                          onClick={() => speakMessage(msg.text)}
                          title={`Play message in ${language.label}`}
                          aria-label={`Play message in ${language.label}`}
                          className="mt-1 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold text-[#0A4FE0] hover:bg-[#EFF6FF]"
                        >
                          <Volume2 size={12} />
                          {language.label}
                        </button>
                      )}

                      {/* STEP 3 CAPABILITY SELECTION PILLS */}
                      {msg.showCapabilityOptions && step === 3 && (
                        <div className="mt-3 space-y-1.5">
                          {capabilityOptions.map((cap, cIdx) => (
                            <button
                              key={cIdx}
                              onClick={() => handleSend(cap)}
                              className="w-full text-left px-3 py-2 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] text-[#0A4FE0] border border-[#CBD5E1] hover:border-[#0A4FE0] text-[11px] font-bold transition-all cursor-pointer flex items-center justify-between"
                            >
                              <span>{capabilityLabels[cIdx]}</span>
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
                              <span>{budgetLabels[bIdx]}</span>
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
                    <span>{language.thinking}</span>
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
                    onClick={() => {
                      const localizedKeyword = language.faqKeywords[quickTopics[idx]]?.[0]
                        || sharedQuestionKeywords[quickTopics[idx]]?.[0]
                        || starter.query;
                      handleSend(localizedKeyword);
                    }}
                    className="flex-shrink-0 px-3 py-1.5 rounded-full bg-[#F8FAFC] hover:bg-[#EFF6FF] text-[#0A4FE0] border border-[#E2E8F0] hover:border-[#BFDBFE] text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#0A4FE0] text-white flex items-center justify-center flex-shrink-0">
                      <SIcon size={10} className="text-white" />
                    </span>
                    <span>{language.quick[idx] || starter.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-[#F1F5F9] bg-white px-3 pt-2 text-[10px] text-slate-500">
              {voiceError ? (
                <p role="alert" className="font-semibold text-rose-600">{voiceError}</p>
              ) : (
                <>
                  <p className="font-medium">{isListening ? language.listening : language.voiceHint}</p>
                  {interimTranscript && <p className="mt-0.5 text-blue-700">{interimTranscript}</p>}
                  <p className="mt-0.5 text-[9px]">{language.voiceDisclosure}</p>
                </>
              )}
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
                    ? language.namePlaceholder
                    : step === 2
                    ? language.contactPlaceholder
                    : step === 5
                    ? language.notesPlaceholder
                    : language.placeholder
                }
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#0A4FE0] focus:bg-white outline-none text-xs text-[#0F172A] font-medium placeholder-[#94A3B8]"
              />
              <button
                type="button"
                onClick={isListening ? () => recognitionRef.current?.stop() : startVoiceInput}
                title={isListening ? "Stop voice input" : "Speak your message"}
                aria-label={isListening ? "Stop voice input" : "Speak your message"}
                className={`h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center transition-colors ${
                  isListening ? "animate-pulse bg-rose-600 text-white" : "bg-[#EFF6FF] text-[#0A4FE0] hover:bg-[#DBEAFE]"
                }`}
              >
                <Mic size={17} />
              </button>
              <button
                type="submit"
                disabled={!input.trim() && step !== 3 && step !== 4 && step !== 5}
                className="px-4 py-2.5 rounded-xl bg-[#0A4FE0] hover:bg-[#0639A8] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer flex-shrink-0 disabled:opacity-40"
              >
                <span>{step === 5 ? language.submit : language.send}</span>
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
