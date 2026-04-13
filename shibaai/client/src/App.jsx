import { useState } from "react";
import NotesInput from "./components/NotesInput.jsx";
import QuizResults from "./components/QuizResults.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import { generateQuiz } from "./services/api.js";

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
      <div className="card">
        <div className="hero">
          <h1>ShibaAI</h1>
          <p>Your study copilot for faster, smarter review.</p>
        </div>

        <NotesInput
          notes={notes}
          setNotes={setNotes}
          onGenerate={handleGenerateQuiz}
          loading={loading}
        />

        <ErrorMessage message={error} />

        <QuizResults questions={questions} />
      </div>
    </div>
  );
}
