import { generateQuizFromNotes } from "../services/geminiService.js";

export async function generateQuiz(req, res) {
  try {
    const { notes, difficulty = "standard", questionCount = 5 } = req.body;

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

    const safeDifficulty = ["simple", "standard", "advanced"].includes(difficulty) ? difficulty : "standard";
    const safeCount = [5, 10, 15].includes(Number(questionCount)) ? Number(questionCount) : 5;
    const questions = await generateQuizFromNotes(notes, { difficulty: safeDifficulty, questionCount: safeCount });

    return res.json({ questions });
  } catch (error) {
    console.error("Quiz controller error:", error);
    const isQuotaError = error?.status === 429;
    return res.status(isQuotaError ? 429 : 500).json({
      error: isQuotaError
        ? "The AI service is busy or its quota was reached. Please try again soon."
        : "The AI service could not create a quiz. Check the server key and try again."
    });
  }
}
