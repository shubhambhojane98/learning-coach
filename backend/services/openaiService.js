import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const chatModel = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-4o-mini",
  temperature: 0.7,
});

const prompt = PromptTemplate.fromTemplate(`
You are an expert AI course planner.

Create a structured 7-day crash course for the topic: "{topic}".

Respond in **valid JSON format** as an array of 7 objects. Each object represents a day in the course and must include:

- "day": number (1 to 7)
- "title": short and engaging title of the day's topic
- "summary": 2-3 sentence overview of what the user will learn
- "objectives": 3 learning objectives (as an array)
- "resources": array of 2–4 items, each with:
  - "type": either "YouTube" or "Article"
  - "title": title of the resource
  - "url": a valid and relevant link e (real, if possible,)
- "quiz": array of 3–5 multiple-choice questions; each with:
  - "question": string
  - "options": array of 4 options
  - "answer": correct option as a string
- "notesPlaceholder": string (e.g., "Write your notes here...")

Example format:

[
  {{
    "day": 1,
    "title": "Introduction to Machine Learning",
    "summary": "Get familiar with the basics of machine learning, key concepts, and how it's used in real life.",
    "objectives": [
      "Understand what machine learning is",
      "Explore key types of ML: supervised, unsupervised, reinforcement",
      "Identify real-world applications"
    ],
    "resources": [
      {{
        "type": "YouTube",
        "title": "Intro to ML - CrashCourse",
        "url": "https://youtube.com/example"
      }},
      {{
        "type": "Article",
        "title": "Machine Learning Basics",
        "url": "https://example.com/article"
      }}
    ],
    "quiz": [
      {{
        "question": "Which of the following is a type of machine learning?",
        "options": ["Supervised", "Organized", "Filtered", "Segmented"],
        "answer": "Supervised"
      }}
    ],
    "notesPlaceholder": "Write your notes here..."
  }},
  ...
]
`);

const chain = prompt.pipe(chatModel).pipe(new StringOutputParser());

export const generateCoursePlan = async (topic) => {
  const response = await chain.invoke({ topic });
  console.log("Response AI", response);
  return response;
};
