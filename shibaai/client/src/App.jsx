import { useState } from "react";
import NotesInput from "./components/NotesInput.jsx";
import QuizResults from "./components/QuizResults.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import { generateQuiz } from "./services/api.js";
import logo from "./assets/ShibaAI.png";

export default function App() {
  const [notes, setNotes] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerateQuiz() {
    setError("");
    setQuestions([]);

    if (!notes.trim()) {
      setError("Please paste some notes first.");
      return;
    }

    try {
      setLoading(true);
      const data = await generateQuiz(notes);
      setQuestions(data.questions || []);
    } catch (err) {
      setError(err.message || "Failed to generate quiz.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="background-glow glow-1"></div>
      <div className="background-glow glow-2"></div>

      <main className="app-shell">
        <section className="hero-card">
          <img src={logo} alt="ShibaAI logo" className="hero-logo" />
          <div className="hero-text">
            <h1>ShibaAI</h1>
            <p>
              Your study copilot for smarter review, targeted practice, and
              faster learning.
            </p>
          </div>
        </section>

        <section className="main-card">
          <NotesInput
            notes={notes}
            setNotes={setNotes}
            onGenerate={handleGenerateQuiz}
            loading={loading}
          />

          <ErrorMessage message={error} />

          <QuizResults questions={questions} />
        </section>
      </main>
    </div>
  );
}
