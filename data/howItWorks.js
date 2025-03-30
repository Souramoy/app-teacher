import { motion } from "framer-motion";
import { UserPlus, FileEdit, Users, LineChart } from "lucide-react";

export const howItWorks = [
  {
    title: "Professional Onboarding",
    description: "Share your industry and expertise for personalized guidance",
    icon: <UserPlus className="w-8 h-8" />,
    bgClass: "bg-gradient-to-br from-gray-900 to-gray-800",
    hoverClass: "hover:shadow-purple-500/30",
    borderClass: "border-purple-500/20"
  },
  {
    title: "Craft Your Documents",
    description: "Create ATS-optimized resumes and compelling cover letters",
    icon: <FileEdit className="w-8 h-8" />,
    bgClass: "bg-gradient-to-br from-gray-900 to-gray-800",
    hoverClass: "hover:shadow-blue-500/30",
    borderClass: "border-blue-500/20"
  },
  {
    title: "Prepare for Interviews",
    description: "Practice with AI-powered mock interviews tailored to your role",
    icon: <Users className="w-8 h-8" />,
    bgClass: "bg-gradient-to-br from-gray-900 to-gray-800",
    hoverClass: "hover:shadow-emerald-500/30",
    borderClass: "border-emerald-500/20"
  },
  {
    title: "Track Your Progress",
    description: "Monitor improvements with detailed performance analytics",
    icon: <LineChart className="w-8 h-8" />,
    bgClass: "bg-gradient-to-br from-gray-900 to-gray-800",
    hoverClass: "hover:shadow-amber-500/30",
    borderClass: "border-amber-500/20"
  },
];