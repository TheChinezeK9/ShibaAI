const API_URL = import.meta.env.VITE_API_URL;

export async function generateQuiz(notes) {
  const url = `${API_URL}/api/quiz/generate`;
  console.log("Requesting:", url);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ notes })
  });

  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();

  console.log("Status:", response.status);
  console.log("Content-Type:", contentType);
  console.log("Raw response:", text);

  if (!contentType.includes("application/json")) {
    throw new Error(`Expected JSON but got: ${text.slice(0, 120)}`);
  }

  const data = JSON.parse(text);

  if (!response.ok) {
    throw new Error(data.error || "Request failed.");
  }

  return data;
}
