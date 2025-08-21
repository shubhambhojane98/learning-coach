import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  JsonOutputParser,
  StringOutputParser,
} from "@langchain/core/output_parsers";

const chatModel = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-4o-mini",
  temperature: 0.7,
});

const prompt = PromptTemplate.fromTemplate(`
You are an expert AI course planner.

Create a structured 7-day crash course for the topic: "{topic}".

Respond in **valid JSON format** as an array of 7 objects. Each object must include:

- "day": number (1 to 7)
- "title": short and engaging title of the day's topic
- "summary": 2–3 sentence overview of what the learner will understand or explore
- "activity": one hands-on task or coding challenge the learner should complete
- "status" :  day 1 status  should be a current and remaining day status should be locked
- "quiz": array of 2–3 multiple-choice questions; each question must include:
  - "question": string
  - "options": array of 4 answer choices
  - "answer": correct option as a string
- "notesPlaceholder": string (e.g., "Write your notes here...")

Do not include any external links (e.g., YouTube or articles).

Example output format:     
Return JSON in the following format:
{{
  "topic" : "Topic name",
  "intro' : "Master the fundamentals of Machine Learning in just one week with our comprehensive, hands-on curriculum designed for beginners."
  "content" : [
    {{
      "day": 1,
      "title": "Introduction to Machine Learning",
      "summary": "Get familiar with what machine learning is, and why it's becoming increasingly important across industries.",
      "activity": "Install Python and write a simple script that prints 'Hello, Machine Learning'.",
      "status" : current,
      "quiz": [
        {{
          "question": "Which of these is a real-world application of machine learning?",
          "options": ["Time travel", "Facial recognition", "Plant watering", "Printing books"],
          "answer": "Facial recognition"
        }}
      ],
      "notesPlaceholder": "Write your notes here..."
    }},
    ...
  ]
}}

`);

const chain = prompt.pipe(chatModel).pipe(new JsonOutputParser());

export const generateCoursePlan = async (topic) => {
  const response = await chain.invoke({ topic });
  console.log("Response AI", response);
  return response;
};
