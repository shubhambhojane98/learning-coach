"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  Target,
  Wrench,
  HelpCircle,
  BookOpen,
  Clock,
} from "lucide-react";

export default function DayDetailsPage() {
  const [notes, setNotes] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [saveStatus, setSaveStatus] = useState("All changes saved");

  const handleNotesChange = (value: string) => {
    setNotes(value);
    setSaveStatus("Saving...");
    // Simulate autosave
    setTimeout(() => {
      setSaveStatus("All changes saved");
    }, 1000);
  };

  const handleQuizAnswer = (questionIndex: number, answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleMarkComplete = () => {
    setIsCompleted(true);
    // Here you would typically update the backend and unlock next day
  };

  const quizQuestions = [
    {
      question: "What is the primary goal of supervised learning?",
      options: [
        "To find hidden patterns in unlabeled data",
        "To learn from labeled examples to make predictions",
        "To optimize rewards through trial and error",
        "To reduce the dimensionality of data",
      ],
      correct: 1,
    },
    {
      question:
        "Which of the following is NOT a common type of machine learning?",
      options: [
        "Supervised Learning",
        "Unsupervised Learning",
        "Reinforcement Learning",
        "Deterministic Learning",
      ],
      correct: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-blue-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="secondary" className="bg-white/20 text-white">
              Day 1
            </Badge>
            <div className="flex items-center gap-2 text-sm opacity-90">
              <Clock className="w-4 h-4" />
              <span>45 min estimated</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Introduction to Machine Learning
          </h1>
          <p className="text-lg opacity-90">
            Build your foundation in AI and ML concepts
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Progress
          </span>
          <div className="flex-1">
            <Progress value={isCompleted ? 100 : 65} className="h-2" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {isCompleted ? "100%" : "65%"}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-8 space-y-6">
        {/* Learning Objective */}
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              Learning Objective
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">
              By the end of this lesson, you'll understand the fundamental
              concepts of machine learning, including the difference between
              supervised, unsupervised, and reinforcement learning. You'll also
              learn about common applications of ML in real-world scenarios and
              be able to identify which type of learning approach is best suited
              for different problems.
            </p>
          </CardContent>
        </Card>

        {/* Activity Section */}
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-blue-700" />
              Hands-on Activity
            </CardTitle>
            <CardDescription>
              Complete this coding challenge to reinforce your learning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-4 border-l-4 border-l-blue-700">
              <h4 className="font-semibold mb-2 text-card-foreground">
                Challenge: Classify ML Problems
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Given the following scenarios, identify whether they require
                supervised, unsupervised, or reinforcement learning:
              </p>
              <div className="bg-card rounded-md p-4 font-mono text-sm border">
                <div className="space-y-2">
                  <div>
                    1. Predicting house prices based on historical sales data
                  </div>
                  <div>2. Grouping customers by purchasing behavior</div>
                  <div>3. Teaching an AI to play chess</div>
                  <div>4. Detecting spam emails</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quiz Section */}
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-500" />
              Knowledge Check
            </CardTitle>
            <CardDescription>
              Test your understanding with these questions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {quizQuestions.map((q, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-medium text-card-foreground">
                  {index + 1}. {q.question}
                </h4>
                <div className="space-y-2">
                  {q.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        checked={selectedAnswers[index] === option}
                        onChange={() => handleQuizAnswer(index, option)}
                        className="text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notes Section */}
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              Personal Notes
            </CardTitle>
            <CardDescription>
              Jot down key insights and questions for later review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Write your notes here... Key concepts, questions, or insights from today's lesson."
              value={notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              className="min-h-32 resize-none"
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-muted-foreground">
                {saveStatus}
              </span>
              <span className="text-xs text-muted-foreground">
                {notes.length} characters
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Mark Complete Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={handleMarkComplete}
            disabled={isCompleted}
            size="lg"
            className="px-8 py-3 text-base font-semibold transition-all duration-200 hover:scale-105 bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Day Completed
              </>
            ) : (
              "Mark Complete"
            )}
          </Button>
        </div>

        {isCompleted && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Great job! Day 2 is now unlocked
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
