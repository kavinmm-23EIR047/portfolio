export const companyProfile = {
  name: "AK WebFlair Technologies",
  shortName: "WebFlair",
  location: "Tiruppur, Tamil Nadu, India",
  phone: "+91 96007 32162",
  phoneSecondary: "+91 93632 65477",
  whatsapp: "+91 96007 32162",
  email: "akwebflairtechnologies@gmail.com",
  tagline: "CRM systems, UI dashboards, e-commerce stores, AI automation agents, and full-stack mobile apps.",
  services: [
    {
      id: "crm",
      name: "CRM Platforms & UI Dashboards",
      summary: "Custom CRM platforms, executive analytics dashboards, lead pipelines, and real-time operational controls engineered for high productivity.",
      outcomes: ["Custom CRM Systems", "Analytics UI Dashboards", "Sales Pipelines", "Role-Based Portals"],
      stack: ["React", "Node.js", "PostgreSQL", "MongoDB", "Express"],
    },
    {
      id: "ecommerce",
      name: "Landing & E-Commerce Platforms",
      summary: "High-converting landing pages, scalable D2C/B2B e-commerce stores, checkout engines, and product catalogues optimized for revenue.",
      outcomes: ["E-Commerce Storefronts", "Landing Pages", "Payment Gateways", "Conversion Flow"],
      stack: ["Next.js", "React", "Razorpay", "PostgreSQL", "TailwindCSS"],
    },
    {
      id: "ai",
      name: "Python AI Automation Agents",
      summary: "Intelligent autonomous AI agents, automated customer routing, LangChain/LLM workflows, and smart integrations that eliminate manual follow-up.",
      outcomes: ["Autonomous AI Agents", "Workflow Automation", "LLM Customer Bots", "Smart Webhook Routing"],
      stack: ["Python", "LangChain", "FastAPI", "OpenAI / LLMs", "PostgreSQL"],
    },
    {
      id: "fullstack",
      name: "MERN & PostgreSQL Full-Stack Engineering",
      summary: "High-throughput REST and GraphQL backend architectures, PostgreSQL relational database modeling, and scalable MERN stack web applications.",
      outcomes: ["MERN Web Apps", "PostgreSQL Relational DB", "RESTful APIs", "Cloud Deployments"],
      stack: ["MongoDB", "Express.js", "React.js", "Node.js", "PostgreSQL"],
    },
    {
      id: "apps",
      name: "Flutter & React Native Mobile Apps",
      summary: "Cross-platform iOS and Android mobile apps engineered with 60fps animations, native device features, and instant offline caching.",
      outcomes: ["Flutter Mobile Apps", "React Native iOS/Android", "Offline Sync", "Store Deployment"],
      stack: ["Flutter", "React Native", "Dart", "Firebase", "REST APIs"],
    },
    {
      id: "seo",
      name: "SEO & Performance Optimization",
      summary: "Technical SEO, 100/100 Core Web Vitals, SSR rendering, Schema.org metadata, and lightning speed foundations that drive search visibility.",
      outcomes: ["100/100 Core Web Vitals", "Technical SEO", "Schema.org Markup", "High Search Rankings"],
      stack: ["Next.js SSR", "Google Lighthouse", "Schema Markup", "Edge Caching"],
    },
  ],
  industries: ["Retail & E-Commerce", "Service Businesses", "Startups & SaaS", "Teams & Operations"],
  process: [
    { number: "01", title: "Discover", copy: "We learn how your business works, where customers get stuck, and what success should look like." },
    { number: "02", title: "Shape", copy: "We turn priorities into a focused product plan, clear user journeys, and a practical delivery roadmap." },
    { number: "03", title: "Build", copy: "Our team designs, engineers, tests, and connects the product in visible, measurable stages." },
    { number: "04", title: "Improve", copy: "After launch, we support the product with optimisation, analysis, and the next improvements that matter." },
  ],
  culture: [
    { title: "Straight communication", copy: "You see what is being built, why it matters, and what comes next." },
    { title: "Useful innovation", copy: "We use AI and new technology when it creates a clear operational or customer benefit." },
    { title: "Shared ownership", copy: "We treat delivery, quality, and long-term reliability as our responsibility." },
  ],
};

