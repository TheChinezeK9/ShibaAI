import express from "express";
import { generateStudy } from "../controllers/studyController.js";

const router = express.Router();
router.post("/generate", generateStudy);
export default router;
