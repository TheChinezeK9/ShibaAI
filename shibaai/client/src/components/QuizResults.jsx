export default function QuizResults({ questions }) {
  if (!questions.length) {
    return null;
  }

  return (
    <section className="section results">
      <h2>Quiz Questions</h2>
      <ol className="quiz-list">
        {questions.map((item) => (
          <li key={item.id} className="quiz-item">
            {item.question}
          </li>
        ))}
      </ol>
    </section>
  );
}
