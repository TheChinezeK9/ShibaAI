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

function Header({ user, onHome, onOpenAuth, onDashboard, onLogout, onProfile }) {
  return (
    <header className="site-header">
      <button className="brand" onClick={onHome} aria-label="ShibaAI home">
        <img src={logo} alt="" />
        <span>Shiba<span>AI</span></span>
      </button>
      <nav>
        <button onClick={onHome}>Home</button>
        <div className="nav-dropdown">
          <button className="dropdown-trigger" onClick={() => onDashboard()}>Study tools <span>⌄</span></button>
          <div className="tools-dropdown">
            <small>CHOOSE A STUDY TOOL</small>
            <div>{tools.map((tool) => <button key={tool.id} onClick={() => onDashboard(tool.id)}><span>{tool.icon}</span><b>{tool.name}</b></button>)}</div>
          </div>
        </div>
      </nav>
      <div className="header-actions">
        {user ? (
          <div className="profile-menu">
            <button className="profile-trigger" aria-label="Open profile menu">
              <span className="user-chip">{user.avatar ? <img src={user.avatar} alt="Your profile" /> : user.name.slice(0, 1).toUpperCase()}</span>
              <span className="profile-name">{user.name}</span><span>⌄</span>
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
    </header>
  );
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

function Home({ onStart }) {
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

      <section className="tools-showcase" id="tools">
        <div className="center-heading"><span className="eyebrow">ONE PLACE. EVERY STUDY TOOL.</span><h2>Everything you need to feel ready.</h2><p>Choose a tool, paste your notes, and let ShibaAI do the busywork.</p></div>
        <div className="tool-grid">
          {tools.map((tool) => <button className="tool-card" key={tool.id} onClick={() => onStart(tool.id)}><span className="tool-icon">{tool.icon}</span><h3>{tool.name}</h3><p>{tool.description}</p><b>Open tool →</b></button>)}
        </div>
      </section>

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
  if (!result) return null;
  return <section className="generated-result"><div className="result-heading"><span>✦</span><div><small>YOUR RESULT</small><h2>{result.title}</h2></div></div><div className="result-list">{result.items?.map((item, index) => <article key={index}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.heading}</h3><p>{item.content}</p></div></article>)}</div></section>;
}

function Dashboard({ initialTool, user }) {
  const [activeId, setActiveId] = useState(initialTool || "quiz");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(() => { try { return JSON.parse(localStorage.getItem("shibaai-history")) || []; } catch { return []; } });
  const active = tools.find((tool) => tool.id === activeId);

  useEffect(() => { setActiveId(initialTool || "quiz"); }, [initialTool]);
  function chooseTool(id) { setActiveId(id); setResult(null); setError(""); }
  async function generate() {
    if (notes.trim().length < 40) { setError("Add at least a few sentences so ShibaAI has enough material to work with."); return; }
    setLoading(true); setError(""); setResult(null);
    try {
      const data = activeId === "quiz" ? await generateQuiz(notes) : await generateStudyTool(activeId, notes);
      setResult(activeId === "quiz" ? { questions: data.questions } : data);
      const nextHistory = [{ id: Date.now(), tool: active.name, icon: active.icon, title: activeId === "quiz" ? "Practice quiz" : data.title, date: new Date().toLocaleDateString(undefined, { month: "short", day: "numeric" }) }, ...history].slice(0, 6);
      setHistory(nextHistory); localStorage.setItem("shibaai-history", JSON.stringify(nextHistory));
    } catch (err) { setError(err.message || "ShibaAI couldn't generate this yet."); }
    finally { setLoading(false); }
  }

  return <main className="dashboard-shell"><aside className="sidebar"><div><small>STUDY TOOLS</small>{tools.map((tool) => <button key={tool.id} className={activeId === tool.id ? "active" : ""} onClick={() => chooseTool(tool.id)}><span>{tool.icon}</span>{tool.name}</button>)}</div><div className="sidebar-tip"><span>✦</span><strong>Study tip</strong><p>Active recall beats rereading. Test yourself before reviewing.</p></div></aside><section className="workspace"><div className="workspace-welcome"><div><span className="eyebrow">GOOD TO SEE YOU, {user.name.toUpperCase()}</span><h1>{active.name}</h1><p>{active.description}</p></div><div className="streak"><span>🔥</span><div><small>STUDY STREAK</small><strong>1 day</strong></div></div></div><div className="generator-card"><label htmlFor="study-notes">Paste your notes or topic</label><textarea id="study-notes" value={notes} maxLength={12000} disabled={loading} onChange={(e) => setNotes(e.target.value)} placeholder="Paste class notes, a textbook passage, or describe the topic you want to study…" /><div className="generator-actions"><span>{notes.length.toLocaleString()} / 12,000</span><button className="button" disabled={loading} onClick={generate}>{loading ? "ShibaAI is thinking…" : `Generate ${active.name}`} <b>✦</b></button></div></div><ErrorMessage message={error} />{activeId === "quiz" ? <QuizResults questions={result?.questions || []} /> : <ToolResult result={result} />}{history.length > 0 && !result && <section className="recent-section"><div className="recent-heading"><div><span className="eyebrow">YOUR LIBRARY</span><h2>Recent study sessions</h2></div><button onClick={() => { setHistory([]); localStorage.removeItem("shibaai-history"); }}>Clear</button></div><div className="recent-grid">{history.map((item) => <button key={item.id} onClick={() => chooseTool(tools.find((tool) => tool.name === item.tool)?.id || "quiz")}><span>{item.icon}</span><div><strong>{item.title}</strong><small>{item.tool} · {item.date}</small></div><b>→</b></button>)}</div></section>}</section></main>;
}

export default function App() {
  const [view, setView] = useState("home");
  const [selectedTool, setSelectedTool] = useState("quiz");
  const [authMode, setAuthMode] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem("shibaai-user")); } catch { return null; } });
  function openDashboard(tool = "quiz") { setSelectedTool(tool); if (user) setView("dashboard"); else setAuthMode("signup"); }
  function login(nextUser) { localStorage.setItem("shibaai-user", JSON.stringify(nextUser)); setUser(nextUser); setAuthMode(null); setView("dashboard"); }
  function logout() { localStorage.removeItem("shibaai-user"); setUser(null); setView("home"); }
  function saveProfile(nextUser) { try { localStorage.setItem("shibaai-user", JSON.stringify(nextUser)); setUser(nextUser); setProfileOpen(false); } catch { alert("That photo is too large for browser storage. Try a smaller image."); } }
  return <div className="app"><Header user={user} onHome={() => setView("home")} onDashboard={openDashboard} onOpenAuth={setAuthMode} onLogout={logout} onProfile={() => setProfileOpen(true)} />{view === "home" ? <Home onStart={openDashboard} /> : <Dashboard initialTool={selectedTool} user={user} />}{authMode && <AuthModal mode={authMode} setMode={setAuthMode} onClose={() => setAuthMode(null)} onSuccess={login} />}{profileOpen && <ProfileModal user={user} onClose={() => setProfileOpen(false)} onSave={saveProfile} />}</div>;
}
