import { useEffect, useState } from "react";
import QuizResults from "./components/QuizResults.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import { generateQuiz, generateStudyTool } from "./services/api.js";
import logo from "./assets/ShibaAI.png";
import { AboutPage, PricingPage, ResourcesPage, FAQPage, ContactPage } from "./components/MarketingPages.jsx";
import { SubjectLibrary, subjects } from "./components/SubjectLibrary.jsx";

const tools = [
  { id: "quiz", icon: "✦", name: "Smart Quiz", description: "Test yourself with adaptive multiple-choice questions." },
  { id: "flashcards", icon: "▱", name: "Flashcards", description: "Turn notes into quick, memorable study cards." },
  { id: "summary", icon: "≡", name: "Quick Summary", description: "Condense long notes into the ideas that matter." },
  { id: "study-guide", icon: "⌑", name: "Study Guide", description: "Build an organized guide for your next exam." },
  { id: "explain", icon: "◎", name: "Explain It", description: "Break down a difficult concept in simple language." },
  { id: "vocabulary", icon: "Aa", name: "Key Terms", description: "Extract essential vocabulary and definitions." },
  { id: "essay-outline", icon: "¶", name: "Essay Outline", description: "Shape notes into a clear, supported argument." },
  { id: "practice", icon: "?", name: "Practice Questions", description: "Generate short-answer prompts for active recall." }
  ,{ id: "mnemonics", icon: "M", name: "Memory Tricks", description: "Create mnemonics and associations that actually stick." }
  ,{ id: "timeline", icon: "↝", name: "Timeline Maker", description: "Put events and processes into a clear sequence." }
  ,{ id: "formula-sheet", icon: "∑", name: "Formula Sheet", description: "Organize formulas, variables, and when to use them." }
  ,{ id: "note-cleanup", icon: "✓", name: "Note Cleanup", description: "Rewrite messy notes into a polished learning resource." }
];

function Chevron() {
  return <svg className="menu-chevron" viewBox="0 0 20 20" aria-hidden="true"><path d="m5.5 7.5 4.5 4.5 4.5-4.5" /></svg>;
}

