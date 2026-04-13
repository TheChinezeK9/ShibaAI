import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in server environment.");
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export async function generateQuizFromNotes(notes) {
  const prompt = `
You are an academic quiz generator for a high school student.

Read the study notes below and generate exactly 5 quiz questions.

Requirements:
- Questions must be accurate and based only on the notes
- Mix easy and medium difficulty
- Make wording clear for a high school student
- Return valid JSON only
- Use this exact format:

{
  "questions": [
    {
      "id": 1,
      "question": "string"
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

  return parsed.questions;
}
