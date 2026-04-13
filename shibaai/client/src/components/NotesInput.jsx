export default function NotesInput({ notes, setNotes, onGenerate, loading }) {
  return (
    <section className="section">
      <label className="label" htmlFor="notes">
        Paste your notes
      </label>

      <textarea
        id="notes"
        className="textarea"
        placeholder="Paste your class notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button className="button" onClick={onGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Quiz"}
      </button>
    </section>
  );
}
