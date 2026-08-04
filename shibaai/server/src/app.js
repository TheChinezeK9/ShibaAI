import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import quizRoutes from "./routes/quizRoutes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ message: "ShibaAI API is running." });
});

app.use("/api/quiz", quizRoutes);

if (process.env.NODE_ENV === "production") {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const clientDist = path.resolve(currentDir, "../../client/dist");

  app.use(express.static(clientDist));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

app.use((err, _req, res, _next) => {
  console.error("Unhandled server error:", err);
  res.status(500).json({
    error: "Internal server error."
  });
});

export default app;
