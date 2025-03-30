"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QuizResult from "./quiz-result";

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
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
          Quiz History
        </h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={toggleTheme}
            className={`${theme === 'light' ? 'bg-gray-200 text-gray-800' : 'bg-gray-700 text-white'} border-none`}
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Button>
          <Button 
            onClick={() => router.push("/interview/mock")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            Start New Quiz
          </Button>
        </div>
      </motion.div>

      <Card className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-lg`}>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                Recent Quizzes
              </CardTitle>
              <CardDescription className={theme === 'light' ? '' : 'text-gray-300'}>
                Review your past quiz performance
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessments?.length ? (
              <AnimatePresence>
                {assessments.map((assessment, i) => (
                  <motion.div
                    key={assessment.id}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all duration-300 ${theme === 'light' ? 'hover:bg-blue-50/50' : 'hover:bg-gray-700/50'} border ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}
                      onClick={() => setSelectedQuiz(assessment)}
                    >
                      <CardHeader>
                        <CardTitle className={`${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                            Quiz {i + 1}
                          </span>
                        </CardTitle>
                        <CardDescription className={`flex flex-col md:flex-row justify-between w-full ${theme === 'light' ? '' : 'text-gray-400'}`}>
                          <div>
                            Score: <span className="font-semibold text-blue-500">{assessment.quizScore.toFixed(1)}%</span>
                          </div>
                          <div>
                            {format(new Date(assessment.createdAt), "MMMM dd, yyyy HH:mm")}
                          </div>
                        </CardDescription>
                      </CardHeader>
                      {assessment.improvementTip && (
                        <CardContent>
                          <p className={`text-sm ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-400'}`}>
                            {assessment.improvementTip}
                          </p>
                        </CardContent>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`text-center py-8 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}
              >
                No quizzes completed yet
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className={`max-w-3xl max-h-[90vh] overflow-y-auto ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
          <DialogHeader>
            <DialogTitle className={theme === 'light' ? '' : 'text-white'}>
              Quiz Details
            </DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}