import { generateQuizFromNotes } from "../services/geminiService.js";

export async function generateQuiz(req, res) {
  try {
    const { notes } = req.body;

    if (!notes || typeof notes !== "string" || !notes.trim()) {
      return res.status(400).json({
        error: "Notes are required."
      });
    }

    const questions = await generateQuizFromNotes(notes);

    return res.json({ questions });
  } catch (error) {
    console.error("Quiz controller error:", error);

    return res.status(500).json({
      error: "Failed to generate quiz."
    });
  }
}
