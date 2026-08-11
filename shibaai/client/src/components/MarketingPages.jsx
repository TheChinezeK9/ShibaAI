import { useState } from "react";
import logo from "../assets/ShibaAI.png";

function PageHero({ eyebrow, title, description, children }) {
  return <section className="page-hero"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p>{children}</section>;
}

export function AboutPage({ onStart }) {
  return <main className="marketing-page"><PageHero eyebrow="OUR STORY" title="A friendlier way to learn." description="ShibaAI turns overwhelming study material into clear next steps, helping every student approach learning with more confidence."><button className="button" onClick={() => onStart()}>Meet your study copilot →</button></PageHero><section className="mission-block"><div><span className="eyebrow">WHY WE EXIST</span><h2>Studying should feel challenging—not confusing.</h2></div><div><p>Students spend too much time formatting notes, guessing what matters, and rereading material that never quite sticks. ShibaAI removes that friction.</p><p>Our goal is simple: give every learner an encouraging copilot that organizes information, creates active practice, and makes difficult ideas easier to approach.</p></div></section><section className="values-section"><div className="section-title"><span className="eyebrow">WHAT GUIDES US</span><h2>Student-first, every step.</h2></div><div className="value-grid"><article><b>🐾</b><h3>Friendly by design</h3><p>Learning tools should reduce anxiety and invite curiosity.</p></article><article><b>◎</b><h3>Clarity over clutter</h3><p>Every screen and result should help students know what to do next.</p></article><article><b>✓</b><h3>Honest assistance</h3><p>AI supports learning; it never replaces judgment or academic integrity.</p></article><article><b>↗</b><h3>Progress that matters</h3><p>We prioritize understanding and confidence over vanity metrics.</p></article></div></section><section className="founder-note"><img src={logo} alt="ShibaAI mascot" /><div><span className="eyebrow">A NOTE FROM SHIBA</span><h2>Built for the moment before it clicks.</h2><p>That moment when a confusing topic finally makes sense is what ShibaAI is here for. Bring the messy notes. We’ll help with the next step.</p></div></section></main>;
}

const principles = [
  ["01","Understanding before answers","We help students reason, retrieve, and explain—not simply copy a finished response.","blue"],
  ["02","Clarity without clutter","Every screen should lower the effort of starting and make the next useful action obvious.","orange"],
  ["03","Students stay in control","Learners choose the subject, pace, format, difficulty, and amount of help they receive.","green"],
  ["04","Honest about uncertainty","AI can be wrong. We make verification part of studying and never pretend confidence is evidence.","violet"],
  ["05","Progress over pressure","We value durable understanding and steady practice more than streaks, scores, or comparison.","cyan"],
  ["06","Respect by default","Student work deserves thoughtful privacy, accessible design, and a product that never exploits anxiety.","rose"]
];

