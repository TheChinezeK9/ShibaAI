import { useState } from "react";
import logo from "../assets/ShibaAI.png";

function PageHero({ eyebrow, title, description, children }) {
  return <section className="page-hero"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p>{children}</section>;
}

export function AboutPage({ onStart }) {
  return <main className="marketing-page"><PageHero eyebrow="OUR STORY" title="A friendlier way to learn." description="ShibaAI turns overwhelming study material into clear next steps, helping every student approach learning with more confidence."><button className="button" onClick={() => onStart()}>Meet your study copilot →</button></PageHero><section className="mission-block"><div><span className="eyebrow">WHY WE EXIST</span><h2>Studying should feel challenging—not confusing.</h2></div><div><p>Students spend too much time formatting notes, guessing what matters, and rereading material that never quite sticks. ShibaAI removes that friction.</p><p>Our goal is simple: give every learner an encouraging copilot that organizes information, creates active practice, and makes difficult ideas easier to approach.</p></div></section><section className="values-section"><div className="section-title"><span className="eyebrow">WHAT GUIDES US</span><h2>Student-first, every step.</h2></div><div className="value-grid"><article><b>🐾</b><h3>Friendly by design</h3><p>Learning tools should reduce anxiety and invite curiosity.</p></article><article><b>◎</b><h3>Clarity over clutter</h3><p>Every screen and result should help students know what to do next.</p></article><article><b>✓</b><h3>Honest assistance</h3><p>AI supports learning; it never replaces judgment or academic integrity.</p></article><article><b>↗</b><h3>Progress that matters</h3><p>We prioritize understanding and confidence over vanity metrics.</p></article></div></section><section className="founder-note"><img src={logo} alt="ShibaAI mascot" /><div><span className="eyebrow">A NOTE FROM SHIBA</span><h2>Built for the moment before it clicks.</h2><p>That moment when a confusing topic finally makes sense is what ShibaAI is here for. Bring the messy notes. We’ll help with the next step.</p></div></section></main>;
}

export function PricingPage({ onStart }) {
  return <main className="marketing-page"><PageHero eyebrow="SIMPLE PRICING" title="Start free. Learn without limits." description="A straightforward plan for every kind of student. No surprise charges and no credit card required to begin." /></main> && <main className="marketing-page"><PageHero eyebrow="SIMPLE PRICING" title="Start free. Grow when you need to." description="Transparent plans for every stage of your learning journey. No surprise charges."/><section className="pricing-grid"><article><span className="plan-label">STARTER</span><h2>Free</h2><p className="price">$0 <small>/ forever</small></p><p>Everything you need to try smarter studying.</p><ul><li>✓ 10 AI generations monthly</li><li>✓ All 12 study tools</li><li>✓ Interactive quizzes</li><li>✓ Focus timer</li><li>✓ Local study history</li></ul><button className="outline-button" onClick={() => onStart()}>Start free</button></article><article className="featured-plan"><span className="popular-badge">MOST POPULAR</span><span className="plan-label">SCHOLAR</span><h2>Study without limits</h2><p className="price">$6 <small>/ month</small></p><p>For students who use ShibaAI every week.</p><ul><li>✓ Unlimited generations</li><li>✓ Everything in Starter</li><li>✓ Cloud study library</li><li>✓ Longer source material</li><li>✓ Priority generation</li><li>✓ Progress insights</li></ul><button className="button" onClick={() => onStart()}>Try Scholar free</button></article><article><span className="plan-label">SCHOOLS</span><h2>Classroom</h2><p className="price">Custom</p><p>Responsible AI support for educators and students.</p><ul><li>✓ Classroom management</li><li>✓ Shared study collections</li><li>✓ Usage controls</li><li>✓ Educator insights</li><li>✓ Priority support</li></ul><a className="outline-button" href="mailto:hello@shibaai.app">Contact us</a></article></section><section className="pricing-note"><span>🦴</span><div><h3>Early-stage promise</h3><p>Paid plans are a preview of intended pricing. ShibaAI is currently in prototype access, so no payment will be collected yet.</p></div></section><FAQSection compact /></main>;
}

const resources = [
  ["ACTIVE RECALL","How to study without endlessly rereading","A practical guide to retrieving information from memory and finding the gaps that matter.","7 min read"],
  ["NOTE-TAKING","Turn lecture notes into an exam-ready system","Learn a lightweight method for cleaning, organizing, and reviewing notes each week.","6 min read"],
  ["FOCUS","The 25-minute reset for overwhelmed students","Why a short focus sprint can make starting easier—and how to use breaks well.","4 min read"],
  ["AI LITERACY","How to check AI-generated study material","A simple verification checklist for facts, explanations, citations, and practice questions.","8 min read"],
  ["EXAM PREP","Build a seven-day study plan that works","Balance practice, review, rest, and confidence before your next test.","9 min read"],
  ["MEMORY","Why mnemonics stick—and when they do not","Use associations for the right material without confusing memorization with understanding.","5 min read"]
];

