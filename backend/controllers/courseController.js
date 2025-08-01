import { generateCoursePlan } from "../services/openaiService.js";

export const generateCourse = async (req, res) => {
  try {
    const { topic, userId } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic is Required" });
    }

    const courseContent = await generateCoursePlan(topic);

    console.log("CONTENT", courseContent);

    res.status(201).json({
      message: "Course is generated successfully",
      course: courseContent,
    });
  } catch (error) {
    console.error("Error generating course", error);
    res.status(500).json({ error: "Failed to generate course" });
  }
};
