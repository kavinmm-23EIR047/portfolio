import { motion as Motion } from "framer-motion";

const PageIntro = ({ eyebrow, title, accent, copy }) => <section className="page-intro"><div className="page-intro-glow" /><Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}><span><i /> {eyebrow}</span><h1>{title} <em>{accent}</em></h1><p>{copy}</p></Motion.div></section>;

export default PageIntro;