const serviceKeywords = {
  crm: ["crm", "dashboard", "dashboards", "customer", "lead", "pipeline", "sales", "portal", "admin"],
  ecommerce: ["ecommerce", "e-commerce", "landing", "landing page", "store", "shop", "checkout", "cart", "products"],
  ai: ["ai", "agent", "agents", "automation", "python", "chatbot", "workflow", "llm", "langchain", "bot"],
  fullstack: ["mern", "postgres", "postgresql", "node", "express", "mongo", "mongodb", "backend", "fullstack", "api"],
  apps: ["app", "apps", "mobile", "flutter", "react native", "android", "ios", "cross platform"],
  seo: ["seo", "speed", "performance", "google", "ranking", "core web vitals", "vitals", "optimization"],
};

export function getAgentReply(question) {
  const input = question.toLowerCase().trim();
  if (!input) return "Tell me what you are planning and I will point you to the right WebFlair capability.";
  if (/hello|hi |hey|good morning|good evening/.test(input)) return "Hello — I’m the WebFlair project assistant. I can explain our services in CRM & UI Dashboards, Landing & E-Commerce, Python AI Agents, MERN, Postgres, Flutter, React Native, and SEO optimization.";
  if (/mern|postgres|postgresql|database|node|express|mongo/.test(input)) return "WebFlair specializes in MERN Stack (MongoDB, Express, React, Node.js) and PostgreSQL for high-scale, secure, and production-grade full-stack architectures.";
  if (/flutter|react native|mobile|ios|android/.test(input)) return "We build cross-platform mobile apps for iOS and Android using Flutter and React Native with 60fps performance, offline caching, and native device integrations.";
  if (/python|ai|agent|automation/.test(input)) return "We build autonomous Python AI automation agents and LLM-powered workflows that connect CRM data, qualify leads, and handle routine business operations 24/7.";
  if (/crm|dashboard|ui/.test(input)) return "We engineer custom CRM platforms and real-time UI dashboards with interactive metrics, pipeline tracking, role-based access, and seamless database sync.";
  if (/landing|ecommerce|e-commerce|store|seo/.test(input)) return "We create high-converting landing pages and modern e-commerce storefronts with 100/100 Core Web Vitals speed and technical SEO optimizations.";
  if (/price|cost|budget|quote/.test(input)) return "Project investment depends on the product scope, integrations, and timeline. Share your goal through our contact page and WebFlair will return with a practical scope and estimate.";
  if (/timeline|how long|duration/.test(input)) return "A focused website, dashboard, or prototype can usually move in 2–4 weeks. Full CRM, AI agents, or cross-platform mobile apps are delivered in visible 4–8 week sprints.";
  if (/contact|phone|email|talk|call/.test(input)) return `You can reach the WebFlair team at ${companyProfile.phone} or ${companyProfile.email}. The Support page also has a project enquiry form.`;
  if (/culture|team|work with/.test(input)) return "WebFlair works with direct communication, practical innovation, and shared ownership. You get a focused partner from discovery through ongoing support.";
  
  for (const service of companyProfile.services) {
    if (serviceKeywords[service.id]?.some((keyword) => input.includes(keyword))) {
      return `${service.name}: ${service.summary} Typical outcomes include ${service.outcomes.join(", ")}. Stack: ${service.stack.join(", ")}.`;
    }
  }
  
  if (/process|how do you work|start/.test(input)) return "Our process is Discover, Shape, Build, and Improve. We first understand the business problem, then create a focused plan before engineering and long-term optimisation.";
  return "WebFlair specializes in CRM platforms & UI Dashboards, Landing & E-Commerce, Python AI Automation Agents, MERN Stack, PostgreSQL, Flutter, React Native, and SEO optimization. Which area would you like to explore?";
}