export function ResourcesPage({ onStart }) {
  return <main className="marketing-page"><PageHero eyebrow="THE STUDY DEN" title="Better habits. Clearer thinking." description="Practical guides for learning effectively, using AI responsibly, and making study time count."/><section className="featured-resource"><div><span className="eyebrow">FEATURED GUIDE</span><h2>The complete active-recall starter kit</h2><p>Move from highlighting and rereading to a repeatable practice system you can use for any class.</p><button className="button" onClick={() => onStart("quiz")}>Practice with Smart Quiz →</button></div><div className="resource-illustration"><span>🐕</span><b>READ · RECALL · REVIEW</b></div></section><section className="resource-grid">{resources.map(([tag,title,copy,time]) => <article key={title}><span>{tag}</span><h2>{title}</h2><p>{copy}</p><div><small>{time}</small><b>Read guide →</b></div></article>)}</section><Newsletter /></main>;
}

const faqs = [
  ["What can I use ShibaAI for?","Paste class notes, textbook passages, or a topic and create quizzes, flashcards, summaries, study guides, explanations, key terms, essay outlines, practice questions, timelines, mnemonics, formula sheets, and cleaned notes."],
  ["Does ShibaAI guarantee correct answers?","No. AI can make mistakes. ShibaAI is a study assistant, so verify important facts against course materials and instructor guidance."],
  ["Can I use it for homework?","Use ShibaAI to understand, organize, and practice—not to misrepresent AI output as your own work. Always follow your school’s academic-integrity policy."],
  ["Where is my account information stored?","The current prototype stores profile details and recent history in your browser. It does not yet provide secure cloud accounts or cross-device syncing."],
  ["Why did generation fail?","The backend may be waking from Render’s free-service sleep, the Gemini key or quota may need attention, or the submitted notes may be too short. Wait a moment and try again."],
  ["Is ShibaAI free?","Prototype access is currently free. The Pricing page previews possible future plans; no payment is collected today."],
  ["Can teachers use ShibaAI?","Yes. Educators can create practice material, examples, and review guides, but should verify all generated content before sharing it with students."],
  ["How do I delete local data?","Remove your profile photo and recent sessions in the interface, log out, or clear this site’s local browser storage."]
];

function FAQSection({ compact = false }) {
  return <section className={`faq-section ${compact ? "compact" : ""}`}><div className="section-title"><span className="eyebrow">COMMON QUESTIONS</span><h2>{compact ? "Questions before you start?" : "Everything you might be wondering."}</h2></div><div className="faq-list">{faqs.slice(0,compact ? 5 : faqs.length).map(([question,answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>;
}

export function FAQPage() { return <main className="marketing-page"><PageHero eyebrow="HELP CENTER" title="Questions? Fetch an answer." description="Quick explanations about accounts, AI generation, privacy, pricing, and responsible studying."/><FAQSection/><section className="support-card"><span>🐕</span><div><h2>Still need a hand?</h2><p>Send the ShibaAI team a message and include the page or tool giving you trouble.</p></div><a className="button" href="mailto:hello@shibaai.app">Email support</a></section></main>; }

function Newsletter() {
  const [email,setEmail] = useState("");
  function requestInvite(event) {
    event.preventDefault();
    window.location.href = `mailto:hello@shibaai.app?subject=${encodeURIComponent("Weekly Wag invite")}&body=${encodeURIComponent(`Please add ${email} to the ShibaAI newsletter waitlist.`)}`;
  }
  return <section className="newsletter"><div><span className="eyebrow">THE WEEKLY WAG</span><h2>One useful study idea. Zero clutter.</h2><p>The newsletter is coming soon. Request an invite through your email app.</p></div><form onSubmit={requestInvite}><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" aria-label="Email address" required/><button type="submit">Request invite →</button></form></section>;
}

export function ContactPage() {
  const [sent,setSent] = useState(false);
  function prepareEmail(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.namedItem("name").value;
    const email = form.elements.namedItem("email").value;
    const topic = form.elements.namedItem("topic").value;
    const message = form.elements.namedItem("message").value;
    const body = `Name: ${name}\nReply-to: ${email}\nTopic: ${topic}\n\n${message}`;
    setSent(true);
    window.location.href = `mailto:hello@shibaai.app?subject=${encodeURIComponent(`ShibaAI: ${topic}`)}&body=${encodeURIComponent(body)}`;
  }
  return <main className="marketing-page contact-page"><PageHero eyebrow="CONTACT" title="Let’s talk." description="Questions, feedback, classroom ideas, and bug reports are always welcome."/><section className="contact-layout"><div className="contact-details"><article><span>✉</span><div><h3>General questions</h3><a href="mailto:hello@shibaai.app">hello@shibaai.app</a></div></article><article><span>🏫</span><div><h3>Schools and educators</h3><a href="mailto:schools@shibaai.app">schools@shibaai.app</a></div></article><article><span>🐾</span><div><h3>Support response</h3><p>We aim to respond within two school days.</p></div></article></div><div className="contact-form-card">{sent ? <div className="sent-state"><span>🐕</span><h2>Your email draft is ready</h2><p>Send the draft from your email app to deliver your message to ShibaAI.</p><button onClick={() => setSent(false)}>Prepare another</button></div> : <form onSubmit={prepareEmail}><div className="form-row"><label>Name<input name="name" autoComplete="name" required/></label><label>Email<input name="email" type="email" autoComplete="email" required/></label></div><label>What can we help with?<select name="topic"><option>General question</option><option>Technical support</option><option>Educator or school</option><option>Feedback or idea</option></select></label><label>Message<textarea name="message" minLength="10" required placeholder="Tell us a little more…"/></label><button className="button">Open email draft →</button><small>This opens your email app; your message is sent only after you approve it there.</small></form>}</div></section><Newsletter/></main>;
}
