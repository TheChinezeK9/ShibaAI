import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in server environment.");
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export async function generateQuizFromNotes(notes, { difficulty = "standard", questionCount = 5 } = {}) {
  const prompt = `
You are an academic quiz generator for a high school student.

Read the study notes below and generate exactly ${questionCount} multiple-choice quiz questions.

Requirements:
- Questions must be accurate and based only on the notes
- Target difficulty: ${difficulty}. Simple means direct recall, standard mixes recall and application, and advanced emphasizes reasoning.
- Use short, direct sentences and plain language
- Test important ideas, not trivia
- Avoid trick questions and ambiguous choices
- Include exactly 4 plausible answer choices per question
- correctAnswer must exactly match one of the choices
- Add a short explanation grounded in the notes
- Return valid JSON only
- Use this exact format:

{
  "questions": [
    {
      "id": 1,
      "question": "string",
      "choices": ["string", "string", "string", "string"],
      "correctAnswer": "string",
      "explanation": "string"
    }
  ]
}

Study notes:
${notes}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json"
    }
  });

  const raw = response.text;

  if (!raw) {
    throw new Error("No content returned from Gemini.");
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Gemini returned invalid JSON.");
  }

  if (!parsed.questions || !Array.isArray(parsed.questions)) {
    throw new Error("Missing questions array.");
  }

  const isValid = parsed.questions.length === questionCount && parsed.questions.every(
    (item) =>
      typeof item.question === "string" &&
      Array.isArray(item.choices) &&
      item.choices.length === 4 &&
      item.choices.every((choice) => typeof choice === "string") &&
      typeof item.correctAnswer === "string" &&
      item.choices.includes(item.correctAnswer) &&
      typeof item.explanation === "string"
  );

  if (!isValid) {
    throw new Error("Gemini returned an invalid quiz structure.");
  }

  return parsed.questions;
}
