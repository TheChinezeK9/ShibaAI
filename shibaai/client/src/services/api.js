const API_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:5001" : "")
).replace(/\/$/, "");

export async function generateQuiz(notes) {
  const url = `${API_URL}/api/quiz/generate`;
  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ notes })
    });
  } catch {
    throw new Error("ShibaAI could not reach the quiz server. Please try again shortly.");
  }

  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();

  if (!contentType.includes("application/json")) {
    throw new Error(`Expected JSON but got: ${text.slice(0, 120)}`);
  }

  const data = JSON.parse(text);

  if (!response.ok) {
    throw new Error(data.error || "Request failed.");
  }

  return data;
}