function Header({ user, onHome, onOpenAuth, onDashboard, onLogout, onProfile, onNavigate, onSearch, theme, onToggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  function mobileNavigate(page) { setMobileOpen(false); onNavigate(page); }
  return (
    <header className="site-header">
      <button className="brand" onClick={onHome} aria-label="ShibaAI home">
        <img src={logo} alt="" />
        <span>Shiba<span>AI</span></span>
      </button>
      <nav>
        <button onClick={onHome}>Home</button>
        <div className="nav-dropdown">
          <button className="dropdown-trigger" onClick={() => onDashboard()}>Study tools <Chevron /></button>
          <div className="tools-dropdown">
            <small>CHOOSE A STUDY TOOL</small>
            <div>{tools.map((tool) => <button key={tool.id} onClick={() => onDashboard(tool.id)}><span>{tool.icon}</span><b>{tool.name}</b></button>)}</div>
          </div>
        </div>
        <button onClick={() => onNavigate("about")}>About</button>
        <button onClick={() => onNavigate("pricing")}>Pricing</button>
        <button onClick={() => onNavigate("subjects")}>Subjects</button>
        <div className="nav-dropdown more-dropdown"><button className="dropdown-trigger">More <Chevron /></button><div className="simple-dropdown"><button onClick={() => onNavigate("resources")}><span>▤</span><div><b>Resources</b><small>Study guides and ideas</small></div></button><button onClick={() => onNavigate("faq")}><span>?</span><div><b>FAQ</b><small>Common questions answered</small></div></button><button onClick={() => onNavigate("contact")}><span>✉</span><div><b>Contact</b><small>Talk with our team</small></div></button></div></div>
      </nav>
      <button className={`mobile-menu-button ${mobileOpen ? "open" : ""}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu"><span /><span /><span /></button>
      <div className="header-actions">
        <button className="icon-header-button" onClick={onSearch} aria-label="Search ShibaAI">⌕</button>
        <button className="icon-header-button" onClick={onToggleTheme} aria-label={`Use ${theme === "dark" ? "light" : "dark"} mode`}>{theme === "dark" ? "☀" : "☾"}</button>
        {user ? (
          <div className="profile-menu">
            <button className="profile-trigger" aria-label="Open profile menu">
              <span className="user-chip">{user.avatar ? <img src={user.avatar} alt="Your profile" /> : user.name.slice(0, 1).toUpperCase()}</span>
              <span className="profile-name">{user.name}</span><Chevron />
            </button>
            <div className="profile-dropdown"><div className="profile-summary"><span className="user-chip">{user.avatar ? <img src={user.avatar} alt="" /> : user.name.slice(0, 1).toUpperCase()}</span><div><strong>{user.name}</strong><small>{user.email}</small></div></div><button onClick={onProfile}>◉ Edit profile</button><button onClick={() => onDashboard()}>✦ My study space</button><button className="logout-item" onClick={onLogout}>↗ Log out</button></div>
          </div>
        ) : (
          <>
            <button className="text-button" onClick={() => onOpenAuth("login")}>Log in</button>
            <button className="small-cta" onClick={() => onOpenAuth("signup")}>Get started</button>
          </>
        )}
      </div>
      {mobileOpen && <div className="mobile-menu"><button onClick={() => mobileNavigate("home")}>Home</button><button onClick={() => { setMobileOpen(false); onDashboard(); }}>Study tools</button><button onClick={() => mobileNavigate("subjects")}>Subject guides</button><button onClick={() => mobileNavigate("about")}>About</button><button onClick={() => mobileNavigate("pricing")}>Pricing</button><button onClick={() => mobileNavigate("resources")}>Resources</button><button onClick={() => mobileNavigate("faq")}>FAQ</button><button onClick={() => mobileNavigate("contact")}>Contact</button></div>}
    </header>
  );
}

function SearchModal({ onClose, onNavigate, onTool }) {
  const [query,setQuery] = useState("");
  const pages = [{id:"home",name:"Home",detail:"ShibaAI overview"},{id:"subjects",name:"Subjects",detail:"Ready-made study guide library"},{id:"about",name:"About",detail:"Our mission and values"},{id:"pricing",name:"Pricing",detail:"Plans for students and schools"},{id:"resources",name:"Resources",detail:"Study strategies and guides"},{id:"faq",name:"FAQ",detail:"Common questions"},{id:"contact",name:"Contact",detail:"Get in touch"}];
  const term = query.trim().toLowerCase();
  const pageMatches = pages.filter((item) => !term || `${item.name} ${item.detail}`.toLowerCase().includes(term));
  const toolMatches = tools.filter((item) => !term || `${item.name} ${item.description}`.toLowerCase().includes(term));
  return <div className="modal-backdrop search-backdrop" onMouseDown={onClose}><section className="search-modal" onMouseDown={(event) => event.stopPropagation()}><div className="search-input"><span>⌕</span><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tools and pages…" aria-label="Search tools and pages"/><button onClick={onClose}>ESC</button></div><div className="search-results">{toolMatches.length > 0 && <div className="search-group"><small>STUDY TOOLS</small>{toolMatches.map((tool) => <button key={tool.id} onClick={() => { onTool(tool.id); onClose(); }}><span>{tool.icon}</span><div><strong>{tool.name}</strong><p>{tool.description}</p></div><b>→</b></button>)}</div>}{pageMatches.length > 0 && <div className="search-group"><small>PAGES</small>{pageMatches.map((page) => <button key={page.id} onClick={() => { onNavigate(page.id); onClose(); }}><span>↗</span><div><strong>{page.name}</strong><p>{page.detail}</p></div><b>→</b></button>)}</div>}{!toolMatches.length && !pageMatches.length && <div className="no-search"><span>🐕</span><h3>No trail found</h3><p>Try a tool name, subject, or page.</p></div>}</div><footer><span>↑↓ Browse</span><span>Enter Select</span><span>Esc Close</span></footer></section></div>;
}

function Footer({ onHome, onStart, user, onLegal }) {
  return <footer className="site-footer"><div className="footer-paws" aria-hidden="true">🐾　🐾　🐾</div><div className="footer-main"><div className="footer-brand"><button className="brand" onClick={onHome}><img src={logo} alt="" /><span>Shiba<span>AI</span></span></button><p>Your friendly AI study copilot—built to turn class notes into confident learning.</p><span className="footer-badge">✦ Learn smarter every day</span></div><div className="footer-column"><strong>Product</strong><button onClick={onHome}>Home</button><button onClick={() => onStart("quiz")}>Dashboard</button><button onClick={() => onStart("study-guide")}>Study guides</button></div><div className="footer-column"><strong>Popular tools</strong><button onClick={() => onStart("quiz")}>Smart Quiz</button><button onClick={() => onStart("flashcards")}>Flashcards</button><button onClick={() => onStart("summary")}>Quick Summary</button><button onClick={() => onStart("explain")}>Explain It</button></div><div className="footer-column"><strong>Account & support</strong><button onClick={() => onStart()}>{user ? "My study space" : "Create account"}</button><a href="mailto:hello@shibaai.app">Contact</a><button onClick={() => onLegal("privacy")}>Privacy policy</button><button onClick={() => onLegal("terms")}>Terms of use</button></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} ShibaAI. Made for curious minds.</span><div><button onClick={() => onLegal("privacy")}>Privacy</button><button onClick={() => onLegal("terms")}>Terms</button></div></div></footer>;
}

const legalCopy = {
  privacy: { title: "Privacy Policy", updated: "August 4, 2026", sections: [
    ["The short version", "ShibaAI is designed to help you study, not to sell your attention. This prototype stores account details, profile photos, and recent study history in your own browser. Study material is sent to our server and the configured AI provider only when you ask ShibaAI to generate something."],
    ["Information we process", "We may process the name and email you enter, an optional profile image, notes or topics you submit, generated study materials, basic technical logs, and service-error information. Do not submit passwords, financial information, health records, or other highly sensitive personal data as study material."],
    ["How information is used", "Information is used to provide study tools, remember local preferences, operate and secure the service, diagnose failures, prevent abuse, and improve product quality. We do not sell personal information or use study notes for targeted advertising."],
    ["AI processing", "Submitted study material is transmitted to the backend and may be processed by Google Gemini to produce your requested output. AI systems can make mistakes. Review generated material before relying on it for schoolwork or important decisions."],
    ["Storage and retention", "In the current prototype, profile and study-history data remains in browser local storage until you clear it, remove it through the interface, or clear browser data. Server and hosting providers may temporarily retain operational logs according to their own retention practices."],
    ["Children and students", "ShibaAI is an educational tool. Users under the age required to consent to online services in their location should use ShibaAI only with permission from a parent, guardian, school, or authorized educator."],
    ["Your choices", "You can edit or remove your profile photo, clear recent study sessions, log out, clear browser storage, and stop using the service. You may contact hello@shibaai.app with privacy questions or deletion requests."],
    ["Changes", "We may update this policy as ShibaAI adds real accounts, cloud storage, analytics, or subscriptions. Material changes will be reflected by a new effective date and, when appropriate, an in-product notice."]
  ]},
  terms: { title: "Terms of Use", updated: "August 4, 2026", sections: [
    ["Accepting these terms", "By accessing or using ShibaAI, you agree to these Terms. If you do not agree, do not use the service. If you use ShibaAI for a school or organization, you confirm that you are authorized to follow its policies."],
    ["Educational purpose", "ShibaAI provides study assistance and AI-generated educational material. It does not guarantee grades, factual accuracy, originality, or acceptance by an instructor. You are responsible for checking outputs and following your school’s academic-integrity and AI-use rules."],
    ["Your responsibilities", "Use the service lawfully and respectfully. Do not attempt to disrupt the service, bypass limits, access another user’s information, submit malicious code, reverse engineer protected systems, or use generated material to impersonate others or facilitate academic dishonesty."],
    ["Your content", "You retain ownership of notes and other material you submit. You grant ShibaAI a limited permission to process that material solely to operate, secure, and improve the requested service. You confirm that you have the right to submit the content."],
    ["AI-generated content", "Outputs may be incomplete, inaccurate, biased, or similar to content produced for others. Generated material is provided for study support and should not be treated as professional, medical, legal, or financial advice."],
    ["Accounts and availability", "Prototype accounts are stored locally and are not secure production accounts. We may change, suspend, limit, or discontinue features at any time. Service availability can be affected by hosting providers, AI-provider quotas, maintenance, and events outside our control."],
    ["Disclaimer and liability", "The service is provided “as is” and “as available” to the extent permitted by law. ShibaAI disclaims implied warranties and is not liable for indirect, incidental, special, or consequential losses arising from use of the service."],
    ["Contact", "Questions about these Terms can be sent to hello@shibaai.app. These terms may be updated as the product develops; continued use after an update indicates acceptance of the revised terms."]
  ]}
};

function LegalModal({ type, onClose }) {
  const page = legalCopy[type];
  return <div className="modal-backdrop legal-backdrop" onMouseDown={onClose}><article className="legal-modal" onMouseDown={(e) => e.stopPropagation()}><header><div><span className="eyebrow">SHIBAAI LEGAL</span><h1>{page.title}</h1><p>Effective {page.updated}</p></div><button className="modal-close" onClick={onClose}>×</button></header><div className="legal-intro">🐕 Clear rules, plain language, and respect for student privacy.</div>{page.sections.map(([heading,body]) => <section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}<div className="legal-note">This product is still in development. These documents are a practical starting point and should be reviewed by qualified counsel before a commercial launch.</div></article></div>;
}

function CookieNotice({ onPrivacy }) {
  const [visible,setVisible] = useState(() => localStorage.getItem("shibaai-cookie-choice") !== "accepted");
  if (!visible) return null;
  function accept() { localStorage.setItem("shibaai-cookie-choice","accepted"); setVisible(false); }
  return <aside className="cookie-notice"><span>🦴</span><div><strong>A small cookie note</strong><p>ShibaAI uses browser storage to remember your profile, preferences, and recent sessions. No advertising cookies.</p><button onClick={onPrivacy}>Read privacy policy</button></div><button className="cookie-accept" onClick={accept}>Got it</button></aside>;
}

function ProfileModal({ user, onClose, onSave }) {
  const [draft, setDraft] = useState(user);
  const [error, setError] = useState("");
  function upload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError("Choose an image file."); return; }
    if (file.size > 2 * 1024 * 1024) { setError("Profile photos must be under 2 MB."); return; }
    const reader = new FileReader();
    reader.onload = () => { setDraft((current) => ({ ...current, avatar: reader.result })); setError(""); };
    reader.readAsDataURL(file);
  }
  function submit(event) { event.preventDefault(); onSave({ ...draft, name: draft.name.trim() || "Student" }); }
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="auth-modal profile-modal" onMouseDown={(e) => e.stopPropagation()}><button className="modal-close" onClick={onClose}>×</button><h2>Your profile</h2><p>Make your study space feel like yours.</p><div className="avatar-editor"><span className="profile-avatar-large">{draft.avatar ? <img src={draft.avatar} alt="Profile preview" /> : draft.name.slice(0,1).toUpperCase()}</span><div><label className="upload-button">Upload photo<input type="file" accept="image/*" onChange={upload} /></label>{draft.avatar && <button onClick={() => setDraft({ ...draft, avatar: "" })}>Remove</button>}<small>JPG, PNG, or WEBP · max 2 MB</small></div></div>{error && <div className="profile-error">{error}</div>}<form onSubmit={submit}><label>Display name<input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} required /></label><label>Email<input type="email" value={draft.email} disabled /></label><button className="button" type="submit">Save profile</button></form></div></div>;
}

function Home({ onStart, onSubjects }) {
  return (
    <main>
      <section className="landing-hero">
        <div className="hero-copy">
          <span className="eyebrow">YOUR NEW STUDY SUPERPOWER</span>
          <h1>Study less.<br /><em>Learn more.</em></h1>
          <p>Turn any set of notes into quizzes, flashcards, study guides, and clear explanations in seconds.</p>
          <div className="hero-actions">
            <button className="button" onClick={() => onStart()}>Start studying free <span>→</span></button>
            <a href="#tools">Explore tools</a>
          </div>
          <div className="trust-row"><span>✓ No credit card</span><span>✓ Built for students</span><span>✓ Instant results</span></div>
        </div>
        <div className="hero-visual">
          <div className="demo-card back-card"><span>Photosynthesis</span><strong>6 key concepts found</strong></div>
          <div className="demo-card main-demo">
            <span className="demo-label">QUICK QUIZ · BIOLOGY</span>
            <h3>What is the main purpose of photosynthesis?</h3>
            <button>To produce glucose from light energy</button>
            <button>To absorb oxygen from the atmosphere</button>
            <div className="demo-progress"><span /><span /><span /></div>
          </div>
          <div className="floating-badge">✦ <strong>Ready in seconds</strong></div>
        </div>
      </section>

      <section className="proof-strip"><div className="proof-heading"><span>SUBJECT LIBRARY</span><strong>Choose where to begin</strong></div><div className="proof-subjects">{subjects.map((subject) => <button key={subject.id} onClick={() => onSubjects(`/subjects/${subject.id}`)}><span>{subject.icon}</span><b>{subject.name}</b><small>{subject.topics.length} guides</small></button>)}</div></section>

      <section className="home-subjects"><div className="catalog-heading"><div><span className="eyebrow">NEW · READY-MADE GUIDES</span><h2>Start with a subject.</h2></div><button onClick={() => onSubjects()}>Browse the full library →</button></div><div>{subjects.map((subject) => <button key={subject.id} className={subject.color} onClick={() => onSubjects(`/subjects/${subject.id}`)}><span>{subject.icon}</span><div><small>{subject.topics.length} COMPLETE GUIDES</small><h3>{subject.name}</h3><p>{subject.description}</p><b>Explore subject →</b></div></button>)}</div></section>

      <section className="tools-showcase" id="tools">
        <div className="center-heading"><span className="eyebrow">ONE PLACE. EVERY STUDY TOOL.</span><h2>Everything you need to feel ready.</h2><p>Choose a tool, paste your notes, and let ShibaAI do the busywork.</p></div>
        <div className="tool-grid">
          {tools.map((tool) => <button className="tool-card" key={tool.id} onClick={() => onStart(tool.id)}><span className="tool-icon">{tool.icon}</span><h3>{tool.name}</h3><p>{tool.description}</p><b>Open tool →</b></button>)}
        </div>
      </section>

      <section className="how-it-works"><div className="shiba-callout"><img src={logo} alt="ShibaAI mascot" /><div><span className="eyebrow">YOUR STUDY COMPANION</span><h2>From messy notes to “I’ve got this.”</h2><p>ShibaAI handles the organizing so you can spend your energy learning.</p></div></div><div className="steps-grid"><article><span>01</span><b>🐾</b><h3>Bring your notes</h3><p>Paste a lecture, textbook section, rough outline, or any topic you want to master.</p></article><article><span>02</span><b>🦴</b><h3>Pick your tool</h3><p>Choose from twelve focused tools built for different kinds of studying.</p></article><article><span>03</span><b>🎓</b><h3>Learn actively</h3><p>Quiz yourself, review explanations, and return to your recent sessions anytime.</p></article></div></section>

      <section className="testimonial-section"><div className="center-heading"><span className="eyebrow">STUDENT VOICES</span><h2>Studying feels lighter with a copilot.</h2></div><div className="testimonial-grid"><article><div>★★★★★</div><blockquote>“The quiz explanations help me understand why an answer is right instead of just showing a score.”</blockquote><footer><span>AM</span><div><strong>Early student tester</strong><small>Biology</small></div></footer></article><article className="featured-quote"><div>★★★★★</div><blockquote>“I pasted my rough lecture notes and finally had a study guide I could actually follow.”</blockquote><footer><span>JR</span><div><strong>Early student tester</strong><small>World History</small></div></footer></article><article><div>★★★★★</div><blockquote>“The focus timer makes it easier to start. Twenty-five minutes feels manageable.”</blockquote><footer><span>SK</span><div><strong>Early student tester</strong><small>Algebra</small></div></footer></article></div><p className="testimonial-disclosure">Illustrative feedback from early product testing.</p></section>

      <section className="cta-band"><div><span className="eyebrow">READY WHEN YOU ARE</span><h2>Your notes are about to get a lot more useful.</h2></div><button className="button light-button" onClick={() => onStart()}>Start studying free →</button></section>
    </main>
  );
}

function AuthModal({ mode, onClose, onSuccess, setMode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  function submit(event) {
    event.preventDefault();
    onSuccess({ name: name.trim() || email.split("@")[0] || "Student", email });
  }
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="auth-modal" onMouseDown={(e) => e.stopPropagation()}><button className="modal-close" onClick={onClose}>×</button><img src={logo} alt="ShibaAI" /><h2>{mode === "signup" ? "Create your account" : "Welcome back"}</h2><p>{mode === "signup" ? "Start learning smarter today." : "Log in to continue studying."}</p><form onSubmit={submit}>{mode === "signup" && <label>Name<input value={name} onChange={(e) => setName(e.target.value)} required /></label>}<label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label><label>Password<input type="password" minLength="6" required /></label><button className="button" type="submit">{mode === "signup" ? "Create account" : "Log in"}</button></form><p className="auth-switch">{mode === "signup" ? "Already have an account?" : "New to ShibaAI?"} <button onClick={() => setMode(mode === "signup" ? "login" : "signup")}>{mode === "signup" ? "Log in" : "Sign up"}</button></p><small>Prototype login: account data is stored only in this browser.</small></div></div>;
}

function ToolResult({ result }) {
  const [copied,setCopied] = useState(false);
  if (!result) return null;
  const plainText = `${result.title}\n\n${result.items?.map((item,index) => `${index + 1}. ${item.heading}\n${item.content}`).join("\n\n")}`;
  async function copyResult() { await navigator.clipboard.writeText(plainText); setCopied(true); setTimeout(() => setCopied(false),1500); }
  function downloadResult() { const blob = new Blob([plainText],{type:"text/plain"}); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href=url; link.download=`${result.title.replace(/[^a-z0-9]+/gi,"-").toLowerCase() || "shibaai-study-result"}.txt`; link.click(); URL.revokeObjectURL(url); }
  return <section className="generated-result"><div className="result-heading"><span>✦</span><div><small>YOUR RESULT</small><h2>{result.title}</h2></div><div className="result-actions"><button onClick={copyResult}>{copied ? "✓ Copied" : "Copy"}</button><button onClick={downloadResult}>Download</button><button onClick={() => window.print()}>Print</button></div></div><div className="result-list">{result.items?.map((item, index) => <article key={index}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.heading}</h3><p>{item.content}</p></div></article>)}</div></section>;
}

function FocusTimer() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [duration, setDuration] = useState(25);
  const [customMinutes,setCustomMinutes] = useState("25");
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return undefined;
    const timer = setInterval(() => setSeconds((value) => { if (value <= 1) { setRunning(false); return 0; } return value - 1; }), 1000);
    return () => clearInterval(timer);
  }, [running]);
  const minutes = Math.floor(seconds / 60).toString().padStart(2,"0");
  const remainder = (seconds % 60).toString().padStart(2,"0");
  function reset(value = duration) { setRunning(false); setDuration(value); setCustomMinutes(String(value)); setSeconds(value * 60); }
  function applyCustom(event) { event.preventDefault(); const value = Math.min(120,Math.max(1,Number(customMinutes) || 25)); reset(value); }
  const progress = Math.max(0,Math.min(100,(seconds / (duration * 60)) * 100));
  return <div className="focus-timer" style={{"--timer-progress":`${progress * 3.6}deg`}}><div className="timer-display"><div className="timer-ring"><span>🐕</span></div><div className="timer-copy"><small>{duration <= 10 ? "SHIBA BREAK" : "SHIBA FOCUS"}</small><strong>{minutes}:{remainder}</strong><span>{running ? "Stay with it" : seconds === 0 ? "Session complete" : "Ready when you are"}</span></div></div><div className="timer-actions"><button className="timer-start" onClick={() => { if (seconds === 0) reset(duration); setRunning((value) => !value); }}>{running ? "Pause" : seconds === 0 ? "Restart" : "Start"}</button><button className="timer-reset" aria-label="Reset focus timer" title="Reset timer" onClick={() => reset()}>↻</button></div><div className="timer-presets" aria-label="Timer presets"><button className={duration === 25 ? "active" : ""} onClick={() => reset(25)}>25 min</button><button className={duration === 45 ? "active" : ""} onClick={() => reset(45)}>45 min</button><button className={duration === 5 ? "active" : ""} onClick={() => reset(5)}>5 min break</button></div><form className="custom-timer" onSubmit={applyCustom}><label><span>Custom session</span><input type="number" min="1" max="120" value={customMinutes} onChange={(event) => setCustomMinutes(event.target.value)} aria-label="Custom timer minutes"/></label><span>minutes</span><button type="submit">Set</button></form></div>;
}

function Dashboard({ initialTool, initialNotes = "", user }) {
  const [activeId, setActiveId] = useState(initialTool || "quiz");
  const [notes, setNotes] = useState(initialNotes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [difficulty,setDifficulty] = useState("standard");
  const [detail,setDetail] = useState("quick");
  const [questionCount,setQuestionCount] = useState(5);
  const [history, setHistory] = useState(() => { try { return JSON.parse(localStorage.getItem("shibaai-history")) || []; } catch { return []; } });
  const active = tools.find((tool) => tool.id === activeId);

  useEffect(() => { setActiveId(initialTool || "quiz"); }, [initialTool]);
  useEffect(() => { if (initialNotes) setNotes(initialNotes); }, [initialNotes]);
  function chooseTool(id) {
    const saved = history.find((item) => (item.toolId || tools.find((tool) => tool.name === item.tool)?.id) === id);
    if (saved?.result) restoreSession(saved);
    else { setActiveId(id); setResult(null); setError(""); }
  }
  function restoreSession(item) {
    const toolId = item.toolId || tools.find((tool) => tool.name === item.tool)?.id || "quiz";
    setActiveId(toolId); setNotes(item.notes || ""); setResult(item.result || null); setError("");
    setDifficulty(item.settings?.difficulty || "standard");
    setDetail(item.settings?.detail || "quick");
    setQuestionCount(item.settings?.questionCount || 5);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  async function generate() {
    if (notes.trim().length < 40) { setError("Add at least a few sentences so ShibaAI has enough material to work with."); return; }
    setLoading(true); setError(""); setResult(null);
    try {
      const data = activeId === "quiz"
        ? await generateQuiz(notes,{ difficulty, questionCount })
        : await generateStudyTool(activeId,notes,{ difficulty, detail });
      const generatedResult = activeId === "quiz" ? { questions: data.questions } : data;
      setResult(generatedResult);
      const nextHistory = [{ id: Date.now(), toolId: activeId, tool: active.name, icon: active.icon, title: activeId === "quiz" ? `${questionCount}-question quiz` : data.title, date: new Date().toLocaleDateString(undefined, { month: "short", day: "numeric" }), notes, result: generatedResult, settings: { difficulty, detail, questionCount } }, ...history].slice(0, 6);
      setHistory(nextHistory);
      try { localStorage.setItem("shibaai-history", JSON.stringify(nextHistory)); } catch { setError("Your result was created, but browser storage is full. Download it to keep a copy."); }
    } catch (err) { setError(err.message || "ShibaAI couldn't generate this yet."); }
    finally { setLoading(false); }
  }

  return <main className="dashboard-shell"><aside className="sidebar"><div><small>STUDY TOOLS</small>{tools.map((tool) => <button key={tool.id} className={activeId === tool.id ? "active" : ""} onClick={() => chooseTool(tool.id)}><span>{tool.icon}</span>{tool.name}</button>)}</div><div><FocusTimer /><div className="sidebar-tip"><span>🐾</span><strong>Shiba study tip</strong><p>Active recall beats rereading. Test yourself before reviewing.</p></div></div></aside><section className="workspace"><div className="workspace-welcome"><div><span className="eyebrow">GOOD TO SEE YOU, {user.name.toUpperCase()}</span><h1>{active.name}</h1><p>{active.description}</p></div><div className="streak"><span>🔥</span><div><small>STUDY STREAK</small><strong>1 day</strong></div></div></div><div className="generator-card"><div className="generator-title"><div><span className="paw-dot">🐾</span><label htmlFor="study-notes">Paste your notes or topic</label></div><span>Choose your level, then generate</span></div><textarea id="study-notes" value={notes} maxLength={12000} disabled={loading} onChange={(e) => setNotes(e.target.value)} placeholder="Paste class notes, a textbook passage, or describe the topic you want to study…" /><div className="generation-options"><label>Level<select value={difficulty} onChange={(event) => setDifficulty(event.target.value)} disabled={loading}><option value="simple">Simple</option><option value="standard">Standard</option><option value="advanced">Advanced</option></select></label>{activeId === "quiz" ? <label>Questions<select value={questionCount} onChange={(event) => setQuestionCount(Number(event.target.value))} disabled={loading}><option value="5">5</option><option value="10">10</option><option value="15">15</option></select></label> : <label>Detail<select value={detail} onChange={(event) => setDetail(event.target.value)} disabled={loading}><option value="quick">Quick</option><option value="detailed">Detailed</option></select></label>}</div><div className="generator-actions"><span>{notes.length.toLocaleString()} / 12,000</span><button className="button" disabled={loading} onClick={generate}>{loading ? "Creating…" : `Generate ${active.name}`} <b>✦</b></button></div></div><ErrorMessage message={error} />{activeId === "quiz" ? <QuizResults questions={result?.questions || []} /> : <ToolResult result={result} />}{history.length > 0 && !result && <section className="recent-section"><div className="recent-heading"><div><span className="eyebrow">YOUR LIBRARY</span><h2>Recent study sessions</h2></div><button onClick={() => { setHistory([]); localStorage.removeItem("shibaai-history"); }}>Clear</button></div><div className="recent-grid">{history.map((item) => <button key={item.id} onClick={() => chooseTool(tools.find((tool) => tool.name === item.tool)?.id || "quiz")}><span>{item.icon}</span><div><strong>{item.title}</strong><small>{item.tool} · {item.date}</small></div><b>→</b></button>)}</div></section>}</section></main>;
}

const paths = { home:"/", about:"/about", pricing:"/pricing", subjects:"/subjects", resources:"/resources", faq:"/faq", contact:"/contact", dashboard:"/app" };
function viewFromPath(pathname) { if (pathname.startsWith("/subjects/")) return "subjects"; return Object.entries(paths).find(([,path]) => path === pathname)?.[0] || "not-found"; }

function NotFoundPage({ onHome }) {
  return <main className="not-found-page"><div className="lost-paws">🐾　🐾　🐾</div><img src={logo} alt="ShibaAI mascot"/><span className="eyebrow">404 · LOST THE TRAIL</span><h1>This page wandered off.</h1><p>Shiba checked under every study guide, but there’s nothing at this address.</p><button className="button" onClick={onHome}>Follow the paws home →</button></main>;
}

export default function App() {
  const [view, setView] = useState(() => viewFromPath(window.location.pathname));
  const [routePath,setRoutePath] = useState(window.location.pathname);
  const [selectedTool, setSelectedTool] = useState(() => new URLSearchParams(window.location.search).get("tool") || "quiz");
  const [studySeed,setStudySeed] = useState("");
  const [authMode, setAuthMode] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [legalPage, setLegalPage] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme,setTheme] = useState(() => localStorage.getItem("shibaai-theme") || "light");
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem("shibaai-user")); } catch { return null; } });
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem("shibaai-theme",theme); },[theme]);
  useEffect(() => { const syncRoute = () => { setRoutePath(window.location.pathname); setView(viewFromPath(window.location.pathname)); setSelectedTool(new URLSearchParams(window.location.search).get("tool") || "quiz"); }; window.addEventListener("popstate",syncRoute); return () => window.removeEventListener("popstate",syncRoute); },[]);
  useEffect(() => { const shortcut = (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setSearchOpen(true); } if (event.key === "Escape") setSearchOpen(false); }; window.addEventListener("keydown",shortcut); return () => window.removeEventListener("keydown",shortcut); },[]);
  function openDashboard(tool = "quiz") { setSelectedTool(tool); if (user) { setView("dashboard"); window.history.pushState({},"",`/app?tool=${encodeURIComponent(tool)}`); window.scrollTo({top:0,behavior:"smooth"}); } else setAuthMode("signup"); }
  function login(nextUser) { localStorage.setItem("shibaai-user", JSON.stringify(nextUser)); setUser(nextUser); setAuthMode(null); setView("dashboard"); window.history.pushState({},"",`/app?tool=${encodeURIComponent(selectedTool)}`); }
  function logout() { localStorage.removeItem("shibaai-user"); setUser(null); setView("home"); window.history.pushState({},"",paths.home); }
  function saveProfile(nextUser) { try { localStorage.setItem("shibaai-user", JSON.stringify(nextUser)); setUser(nextUser); setProfileOpen(false); } catch { alert("That photo is too large for browser storage. Try a smaller image."); } }
  function openTopicTool(tool,topic) { setStudySeed(`${topic.name}\n\n${topic.overview}\n\n${topic.points.join("\n")}`); openDashboard(tool); }
  const pages = { home: <Home onStart={openDashboard} onSubjects={(path = "/subjects") => navigatePath(path)} />, dashboard: user ? <Dashboard initialTool={selectedTool} initialNotes={studySeed} user={user} /> : <Home onStart={openDashboard} onSubjects={(path = "/subjects") => navigatePath(path)} />, about: <AboutPage onStart={openDashboard} />, pricing: <PricingPage onStart={openDashboard} />, subjects: <SubjectLibrary pathname={routePath} onPath={navigatePath} onTool={openTopicTool}/>, resources: <ResourcesPage onStart={openDashboard} />, faq: <FAQPage />, contact: <ContactPage />, "not-found": <NotFoundPage onHome={() => navigate("home")} /> };
  function navigatePath(path) { window.history.pushState({},"",path); setRoutePath(path); setView(viewFromPath(path)); window.scrollTo({top:0,behavior:"smooth"}); }
  function navigate(page) { const path = paths[page] || paths.home; navigatePath(path); }
  return <div className="app"><div className="announcement-bar"><span>🐾</span> ShibaAI is in early access — explore all 12 study tools free <button onClick={() => openDashboard()}>Start studying →</button></div><Header user={user} theme={theme} onToggleTheme={() => setTheme((value) => value === "dark" ? "light" : "dark")} onSearch={() => setSearchOpen(true)} onHome={() => navigate("home")} onNavigate={navigate} onDashboard={openDashboard} onOpenAuth={setAuthMode} onLogout={logout} onProfile={() => setProfileOpen(true)} />{pages[view] || pages["not-found"]}<Footer user={user} onHome={() => navigate("home")} onStart={openDashboard} onLegal={setLegalPage} />{authMode && <AuthModal mode={authMode} setMode={setAuthMode} onClose={() => setAuthMode(null)} onSuccess={login} />}{profileOpen && <ProfileModal user={user} onClose={() => setProfileOpen(false)} onSave={saveProfile} />}{legalPage && <LegalModal type={legalPage} onClose={() => setLegalPage(null)} />}{searchOpen && <SearchModal onClose={() => setSearchOpen(false)} onNavigate={navigate} onTool={openDashboard} />}<CookieNotice onPrivacy={() => setLegalPage("privacy")} /></div>;
}
