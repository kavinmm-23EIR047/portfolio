import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  UserCheck,
  Phone,
  Mail,
  Briefcase,
  Search,
  Trash2,
  Edit,
  Plus,
  ExternalLink,
  LogOut,
  Sparkles,
  BrainCircuit,
  Layers,
  Building2,
  MessageSquare,
  CheckCircle2,
  Clock,
  Filter,
  Activity,
  Server,
  RefreshCw,
  Send,
  AlertTriangle,
  AlertOctagon,
  Terminal,
  Radio,
  ShieldAlert,
  Zap,
  Mic,
  PhoneCall,
  Volume2,
  X,
} from "lucide-react";
import { FaWhatsapp as FaWhatsappIcon, FaTelegramPlane } from "react-icons/fa";

const VOICE_LANGUAGES = {
  en: {
    label: "English",
    locale: "en-IN",
    assistant: "Voice Assistant",
    demoSpeaker: "Demo respondent",
    intro: (name, service) => `This is a browser voice simulation for ${name}'s ${service} enquiry, not a real call. Please role-play as the customer. Is now a good time for a few questions? Please say yes or no.`,
    goal: (service) => `Thanks. I see your enquiry about ${service}. What is the main outcome you want from this project?`,
    features: "What features matter most to you? For example, you can mention dashboards, user roles, reports, or integrations if they fit your needs.",
    budget: "What budget range or target price should our team consider? We will confirm an exact quote after reviewing the requirements.",
    close: "I have noted your requirements and budget. Would you like our team to follow up with a written proposal? Please say yes, no, or maybe.",
    yes: ["yes", "yeah", "yep", "sure", "okay", "ok", "go ahead", "interested", "please do", "accept"],
    no: ["no", "not", "don't", "do not", "cannot", "can't", "decline", "reject"],
    maybe: ["maybe", "not sure", "think", "later", "follow up", "call me"],
  },
  ta: {
    label: "தமிழ்",
    locale: "ta-IN",
    assistant: "குரல் உதவியாளர்",
    demoSpeaker: "மாதிரி வாடிக்கையாளர்",
    intro: (name, service) => `வணக்கம். இது ${name} அவர்களின் ${service} விசாரணைக்கான உலாவி குரல் மாதிரி மட்டுமே; உண்மையான தொலைபேசி அழைப்பு அல்ல. வாடிக்கையாளராகக் கற்பனை செய்து பதிலளிக்கவும். சில கேள்விகள் கேட்க இப்போது சரியான நேரமா? ஆம் அல்லது இல்லை என்று சொல்லுங்கள்.`,
    goal: (service) => `நன்றி. ${service} பற்றிய உங்கள் விசாரணையைப் பார்த்தேன். இந்தத் திட்டத்தின் மூலம் நீங்கள் அடைய விரும்பும் முக்கியமான இலக்கு என்ன?`,
    features: "உங்களுக்கு மிகவும் தேவையான அம்சங்கள் எவை? டாஷ்போர்டு, பயனர் அனுமதிகள், அறிக்கைகள் அல்லது இணைப்புகள் போன்றவற்றைக் குறிப்பிடலாம்.",
    budget: "எங்கள் குழு பரிசீலிக்க வேண்டிய உங்கள் பட்ஜெட் வரம்பு அல்லது இலக்கு விலை என்ன? தேவைகளை ஆய்வு செய்த பிறகு துல்லியமான விலையை எங்கள் குழு உறுதிப்படுத்தும்.",
    close: "உங்கள் தேவைகளையும் பட்ஜெட்டையும் பதிவு செய்துள்ளேன். எழுத்துப்பூர்வ முன்மொழிவுடன் எங்கள் குழு உங்களைத் தொடர்புகொள்ள வேண்டுமா? ஆம், இல்லை அல்லது பின்னர் என்று சொல்லுங்கள்.",
    yes: ["ஆம்", "ஆமாம்", "சரி", "வேண்டும்", "செய்யலாம்", "தொடரலாம்"],
    no: ["இல்லை", "வேண்டாம்", "முடியாது"],
    maybe: ["ஒருவேளை", "பின்னர்", "யோசிக்க", "தெரியவில்லை"],
  },
  kn: {
    label: "ಕನ್ನಡ",
    locale: "kn-IN",
    assistant: "ಧ್ವನಿ ಸಹಾಯಕ",
    demoSpeaker: "ಡೆಮೊ ಗ್ರಾಹಕ",
    intro: (name, service) => `ನಮಸ್ಕಾರ. ಇದು ${name} ಅವರ ${service} ವಿಚಾರಣೆಯ ಬ್ರೌಸರ್ ಧ್ವನಿ ಮಾದರಿ ಮಾತ್ರ; ನಿಜವಾದ ಫೋನ್ ಕರೆ ಅಲ್ಲ. ಗ್ರಾಹಕರಂತೆ ಕಲ್ಪಿಸಿಕೊಂಡು ಉತ್ತರಿಸಿ. ಕೆಲವು ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಲು ಈಗ ಸರಿಯಾದ ಸಮಯವೇ? ಹೌದು ಅಥವಾ ಇಲ್ಲ ಎಂದು ಹೇಳಿ.`,
    goal: (service) => `ಧನ್ಯವಾದಗಳು. ${service} ಕುರಿತು ನಿಮ್ಮ ವಿಚಾರಣೆಯನ್ನು ನೋಡಿದೆ. ಈ ಯೋಜನೆಯಿಂದ ನೀವು ಸಾಧಿಸಲು ಬಯಸುವ ಮುಖ್ಯ ಫಲಿತಾಂಶ ಯಾವುದು?`,
    features: "ನಿಮಗೆ ಮುಖ್ಯವಾದ ವೈಶಿಷ್ಟ್ಯಗಳು ಯಾವುವು? ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗಳು, ಬಳಕೆದಾರರ ಪಾತ್ರಗಳು, ವರದಿಗಳು ಅಥವಾ ಏಕೀಕರಣಗಳನ್ನು ಹೇಳಬಹುದು.",
    budget: "ನಮ್ಮ ತಂಡ ಪರಿಗಣಿಸಬೇಕಾದ ನಿಮ್ಮ ಬಜೆಟ್ ವ್ಯಾಪ್ತಿ ಅಥವಾ ಗುರಿ ಬೆಲೆ ಯಾವುದು? ಅಗತ್ಯಗಳನ್ನು ಪರಿಶೀಲಿಸಿದ ನಂತರ ನಿಖರವಾದ ಅಂದಾಜನ್ನು ತಿಳಿಸುತ್ತೇವೆ.",
    close: "ನಿಮ್ಮ ಅಗತ್ಯಗಳು ಮತ್ತು ಬಜೆಟ್ ಅನ್ನು ದಾಖಲಿಸಿದ್ದೇನೆ. ಲಿಖಿತ ಪ್ರಸ್ತಾವನೆಯೊಂದಿಗೆ ನಮ್ಮ ತಂಡ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಬೇಕೇ? ಹೌದು, ಇಲ್ಲ ಅಥವಾ ನಂತರ ಎಂದು ಹೇಳಿ.",
    yes: ["ಹೌದು", "ಸರಿ", "ಮಾಡಿ", "ಬೇಕಿದೆ", "ಮುಂದುವರಿಸಿ"],
    no: ["ಇಲ್ಲ", "ಬೇಡ", "ಸಾಧ್ಯವಿಲ್ಲ"],
    maybe: ["ಬಹುಶಃ", "ನಂತರ", "ಯೋಚಿಸಬೇಕು", "ಗೊತ್ತಿಲ್ಲ"],
  },
  te: {
    label: "తెలుగు",
    locale: "te-IN",
    assistant: "వాయిస్ సహాయకుడు",
    demoSpeaker: "డెమో కస్టమర్",
    intro: (name, service) => `నమస్కారం. ఇది ${name} గారి ${service} విచారణ కోసం బ్రౌజర్ వాయిస్ నమూనా మాత్రమే; నిజమైన ఫోన్ కాల్ కాదు. కస్టమర్‌గా ఊహించుకుని సమాధానం చెప్పండి. కొన్ని ప్రశ్నలు అడగడానికి ఇది సరైన సమయమా? అవును లేదా కాదు అని చెప్పండి.`,
    goal: (service) => `ధన్యవాదాలు. ${service} గురించి మీ విచారణను చూశాను. ఈ ప్రాజెక్ట్ ద్వారా మీరు సాధించాలనుకునే ప్రధాన ఫలితం ఏమిటి?`,
    features: "మీకు ముఖ్యమైన ఫీచర్లు ఏమిటి? డాష్‌బోర్డ్‌లు, వినియోగదారుల పాత్రలు, నివేదికలు లేదా ఇంటిగ్రేషన్‌లను చెప్పవచ్చు.",
    budget: "మా బృందం పరిగణించాల్సిన మీ బడ్జెట్ పరిధి లేదా లక్ష్య ధర ఎంత? అవసరాలను సమీక్షించిన తర్వాత ఖచ్చితమైన అంచనాను తెలియజేస్తాము.",
    close: "మీ అవసరాలు, బడ్జెట్‌ను నమోదు చేశాను. వ్రాతపూర్వక ప్రతిపాదనతో మా బృందం మిమ్మల్ని సంప్రదించాలా? అవును, కాదు లేదా తర్వాత అని చెప్పండి.",
    yes: ["అవును", "సరే", "చేయండి", "కావాలి", "ముందుకు"],
    no: ["కాదు", "వద్దు", "చేయలేను"],
    maybe: ["బహుశా", "తర్వాత", "ఆలోచిస్తాను", "తెలియదు"],
  },
  ml: {
    label: "മലയാളം",
    locale: "ml-IN",
    assistant: "വോയ്സ് സഹായി",
    demoSpeaker: "ഡെമോ ഉപഭോക്താവ്",
    intro: (name, service) => `നമസ്കാരം. ഇത് ${name}യുടെ ${service} അന്വേഷണത്തിനുള്ള ബ്രൗസർ ശബ്ദ മാതൃക മാത്രമാണ്; യഥാർത്ഥ ഫോൺ വിളിയല്ല. ഉപഭോക്താവായി കരുതി മറുപടി നൽകുക. കുറച്ച് ചോദ്യങ്ങൾ ചോദിക്കാൻ ഇപ്പോൾ സൗകര്യമുണ്ടോ? അതെ അല്ലെങ്കിൽ ഇല്ല എന്ന് പറയുക.`,
    goal: (service) => `നന്ദി. ${service} സംബന്ധിച്ച നിങ്ങളുടെ അന്വേഷണം കണ്ടു. ഈ പദ്ധതിയിലൂടെ നിങ്ങൾ നേടാൻ ആഗ്രഹിക്കുന്ന പ്രധാന ഫലം എന്താണ്?`,
    features: "നിങ്ങൾക്ക് ഏറ്റവും പ്രധാനപ്പെട്ട സവിശേഷതകൾ ഏതൊക്കെയാണ്? ഡാഷ്ബോർഡുകൾ, ഉപയോക്തൃ റോളുകൾ, റിപ്പോർട്ടുകൾ അല്ലെങ്കിൽ ഇന്റഗ്രേഷനുകൾ പറയാം.",
    budget: "ഞങ്ങളുടെ ടീം പരിഗണിക്കേണ്ട നിങ്ങളുടെ ബജറ്റ് പരിധി അല്ലെങ്കിൽ ലക്ഷ്യവില എത്രയാണ്? ആവശ്യങ്ങൾ പരിശോധിച്ച ശേഷം കൃത്യമായ നിരക്ക് അറിയിക്കും.",
    close: "നിങ്ങളുടെ ആവശ്യങ്ങളും ബജറ്റും രേഖപ്പെടുത്തി. എഴുത്തുപരമായ നിർദ്ദേശവുമായി ഞങ്ങളുടെ ടീം ബന്ധപ്പെടണോ? അതെ, ഇല്ല അല്ലെങ്കിൽ പിന്നീട് എന്ന് പറയുക.",
    yes: ["അതെ", "ശരി", "വേണം", "ചെയ്യാം", "തുടരാം"],
    no: ["ഇല്ല", "വേണ്ട", "പറ്റില്ല"],
    maybe: ["ഒരുപക്ഷേ", "പിന്നീട്", "ആലോചിക്കണം", "അറിയില്ല"],
  },
  hi: {
    label: "हिन्दी",
    locale: "hi-IN",
    assistant: "वॉइस सहायक",
    demoSpeaker: "डेमो ग्राहक",
    intro: (name, service) => `नमस्ते। यह ${name} की ${service} पूछताछ के लिए केवल ब्राउज़र वॉइस सिमुलेशन है, असली फ़ोन कॉल नहीं। कृपया ग्राहक बनकर जवाब दें। क्या कुछ सवाल पूछने का यह सही समय है? हाँ या नहीं कहें।`,
    goal: (service) => `धन्यवाद। मैंने ${service} के बारे में आपकी पूछताछ देखी। इस प्रोजेक्ट से आप कौन-सा मुख्य परिणाम चाहते हैं?`,
    features: "आपके लिए कौन-सी सुविधाएँ सबसे ज़रूरी हैं? डैशबोर्ड, उपयोगकर्ता भूमिकाएँ, रिपोर्ट या इंटीग्रेशन बता सकते हैं।",
    budget: "हमारी टीम किस बजट सीमा या लक्षित कीमत को ध्यान में रखे? ज़रूरतों की समीक्षा के बाद हम सही कीमत बताएँगे।",
    close: "मैंने आपकी ज़रूरतें और बजट नोट कर लिए हैं। क्या हमारी टीम लिखित प्रस्ताव के साथ आपसे संपर्क करे? हाँ, नहीं या बाद में कहें।",
    yes: ["हाँ", "हां", "जी", "ठीक है", "चाहिए", "आगे बढ़ें", "करें"],
    no: ["नहीं", "मत", "नहीं चाहिए"],
    maybe: ["शायद", "बाद में", "सोचना है", "पता नहीं"],
  },
};

