"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ReferenceLine,
  Label
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PerformanceChart({ assessments }) {
  const [theme, setTheme] = useState("light");
  const [chartData, setChartData] = useState([]);
  const [averageScore, setAverageScore] = useState(0);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (assessments) {
      const formattedData = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MMM dd"),
        score: assessment.quizScore,
      }));
      setChartData(formattedData);

      const total = assessments.reduce((sum, a) => sum + a.quizScore, 0);
      setAverageScore(total / assessments.length);
    }
  }, [assessments]);

  const chartVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
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
          Performance Analytics
        </h1>
        <Button
          variant="outline"
          onClick={toggleTheme}
          className={`${theme === 'light' ? 'bg-gray-200 text-gray-800' : 'bg-gray-700 text-white'} border-none`}
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Button>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={chartVariants}
      >
        <Card className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-lg hover:shadow-xl transition-all duration-300`}>
          <CardHeader>
            <CardTitle className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
              Performance Trend
            </CardTitle>
            <CardDescription className={theme === 'light' ? '' : 'text-gray-300'}>
              Your quiz scores progression over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={theme === 'light' ? '#e5e7eb' : '#4b5563'} 
                  />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: theme === 'light' ? '#6b7280' : '#d1d5db' }}
                    stroke={theme === 'light' ? '#9ca3af' : '#6b7280'}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    tick={{ fill: theme === 'light' ? '#6b7280' : '#d1d5db' }}
                    stroke={theme === 'light' ? '#9ca3af' : '#6b7280'}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload?.length) {
                        return (
                          <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-700'} border ${theme === 'light' ? 'border-gray-200' : 'border-gray-600'} rounded-lg p-3 shadow-xl`}>
                            <p className={`font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                              Score: <span className="text-blue-500">{payload[0].value}%</span>
                            </p>
                            <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                              {payload[0].payload.date}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <ReferenceLine 
                    y={averageScore} 
                    stroke={theme === 'light' ? '#ef4444' : '#f87171'}
                    strokeDasharray="3 3"
                  >
                    <Label 
                      value={`Avg: ${averageScore.toFixed(1)}%`} 
                      position="right" 
                      fill={theme === 'light' ? '#ef4444' : '#f87171'}
                    />
                  </ReferenceLine>
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorScore)"
                    strokeWidth={3}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#8884d8"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 8, stroke: '#8884d8', strokeWidth: 2, fill: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}