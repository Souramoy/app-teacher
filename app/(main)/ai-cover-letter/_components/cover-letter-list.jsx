"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Eye, Trash2, FileText, Briefcase, Building } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCoverLetter } from "@/actions/cover-letter";

export default function CoverLetterList({ coverLetters }) {
  const router = useRouter();
  const [theme, setTheme] = useState("light");

  const handleDelete = async (id) => {
    try {
      await deleteCoverLetter(id);
      toast.success("Cover letter deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete cover letter");
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (!coverLetters?.length) {
    return (
      <div data-color-mode={theme} className={`${theme === 'light' ? 'bg-gradient-to-br from-blue-50 to-purple-50' : 'bg-gradient-to-br from-gray-800 to-gray-900'} p-6 rounded-xl`}>
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center gap-2 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-bold text-3xl bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            My Cover Letters
          </h1>
          <Button
            variant="outline"
            onClick={toggleTheme}
            className={`${theme === 'light' ? 'bg-gray-200 text-gray-800' : 'bg-gray-700 text-white'} border-none`}
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Button>
        </motion.div>
        
        <Card className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-lg`}>
          <CardHeader>
            <CardTitle className={`${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
              No Cover Letters Yet
            </CardTitle>
            <CardDescription className={theme === 'light' ? '' : 'text-gray-300'}>
              Create your first cover letter to get started
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div data-color-mode={theme} className={`${theme === 'light' ? 'bg-gradient-to-br from-blue-50 to-purple-50' : 'bg-gradient-to-br from-gray-800 to-gray-900'} p-6 rounded-xl`}>
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-center gap-2 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* <h1 className="font-bold text-3xl bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          My Cover Letters
        </h1> */}
        {/* <Button
          variant="outline"
          onClick={toggleTheme}
          className={`${theme === 'light' ? 'bg-gray-200 text-gray-800' : 'bg-gray-700 text-white'} border-none`}
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Button> */}
      </motion.div>

      <motion.div 
        className="space-y-4"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        {coverLetters.map((letter) => (
          <Card 
            key={letter.id} 
            className={`group relative shadow-lg transition-all duration-300 hover:shadow-xl ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className={`text-xl ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                    <div className="flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
                      {letter.jobTitle} at {letter.companyName}
                    </div>
                  </CardTitle>
                  <CardDescription className={theme === 'light' ? '' : 'text-gray-300'}>
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-blue-500" />
                      Created {format(new Date(letter.createdAt), "PPP")}
                    </div>
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => router.push(`/ai-cover-letter/${letter.id}`)}
                    className={`${theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-700'}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className={`${theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-700'}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className={theme === 'light' ? 'bg-white' : 'bg-gray-800'}>
                      <AlertDialogHeader>
                        <AlertDialogTitle className={theme === 'light' ? '' : 'text-white'}>
                          Delete Cover Letter?
                        </AlertDialogTitle>
                        <AlertDialogDescription className={theme === 'light' ? '' : 'text-gray-300'}>
                          This action cannot be undone. This will permanently
                          delete your cover letter for {letter.jobTitle} at{" "}
                          {letter.companyName}.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className={theme === 'light' ? '' : 'border-gray-600 text-white hover:bg-gray-700'}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(letter.id)}
                          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`flex items-start ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-300'} text-sm line-clamp-3`}>
                <FileText className="h-4 w-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                {letter.jobDescription}
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}