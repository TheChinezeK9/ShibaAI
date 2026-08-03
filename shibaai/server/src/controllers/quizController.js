import { generateQuizFromNotes } from "../services/geminiService.js";

export async function generateQuiz(req, res) {
  try {
    const { notes } = req.body;

    if (!notes || typeof notes !== "string" || !notes.trim()) {
      return res.status(400).json({
        error: "Notes are required."
      });
    }


    if (notes.trim().length < 40) {
      return res.status(400).json({
        error: "Add a little more detail so ShibaAI can build a useful quiz."
      });
    }

    if (notes.length > 12000) {
      return res.status(400).json({
        error: "Notes must be 12,000 characters or fewer."
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
