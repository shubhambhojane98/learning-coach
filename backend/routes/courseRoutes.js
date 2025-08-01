import express from "express";
import { generateCourse } from "../controllers/courseController.js";

const router = express.Router();

// Define routes
router.post("/generate-course", generateCourse);

export default router;
