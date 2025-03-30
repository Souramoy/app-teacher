"use client";

import { Trophy, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}) {
  if (!result) return null;

  return (
    <div className="mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <Trophy className="h-6 w-6 text-yellow-500" />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Quiz Results
          </span>
        </h1>
      </motion.div>

      <CardContent className="space-y-6">
        {/* Score Overview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center space-y-4"
        >
          <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            {result.quizScore.toFixed(1)}%
          </h3>
          <div className="relative">
            <Progress 
              value={result.quizScore} 
              className="w-full h-3 bg-gray-200 dark:bg-gray-700"
            />
            <div 
              className={cn(
                "absolute top-0 left-0 h-full rounded-full",
                "bg-gradient-to-r from-blue-500 to-purple-600"
              )}
              style={{ width: `${result.quizScore}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {result.quizScore >= 70 ? "Great job!" : "Keep practicing!"}
          </p>
        </motion.div>

        {/* Improvement Tip */}
        {result.improvementTip && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg border border-blue-100 dark:border-gray-700"
          >
            <p className="font-medium text-blue-600 dark:text-blue-400">Improvement Tip:</p>
            <p className="text-muted-foreground dark:text-gray-300">{result.improvementTip}</p>
          </motion.div>
        )}

        {/* Questions Review */}
        <div className="space-y-4">
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-medium text-lg"
          >
            Question Review
          </motion.h3>
          {result.questions.map((q, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="border rounded-lg p-4 space-y-3 hover:shadow-sm transition-shadow dark:border-gray-700"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium dark:text-white">{q.question}</p>
                {q.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}
              </div>
              <div className="text-sm text-muted-foreground dark:text-gray-400">
                <p>Your answer: <span className={q.isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>{q.userAnswer}</span></p>
                {!q.isCorrect && <p>Correct answer: <span className="text-green-600 dark:text-green-400">{q.answer}</span></p>}
              </div>
              <div className="text-sm bg-blue-50 dark:bg-gray-800 p-3 rounded border border-blue-100 dark:border-gray-700">
                <p className="font-medium text-blue-600 dark:text-blue-400">Explanation:</p>
                <p className="text-muted-foreground dark:text-gray-300">{q.explanation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>

      {!hideStartNew && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <CardFooter className="pt-6">
            <Button 
              onClick={onStartNew} 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Start New Quiz
            </Button>
          </CardFooter>
        </motion.div>
      )}
    </div>
  );
}