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
} from "lucide-react";
import { FaWhatsapp as FaWhatsappIcon } from "react-icons/fa";

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
  const [activeTab, setActiveTab] = useState("leads"); // leads, projects, partners, feedback

  // Data states
  const [leads, setLeads] = useState([]);
  const [projects, setProjects] = useState([]);
  const [partners, setPartners] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

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
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

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
    </div>
  );
};

export default AdminDashboard;
