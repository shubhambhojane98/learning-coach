"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Lock, Play, BookOpen } from "lucide-react";

interface CourseDay {
  day: number;
  title: string;
  summary: string;
  status: "completed" | "current" | "locked";
}

export default function CourseOverview() {
  const [courseProgress, setCourseProgress] = useState<CourseDay[]>([
    {
      day: 1,
      title: "Introduction to Machine Learning",
      summary:
        "Learn the fundamentals of ML, types of learning, and real-world applications in modern technology.",
      status: "completed",
    },
    {
      day: 2,
      title: "Data Preprocessing & Feature Engineering",
      summary:
        "Master data cleaning, transformation, and feature selection techniques for better model performance.",
      status: "completed",
    },
    {
      day: 3,
      title: "Supervised Learning Algorithms",
      summary:
        "Explore linear regression, decision trees, and classification algorithms with hands-on examples.",
      status: "current",
    },
    {
      day: 4,
      title: "Unsupervised Learning & Clustering",
      summary:
        "Discover clustering techniques, dimensionality reduction, and pattern recognition methods.",
      status: "locked",
    },
    {
      day: 5,
      title: "Neural Networks & Deep Learning",
      summary:
        "Introduction to neural networks, backpropagation, and building your first deep learning model.",
      status: "locked",
    },
    {
      day: 6,
      title: "Model Evaluation & Optimization",
      summary:
        "Learn cross-validation, hyperparameter tuning, and techniques to improve model accuracy.",
      status: "locked",
    },
    {
      day: 7,
      title: "Deployment & Real-World Applications",
      summary:
        "Deploy your ML models to production and explore career opportunities in machine learning.",
      status: "locked",
    },
  ]);

  const handleStartDay = (day: number) => {
    setCourseProgress((prev) =>
      prev.map((course) => {
        if (course.day === day && course.status === "current") {
          return { ...course, status: "completed" as const };
        }
        if (course.day === day + 1 && course.status === "locked") {
          return { ...course, status: "current" as const };
        }
        return course;
      })
    );
  };

  const getStatusIcon = (status: CourseDay["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="size-5 text-emerald-500" />;
      case "current":
        return <Play className="size-5 text-blue-500" />;
      case "locked":
        return <Lock className="size-5 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: CourseDay["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
            Completed
          </Badge>
        );
      case "current":
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
            Current
          </Badge>
        );
      case "locked":
        return (
          <Badge variant="outline" className="text-slate-500 border-slate-300">
            Locked
          </Badge>
        );
    }
  };

  const completedDays = courseProgress.filter(
    (day) => day.status === "completed"
  ).length;
  const progressPercentage = (completedDays / 7) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2">
            <BookOpen className="size-8 text-blue-600" />
            <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              7-Day Crash Course: Machine Learning
            </h1>
          </div>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-slate-600">
            Master the fundamentals of Machine Learning in just one week with
            our comprehensive, hands-on curriculum designed for beginners.
          </p>

          {/* Progress Bar */}
          <div className="mx-auto max-w-md">
            <div className="mb-2 flex justify-between text-sm text-slate-600">
              <span>Progress</span>
              <span>{completedDays}/7 days completed</span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-200">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courseProgress.map((course, index) => (
            <Card
              key={course.day}
              className={`group relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                course.status === "completed"
                  ? "border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 shadow-lg shadow-emerald-100/50"
                  : course.status === "current"
                  ? "border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg shadow-blue-100/50"
                  : "border-slate-200 bg-gradient-to-br from-slate-50 to-gray-50 shadow-md"
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />

              <CardHeader className="relative z-10 flex-shrink-0 pb-3">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(course.status)}
                    <span className="text-sm font-semibold text-slate-600">
                      Day {course.day}
                    </span>
                  </div>
                  {getStatusBadge(course.status)}
                </div>
                <CardTitle className="text-lg leading-tight text-slate-900">
                  {course.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10 flex flex-grow flex-col pt-0">
                <p className="mb-4 flex-grow text-sm leading-relaxed text-slate-600">
                  {course.summary}
                </p>

                <Button
                  onClick={() => handleStartDay(course.day)}
                  disabled={course.status === "locked"}
                  className={`mt-auto w-full transition-all duration-200 ${
                    course.status === "completed"
                      ? "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg"
                      : course.status === "current"
                      ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                      : "cursor-not-allowed bg-slate-300 text-slate-500 hover:bg-slate-300"
                  }`}
                >
                  {course.status === "completed" ? (
                    <>
                      <CheckCircle className="mr-2 size-4" />
                      Review Day
                    </>
                  ) : course.status === "current" ? (
                    <>
                      <Play className="mr-2 size-4" />
                      Start Day
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 size-4" />
                      Locked
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 rounded-2xl bg-white/60 px-8 py-4 shadow-lg backdrop-blur-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {completedDays}
              </div>
              <div className="text-sm text-slate-600">Days Completed</div>
            </div>
            <div className="h-8 w-px bg-slate-300" />
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {7 - completedDays}
              </div>
              <div className="text-sm text-slate-600">Days Remaining</div>
            </div>
            <div className="h-8 w-px bg-slate-300" />
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {Math.round(progressPercentage)}%
              </div>
              <div className="text-sm text-slate-600">Progress</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
