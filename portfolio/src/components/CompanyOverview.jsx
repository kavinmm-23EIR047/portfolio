import { motion as Motion } from "framer-motion";
import { BarChart3, Bot, ChevronRight, Code2, HeartHandshake, LineChart, SearchCheck, Smartphone, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import { companyProfile } from "../data/companyData";

const icons = [Code2, UsersRound, Bot, Smartphone, SearchCheck, BarChart3];

const CompanyOverview = () => <>
  <section className="company-overview">
    <div className="company-overview-shell">
      <Motion.div initial={{ opacity: 0, x: -22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="company-overview-lead">
        <span className="company-kicker"><i /> WHAT WE HELP YOU BUILD</span>
        <h2>One technical partner for the work that <em>moves your business forward.</em></h2>
        <p>WebFlair connects customer-facing experiences with the systems behind them. We build clear digital products, automate operations, and stay involved after launch.</p>
        <Link to="/services" className="company-overview-link">Explore capabilities <ChevronRight size={17} /></Link>
      </Motion.div>
      <div className="company-service-grid">
        {companyProfile.services.map((service, index) => { const Icon = icons[index]; return <Motion.article key={service.id} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .055 }}><span><Icon size={21} /></span><h3>{service.name}</h3><p>{service.summary}</p><small>{service.outcomes[0]}</small></Motion.article>; })}
      </div>
    </div>
  </section>
  <section className="company-process">
    <div className="company-process-shell">
      <Motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="company-process-intro"><span className="company-kicker"><i /> OUR WAY OF WORKING</span><h2>Clear stages. Visible progress. Better outcomes.</h2><p>Every engagement follows a focused path that keeps business goals, customer experience, and technical quality connected.</p></Motion.div>
      <div className="company-process-grid">{companyProfile.process.map((step, index) => <Motion.article key={step.number} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }}><b>{step.number}</b><h3>{step.title}</h3><p>{step.copy}</p></Motion.article>)}</div>
      <Motion.div initial={{ opacity: 0, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="company-culture-note"><HeartHandshake /><div><b>How we show up</b><p>Direct communication, useful innovation, and shared ownership from the first conversation to ongoing support.</p></div><LineChart /></Motion.div>
    </div>
  </section>
</>;

export default CompanyOverview;
