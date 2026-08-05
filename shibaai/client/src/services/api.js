const API_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:5001" : "")
).replace(/\/$/, "");

export async function generateQuiz(notes, options = {}) {
  const url = `${API_URL}/api/quiz/generate`;
  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ notes, ...options })
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

export async function generateStudyTool(tool, notes, options = {}) {
  const url = `${API_URL}/api/study/generate`;
  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tool, notes, ...options })
    });
  } catch {
    throw new Error("ShibaAI could not reach the study server. Check the connection and try again.");
  }
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.error || `The study server returned an error (${response.status}).`);
  return data;
}