export function ValuesPage({ onStart }) {
  return <main className="marketing-page values-page"><PageHero eyebrow="OUR VALUES" title="Helpful AI should make you stronger." description="ShibaAI is built to support real learning: less confusion, more agency, and progress students can actually feel."><button className="button" onClick={() => onStart()}>Study with these values →</button></PageHero><section className="values-manifesto"><div><span className="eyebrow">OUR POINT OF VIEW</span><h2>Finishing faster is not the same as learning better.</h2></div><div><p>We do not want AI to become a shortcut around thinking. We want it to be the patient study partner that asks the useful question, explains the missing step, and helps a student try again.</p><strong>ShibaAI succeeds when the learner needs us less—not more.</strong></div></section><section className="principles-section"><div className="section-title"><span className="eyebrow">SIX PRINCIPLES</span><h2>What we promise to protect as we grow.</h2><p>These values are product decisions, not decoration.</p></div><div className="principles-grid">{principles.map(([number,title,copy,color]) => <article className={`principle-card ${color}`} key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section><section className="values-in-practice"><div><span className="eyebrow">VALUES IN PRACTICE</span><h2>You should be able to see what we believe.</h2></div><div className="practice-list"><article><b>◎</b><div><h3>Useful, not addictive</h3><p>Focus sessions have a clear finish. Notifications and rewards should serve a learning goal.</p></div></article><article><b>↗</b><div><h3>Guidance, not ghostwriting</h3><p>Hints, examples, retrieval, and teach-back come before a final answer.</p></div></article><article><b>✓</b><div><h3>Transparent, not magical</h3><p>We explain limitations, encourage source checking, and make room for “I’m not sure.”</p></div></article></div></section><section className="values-closing"><img src={logo} alt="ShibaAI mascot"/><div><span className="eyebrow">THE SHIBA STANDARD</span><h2>Warm enough to start. Rigorous enough to trust.</h2><p>That is the product we are building—and the standard we want students to hold us to.</p></div><button className="button" onClick={() => onStart()}>Enter your study space →</button></section></main>;
}

export function PricingPage({ onStart }) {
  const comparison = [
    ["AI generations","10 per month","Unlimited","Custom limits"],
    ["Study history","This device only","Cloud sync","Shared classrooms"],
    ["Source length","12,000 characters","50,000 characters","Teacher controlled"],
    ["Ready-made guides","Core library","Full library + early access","Curriculum collections"],
    ["Progress insights","—","Personal insights","Class-level insights"],
    ["Collaboration","—","Shareable sets","Teachers and students"],
    ["Support","Help center","Priority email","Dedicated onboarding"]
  ];
  return <main className="marketing-page"><PageHero eyebrow="SIMPLE PRICING" title="A plan for every kind of learner." description="Start free, upgrade for unlimited personal studying, or bring ShibaAI to an entire classroom."/><section className="pricing-grid"><article><span className="plan-label">STARTER · CASUAL REVIEW</span><h2>Free</h2><p className="price">$0 <small>/ forever</small></p><p>Best for occasional homework help and trying every study format.</p><ul><li>✓ 10 AI generations monthly</li><li>✓ All 12 study tools</li><li>✓ Core subject-guide library</li><li>✓ Custom focus timer</li><li>✓ History on one device</li><li className="unavailable">— No cloud syncing</li></ul><button className="outline-button" onClick={() => onStart()}>Start free</button></article><article className="featured-plan"><span className="popular-badge">BEST FOR STUDENTS</span><span className="plan-label">SCHOLAR · SERIOUS STUDY</span><h2>Unlimited learning</h2><p className="price">$6 <small>/ month</small></p><p>Best for weekly studying across multiple classes and devices.</p><ul><li>✓ Unlimited AI generations</li><li>✓ Everything in Starter</li><li>✓ Full guide library and early access</li><li>✓ Cloud history across devices</li><li>✓ Longer 50,000-character sources</li><li>✓ Personal progress insights</li></ul><button className="button" onClick={() => onStart()}>Join Scholar waitlist</button></article><article><span className="plan-label">CLASSROOM · EDUCATORS</span><h2>Teach together</h2><p className="price">Custom <small>/ per school</small></p><p>Best for teachers who need shared resources, controls, and visibility.</p><ul><li>✓ Teacher and student workspaces</li><li>✓ Curriculum-aligned collections</li><li>✓ Shared class study sets</li><li>✓ Usage and safety controls</li><li>✓ Class-level learning insights</li><li>✓ Dedicated onboarding</li></ul><a className="outline-button" href="mailto:schools@shibaai.app?subject=ShibaAI%20Classroom">Talk to schools team</a></article></section><section className="pricing-comparison"><div className="section-title"><span className="eyebrow">COMPARE PLANS</span><h2>See exactly what changes.</h2></div><div className="comparison-table" role="table" aria-label="Plan comparison"><div className="comparison-row comparison-head" role="row"><strong>Feature</strong><strong>Starter</strong><strong>Scholar</strong><strong>Classroom</strong></div>{comparison.map((row) => <div className="comparison-row" role="row" key={row[0]}>{row.map((cell,index) => <span role="cell" key={cell} className={index === 2 ? "scholar-cell" : ""}>{cell}</span>)}</div>)}</div></section><section className="pricing-note"><span>🦴</span><div><h3>Early-stage promise</h3><p>Paid plans are a preview of intended pricing. ShibaAI is currently in prototype access, so no payment will be collected yet.</p></div></section><FAQSection compact /></main>;
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
