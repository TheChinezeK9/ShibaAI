const API_URL = import.meta.env.VITE_API_URL;

export async function generateQuiz(notes) {
  const response = await fetch(`${API_URL}/api/quiz/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ notes })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Request failed.");
  }

  return data;
}
