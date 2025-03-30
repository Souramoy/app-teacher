"use client";

import { useState } from "react";
import { Brain, Target, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StatsCards({ assessments }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments?.length) return null;
    return assessments[0];
  };

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div data-color-mode={theme} className={`${theme === 'light' ? 'bg-gradient-to-br from-blue-50 to-purple-50' : 'bg-gradient-to-br from-gray-800 to-gray-900'} p-6 rounded-xl`}>
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-center gap-2 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-bold text-3xl bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Assessment Stats
        </h1>
        <Button
          variant="outline"
          onClick={toggleTheme}
          className={`${theme === 'light' ? 'bg-gray-200 text-gray-800' : 'bg-gray-700 text-white'} border-none`}
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Button>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-lg hover:shadow-xl transition-all duration-300`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                Average Score
              </CardTitle>
              <Trophy className={`h-5 w-5 ${theme === 'light' ? 'text-yellow-500' : 'text-yellow-400'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                {getAverageScore()}%
              </div>
              <p className={`text-xs ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}`}>
                Across all assessments
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-lg hover:shadow-xl transition-all duration-300`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                Questions Practiced
              </CardTitle>
              <Brain className={`h-5 w-5 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                {getTotalQuestions()}
              </div>
              <p className={`text-xs ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}`}>
                Total questions
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-lg hover:shadow-xl transition-all duration-300`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                Latest Score
              </CardTitle>
              <Target className={`h-5 w-5 ${theme === 'light' ? 'text-green-500' : 'text-green-400'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                {getLatestAssessment()?.quizScore.toFixed(1) || 0}%
              </div>
              <p className={`text-xs ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}`}>
                Most recent quiz
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}