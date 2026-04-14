export default function NotesInput({ notes, setNotes, onGenerate, loading }) {
  return (
    <section className="section">
      <div className="section-header">
        <h2>Generate a quiz from your notes</h2>
        <p>
          Paste your class notes below and ShibaAI will turn them into practice
          questions.
        </p>
      </div>

      <label className="label" htmlFor="notes">
        Your notes
      </label>

      <textarea
        id="notes"
        className="textarea"
        placeholder="Example: Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to make glucose and oxygen..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button className="button" onClick={onGenerate} disabled={loading}>
        {loading ? "Generating Quiz..." : "Generate Quiz"}
      </button>
    </section>
  );
}
