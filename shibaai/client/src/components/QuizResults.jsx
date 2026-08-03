import { useMemo, useState } from "react";

export default function QuizResults({ questions }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(
    () => questions.filter((item, index) => answers[index] === item.correctAnswer).length,
    [answers, questions]
  );

  if (!questions.length) {
    return null;
  }

  const allAnswered = questions.every((_, index) => answers[index] !== undefined);

  function retryQuiz() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <section className="section results-section">
      <div className="section-header">
        <h2>Your Quiz</h2>
        <p>Choose one answer for each question, then check your score.</p>
      </div>

      {submitted && (
        <div className="score-card" role="status">
          <div>
            <span className="score-eyebrow">QUIZ COMPLETE</span>
            <strong>{score} / {questions.length}</strong>
          </div>
          <p>{score === questions.length ? "Perfect score — you nailed it!" : score >= 3 ? "Nice work. Review the explanations below." : "Good start. Review the answers and try again."}</p>
        </div>
      )}

      <div className="quiz-grid">
        {questions.map((item, index) => (
          <div key={item.id || index} className="quiz-card">
            <div className="quiz-number">Q{index + 1}</div>
            <p className="question-text">{item.question}</p>
            <div className="choices" role="radiogroup" aria-label={`Question ${index + 1}`}>
              {item.choices?.map((choice) => {
                const selected = answers[index] === choice;
                const correct = submitted && choice === item.correctAnswer;
                const incorrect = submitted && selected && choice !== item.correctAnswer;
                return (
                  <button
                    type="button"
                    className={`choice ${selected ? "selected" : ""} ${correct ? "correct" : ""} ${incorrect ? "incorrect" : ""}`}
                    key={choice}
                    onClick={() => !submitted && setAnswers((current) => ({ ...current, [index]: choice }))}
                    disabled={submitted}
                    role="radio"
                    aria-checked={selected}
                  >
                    <span className="choice-marker">{String.fromCharCode(65 + item.choices.indexOf(choice))}</span>
                    <span>{choice}</span>
                  </button>
                );
              })}
            </div>
            {submitted && <div className="explanation"><strong>Why:</strong> {item.explanation}</div>}
          </div>
        ))}
      </div>

      <div className="quiz-actions">
        {submitted ? (
          <button className="button secondary-button" onClick={retryQuiz}>Try again</button>
        ) : (
          <button className="button" disabled={!allAnswered} onClick={() => setSubmitted(true)}>
            {allAnswered ? "Check my answers" : `Answer all questions (${Object.keys(answers).length}/${questions.length})`}
          </button>
        )}
      </div>
    </section>
  );
}
