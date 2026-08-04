import { generateStudyMaterial } from "../services/studyService.js";

export async function generateStudy(req, res) {
  const { tool, notes } = req.body;
  if (typeof notes !== "string" || notes.trim().length < 40) return res.status(400).json({ error: "Please provide at least a few sentences of study material." });
  if (notes.length > 12000) return res.status(400).json({ error: "Study material must be 12,000 characters or fewer." });
  try {
    return res.json(await generateStudyMaterial(tool, notes.trim()));
  } catch (error) {
    console.error("Study generation error:", error);
    const message = error?.status === 429 ? "The AI service is busy or its quota was reached. Please try again soon." : "The AI service could not generate this result. Check the server key and try again.";
    return res.status(error?.status === 429 ? 429 : 500).json({ error: message });
  }
}
