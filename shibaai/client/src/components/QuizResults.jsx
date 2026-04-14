export default function QuizResults({ questions }) {
  if (!questions.length) {
    return null;
  }

  return (
    <section className="section results-section">
      <div className="section-header">
        <h2>Your Quiz</h2>
        <p>Here are your generated practice questions.</p>
      </div>

      <div className="quiz-grid">
        {questions.map((item, index) => (
          <div key={item.id || index} className="quiz-card">
            <div className="quiz-number">Q{index + 1}</div>
            <p>{item.question}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
