import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { FaWhatsapp as FaWhatsappIcon, FaTelegramPlane } from "react-icons/fa";

const DEFAULT_EMAIL = "akwebflairtechnologies@gmail.com";
const DEFAULT_PASS = "Kavin20#";

const AdminDashboard = () => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("ak_admin_authed") === "true"
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

  // Health Monitoring & Logs State
  const [services, setServices] = useState([]);
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
      if (data.success || res.ok) {
        setIsAuthenticated(true);
        localStorage.setItem("ak_admin_authed", "true");
        fetchData();
      } else {
        setAuthError(data.message || "Invalid Email or Password");
      }
    } catch (err) {
      if (loginEmail === DEFAULT_EMAIL && loginPass === DEFAULT_PASS) {
        setIsAuthenticated(true);
        localStorage.setItem("ak_admin_authed", "true");
        fetchData();
      } else {
        setAuthError("Failed to connect to backend server.");
      }
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("ak_admin_authed");
  };

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
      await fetch(`${backendUrl}/api/leads/${leadId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setLeads((prev) =>
        prev.map((l) => (l._id === leadId || l.id === leadId ? { ...l, status: newStatus } : l))
      );
    } catch (err) {
      alert("Failed to update status");
    }
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
            { id: "projects", label: `Projects (${projects.length})`, icon: Layers },
            { id: "partners", label: `Partners (${partners.length})`, icon: Building2 },
            { id: "health", label: `Server Health & Telegram (${services.length})`, icon: Activity },
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
                    Connected Chat ID: <span className="font-bold text-white">6739761210</span> (Kavin M M)
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
