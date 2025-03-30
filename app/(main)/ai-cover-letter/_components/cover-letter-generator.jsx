"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  Download,
  Building,
  Briefcase,
  FileText
} from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateCoverLetter } from "@/actions/cover-letter";
import useFetch from "@/hooks/use-fetch";
import { coverLetterSchema } from "@/app/lib/schema";
import { useRouter } from "next/navigation";
import html2pdf from "html2pdf.js/dist/html2pdf.min.js";
import { motion } from "framer-motion";

export default function CoverLetterGenerator() {
  const [previewContent, setPreviewContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [theme, setTheme] = useState("light");
  
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(coverLetterSchema),
    defaultValues: {
      companyName: "",
      jobTitle: "",
      jobDescription: "",
      personalTone: "professional"
    }
  });

  const formValues = watch();

  const {
    loading: generating,
    fn: generateLetterFn,
    data: generatedLetter,
  } = useFetch(generateCoverLetter);

  // Update content when letter is generated
  useEffect(() => {
    if (generatedLetter) {
      setPreviewContent(generatedLetter.content);
      toast.success("Cover letter generated successfully!");
      reset();
    }
  }, [generatedLetter]);

  const onSubmit = async (data) => {
    try {
      await generateLetterFn(data);
    } catch (error) {
      toast.error(error.message || "Failed to generate cover letter");
    }
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById("cover-letter-pdf");
      const opt = {
        margin: [15, 15],
        filename: "cover-letter.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div data-color-mode={theme} className={`space-y-4 ${theme === 'light' ? 'bg-gradient-to-br from-blue-50 to-purple-50' : 'bg-gradient-to-br from-gray-800 to-gray-900'} p-6 rounded-xl transition-all duration-300`}>
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="space-x-2 flex">
          {previewContent && (
            <Button 
              onClick={generatePDF} 
              disabled={isGenerating}
              className={`${theme === 'light' ? 'bg-gradient-to-r from-purple-500 to-purple-700' : 'bg-gradient-to-r from-purple-600 to-purple-800'} hover:from-purple-600 hover:to-purple-800 text-white border-none transition-all duration-300 transform hover:scale-105`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </>
              )}
            </Button>
          )}
        </div>
      </motion.div>

      <div className={`mt-6 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-xl shadow-lg p-4`}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Company and Job Information */}
          <motion.div 
            className="space-y-4"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className={`text-lg font-medium flex items-center ${theme === 'light' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text' : 'text-white'}`}>
              Job Details
            </h3>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-6 border ${theme === 'light' ? 'border-blue-100 bg-blue-50/50' : 'border-gray-700 bg-gray-700/50'} rounded-lg shadow-sm hover:shadow-md transition-all duration-300`}>
              <div className="space-y-2">
                <Label htmlFor="companyName" className={`flex items-center ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  <Building className="h-4 w-4 mr-2 text-blue-500" />
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  {...register("companyName")}
                  className={`${theme === 'light' ? 'border-blue-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black' : 'border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white bg-gray-700'} transition-all duration-300`}
                />
                {errors.companyName && (
                  <p className="text-sm text-red-500">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle" className={`flex items-center ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  <Briefcase className="h-4 w-4 mr-2 text-blue-500" />
                  Job Title
                </Label>
                <Input
                  id="jobTitle"
                  placeholder="Enter job title"
                  {...register("jobTitle")}
                  className={`${theme === 'light' ? 'border-blue-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black' : 'border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white bg-gray-700'} transition-all duration-300`}
                />
                {errors.jobTitle && (
                  <p className="text-sm text-red-500">
                    {errors.jobTitle.message}
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Job Description */}
          <motion.div 
            className="space-y-4"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <h3 className={`text-lg font-medium flex items-center ${theme === 'light' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text' : 'text-white'}`}>
              <FileText className="h-5 w-5 mr-2 text-blue-500" />
              Job Description
            </h3>
            <div className={`p-6 border ${theme === 'light' ? 'border-blue-100 bg-blue-50/50' : 'border-gray-700 bg-gray-700/50'} rounded-lg shadow-sm hover:shadow-md transition-all duration-300`}>
              <Controller
                name="jobDescription"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className={`h-40 ${theme === 'light' ? 'border-blue-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black' : 'border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white bg-gray-700'} transition-all duration-300`}
                    placeholder="Paste the job description here..."
                  />
                )}
              />
              {errors.jobDescription && (
                <p className="text-sm text-red-500">{errors.jobDescription.message}</p>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-end"
          >
            <Button 
              type="submit" 
              disabled={generating}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              {generating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Cover Letter"
              )}
            </Button>
          </motion.div>
        </form>
        
        {previewContent && (
          <motion.div 
            className={`mt-8 border ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'} rounded-lg shadow-md overflow-hidden`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <MDEditor
              value={previewContent}
              onChange={setPreviewContent}
              height={800}
              preview="preview"
              data-color-mode={theme}
            />
          </motion.div>
        )}
        
        <div className="hidden">
          <div id="cover-letter-pdf">
            <MDEditor.Markdown
              source={previewContent}
              style={{
                background: "white",
                color: "black",
                padding: "30px",
                fontFamily: "Arial, sans-serif"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}