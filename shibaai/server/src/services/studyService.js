import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const toolInstructions = {
  flashcards: "Create 8 flashcards. Each heading is the term or question and content is the definition or answer.",
  summary: "Create a concise summary split into 4 to 6 logically named sections.",
  "study-guide": "Create a complete exam study guide with 6 to 8 sections covering concepts, details, and review advice.",
  explain: "Explain the hardest ideas simply in 5 sections, using an analogy and a concrete example where helpful.",
  vocabulary: "Extract 8 to 12 important terms. Each heading is a term and content is its clear contextual definition.",
  "essay-outline": "Create a strong essay outline with thesis, introduction, 3 body arguments with evidence, and conclusion.",
  practice: "Create 8 short-answer practice questions. Each heading is the question and content is a model answer.",
  mnemonics: "Create 6 memorable mnemonics, associations, or memory stories for the hardest facts. Explain how each memory trick maps to the material.",
  timeline: "Create a chronological timeline or ordered process with 8 to 12 entries. Each heading begins with a date, era, or step number and content explains its significance.",
  "formula-sheet": "Create a formula sheet. Each heading is a formula or rule; content defines every variable, units when relevant, and when to use it.",
  "note-cleanup": "Rewrite and organize the material into 6 to 10 clean sections. Correct obvious grammar, preserve factual meaning, and highlight connections between ideas."
};

export async function generateStudyMaterial(tool, notes, { difficulty = "standard", detail = "quick" } = {}) {
  const instruction = toolInstructions[tool];
  if (!instruction) throw new Error("Unknown study tool.");
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `You are ShibaAI, a precise study copilot. Use only the supplied material.

Task: ${instruction}
Difficulty: ${difficulty}. Simple uses plain explanations, standard balances recall and application, and advanced emphasizes connections and reasoning.
Detail: ${detail}. Quick means 1–3 concise sentences per item. Detailed means 3–5 useful sentences per item.

Writing rules:
- Lead with the answer or main idea
- Use short, clear sentences
- Remove filler, praise, repetition, and unnecessary introductions
- Define unfamiliar terms the first time they appear
- Be specific enough to study from
- Never invent facts beyond the supplied material

Return JSON only in this exact shape:
{"title":"A specific result title","items":[{"heading":"Short heading","content":"Clear, useful explanation"}]}

Study material:
${notes}`,
    config: { responseMimeType: "application/json" }
  });
  const parsed = JSON.parse(response.text || "{}");
  if (typeof parsed.title !== "string" || !Array.isArray(parsed.items) || !parsed.items.length) throw new Error("AI returned an incomplete result.");
  return parsed;
}
