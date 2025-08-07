"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, BookOpen, Clock, Zap } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [topic, setTopic] = useState("");
  console.log(topic);

  const handleGenerate = async () => {
    const res = await fetch("/api/generate-course", {
      method: "POST",
      body: JSON.stringify({ topic }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log("D", data);
    // IF NOT LOGGED IN
    const tempId = uuidv4(); // temporary ID
    localStorage.setItem(`course-${tempId}`, JSON.stringify(data));
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex flex-col">
      {/* Header */}
      <header className="w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">LearnFast</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-600 hover:text-sky-600 transition-colors"
            >
              How it works
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-sky-600 transition-colors"
            >
              Examples
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-sky-600 transition-colors"
            >
              Pricing
            </a>
            <Button
              variant="outline"
              className="ml-4 border-sky-200 text-sky-600 hover:bg-sky-50 bg-transparent"
            >
              Sign In
            </Button>
          </nav>

          {/* Mobile Sign In Button */}
          <div className="md:hidden">
            <Button
              variant="outline"
              size="sm"
              className="border-sky-200 text-sky-600 hover:bg-sky-50 bg-transparent"
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Learning
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Master Any Topic in <span className="text-sky-500">7 Days</span>
              <br />— Powered by AI
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Get a personalized, structured learning path for any subject. From
              coding to cooking, our AI creates the perfect crash course just
              for you.
            </p>
          </div>

          {/* Input Section */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-white rounded-2xl shadow-xl shadow-sky-100/50 p-8 border border-sky-100">
              <form className="space-y-6">
                <div className="relative">
                  <Input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter any topic you want to learn"
                    className="w-full h-14 px-6 text-lg border-2 border-sky-100 rounded-xl focus:!border-sky-400 focus:ring-sky-400 bg-gray-50 focus:bg-white transition-all duration-200"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  onClick={(e) => {
                    e.preventDefault();
                    handleGenerate();
                  }}
                  className="w-full h-14 text-lg font-semibold bg-sky-500 hover:bg-sky-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Generate My Crash Course
                </Button>
              </form>

              <p className="text-sm text-gray-500 mt-4">
                Try: "Python Programming", "Digital Marketing", "French
                Cooking", "Guitar Basics"
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                7-Day Structure
              </h3>
              <p className="text-gray-600">
                Perfectly paced daily lessons designed for maximum retention
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                AI-Personalized
              </h3>
              <p className="text-gray-600">
                Tailored content based on your learning style and goals
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Any Topic
              </h3>
              <p className="text-gray-600">
                From technical skills to creative arts, we cover everything
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-4 py-8 sm:px-6 lg:px-8 border-t border-sky-100">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>&copy; 2025 LearnFast. Accelerate your learning journey.</p>
        </div>
      </footer>
    </div>
  );
}
