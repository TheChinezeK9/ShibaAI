import { useEffect, useState } from "react";
import QuizResults from "./components/QuizResults.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import { generateQuiz, generateStudyTool } from "./services/api.js";
import logo from "./assets/ShibaAI.png";

const tools = [
  { id: "quiz", icon: "✦", name: "Smart Quiz", description: "Test yourself with adaptive multiple-choice questions." },
  { id: "flashcards", icon: "▱", name: "Flashcards", description: "Turn notes into quick, memorable study cards." },
  { id: "summary", icon: "≡", name: "Quick Summary", description: "Condense long notes into the ideas that matter." },
  { id: "study-guide", icon: "⌑", name: "Study Guide", description: "Build an organized guide for your next exam." },
  { id: "explain", icon: "◎", name: "Explain It", description: "Break down a difficult concept in simple language." },
  { id: "vocabulary", icon: "Aa", name: "Key Terms", description: "Extract essential vocabulary and definitions." },
  { id: "essay-outline", icon: "¶", name: "Essay Outline", description: "Shape notes into a clear, supported argument." },
  { id: "practice", icon: "?", name: "Practice Questions", description: "Generate short-answer prompts for active recall." }
];

function Header({ user, onHome, onOpenAuth, onDashboard, onLogout }) {
  return (
    <header className="site-header">
      <button className="brand" onClick={onHome} aria-label="ShibaAI home">
        <img src={logo} alt="" />
        <span>Shiba<span>AI</span></span>
      </button>
      <nav>
        <button onClick={onHome}>Home</button>
        <button onClick={onDashboard}>Study tools</button>
      </nav>
      <div className="header-actions">
        {user ? (
          <>
            <span className="user-chip">{user.name.slice(0, 1).toUpperCase()}</span>
            <button className="text-button" onClick={onLogout}>Log out</button>
          </>
        ) : (
          <>
            <button className="text-button" onClick={() => onOpenAuth("login")}>Log in</button>
            <button className="small-cta" onClick={() => onOpenAuth("signup")}>Get started</button>
          </>
        )}
      </div>
    </header>
  );
}

function Home({ onStart }) {
  return (
    <main>
      <section className="landing-hero">
        <div className="hero-copy">
          <span className="eyebrow">YOUR NEW STUDY SUPERPOWER</span>
          <h1>Study less.<br /><em>Learn more.</em></h1>
          <p>Turn any set of notes into quizzes, flashcards, study guides, and clear explanations in seconds.</p>
          <div className="hero-actions">
            <button className="button" onClick={onStart}>Start studying free <span>→</span></button>
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

      <section className="tools-showcase" id="tools">
        <div className="center-heading"><span className="eyebrow">ONE PLACE. EVERY STUDY TOOL.</span><h2>Everything you need to feel ready.</h2><p>Choose a tool, paste your notes, and let ShibaAI do the busywork.</p></div>
        <div className="tool-grid">
          {tools.map((tool) => <button className="tool-card" key={tool.id} onClick={() => onStart(tool.id)}><span className="tool-icon">{tool.icon}</span><h3>{tool.name}</h3><p>{tool.description}</p><b>Open tool →</b></button>)}
        </div>
      </section>

      <section className="cta-band"><div><span className="eyebrow">READY WHEN YOU ARE</span><h2>Your notes are about to get a lot more useful.</h2></div><button className="button light-button" onClick={onStart}>Start studying free →</button></section>
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
  if (!result) return null;
  return <section className="generated-result"><div className="result-heading"><span>✦</span><div><small>YOUR RESULT</small><h2>{result.title}</h2></div></div><div className="result-list">{result.items?.map((item, index) => <article key={index}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.heading}</h3><p>{item.content}</p></div></article>)}</div></section>;
}

function Dashboard({ initialTool, user }) {
  const [activeId, setActiveId] = useState(initialTool || "quiz");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const active = tools.find((tool) => tool.id === activeId);

  useEffect(() => { setActiveId(initialTool || "quiz"); }, [initialTool]);
  function chooseTool(id) { setActiveId(id); setResult(null); setError(""); }
  async function generate() {
    if (notes.trim().length < 40) { setError("Add at least a few sentences so ShibaAI has enough material to work with."); return; }
    setLoading(true); setError(""); setResult(null);
    try {
      const data = activeId === "quiz" ? await generateQuiz(notes) : await generateStudyTool(activeId, notes);
      setResult(activeId === "quiz" ? { questions: data.questions } : data);
    } catch (err) { setError(err.message || "ShibaAI couldn't generate this yet."); }
    finally { setLoading(false); }
  }

  return <main className="dashboard-shell"><aside className="sidebar"><div><small>STUDY TOOLS</small>{tools.map((tool) => <button key={tool.id} className={activeId === tool.id ? "active" : ""} onClick={() => chooseTool(tool.id)}><span>{tool.icon}</span>{tool.name}</button>)}</div><div className="sidebar-tip"><span>✦</span><strong>Study tip</strong><p>Active recall beats rereading. Test yourself before reviewing.</p></div></aside><section className="workspace"><div className="workspace-welcome"><div><span className="eyebrow">GOOD TO SEE YOU, {user.name.toUpperCase()}</span><h1>{active.name}</h1><p>{active.description}</p></div><div className="streak"><span>🔥</span><div><small>STUDY STREAK</small><strong>1 day</strong></div></div></div><div className="generator-card"><label htmlFor="study-notes">Paste your notes or topic</label><textarea id="study-notes" value={notes} maxLength={12000} disabled={loading} onChange={(e) => setNotes(e.target.value)} placeholder="Paste class notes, a textbook passage, or describe the topic you want to study…" /><div className="generator-actions"><span>{notes.length.toLocaleString()} / 12,000</span><button className="button" disabled={loading} onClick={generate}>{loading ? "ShibaAI is thinking…" : `Generate ${active.name}`} <b>✦</b></button></div></div><ErrorMessage message={error} />{activeId === "quiz" ? <QuizResults questions={result?.questions || []} /> : <ToolResult result={result} />}</section></main>;
}

export default function App() {
  const [view, setView] = useState("home");
  const [selectedTool, setSelectedTool] = useState("quiz");
  const [authMode, setAuthMode] = useState(null);
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem("shibaai-user")); } catch { return null; } });
  function openDashboard(tool = "quiz") { setSelectedTool(tool); if (user) setView("dashboard"); else setAuthMode("signup"); }
  function login(nextUser) { localStorage.setItem("shibaai-user", JSON.stringify(nextUser)); setUser(nextUser); setAuthMode(null); setView("dashboard"); }
  function logout() { localStorage.removeItem("shibaai-user"); setUser(null); setView("home"); }
  return <div className="app"><Header user={user} onHome={() => setView("home")} onDashboard={() => openDashboard(selectedTool)} onOpenAuth={setAuthMode} onLogout={logout} />{view === "home" ? <Home onStart={openDashboard} /> : <Dashboard initialTool={selectedTool} user={user} />}{authMode && <AuthModal mode={authMode} setMode={setAuthMode} onClose={() => setAuthMode(null)} onSuccess={login} />}</div>;
}