const VoiceLeadAssistant = ({ lead, backendUrl, onSaved }) => {
  const [languageCode, setLanguageCode] = useState("en");
  const [callStatus, setCallStatus] = useState("idle");
  const [voicePhase, setVoicePhase] = useState("idle");
  const [callError, setCallError] = useState("");
  const [transcript, setTranscript] = useState([]);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef([]);
  const answersRef = useRef([]);
  const language = VOICE_LANGUAGES[languageCode];

  useEffect(() => () => {
    recognitionRef.current?.abort();
    window.speechSynthesis?.cancel();
  }, []);

  const addTranscriptEntry = (speaker, text, role) => {
    const updated = [...transcriptRef.current, { speaker, text, role }];
    transcriptRef.current = updated;
    setTranscript(updated);
  };

  const listenForAnswer = (onAnswer) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setCallError("Voice recognition is not available in this browser. Try the latest Chrome or Edge.");
      setCallStatus("error");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = language.locale;
    recognition.interimResults = false;
    recognition.continuous = false;
    setVoicePhase("listening");
    recognition.onresult = (event) => {
      const answer = event.results[0][0].transcript.trim();
      if (!answer) return;
      addTranscriptEntry(language.demoSpeaker, answer, "demo");
      onAnswer(answer);
    };
    recognition.onerror = (event) => {
      if (event.error !== "aborted" && event.error !== "no-speech") {
        setCallError(`Microphone recognition failed: ${event.error}. Check microphone permission and try again.`);
        setCallStatus("error");
      } else if (event.error === "no-speech") {
        setCallError("No speech was heard. Start again and speak after each question.");
        setCallStatus("error");
      }
    };
    recognition.onend = () => {
      if (recognitionRef.current === recognition) recognitionRef.current = null;
    };
    try {
      recognition.start();
    } catch (error) {
      setCallError(`Could not start microphone recognition: ${error.message}`);
      setCallStatus("error");
    }
  };

  const ask = (text, onAnswer) => {
    addTranscriptEntry(language.assistant, text, "assistant");
    setVoicePhase("speaking");
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = language.locale;
    const matchingVoice = window.speechSynthesis.getVoices().find(
      (voice) => voice.lang.toLowerCase() === language.locale.toLowerCase()
        || voice.lang.toLowerCase().startsWith(language.locale.split("-")[0].toLowerCase())
    );
    if (matchingVoice) utterance.voice = matchingVoice;
    utterance.onend = () => listenForAnswer(onAnswer);
    utterance.onerror = () => {
      setCallError("Voice playback failed. Check that your browser has a speech voice available.");
      setCallStatus("error");
    };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const finishCall = async (outcome, followUp) => {
    recognitionRef.current?.abort();
    window.speechSynthesis.cancel();
    setCallStatus("saving");
    const callResult = {
      mode: "browser-voice-demo",
      language: language.label,
      languageCode: language.locale,
      outcome,
      simulated: true,
      requirements: answersRef.current[1] || "",
      requestedFeatures: answersRef.current[2] || "",
      budget: answersRef.current[3] || "",
      followUp,
      completedAt: new Date().toISOString(),
      transcript: transcriptRef.current,
    };

    try {
      const response = await fetch(`${backendUrl}/api/leads/${lead._id || lead.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: lead.status || "New", callResult }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "The call result could not be saved.");
      }
      onSaved(lead._id || lead.id, { callResult });
      setCallStatus("saved");
    } catch (error) {
      setCallError(`Conversation finished, but its result was not saved: ${error.message}`);
      setCallStatus("error");
    }
  };

  const handleAnswer = (answer) => {
    const step = answersRef.current.length;
    answersRef.current.push(answer);
    const normalizedAnswer = answer.toLocaleLowerCase();
    const includesAny = (phrases) => phrases.some((phrase) => normalizedAnswer.includes(phrase));

    if (step === 0) {
      if (!includesAny(language.yes)) {
        finishCall("Demo respondent said they are unavailable", "Rehearse a callback for a suitable time.");
        return;
      }
      ask(language.goal(lead.service || "your project"), handleAnswer);
      return;
    }

    if (step === 1) {
      ask(language.features, handleAnswer);
      return;
    }

    if (step === 2) {
      ask(language.budget, handleAnswer);
      return;
    }

    if (step === 3) {
      ask(language.close, handleAnswer);
      return;
    }

    if (includesAny(language.maybe)) {
      finishCall("Demo respondent said maybe", "Confirm interest with the actual lead.");
    } else if (includesAny(language.no)) {
      finishCall("Demo respondent said no", "Confirm the actual lead's decision before updating status.");
    } else if (includesAny(language.yes)) {
      finishCall("Demo respondent said yes to follow-up", "Confirm acceptance with the actual lead, then update status manually.");
    } else {
      finishCall("Demo response was unclear", "Confirm interest with the actual lead.");
    }
  };

  const startCall = () => {
    if (!("speechSynthesis" in window) || typeof window.SpeechSynthesisUtterance === "undefined") {
      setCallError("Speech playback is not available in this browser.");
      setCallStatus("error");
      return;
    }
    if (!(window.SpeechRecognition || window.webkitSpeechRecognition)) {
      setCallError("Voice recognition is not available in this browser. Try the latest Chrome or Edge.");
      setCallStatus("error");
      return;
    }

    transcriptRef.current = [];
    answersRef.current = [];
    setTranscript([]);
    setCallError("");
    setVoicePhase("speaking");
    setCallStatus("listening");
    ask(
      language.intro(lead.name || "a lead", lead.service || "project"),
      handleAnswer
    );
  };

  const stopDemo = () => {
    recognitionRef.current?.abort();
    recognitionRef.current = null;
    window.speechSynthesis.cancel();
    setVoicePhase("idle");
    setCallStatus("idle");
  };

  const replay = (text) => {
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = language.locale;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="mt-3 overflow-hidden rounded-[1.4rem] border border-slate-200 bg-slate-100 shadow-sm">
      <div className="flex items-center justify-between gap-3 bg-blue-700 px-4 py-3 text-white">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
            <PhoneCall size={18} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold">AK WebFlair</p>
            <p className="flex items-center gap-1.5 text-[10px] text-blue-100">
              <span className={`h-1.5 w-1.5 rounded-full ${callStatus === "listening" ? "animate-pulse bg-emerald-300" : "bg-slate-300"}`} />
              {language.assistant} · Guided demo
            </p>
          </div>
        </div>
        <label className="sr-only" htmlFor={`voice-language-${lead._id || lead.id}`}>Choose conversation language</label>
        <select
          id={`voice-language-${lead._id || lead.id}`}
          aria-label="Choose conversation language"
          value={languageCode}
          onChange={(event) => setLanguageCode(event.target.value)}
          disabled={callStatus === "listening" || callStatus === "saving"}
          className="max-w-32 rounded-lg border border-white/30 bg-blue-800 px-2 py-2 text-xs font-bold text-white outline-none focus:ring-2 focus:ring-white disabled:opacity-60"
        >
          {Object.entries(VOICE_LANGUAGES).map(([code, option]) => (
            <option key={code} value={code} className="bg-white text-slate-900">{option.label}</option>
          ))}
        </select>
      </div>

      <div className="max-h-64 min-h-32 space-y-3 overflow-y-auto px-3 py-4">
        {transcript.length === 0 ? (
          <div className="mx-auto max-w-[90%] rounded-2xl border border-white bg-white px-4 py-3 text-xs leading-relaxed text-slate-700 shadow-sm">
            Choose a language and tap the microphone to preview a scripted sales conversation. This does not call the lead.
          </div>
        ) : transcript.map((entry, index) => {
          const isDemoResponse = entry.role === "demo";
          return (
            <div key={`${entry.speaker}-${index}`} className={`flex ${isDemoResponse ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[90%] rounded-2xl px-4 py-3 shadow-sm ${
                isDemoResponse ? "rounded-br-md bg-blue-700 text-white" : "rounded-bl-md border border-white bg-white text-slate-800"
              }`}>
                <p className="mb-1 text-[9px] font-extrabold uppercase opacity-70">{entry.speaker}</p>
                <p className="text-xs leading-relaxed">{entry.text}</p>
                <div className={`mt-2 flex items-center gap-2 ${isDemoResponse ? "text-blue-100" : "text-blue-700"}`}>
                  <div className="flex h-3 items-center gap-0.5" aria-hidden="true">
                    {[3, 7, 10, 5, 9, 4, 8, 3].map((height, barIndex) => (
                      <span key={barIndex} className="w-0.5 rounded-full bg-current" style={{ height: `${height}px` }} />
                    ))}
                  </div>
                  {!isDemoResponse && (
                    <button
                      type="button"
                      onClick={() => replay(entry.text)}
                      title="Play this message"
                      aria-label="Play assistant message"
                      className="ml-auto rounded-full p-1 hover:bg-slate-100"
                    >
                      <Volume2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {callStatus === "saved" && (
        <p className="px-4 pb-2 text-xs font-bold text-emerald-800">Simulation saved; the lead's status was not changed.</p>
      )}
      {callError && <p role="alert" className="px-4 pb-2 text-xs font-semibold text-rose-700">{callError}</p>}
      <div className="mx-3 mb-3 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2.5">
        <div className="min-w-0 text-[10px] text-slate-600">
          <p className="font-extrabold text-slate-800">
            {callStatus === "listening"
              ? voicePhase === "speaking" ? "Assistant speaking..." : "Listening..."
              : callStatus === "saving" ? "Saving conversation..."
                : callStatus === "saved" ? "Simulation saved"
                  : callStatus === "error" ? "Voice demo stopped" : "Ready"}
          </p>
          <p className="truncate">Role-play only · {language.locale}</p>
        </div>
        <button
          type="button"
          onClick={callStatus === "listening" ? stopDemo : startCall}
          disabled={callStatus === "saving"}
          aria-label={callStatus === "listening" ? "Stop voice simulation" : "Start voice simulation"}
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-md transition ${
            callStatus === "listening" ? "bg-rose-600 hover:bg-rose-700" : "bg-blue-700 hover:bg-blue-800"
          } disabled:cursor-not-allowed disabled:opacity-60`}
        >
          <Mic size={21} />
        </button>
        <button
          type="button"
          onClick={stopDemo}
          disabled={callStatus === "saving"}
          title="Stop and reset voice simulation"
          aria-label="Stop voice simulation"
          className="shrink-0 rounded-full p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-40"
        >
          <X size={18} />
        </button>
      </div>
      <p className="px-4 pb-3 text-center text-[9px] text-slate-500">
        Voice quality and microphone recognition vary by browser and installed languages.
      </p>
    </div>
  );
};

const AdminDashboard = () => {
  // Auth state
  const [adminToken, setAdminToken] = useState(
    () => sessionStorage.getItem("ak_admin_token") || ""
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => Boolean(sessionStorage.getItem("ak_admin_token"))
  );
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState("leads"); // leads, projects, partners, feedback, health

  // Data states
  const [leads, setLeads] = useState([]);
  const [projects, setProjects] = useState([]);
  const [partners, setPartners] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [discoveryKeyword, setDiscoveryKeyword] = useState("");
  const [discoveryState, setDiscoveryState] = useState("Tamil Nadu");
  const [discoveryStates, setDiscoveryStates] = useState([]);
  const [discoveryDistrict, setDiscoveryDistrict] = useState("");
  const [discoveryDistricts, setDiscoveryDistricts] = useState([]);
  const [districtsLoading, setDistrictsLoading] = useState(false);
  const [discoveryResults, setDiscoveryResults] = useState([]);
  const [discoveryAutoSaved, setDiscoveryAutoSaved] = useState(false);
  const [savedProspects, setSavedProspects] = useState([]);
  const [discoveryLoading, setDiscoveryLoading] = useState(false);
  const [discoveryError, setDiscoveryError] = useState("");
  const [discoveryMessage, setDiscoveryMessage] = useState("");
  const [discoveryMaxLeads, setDiscoveryMaxLeads] = useState(100);
  const [discoveryMinRating, setDiscoveryMinRating] = useState(0);
  const [discoveryMinReviews, setDiscoveryMinReviews] = useState(0);
  const [discoveryWebsiteStatuses, setDiscoveryWebsiteStatuses] = useState([]);
  const [discoveryJob, setDiscoveryJob] = useState(null);
  const [discoveryHistory, setDiscoveryHistory] = useState([]);
  const [savedPage, setSavedPage] = useState(1);
  const [savedTotal, setSavedTotal] = useState(0);
  const [prospectStats, setProspectStats] = useState(null);
  const [savedQuery, setSavedQuery] = useState("");
  const [savedWebsiteStatus, setSavedWebsiteStatus] = useState("");
  const [selectedProspects, setSelectedProspects] = useState([]);
  const [selectedProspect, setSelectedProspect] = useState(null);

  // Health Monitoring & Logs State
  const [services, setServices] = useState([]);
  const [billdeskOverview, setBilldeskOverview] = useState(null);
  const [billdeskLoading, setBilldeskLoading] = useState(false);
  const [billdeskError, setBilldeskError] = useState("");
  const [logs, setLogs] = useState([]);
  const [logProjectFilter, setLogProjectFilter] = useState("ALL");
  const [logLevelFilter, setLogLevelFilter] = useState("ALL");
  const [logSearchQuery, setLogSearchQuery] = useState("");
  const [isPingingId, setIsPingingId] = useState(null);
  const [isPingingAll, setIsPingingAll] = useState(false);
  const [isTestingTelegram, setIsTestingTelegram] = useState(false);
  const [telegramStatusMsg, setTelegramStatusMsg] = useState(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [serviceForm, setServiceForm] = useState({
    name: "",
    url: "",
    healthPath: "/",
  });

  // Project Form State
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectForm, setProjectForm] = useState({
    id: null,
    title: "",
    category: "CRM & UI Dashboards",
    description: "",
    img: "",
    website: "",
  });

  // Partner Form State
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [partnerForm, setPartnerForm] = useState({
    name: "",
    icon: "",
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

  const loadBilldeskOverview = React.useCallback(async () => {
    setBilldeskLoading(true);
    setBilldeskError("");
    try {
      const response = await fetch(`${backendUrl}/api/admin/billdesk/overview`, { headers: { Authorization: `Bearer ${adminToken}` } });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Could not load Billdesk overview.");
      setBilldeskOverview(data);
    } catch (error) {
      setBilldeskError(error.message || "Billdesk API could not be reached.");
    } finally {
      setBilldeskLoading(false);
    }
  }, [adminToken, backendUrl]);

  useEffect(() => {
    if (isAuthenticated && activeTab === "billdesk") loadBilldeskOverview();
  }, [isAuthenticated, activeTab, loadBilldeskOverview]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("ak_lead_finder_config") || "null");
      if (saved && typeof saved === "object") {
        if (typeof saved.keyword === "string") setDiscoveryKeyword(saved.keyword);
        if (typeof saved.state === "string") setDiscoveryState(saved.state);
        if (typeof saved.district === "string") setDiscoveryDistrict(saved.district);
        if (Number.isInteger(saved.maxLeads)) setDiscoveryMaxLeads(Math.min(100, Math.max(1, saved.maxLeads)));
        if (Number.isFinite(saved.minRating)) setDiscoveryMinRating(Math.min(5, Math.max(0, saved.minRating)));
        if (Number.isInteger(saved.minReviews)) setDiscoveryMinReviews(Math.max(0, saved.minReviews));
        if (Array.isArray(saved.websiteStatuses)) setDiscoveryWebsiteStatuses(saved.websiteStatuses);
      }
    } catch { /* Ignore an invalid saved search configuration. */ }
  }, []);


  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    setIsLoadingAuth(true);

    try {
      const res = await fetch(`${backendUrl}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPass }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.token) {
        setAdminToken(data.token);
        setIsAuthenticated(true);
        sessionStorage.setItem("ak_admin_token", data.token);
        fetchData();
      } else {
        setAuthError(data.message || "Invalid Email or Password");
      }
    } catch {
      setAuthError("Failed to connect to backend server.");
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminToken("");
    sessionStorage.removeItem("ak_admin_token");
    setDiscoveryResults([]);
    setDiscoveryMessage("");
    setSavedProspects([]);
  };

  const handleDiscoverBusinesses = async (event) => {
    event.preventDefault();
    if (Number(discoveryMinRating) > 0 || Number(discoveryMinReviews) > 0) {
      setDiscoveryError("Overture Places does not publish ratings or review counts. Set both minimum filters to 0 to search this source; it cannot verify those thresholds.");
      setDiscoveryMessage("");
      setDiscoveryResults([]);
      return;
    }
    setDiscoveryLoading(true);
    setDiscoveryError("");
    setDiscoveryMessage("");
    setDiscoveryResults([]);
    setDiscoveryAutoSaved(false);

    try {
      const response = await fetch(`${backendUrl}/api/admin/lead-discovery/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          keyword: discoveryKeyword,
          district: discoveryDistrict,
          state: discoveryState,
          maxLeads: discoveryMaxLeads,
          minRating: discoveryMinRating,
          minReviewCount: discoveryMinReviews,
          websiteStatuses: discoveryWebsiteStatuses,
        }),
      });
      const data = await response.json();

      if (response.status === 401) {
        handleLogout();
        setAuthError("Your admin session expired. Please log in again.");
        return;
      }
      if (!response.ok || !data.success) {
        const errorMessage = [data.message, data.details].filter(Boolean).join(" ");
        throw new Error(errorMessage || "Business search failed.");
      }

      let job = data.job;
      setDiscoveryJob(job);
      while (job && ["pending", "running"].includes(job.status)) {
        await new Promise((resolve) => window.setTimeout(resolve, 1200));
        const statusResponse = await fetch(`${backendUrl}/api/admin/lead-discovery/jobs/${job.id}`, {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        const statusData = await statusResponse.json();
        if (!statusResponse.ok || !statusData.success) throw new Error(statusData.message || "Could not read search progress.");
        job = statusData.job;
        setDiscoveryJob(job);
      }
      if (job?.status === "failed") throw new Error(job.errors?.[0] || "Business search failed.");
      await fetchSavedProspects();
      const jobsResponse = await fetch(`${backendUrl}/api/admin/lead-discovery/jobs`, { headers: { Authorization: `Bearer ${adminToken}` } });
      const jobsData = await jobsResponse.json();
      if (jobsData.success) setDiscoveryHistory(jobsData.jobs || []);
      setDiscoveryResults([]);
      setDiscoveryAutoSaved(job?.saved > 0);
      setDiscoveryMessage(job?.status === "cancelled"
        ? `Search cancelled. ${job.saved} businesses saved before cancellation.`
        : `Search complete. ${job.discovered} businesses found and ${job.saved} saved. ${job.limitation || ""}`);
    } catch (err) {
      setDiscoveryError(err.message || "Could not complete the business search.");
    } finally {
      setDiscoveryLoading(false);
    }
  };

  const fetchSavedProspects = async () => {
    try {
      const params = new URLSearchParams({ page: String(savedPage), limit: "25" });
      if (savedQuery.trim()) params.set("q", savedQuery.trim());
      if (savedWebsiteStatus) params.set("websiteStatus", savedWebsiteStatus);
      const response = await fetch(`${backendUrl}/api/admin/lead-discovery/leads?${params}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setSavedProspects(Array.isArray(data.leads) ? data.leads : []);
        setSavedTotal(data.total || 0);
      }
      const statsResponse = await fetch(`${backendUrl}/api/admin/lead-discovery/stats`, { headers: { Authorization: `Bearer ${adminToken}` } });
      const statsData = await statsResponse.json();
      if (statsData.success) setProspectStats(statsData.stats);
    } catch (err) {
      console.error("Could not load saved business prospects:", err);
    }
  };

  const cancelDiscovery = async () => {
    if (!discoveryJob?.id) return;
    try {
      await fetch(`${backendUrl}/api/admin/lead-discovery/jobs/${discoveryJob.id}/cancel`, {
        method: "POST", headers: { Authorization: `Bearer ${adminToken}` },
      });
    } catch (err) { setDiscoveryError(err.message || "Could not cancel the search."); }
  };

  const updateProspectStatus = async (id, leadStatus) => {
    const response = await fetch(`${backendUrl}/api/admin/lead-discovery/leads/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({ leadStatus }),
    });
    if (!response.ok) throw new Error("Could not update lead status.");
    await fetchSavedProspects();
  };

  const recheckProspectWebsite = async (id) => {
    const response = await fetch(`${backendUrl}/api/admin/lead-discovery/leads/${id}/check-website`, {
      method: "POST", headers: { Authorization: `Bearer ${adminToken}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Website check failed.");
    await fetchSavedProspects();
    return data.lead;
  };

  const bulkUpdateProspects = async (leadStatus) => {
    if (!selectedProspects.length) return;
    const response = await fetch(`${backendUrl}/api/admin/lead-discovery/leads/bulk-update`, {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({ ids: selectedProspects, leadStatus }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Bulk update failed.");
    setSelectedProspects([]);
    await fetchSavedProspects();
  };

  useEffect(() => {
    if (!isAuthenticated || !adminToken) return;
    fetch(`${backendUrl}/api/admin/lead-discovery/states`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.states)) setDiscoveryStates(data.states);
      })
      .catch((err) => console.error("Could not load states:", err));
    fetchSavedProspects();
    fetch(`${backendUrl}/api/admin/lead-discovery/jobs`, { headers: { Authorization: `Bearer ${adminToken}` } })
      .then((response) => response.json()).then((data) => { if (data.success) setDiscoveryHistory(data.jobs || []); }).catch(() => {});
    fetch(`${backendUrl}/api/admin/lead-discovery/stats`, { headers: { Authorization: `Bearer ${adminToken}` } })
      .then((response) => response.json()).then((data) => { if (data.success) setProspectStats(data.stats); }).catch(() => {});
  }, [isAuthenticated, adminToken]);

  useEffect(() => {
    if (!isAuthenticated || !adminToken) return;
    const params = new URLSearchParams({ page: String(savedPage), limit: "25" });
    if (savedQuery.trim()) params.set("q", savedQuery.trim());
    if (savedWebsiteStatus) params.set("websiteStatus", savedWebsiteStatus);
    fetch(`${backendUrl}/api/admin/lead-discovery/leads?${params}`, { headers: { Authorization: `Bearer ${adminToken}` } })
      .then((response) => response.json())
      .then((data) => { if (data.success) { setSavedProspects(data.leads || []); setSavedTotal(data.total || 0); } })
      .catch((err) => console.error("Could not refresh filtered prospects:", err));
  }, [isAuthenticated, adminToken, savedPage, savedQuery, savedWebsiteStatus]);

  useEffect(() => {
    if (!isAuthenticated || !adminToken || !discoveryState) return;
    setDistrictsLoading(true);
    setDiscoveryDistrict("");
    setDiscoveryDistricts([]);
    fetch(`${backendUrl}/api/admin/lead-discovery/districts?state=${encodeURIComponent(discoveryState)}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error(data.message || "Could not load districts.");
        setDiscoveryDistricts(Array.isArray(data.districts) ? data.districts : []);
      })
      .catch((err) => setDiscoveryError(err.message || "Could not load districts."))
      .finally(() => setDistrictsLoading(false));
  }, [isAuthenticated, adminToken, discoveryState]);

  // Fetch all backend data
  const fetchData = async () => {
    try {
      // Fetch Leads
      const resLeads = await fetch(`${backendUrl}/api/leads`);
      if (resLeads.ok) {
        const dataLeads = await resLeads.json();
        setLeads(Array.isArray(dataLeads) ? dataLeads : []);
      }
    } catch (err) {}

    try {
      // Fetch Projects
      const resProjects = await fetch(`${backendUrl}/api/projects`);
      if (resProjects.ok) {
        const dataProjects = await resProjects.json();
        setProjects(Array.isArray(dataProjects) ? dataProjects : []);
      }
    } catch (err) {}

    try {
      // Fetch Partners
      const resPartners = await fetch(`${backendUrl}/api/partners`);
      if (resPartners.ok) {
        const dataPartners = await resPartners.json();
        setPartners(Array.isArray(dataPartners) ? dataPartners : []);
      }
    } catch (err) {}

    try {
      // Fetch Feedback / Google Reviews
      const resReviews = await fetch(`${backendUrl}/api/reviews`);
      if (resReviews.ok) {
        const dataReviews = await resReviews.json();
        setFeedbacks(Array.isArray(dataReviews.reviews) ? dataReviews.reviews : []);
      }
    } catch (err) {}

    try {
      // Fetch Monitored Services
      const resServices = await fetch(`${backendUrl}/api/monitor/services`);
      if (resServices.ok) {
        const dataServices = await resServices.json();
        setServices(Array.isArray(dataServices.services) ? dataServices.services : []);
      }
    } catch (err) {}

    try {
      // Fetch System Logs
      const resLogs = await fetch(`${backendUrl}/api/logs`);
      if (resLogs.ok) {
        const dataLogs = await resLogs.json();
        setLogs(Array.isArray(dataLogs.logs) ? dataLogs.logs : []);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
      const interval = setInterval(fetchData, 20000); // Auto-refresh data every 20s
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  // Ping single service
  const handlePingService = async (serviceId) => {
    setIsPingingId(serviceId);
    try {
      const res = await fetch(`${backendUrl}/api/monitor/ping/${serviceId}`, {
        method: "POST",
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsPingingId(null);
    }
  };

  // Ping all services
  const handlePingAll = async () => {
    setIsPingingAll(true);
    try {
      const res = await fetch(`${backendUrl}/api/monitor/ping-all`, {
        method: "POST",
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsPingingAll(false);
    }
  };

  // Test Telegram Bot Alert
  const handleTestTelegram = async () => {
    setIsTestingTelegram(true);
    setTelegramStatusMsg(null);
    try {
      const res = await fetch(`${backendUrl}/api/monitor/test-telegram`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        setTelegramStatusMsg({ type: "success", text: "✅ Test alert delivered to your Telegram!" });
      } else {
        setTelegramStatusMsg({ type: "error", text: data.message || "Failed to deliver alert." });
      }
    } catch (err) {
      setTelegramStatusMsg({ type: "error", text: "Could not connect to backend server." });
    } finally {
      setIsTestingTelegram(false);
      setTimeout(() => setTelegramStatusMsg(null), 6000);
    }
  };

  // Add Service to monitor
  const handleSaveService = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendUrl}/api/monitor/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceForm),
      });
      if (res.ok) {
        setShowServiceModal(false);
        setServiceForm({ name: "", url: "", healthPath: "/" });
        await fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Monitored Service
  const handleDeleteService = async (serviceId) => {
    if (!window.confirm("Remove this project from monitoring?")) return;
    try {
      await fetch(`${backendUrl}/api/monitor/services/${serviceId}`, {
        method: "DELETE",
      });
      setServices((prev) => prev.filter((s) => s._id !== serviceId));
    } catch (err) {
      console.error(err);
    }
  };

  // Clear Logs
  const handleClearLogs = async () => {
    if (!window.confirm("Are you sure you want to clear all system logs?")) return;
    try {
      await fetch(`${backendUrl}/api/logs/clear`, { method: "DELETE" });
      setLogs([]);
    } catch (err) {
      console.error(err);
    }
  };


  // Update Lead Status
  const handleUpdateLeadStatus = async (leadId, newStatus) => {
    try {
      const response = await fetch(`${backendUrl}/api/leads/${leadId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Failed to update lead status");
      setLeads((prev) =>
        prev.map((l) => (l._id === leadId || l.id === leadId ? { ...l, status: newStatus } : l))
      );
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleVoiceResultSaved = (leadId, updates) => {
    setLeads((prev) =>
      prev.map((lead) => (lead._id === leadId || lead.id === leadId ? { ...lead, ...updates } : lead))
    );
  };

  // Delete Lead
  const handleDeleteLead = async (leadId) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      await fetch(`${backendUrl}/api/leads/${leadId}`, { method: "DELETE" });
      setLeads((prev) => prev.filter((l) => l._id !== leadId && l.id !== leadId));
    } catch (err) {
      alert("Failed to delete lead");
    }
  };

  // Save Project (Add/Edit)
  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      const method = projectForm.id ? "PUT" : "POST";
      const url = projectForm.id
        ? `${backendUrl}/api/projects/${projectForm.id}`
        : `${backendUrl}/api/projects`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectForm),
      });

      if (res.ok) {
        setShowProjectModal(false);
        setProjectForm({ id: null, title: "", category: "CRM & UI Dashboards", description: "", img: "", website: "" });
        fetchData();
      }
    } catch (err) {
      alert("Failed to save project");
    }
  };

  // Save Partner Logo
  const handleSavePartner = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendUrl}/api/partners`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(partnerForm),
      });

      if (res.ok) {
        setShowPartnerModal(false);
        setPartnerForm({ name: "", icon: "" });
        fetchData();
      }
    } catch (err) {
      alert("Failed to add partner");
    }
  };

  // Filter Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesQuery =
      (lead.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.phone || "").includes(searchQuery) ||
      (lead.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.service || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || lead.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  // Render Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0639A8] flex items-center justify-center p-5 select-none font-sans relative overflow-hidden">
        {/* Background Aura */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0A4FE0]/30 rounded-full blur-[130px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[2.5rem] p-8 sm:p-12 max-w-md w-full shadow-2xl border border-white/20 relative z-10"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#0A4FE0] text-white flex items-center justify-center mx-auto mb-4 shadow-md">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              AK WebFlair Admin
            </h2>
            <p className="text-xs font-medium text-[#64748B] mt-1">
              Control Panel & Lead Management Engine
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs font-medium">
            <div>
              <label className="block text-[10px] font-extrabold uppercase text-[#0F172A] mb-1.5">
                Admin Email Address
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-2xl px-4 py-3 text-sm text-[#0F172A] font-bold focus:outline-none focus:border-[#0A4FE0]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase text-[#0F172A] mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-2xl px-4 py-3 text-sm text-[#0F172A] font-bold focus:outline-none focus:border-[#0A4FE0]"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-600 font-bold text-xs border border-rose-200">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoadingAuth}
              className="w-full py-4 bg-[#0A4FE0] hover:bg-[#0639A8] text-white font-extrabold text-sm rounded-full transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {isLoadingAuth ? "Authenticating..." : "Login to Admin Portal"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans pb-20 select-none">
      {/* HEADER BAR */}
      <header className="bg-[#0639A8] text-white py-4 px-6 sm:px-10 shadow-md flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white text-[#0A4FE0] flex items-center justify-center font-black">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight">AK WebFlair Admin Control</h1>
            <p className="text-[10px] font-mono text-[#CBD5E1]">Founder & CEO: Kavin M M</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-xs font-extrabold transition-colors cursor-pointer"
        >
          <LogOut size={15} />
          <span>Logout</span>
        </button>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 pt-8">
        {/* METRICS STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-[#64748B] uppercase">Total Captured Leads</p>
              <p className="text-3xl font-black text-[#0A4FE0] font-mono mt-1">{leads.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#0A4FE0] flex items-center justify-center">
              <BrainCircuit size={24} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-[#64748B] uppercase">New Enquiries</p>
              <p className="text-3xl font-black text-[#10B981] font-mono mt-1">
                {leads.filter((l) => l.status === "New" || !l.status).length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center">
              <Sparkles size={24} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-[#64748B] uppercase">Live Projects</p>
              <p className="text-3xl font-black text-[#0F172A] font-mono mt-1">{projects.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] text-[#0F172A] flex items-center justify-center">
              <Layers size={24} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-[#64748B] uppercase">Client Partners</p>
              <p className="text-3xl font-black text-[#D97706] font-mono mt-1">{partners.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#FFFBEB] text-[#D97706] flex items-center justify-center">
              <Building2 size={24} />
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex flex-wrap items-center gap-2 mb-8 bg-white p-2 rounded-2xl border border-[#CBD5E1] shadow-xs">
          {[
            { id: "leads", label: `Client Leads (${leads.length})`, icon: BrainCircuit },
            { id: "lead-discovery", label: "Business Finder", icon: Search },
            { id: "projects", label: `Projects (${projects.length})`, icon: Layers },
            { id: "partners", label: `Partners (${partners.length})`, icon: Building2 },
            { id: "health", label: `Server Health & Telegram (${services.length})`, icon: Activity },
            { id: "billdesk", label: "Billdesk SaaS", icon: Building2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#0A4FE0] text-white shadow-md"
                    : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === "billdesk" && (
          <section className="space-y-5 rounded-3xl border border-[#CBD5E1] bg-white p-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold text-[#0F172A]">Billdesk control overview</h2>
                <p className="mt-1 text-sm text-[#64748B]">Tenant status and aggregate billing activity from the private Billdesk API connection.</p>
              </div>
              <button type="button" onClick={loadBilldeskOverview} disabled={billdeskLoading} className="rounded-lg bg-[#0A4FE0] px-4 py-2 text-sm font-bold text-white disabled:opacity-50">{billdeskLoading ? "Loading…" : "Refresh"}</button>
            </div>
            {billdeskError && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{billdeskError}</p>}
            {billdeskOverview && <>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {Object.entries({ Tenants: billdeskOverview.totals.tenants, Active: billdeskOverview.totals.activeTenants, Suspended: billdeskOverview.totals.suspendedTenants, Customers: billdeskOverview.totals.customers, Invoices: billdeskOverview.totals.invoices }).map(([label, value]) => <div key={label} className="rounded-xl border border-slate-200 p-4"><p className="text-xs font-bold uppercase text-slate-500">{label}</p><p className="mt-1 text-2xl font-black text-slate-900">{value}</p></div>)}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm"><thead><tr className="border-b text-xs uppercase text-slate-500"><th className="p-3">Workspace</th><th className="p-3">Currency</th><th className="p-3">Members</th><th className="p-3">Customers</th><th className="p-3">Invoices</th><th className="p-3">Status</th></tr></thead><tbody>
                  {billdeskOverview.tenants.map((tenant) => <tr key={tenant.id} className="border-b last:border-0"><td className="p-3"><span className="font-bold text-slate-900">{tenant.name}</span><span className="ml-2 text-xs text-slate-500">{tenant.slug}</span></td><td className="p-3">{tenant.currency}</td><td className="p-3">{tenant._count.members}</td><td className="p-3">{tenant._count.customers}</td><td className="p-3">{tenant._count.invoices}</td><td className="p-3">{tenant.isSuspended ? "Suspended" : tenant.isActive ? "Active" : "Inactive"}</td></tr>)}
                </tbody></table>
              </div>
              <p className="text-xs text-slate-500">Recorded payment total: {billdeskOverview.totals.recordedPayments} · Updated {new Date(billdeskOverview.generatedAt).toLocaleString()}</p>
            </>}
          </section>
        )}

        {activeTab === "lead-discovery" && (
          <div className="space-y-6">
            <section className="rounded-3xl border border-[#CBD5E1] bg-white p-5 sm:p-7">
              <div className="mb-5">
                <h2 className="text-xl font-extrabold text-[#0F172A]">Find local businesses</h2>
                <p className="mt-1 text-sm text-[#64748B]">
                  Search public business and place records with the Python worker. Missing fields are left unavailable and source limitations are shown clearly.
                </p>
              </div>

              <form onSubmit={handleDiscoverBusinesses} className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-end">
                <label className="text-xs font-bold text-[#334155]">
                  Business type or keyword
                  <input
                    required
                    minLength={2}
                    maxLength={100}
                    value={discoveryKeyword}
                    onChange={(event) => setDiscoveryKeyword(event.target.value)}
                    placeholder="e.g. bakery, dentist, restaurant"
                    className="mt-2 w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 text-sm font-medium outline-none focus:border-[#0A4FE0]"
                  />
                </label>
                <label className="text-xs font-bold text-[#334155]">
                  State / union territory
                  <select
                    required
                    value={discoveryState}
                    onChange={(event) => setDiscoveryState(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 text-sm font-medium outline-none focus:border-[#0A4FE0]"
                  >
                    {discoveryStates.length === 0 && <option value="Tamil Nadu">Tamil Nadu</option>}
                    {discoveryStates.map((state) => <option key={state} value={state}>{state}</option>)}
                  </select>
                </label>
                <label className="text-xs font-bold text-[#334155]">
                  District
                  <select
                    required
                    value={discoveryDistrict}
                    onChange={(event) => setDiscoveryDistrict(event.target.value)}
                    disabled={districtsLoading || discoveryDistricts.length === 0}
                    className="mt-2 w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 text-sm font-medium outline-none focus:border-[#0A4FE0] disabled:opacity-60"
                  >
                    <option value="">{districtsLoading ? "Loading districts..." : "Select district"}</option>
                    {discoveryDistricts.map((district) => <option key={district} value={district}>{district}</option>)}
                  </select>
                </label>
                <label className="text-xs font-bold text-[#334155]">
                  Maximum results
                  <input type="number" min="1" max="100" value={discoveryMaxLeads} onChange={(event) => setDiscoveryMaxLeads(Math.min(100, Math.max(1, Number(event.target.value) || 1)))} className="mt-2 w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 text-sm font-medium outline-none focus:border-[#0A4FE0]" />
                </label>
                <label className="text-xs font-bold text-[#334155]">
                  Minimum verified rating
                  <input type="number" min="0" max="5" step="0.1" value={discoveryMinRating} onChange={(event) => setDiscoveryMinRating(Math.min(5, Math.max(0, Number(event.target.value) || 0)))} className="mt-2 w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 text-sm font-medium outline-none focus:border-[#0A4FE0]" />
                </label>
                <label className="text-xs font-bold text-[#334155]">
                  Minimum reviews
                  <input type="number" min="0" max="1000000" value={discoveryMinReviews} onChange={(event) => setDiscoveryMinReviews(Math.max(0, Number.parseInt(event.target.value, 10) || 0))} className="mt-2 w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 text-sm font-medium outline-none focus:border-[#0A4FE0]" />
                </label>
                <p className="text-[11px] leading-relaxed text-amber-800 md:col-span-2">
                  Overture has no rating or review data. Set both minimums to 0 to search; positive thresholds cannot be verified by this source.
                </p>
                <label className="text-xs font-bold text-[#334155] md:col-span-2">
                  Website statuses to include (leave empty for all)
                  <select multiple value={discoveryWebsiteStatuses} onChange={(event) => setDiscoveryWebsiteStatuses(Array.from(event.target.selectedOptions, (option) => option.value))} className="mt-2 min-h-28 w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-3 py-2 text-sm font-medium outline-none focus:border-[#0A4FE0]">
                    <option value="no_website_listed">No website listed</option><option value="page_not_found">Page not found</option><option value="server_error">Server error</option><option value="dns_error">DNS failure</option><option value="connection_error">Connection failure</option><option value="timeout">Timeout</option><option value="redirect_issue">Redirect issue</option><option value="ssl_error">SSL error</option><option value="needs_manual_review">Needs manual review</option><option value="working">Working</option>
                  </select>
                </label>
                <button type="button" onClick={() => localStorage.setItem("ak_lead_finder_config", JSON.stringify({ keyword: discoveryKeyword, state: discoveryState, district: discoveryDistrict, maxLeads: discoveryMaxLeads, minRating: discoveryMinRating, minReviews: discoveryMinReviews, websiteStatuses: discoveryWebsiteStatuses }))} className="rounded-xl border border-[#CBD5E1] px-4 py-3 text-xs font-bold text-[#334155] hover:bg-slate-50">Save search config</button>
                <button type="button" onClick={() => { setDiscoveryKeyword(""); setDiscoveryDistrict(""); setDiscoveryMaxLeads(100); setDiscoveryMinRating(0); setDiscoveryMinReviews(0); setDiscoveryWebsiteStatuses([]); setDiscoveryError(""); setDiscoveryMessage(""); }} className="rounded-xl border border-[#CBD5E1] px-4 py-3 text-xs font-bold text-[#334155] hover:bg-slate-50">Clear filters</button>
                <button
                  type="submit"
                  disabled={discoveryLoading || districtsLoading || !discoveryDistrict}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#0A4FE0] px-5 py-3 text-sm font-extrabold text-white transition-colors hover:bg-[#0639A8] disabled:cursor-wait disabled:opacity-60"
                >
                  <Search size={16} />
                  {discoveryLoading ? "Searching..." : "Find leads"}
                </button>
              </form>

              {discoveryLoading && (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-100 bg-blue-50 p-3 text-sm text-blue-900" role="status">
                  <span>{discoveryJob?.stage || "Starting search"} · {discoveryJob?.processed || 0} processed · {discoveryJob?.saved || 0} saved</span>
                  <button type="button" onClick={cancelDiscovery} className="rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-bold hover:bg-white">Cancel search</button>
                </div>
              )}

              <p className="mt-4 rounded-xl bg-blue-50 p-3 text-xs leading-relaxed text-blue-900">
                Searches query the openly licensed Overture Places dataset directly from Python. It includes business categories and some public contact details, but does not provide ratings or reviews. Searches with positive rating/review thresholds are stopped before a job is created. Website checks separate temporary failures from confirmed errors. No browser automation, paid search API, or AI API is used.
              </p>
              <p className="mt-2 text-[11px] text-[#64748B]">
                Source: <a className="underline" href="https://docs.overturemaps.org/guides/places/" target="_blank" rel="noreferrer">Overture Maps Places</a>, available under permissive open-data licenses.
              </p>
              <p className="mt-1 text-[11px] text-[#64748B]">
                District names are based on India&apos;s <a className="underline" href="https://lgdirectory.gov.in/" target="_blank" rel="noreferrer">Local Government Directory</a> (GODL-India).
              </p>
              {discoveryHistory.length > 0 && <div className="mt-5 border-t border-[#E2E8F0] pt-4"><h3 className="text-sm font-extrabold text-[#0F172A]">Recent search history</h3><div className="mt-2 space-y-2">{discoveryHistory.slice(0, 5).map((job) => <div key={job.id} className="flex flex-wrap justify-between gap-2 rounded-lg bg-[#F8FAFC] px-3 py-2 text-xs"><span>{job.configuration.keyword} · {job.configuration.district}, {job.configuration.state}</span><span className="font-semibold">{job.status} · {job.discovered} found · {job.saved} saved</span></div>)}</div></div>}
              {discoveryError && (
                <p role="alert" className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-semibold text-rose-700">
                  {discoveryError}
                </p>
              )}
              {discoveryMessage && (
                <p role="status" className="mt-4 text-sm font-semibold text-[#334155]">
                  {discoveryMessage}
                </p>
              )}
            </section>

            {discoveryResults.length > 0 && (
              <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {discoveryResults.map((business) => (
                  <article
                    key={business.id}
                    className="rounded-2xl border border-[#CBD5E1] bg-white p-5 shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-extrabold text-[#0F172A]">{business.name}</h3>
                    </div>
                    {business.address && (
                      <p className="mt-4 text-sm leading-relaxed text-[#475569]">{business.address}</p>
                    )}
                    <a
                      href={`tel:${business.phone}`}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#0A4FE0]"
                    >
                      <Phone size={15} />
                      {business.phone}
                    </a>
                    <div className="mt-4 border-t border-[#E2E8F0] pt-3">
                      <a
                        href={business.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#475569] hover:text-[#0A4FE0]"
                      >
                        Public directory <ExternalLink size={13} />
                      </a>
                      <span className={`ml-3 inline-flex items-center gap-1 text-xs font-bold ${discoveryAutoSaved ? "text-emerald-700" : "text-amber-700"}`}>
                        <CheckCircle2 size={14} /> {discoveryAutoSaved ? "Auto-saved to MongoDB" : "Not saved"}
                      </span>
                    </div>
                  </article>
                ))}
              </section>
            )}

            {prospectStats && <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">{[
              ["Total leads", prospectStats.total], ["High priority", prospectStats.highPriority], ["No website", prospectStats.noWebsite],
              ["Confirmed site errors", prospectStats.confirmedWebsiteErrors], ["Verified ratings", prospectStats.verifiedRatings], ["Public phones", prospectStats.publicPhones],
            ].map(([label, value]) => <div key={label} className="rounded-2xl border border-[#CBD5E1] bg-white p-4"><p className="text-[10px] font-bold uppercase text-[#64748B]">{label}</p><p className="mt-1 text-2xl font-black text-[#0F172A]">{value}</p></div>)}</section>}

            {savedProspects.length > 0 && (
              <section className="rounded-3xl border border-[#CBD5E1] bg-white p-5 sm:p-7">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-extrabold text-[#0F172A]">Saved business prospects</h2>
                    <p className="mt-1 text-xs text-[#64748B]">{savedTotal} records stored in MongoDB · ratings are unavailable from this source</p>
                  </div>
                  <button type="button" onClick={fetchSavedProspects} className="rounded-lg border border-[#CBD5E1] px-3 py-2 text-xs font-bold text-[#334155] hover:bg-slate-50">
                    Refresh
                  </button>
                </div>
                <div className="mb-4 flex flex-wrap gap-2">
                  <input aria-label="Search saved businesses" value={savedQuery} onChange={(event) => { setSavedQuery(event.target.value); setSavedPage(1); }} placeholder="Search business name" className="min-w-[200px] flex-1 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] px-3 py-2 text-sm" />
                  <select aria-label="Filter by website status" value={savedWebsiteStatus} onChange={(event) => { setSavedWebsiteStatus(event.target.value); setSavedPage(1); }} className="rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] px-3 py-2 text-sm">
                    <option value="">All website statuses</option><option value="no_website_listed">No website listed</option><option value="not_checked">Not checked</option><option value="working">Working</option><option value="page_not_found">Page not found</option><option value="server_error">Server error</option><option value="dns_error">DNS error</option><option value="connection_error">Connection error</option><option value="timeout">Timeout</option><option value="needs_manual_review">Manual review</option>
                  </select>
                  <a href={`${backendUrl}/api/admin/lead-discovery/export`} onClick={(event) => { event.preventDefault(); const exportParams = new URLSearchParams(); if (savedWebsiteStatus) exportParams.set("websiteStatus", savedWebsiteStatus); if (savedQuery.trim()) exportParams.set("q", savedQuery.trim()); fetch(`${backendUrl}/api/admin/lead-discovery/export?${exportParams}`, { headers: { Authorization: `Bearer ${adminToken}` } }).then((response) => response.blob()).then((blob) => { const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = "lead-finder-export.csv"; link.click(); URL.revokeObjectURL(url); }); }} className="rounded-lg bg-[#0A4FE0] px-3 py-2 text-xs font-bold text-white">Export CSV</a>
                  <select aria-label="Bulk lead status" defaultValue="" onChange={(event) => { if (event.target.value) bulkUpdateProspects(event.target.value).catch((err) => setDiscoveryError(err.message)); }} className="rounded-lg border border-[#CBD5E1] bg-white px-3 py-2 text-xs"><option value="">Bulk status for selected…</option><option>Reviewed</option><option>Contacted</option><option>Interested</option><option>Follow-up required</option><option>Converted</option><option>Not interested</option><option>Invalid lead</option></select>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1050px] text-left text-sm">
                    <thead className="text-xs uppercase text-[#64748B]">
                      <tr><th className="py-2 pr-3">Select</th><th className="py-2 pr-4">Business</th><th className="py-2 pr-4">Category</th><th className="py-2 pr-4">Rating</th><th className="py-2 pr-4">Phone</th><th className="py-2 pr-4">Website status</th><th className="py-2 pr-4">Score</th><th className="py-2 pr-4">Lead status</th><th className="py-2 pr-4">Location</th><th className="py-2">Actions</th></tr>
                    </thead>
                    <tbody>
                      {savedProspects.map((prospect) => (
                        <tr key={prospect._id || prospect.id} className="border-t border-[#E2E8F0]">
                          <td className="py-3 pr-3"><input aria-label={`Select ${prospect.name}`} type="checkbox" checked={selectedProspects.includes(prospect._id)} onChange={(event) => setSelectedProspects((current) => event.target.checked ? [...current, prospect._id] : current.filter((id) => id !== prospect._id))} /></td>
                          <td className="py-3 pr-4 font-bold text-[#0F172A]"><button type="button" onClick={() => setSelectedProspect(prospect)} className="text-left hover:text-[#0A4FE0]">{prospect.name}</button></td>
                          <td className="py-3 pr-4">{prospect.category || "Not available"}</td>
                          <td className="py-3 pr-4">Not available</td>
                          <td className="py-3 pr-4">{prospect.phone ? <a className="text-[#0A4FE0]" href={`tel:${prospect.phone}`}>{prospect.phone}</a> : "Not available"}</td>
                          <td className="py-3 pr-4"><span className="rounded-full bg-slate-100 px-2 py-1 text-xs">{prospect.websiteStatus || "not_checked"}</span>{prospect.websiteHttpStatus ? ` · ${prospect.websiteHttpStatus}` : ""}{/^https?:\/\//i.test(prospect.websiteUrl || "") && <a className="mt-1 block max-w-[180px] truncate text-xs text-[#0A4FE0]" href={prospect.websiteUrl} target="_blank" rel="noreferrer">{prospect.websiteUrl}</a>}</td>
                          <td className="py-3 pr-4">{prospect.leadScore || 0} · {prospect.leadPriority || "Low"}</td>
                          <td className="py-3 pr-4"><select aria-label={`Status for ${prospect.name}`} value={prospect.leadStatus || "New"} onChange={(event) => updateProspectStatus(prospect._id, event.target.value).catch((err) => setDiscoveryError(err.message))} className="rounded border border-[#CBD5E1] p-1"><option>New</option><option>Reviewed</option><option>Contacted</option><option>Interested</option><option>Follow-up required</option><option>Converted</option><option>Not interested</option><option>Invalid lead</option></select></td>
                          <td className="py-3 pr-4">{prospect.district}, {prospect.state}</td>
                          <td className="py-3"><div className="flex items-center gap-2"><button type="button" onClick={() => recheckProspectWebsite(prospect._id).catch((err) => setDiscoveryError(err.message))} className="text-xs font-bold text-[#0A4FE0]">Check site</button><button type="button" onClick={() => { const notes = window.prompt("Admin notes", prospect.notes || ""); if (notes !== null) fetch(`${backendUrl}/api/admin/lead-discovery/leads/${prospect._id}`, { method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` }, body: JSON.stringify({ notes }) }).then(fetchSavedProspects); }} className="text-xs font-bold text-[#0A4FE0]">Notes</button><button type="button" onClick={() => { if (window.confirm(`Delete ${prospect.name}?`)) fetch(`${backendUrl}/api/admin/lead-discovery/leads/${prospect._id}`, { method: "DELETE", headers: { Authorization: `Bearer ${adminToken}` } }).then(fetchSavedProspects); }} className="text-xs font-bold text-rose-600">Delete</button><a className="inline-flex items-center gap-1 text-[#0A4FE0]" href={prospect.sourceUrl} target="_blank" rel="noreferrer">Source <ExternalLink size={12} /></a></div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {selectedProspect && <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-0 sm:items-center sm:p-4" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) setSelectedProspect(null); }}><section role="dialog" aria-modal="true" aria-labelledby="prospect-details-title" className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl"><div className="flex items-start justify-between gap-4"><div><h2 id="prospect-details-title" className="text-xl font-extrabold text-[#0F172A]">{selectedProspect.name}</h2><p className="mt-1 text-sm text-[#64748B]">{selectedProspect.category || "Category not available"} · {selectedProspect.district}, {selectedProspect.state}</p></div><button type="button" onClick={() => setSelectedProspect(null)} className="rounded-lg border px-3 py-2 text-sm font-bold">Close</button></div><dl className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2"><div><dt className="text-xs font-bold uppercase text-slate-500">Address</dt><dd className="mt-1">{selectedProspect.address || "Not available"}</dd></div><div><dt className="text-xs font-bold uppercase text-slate-500">Phone</dt><dd className="mt-1">{selectedProspect.phone || "Not available"}</dd></div><div><dt className="text-xs font-bold uppercase text-slate-500">Rating / reviews</dt><dd className="mt-1">{selectedProspect.ratingVerified ? `${selectedProspect.rating} / 5 (${selectedProspect.reviewCount ?? "reviews unavailable"})` : "Not available from this source"}</dd></div><div><dt className="text-xs font-bold uppercase text-slate-500">Website diagnostic</dt><dd className="mt-1">{selectedProspect.websiteStatus || "not_checked"}{selectedProspect.websiteHttpStatus ? ` · HTTP ${selectedProspect.websiteHttpStatus}` : ""}</dd></div><div><dt className="text-xs font-bold uppercase text-slate-500">Lead score</dt><dd className="mt-1">{selectedProspect.leadScore || 0} ({selectedProspect.leadPriority || "Low"})</dd></div><div><dt className="text-xs font-bold uppercase text-slate-500">Admin notes</dt><dd className="mt-1">{selectedProspect.notes || "None"}</dd></div><div><dt className="text-xs font-bold uppercase text-slate-500">Discovered</dt><dd className="mt-1">{selectedProspect.createdAt ? new Date(selectedProspect.createdAt).toLocaleString() : "Not available"}</dd></div><div><dt className="text-xs font-bold uppercase text-slate-500">Source</dt><dd className="mt-1"><a className="text-[#0A4FE0] underline" href={selectedProspect.sourceUrl} target="_blank" rel="noreferrer">Overture dataset record</a></dd></div></dl><div className="mt-5 flex flex-wrap gap-2">{selectedProspect.phone && <button type="button" onClick={() => navigator.clipboard?.writeText(selectedProspect.phone)} className="rounded-lg border px-3 py-2 text-xs font-bold">Copy phone</button>}<button type="button" onClick={() => recheckProspectWebsite(selectedProspect._id).then((lead) => setSelectedProspect((current) => current ? { ...current, ...lead } : current)).catch((err) => setDiscoveryError(err.message))} className="rounded-lg bg-[#0A4FE0] px-3 py-2 text-xs font-bold text-white">Recheck website</button>{/^https?:\/\//i.test(selectedProspect.websiteUrl || "") && <a href={selectedProspect.websiteUrl} target="_blank" rel="noreferrer" className="rounded-lg border px-3 py-2 text-xs font-bold">Open website</a>}</div></section></div>}
                <div className="mt-4 flex items-center justify-end gap-3 text-xs font-bold text-[#475569]"><button type="button" disabled={savedPage <= 1} onClick={() => setSavedPage((page) => page - 1)} className="rounded border px-3 py-2 disabled:opacity-40">Previous</button><span>Page {savedPage} of {Math.max(1, Math.ceil(savedTotal / 25))}</span><button type="button" disabled={savedPage >= Math.ceil(savedTotal / 25)} onClick={() => setSavedPage((page) => page + 1)} className="rounded border px-3 py-2 disabled:opacity-40">Next</button></div>
                <p className="mt-4 text-[11px] text-[#64748B]">Source: Overture Maps Places. Ratings and review counts are not provided.</p>
              </section>
            )}
            {savedProspects.length === 0 && (
              <section className="rounded-3xl border border-dashed border-[#CBD5E1] bg-white p-10 text-center">
                <h2 className="font-extrabold text-[#0F172A]">No saved businesses on this page</h2>
                <p className="mt-2 text-sm text-[#64748B]">Start a search or adjust the filters. Results only appear when the configured MongoDB connection is available.</p>
              </section>
            )}
          </div>
        )}

        {/* TAB 1: LEADS MANAGEMENT */}
        {activeTab === "leads" && (
          <div className="space-y-6">
            {/* Search & Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-[#CBD5E1] flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
                <input
                  type="text"
                  placeholder="Search leads by name, phone, email, service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium text-[#0F172A] outline-none focus:border-[#0A4FE0]"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <span className="text-xs font-bold text-[#64748B] flex items-center gap-1">
                  <Filter size={14} /> Filter Status:
                </span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#F8FAFC] border border-[#CBD5E1] text-xs font-bold text-[#0F172A] px-4 py-2.5 rounded-xl outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Discussion">In Discussion</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            {/* LEADS LIST / CARDS */}
            {filteredLeads.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#CBD5E1]">
                <p className="text-base font-bold text-[#64748B]">No leads found matching query.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLeads.map((lead, idx) => {
                  const leadId = lead._id || lead.id || idx;
                  const encodedMsg = encodeURIComponent(
                    `Hi ${lead.name || "Client"}, following up from AK WebFlair Technologies regarding your project enquiry for ${lead.service || "software development"}.`
                  );
                  const whatsappUrl = `https://wa.me/${(lead.phone || "").replace(/\D/g, "")}?text=${encodedMsg}`;

                  return (
                    <div
                      key={leadId}
                      className="bg-white rounded-3xl p-6 border border-[#CBD5E1] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#0A4FE0] transition-all"
                    >
                      <div>
                        {/* Card Header: Source & Status */}
                        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3 mb-3">
                          <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-[#EFF6FF] text-[#0A4FE0] border border-[#BFDBFE]">
                            {lead.source || "Naukri-Style AI Agent"}
                          </span>

                          <select
                            value={lead.status || "New"}
                            onChange={(e) => handleUpdateLeadStatus(leadId, e.target.value)}
                            className={`text-[10px] font-black uppercase px-3 py-1 rounded-full outline-none cursor-pointer ${
                              lead.status === "Closed"
                                ? "bg-emerald-100 text-emerald-800"
                                : lead.status === "Contacted"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Discussion">In Discussion</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </div>

                        {/* Client Info */}
                        <h3 className="text-xl font-black text-[#0F172A] tracking-tight">{lead.name}</h3>

                        <div className="space-y-1.5 mt-3 text-xs font-medium text-[#475569]">
                          <div className="flex items-center gap-2">
                            <Phone size={14} className="text-[#0A4FE0]" />
                            <a href={`tel:${lead.phone}`} className="font-bold text-[#0F172A] hover:underline">
                              {lead.phone}
                            </a>
                          </div>
                          {lead.email && (
                            <div className="flex items-center gap-2">
                              <Mail size={14} className="text-[#0A4FE0]" />
                              <a href={`mailto:${lead.email}`} className="truncate hover:underline">
                                {lead.email}
                              </a>
                            </div>
                          )}
                          <div className="flex items-center gap-2 pt-1">
                            <Briefcase size={14} className="text-[#0A4FE0]" />
                            <span className="font-bold text-[#0F172A]">{lead.service}</span>
                          </div>
                          {lead.language && (
                            <p className="pl-5 text-[10px] text-slate-500">Chat language: {lead.language}</p>
                          )}
                        </div>

                        {/* AI Mindset Analysis */}
                        <div className="mt-4 p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs space-y-1">
                          <p className="text-[10px] font-extrabold uppercase text-[#0A4FE0] flex items-center gap-1">
                            <BrainCircuit size={13} /> AI Mindset Analysis
                          </p>
                          <p className="font-bold text-[#0F172A]">{lead.mindsetIntent || "High Intent Client"}</p>
                          <p className="text-[11px] text-[#64748B]">{lead.suggestedStack || "React, Node.js, PostgreSQL"}</p>
                        </div>

                        {/* Notes */}
                        {lead.comment && (
                          <div className="mt-3 text-xs text-[#64748B] italic bg-[#FFFBEB] p-2.5 rounded-xl border border-[#FDE68A]">
                            "{lead.comment}"
                          </div>
                        )}

                        <VoiceLeadAssistant
                          lead={lead}
                          backendUrl={backendUrl}
                          onSaved={handleVoiceResultSaved}
                        />
                        {lead.callResult && (
                          <div className="mt-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-xs">
                            <p className="font-extrabold text-emerald-900">
                              Voice simulation: {lead.callResult.outcome}
                            </p>
                            {lead.callResult.language && (
                              <p className="mt-1 text-emerald-900"><strong>Language:</strong> {lead.callResult.language}</p>
                            )}
                            {lead.callResult.budget && (
                              <p className="mt-1 text-emerald-900"><strong>Budget:</strong> {lead.callResult.budget}</p>
                            )}
                            {lead.callResult.requirements && (
                              <p className="mt-1 text-emerald-900"><strong>Goal:</strong> {lead.callResult.requirements}</p>
                            )}
                            {lead.callResult.requestedFeatures && (
                              <p className="mt-1 text-emerald-900"><strong>Features:</strong> {lead.callResult.requestedFeatures}</p>
                            )}
                            {lead.callResult.followUp && (
                              <p className="mt-1 text-emerald-900"><strong>Next step:</strong> {lead.callResult.followUp}</p>
                            )}
                            {lead.callResult.completedAt && (
                              <p className="mt-1 text-[10px] text-emerald-800">
                                {new Date(lead.callResult.completedAt).toLocaleString()}
                              </p>
                            )}
                            <p className="mt-2 text-[10px] text-emerald-800">
                              Simulation only—the lead did not hear or answer this. Confirm directly before updating status or treating this as a sale.
                            </p>
                            {lead.callResult.transcript?.length > 0 && (
                              <details className="mt-2">
                                <summary className="cursor-pointer font-bold text-emerald-900">Review conversation transcript</summary>
                                <div className="mt-2 max-h-40 space-y-2 overflow-y-auto rounded-lg bg-white p-2">
                                  {lead.callResult.transcript.map((entry, index) => (
                                    <p key={`${entry.speaker}-${index}`} className="text-slate-700">
                                      <strong>{entry.speaker}:</strong> {entry.text}
                                    </p>
                                  ))}
                                </div>
                              </details>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Card Footer: WhatsApp & Delete */}
                      <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between gap-2">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold py-2.5 rounded-xl text-xs shadow-sm transition-all"
                        >
                          <FaWhatsappIcon size={16} />
                          <span>WhatsApp Lead</span>
                        </a>

                        <button
                          onClick={() => handleDeleteLead(leadId)}
                          className="p-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGEMENT */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-[#CBD5E1]">
              <h3 className="text-lg font-extrabold">Manage Portfolio Projects</h3>
              <button
                onClick={() => {
                  setProjectForm({ id: null, title: "", category: "CRM & UI Dashboards", description: "", img: "", website: "" });
                  setShowProjectModal(true);
                }}
                className="inline-flex items-center gap-2 bg-[#0A4FE0] hover:bg-[#0639A8] text-white font-extrabold px-5 py-2.5 rounded-xl text-xs cursor-pointer"
              >
                <Plus size={16} />
                <span>Add New Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div key={proj._id || proj.id} className="bg-white rounded-3xl p-5 border border-[#CBD5E1] shadow-xs space-y-3">
                  {proj.img && (
                    <img src={proj.img} alt={proj.title} className="w-full h-40 object-cover rounded-2xl border border-[#E2E8F0]" />
                  )}
                  <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-[#EFF6FF] text-[#0A4FE0]">
                    {proj.category}
                  </span>
                  <h4 className="text-lg font-black">{proj.title}</h4>
                  <p className="text-xs text-[#64748B] line-clamp-2">{proj.description}</p>

                  <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
                    {proj.website && (
                      <a href={proj.website} target="_blank" rel="noreferrer" className="text-xs font-bold text-[#0A4FE0] hover:underline flex items-center gap-1">
                        <ExternalLink size={13} /> Visit Site
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PARTNERS MANAGEMENT */}
        {activeTab === "partners" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-[#CBD5E1]">
              <h3 className="text-lg font-extrabold">Manage Client Partner Logos</h3>
              <button
                onClick={() => setShowPartnerModal(true)}
                className="inline-flex items-center gap-2 bg-[#0A4FE0] text-white font-extrabold px-5 py-2.5 rounded-xl text-xs cursor-pointer"
              >
                <Plus size={16} />
                <span>Add Partner Logo</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {partners.map((partner, pIdx) => (
                <div key={pIdx} className="bg-white p-4 rounded-2xl border border-[#CBD5E1] text-center space-y-2">
                  {partner.icon ? (
                    <img src={partner.icon} alt={partner.name} className="h-10 mx-auto object-contain" />
                  ) : (
                    <Building2 className="mx-auto text-[#0A4FE0]" size={28} />
                  )}
                  <p className="text-xs font-bold truncate">{partner.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: GOOGLE REVIEWS & FEEDBACK */}
        {activeTab === "feedback" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-[#CBD5E1]">
              <h3 className="text-lg font-extrabold">Extracted Google Reviews & Client Feedback ({feedbacks.length})</h3>
              <span className="text-xs font-bold text-[#0A4FE0] bg-[#EFF6FF] px-3.5 py-1.5 rounded-full border border-[#BFDBFE]">
                Synced with MongoDB & Database
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {feedbacks.map((item, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-5 border border-[#CBD5E1] shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-extrabold text-[#0F172A]">
                        {item.profileUrl ? (
                          <a href={item.profileUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#0A4FE0] transition-colors">
                            {item.name}
                          </a>
                        ) : (
                          item.name
                        )}
                      </h4>
                      <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        ★ {item.rating || 5}.0
                      </span>
                    </div>

                    <p className="text-xs text-[#475569] font-medium leading-relaxed italic">
                      "{item.comment || "Great work!"}"
                    </p>

                    {item.ownerReply && (
                      <div className="bg-[#EFF6FF] p-2.5 rounded-xl border border-[#BFDBFE] text-[11px] text-[#1E40AF]">
                        <span className="font-bold block text-[10px] text-[#0A4FE0]">Owner Reply:</span>
                        {item.ownerReply}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
                    <span className="truncate max-w-[60%]">{item.badge || "Google Review"}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SERVER HEALTH & TELEGRAM ALERTS */}
        {activeTab === "health" && (
          <div className="space-y-6">
            {/* TELEGRAM STATUS & ACTION BANNER */}

            <div className="bg-gradient-to-r from-[#0639A8] via-[#0A4FE0] to-[#2563EB] text-white p-6 rounded-3xl shadow-lg border border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-inner">
                  <FaTelegramPlane size={30} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black tracking-tight">Telegram Alert Bot Active</h3>
                    <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      LIVE DISPATCH
                    </span>
                  </div>
                  <p className="text-xs text-blue-100 mt-1 font-medium">
                    Monitoring Render free tier cold-starts, downtime (500/502/503), and email quota/limits.
                  </p>
                  <p className="text-[11px] font-mono text-blue-200/80 mt-1">
                    Connected Group: <span className="font-bold text-white">Ak_webflair_alerts</span> (<span className="text-white font-semibold">-1003727922444</span>)
                  </p>

                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 relative z-10">
                <button
                  onClick={handleTestTelegram}
                  disabled={isTestingTelegram}
                  className="flex items-center gap-2 bg-white text-[#0A4FE0] hover:bg-blue-50 font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  <Send size={14} className={isTestingTelegram ? "animate-spin" : ""} />
                  <span>{isTestingTelegram ? "Sending Alert..." : "Send Test Telegram Alert"}</span>
                </button>

                <button
                  onClick={handlePingAll}
                  disabled={isPingingAll}
                  className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all border border-white/20 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw size={14} className={isPingingAll ? "animate-spin" : ""} />
                  <span>{isPingingAll ? "Pinging All..." : "Ping All Servers Now"}</span>
                </button>

                <button
                  onClick={() => setShowServiceModal(true)}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add URL</span>
                </button>
              </div>

              {/* Status Toast */}
              {telegramStatusMsg && (
                <div
                  className={`absolute bottom-2 left-6 right-6 p-2.5 rounded-xl text-xs font-bold text-center z-20 ${
                    telegramStatusMsg.type === "success"
                      ? "bg-emerald-500/90 text-white"
                      : "bg-rose-500/90 text-white"
                  }`}
                >
                  {telegramStatusMsg.text}
                </div>
              )}
            </div>

            {/* MONITORED DEPLOYED BACKENDS GRID */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-base font-extrabold text-[#0F172A]">Monitored Deployed Backends ({services.length})</h4>
                  <p className="text-xs text-[#64748B]">Auto-ping keeps Render free tiers awake & detects downtime</p>
                </div>
                <span className="text-xs font-bold text-[#64748B] bg-white px-3 py-1.5 rounded-xl border border-[#CBD5E1]">
                  Interval: Every 10 Mins
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {services.map((svc) => {
                  const isOnline = svc.lastStatus === "online";
                  const isColdBoot = svc.lastStatus === "cold_boot";
                  const isOffline = svc.lastStatus === "offline";

                  return (
                    <div
                      key={svc._id || svc.name}
                      className="bg-white rounded-3xl p-6 border border-[#CBD5E1] shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold uppercase text-[#64748B] tracking-wider">
                              Backend Service
                            </span>
                            <h5 className="text-base font-extrabold text-[#0F172A] leading-snug">{svc.name}</h5>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] font-extrabold flex items-center gap-1.5 ${
                              isOnline
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : isColdBoot
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : isOffline
                                ? "bg-rose-50 text-rose-700 border border-rose-200"
                                : "bg-slate-100 text-slate-700 border border-slate-200"
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isOnline
                                  ? "bg-emerald-500"
                                  : isColdBoot
                                  ? "bg-amber-500"
                                  : isOffline
                                  ? "bg-rose-500 animate-ping"
                                  : "bg-slate-400"
                              }`}
                            />
                            {isOnline
                              ? "ONLINE (200)"
                              : isColdBoot
                              ? "COLD BOOT"
                              : isOffline
                              ? "OFFLINE / DOWN"
                              : "CHECKING..."}
                          </span>
                        </div>

                        {/* URL */}
                        <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                          <span className="text-[11px] font-mono text-[#475569] truncate max-w-[200px]">{svc.url}</span>
                          <a
                            href={svc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0A4FE0] hover:text-[#0639A8]"
                          >
                            <ExternalLink size={13} />
                          </a>
                        </div>

                        {/* Stats Strip */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-[#F1F5F9] p-2.5 rounded-xl">
                            <span className="text-[10px] font-bold text-[#64748B] block">Latency</span>
                            <span className="font-mono font-bold text-[#0F172A]">
                              {svc.lastLatencyMs ? `${svc.lastLatencyMs} ms` : "--"}
                            </span>
                          </div>
                          <div className="bg-[#F1F5F9] p-2.5 rounded-xl">
                            <span className="text-[10px] font-bold text-[#64748B] block">Status Code</span>
                            <span className="font-mono font-bold text-[#0F172A]">
                              {svc.lastStatusCode ? `HTTP ${svc.lastStatusCode}` : "--"}
                            </span>
                          </div>
                        </div>

                        {svc.lastError && (
                          <div className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-medium">
                            <span className="font-bold">Error:</span> {svc.lastError}
                          </div>
                        )}
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#94A3B8]">
                          {svc.lastChecked ? new Date(svc.lastChecked).toLocaleTimeString() : "Pending"}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handlePingService(svc._id)}
                            disabled={isPingingId === svc._id}
                            className="flex items-center gap-1.5 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#0A4FE0] font-extrabold text-[11px] px-3 py-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                          >
                            <RefreshCw size={12} className={isPingingId === svc._id ? "animate-spin" : ""} />
                            <span>Ping</span>
                          </button>
                          {svc.name !== "AK Webflair Central Backend" && (
                            <button
                              onClick={() => handleDeleteService(svc._id)}
                              className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg transition-colors cursor-pointer"
                              title="Delete from monitor"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* LIVE SYSTEM LOGS & CRITICAL ALERTS */}
            <div className="bg-white rounded-3xl p-6 border border-[#CBD5E1] shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-extrabold text-[#0F172A] flex items-center gap-2">
                    <Terminal size={18} className="text-[#0A4FE0]" />
                    Central System Logs & Telegram Event Stream ({logs.length})
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    Aggregated runtime logs, Render cold boots, and email service statuses
                  </p>
                </div>

                <button
                  onClick={handleClearLogs}
                  className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-extrabold px-3.5 py-2 rounded-xl text-xs transition-colors border border-rose-200 cursor-pointer self-start md:self-auto"
                >
                  <Trash2 size={13} />
                  <span>Clear Logs</span>
                </button>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={14} />
                  <input
                    type="text"
                    placeholder="Search logs message or type..."
                    value={logSearchQuery}
                    onChange={(e) => setLogSearchQuery(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-[#0F172A] outline-none"
                  />
                </div>

                <select
                  value={logProjectFilter}
                  onChange={(e) => setLogProjectFilter(e.target.value)}
                  className="bg-[#F8FAFC] border border-[#CBD5E1] text-xs font-bold text-[#0F172A] px-3 py-2 rounded-xl outline-none"
                >
                  <option value="ALL">All Projects</option>
                  {services.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>

                <select
                  value={logLevelFilter}
                  onChange={(e) => setLogLevelFilter(e.target.value)}
                  className="bg-[#F8FAFC] border border-[#CBD5E1] text-xs font-bold text-[#0F172A] px-3 py-2 rounded-xl outline-none"
                >
                  <option value="ALL">All Severities</option>
                  <option value="critical">🚨 Critical Only</option>
                  <option value="warn">⚠️ Warnings Only</option>
                  <option value="error">🔴 Errors Only</option>
                  <option value="info">ℹ️ Info Only</option>
                </select>
              </div>

              {/* Logs Stream Table */}
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {logs
                  .filter((l) => {
                    const matchesProj = logProjectFilter === "ALL" || l.projectName === logProjectFilter;
                    const matchesLvl = logLevelFilter === "ALL" || l.level === logLevelFilter;
                    const matchesQ =
                      !logSearchQuery ||
                      l.message?.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
                      l.type?.toLowerCase().includes(logSearchQuery.toLowerCase());
                    return matchesProj && matchesLvl && matchesQ;
                  })
                  .map((logItem, idx) => {
                    const isCritical = logItem.level === "critical";
                    const isWarn = logItem.level === "warn";
                    const isError = logItem.level === "error";

                    return (
                      <div
                        key={logItem._id || idx}
                        className={`p-3.5 rounded-2xl border text-xs flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                          isCritical
                            ? "bg-rose-50/60 border-rose-200 text-rose-950"
                            : isWarn
                            ? "bg-amber-50/60 border-amber-200 text-amber-950"
                            : isError
                            ? "bg-red-50/60 border-red-200 text-red-950"
                            : "bg-[#F8FAFC] border-[#E2E8F0] text-[#1E293B]"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase shrink-0 mt-0.5 ${
                              isCritical
                                ? "bg-rose-600 text-white"
                                : isWarn
                                ? "bg-amber-500 text-white"
                                : isError
                                ? "bg-red-600 text-white"
                                : "bg-blue-600 text-white"
                            }`}
                          >
                            {logItem.level}
                          </span>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#0F172A]">{logItem.projectName}</span>
                              <span className="text-[10px] font-mono text-[#64748B] bg-white px-2 py-0.5 rounded border border-[#CBD5E1]">
                                {logItem.type}
                              </span>
                              {logItem.telegramSent && (
                                <span className="flex items-center gap-1 text-[10px] font-bold text-[#0A4FE0] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                                  <FaTelegramPlane size={10} /> Telegram Alert Dispatched
                                </span>
                              )}
                            </div>
                            <p className="mt-1 font-medium leading-relaxed">{logItem.message}</p>
                          </div>
                        </div>

                        <div className="text-[11px] font-mono text-[#64748B] shrink-0 text-right">
                          {new Date(logItem.createdAt).toLocaleString("en-IN", {
                            dateStyle: "short",
                            timeStyle: "medium",
                          })}
                        </div>
                      </div>
                    );
                  })}

                {logs.length === 0 && (
                  <div className="p-8 text-center text-slate-400 font-bold bg-[#F8FAFC] rounded-2xl border border-dashed border-[#CBD5E1]">
                    No system logs recorded yet. Everything is functioning normally!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>


      {/* PROJECT MODAL */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl space-y-4">
            <h3 className="text-2xl font-black text-[#0F172A]">Add Portfolio Project</h3>
            <form onSubmit={handleSaveProject} className="space-y-3 text-xs font-medium">
              <div>
                <label className="block text-[10px] font-bold uppercase mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#CBD5E1] outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase mb-1">Category</label>
                <select
                  value={projectForm.category}
                  onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#CBD5E1] outline-none bg-white"
                >
                  <option>CRM & UI Dashboards</option>
                  <option>Landing & E-Commerce</option>
                  <option>Python AI Automation Agents</option>
                  <option>MERN & PostgreSQL Full-Stack</option>
                  <option>Flutter & React Native Mobile Apps</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase mb-1">Image URL</label>
                <input
                  type="text"
                  value={projectForm.img}
                  onChange={(e) => setProjectForm({ ...projectForm, img: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#CBD5E1] outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase mb-1">Live Website URL</label>
                <input
                  type="text"
                  value={projectForm.website}
                  onChange={(e) => setProjectForm({ ...projectForm, website: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#CBD5E1] outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#CBD5E1] outline-none resize-none"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="flex-1 py-3 rounded-xl bg-[#F1F5F9] font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-[#0A4FE0] text-white font-extrabold">
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PARTNER MODAL */}
      {showPartnerModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-4">
            <h3 className="text-2xl font-black text-[#0F172A]">Add Partner Brand</h3>
            <form onSubmit={handleSavePartner} className="space-y-3 text-xs font-medium">
              <div>
                <label className="block text-[10px] font-bold uppercase mb-1">Partner Brand Name</label>
                <input
                  type="text"
                  required
                  value={partnerForm.name}
                  onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#CBD5E1] outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase mb-1">Logo Image URL</label>
                <input
                  type="text"
                  required
                  value={partnerForm.icon}
                  onChange={(e) => setPartnerForm({ ...partnerForm, icon: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#CBD5E1] outline-none"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPartnerModal(false)}
                  className="flex-1 py-3 rounded-xl bg-[#F1F5F9] font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-[#0A4FE0] text-white font-extrabold">
                  Add Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD MONITORED SERVICE MODAL */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-4">
            <h3 className="text-2xl font-black text-[#0F172A]">Monitor New Backend URL</h3>
            <p className="text-xs text-[#64748B]">
              This URL will be pinged automatically to stay awake on Render and trigger Telegram alerts if down.
            </p>
            <form onSubmit={handleSaveService} className="space-y-3 text-xs font-medium">
              <div>
                <label className="block text-[10px] font-bold uppercase mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. My New Client API"
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#CBD5E1] outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase mb-1">Backend Target URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://my-app.onrender.com"
                  value={serviceForm.url}
                  onChange={(e) => setServiceForm({ ...serviceForm, url: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#CBD5E1] outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase mb-1">Health Path (optional)</label>
                <input
                  type="text"
                  placeholder="/"
                  value={serviceForm.healthPath}
                  onChange={(e) => setServiceForm({ ...serviceForm, healthPath: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#CBD5E1] outline-none"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowServiceModal(false)}
                  className="flex-1 py-3 rounded-xl bg-[#F1F5F9] font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-[#0A4FE0] text-white font-extrabold">
                  Start Monitoring
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


export default AdminDashboard;
