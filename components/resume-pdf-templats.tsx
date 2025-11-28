"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FileText, Sparkles, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react"
import PersonalInfoForm from "@/components/personal-info-form"
import ExperienceForm from "@/components/experience-form"
import EducationForm from "@/components/education-form"
import SkillsForm from "@/components/skills-form"
import ResumePreview from "@/components/resume-preview"
import ResumePdfTemplate from "@/components/resume-pdf-template"
import PdfExportButton from "@/components/pdf-export-button"
import AiSuggestions from "@/components/ai-suggestions"

export type ResumeData = {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    title: string
    summary: string
    linkedin?: string
    website?: string
  }
  experience: {
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    current: boolean
    description: string
    achievements: string[]
  }[]
  education: {
    id: string
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string
    current: boolean
    description?: string
  }[]
  skills: {
    id: string
    name: string
    level: number
  }[]
}

// Company-specific template data
const companyTemplates: Record<string, Partial<ResumeData>> = {
  google: {
    skills: [
      { id: "skill1", name: "Machine Learning", level: 4 },
      { id: "skill2", name: "Python", level: 5 },
      { id: "skill3", name: "Data Structures", level: 4 },
      { id: "skill4", name: "Algorithms", level: 4 },
      { id: "skill5", name: "TensorFlow", level: 3 },
    ],
  },
  microsoft: {
    skills: [
      { id: "skill1", name: "C#", level: 4 },
      { id: "skill2", name: ".NET", level: 4 },
      { id: "skill3", name: "Azure", level: 3 },
      { id: "skill4", name: "SQL Server", level: 4 },
      { id: "skill5", name: "TypeScript", level: 3 },
    ],
  },
  amazon: {
    skills: [
      { id: "skill1", name: "AWS", level: 4 },
      { id: "skill2", name: "Java", level: 5 },
      { id: "skill3", name: "Distributed Systems", level: 4 },
      { id: "skill4", name: "Microservices", level: 4 },
      { id: "skill5", name: "System Design", level: 3 },
    ],
  },
  deloitte: {
    skills: [
      { id: "skill1", name: "Consulting", level: 4 },
      { id: "skill2", name: "Project Management", level: 5 },
      { id: "skill3", name: "Business Analysis", level: 4 },
      { id: "skill4", name: "SAP", level: 3 },
      { id: "skill5", name: "Data Analytics", level: 4 },
    ],
  },
  tcs: {
    skills: [
      { id: "skill1", name: "Java", level: 4 },
      { id: "skill2", name: "Spring Boot", level: 4 },
      { id: "skill3", name: "Oracle", level: 3 },
      { id: "skill4", name: "Agile", level: 4 },
      { id: "skill5", name: "DevOps", level: 3 },
    ],
  },
  infosys: {
    skills: [
      { id: "skill1", name: "Java", level: 4 },
      { id: "skill2", name: "Hibernate", level: 3 },
      { id: "skill3", name: "SQL", level: 4 },
      { id: "skill4", name: "REST API", level: 4 },
      { id: "skill5", name: "Microservices", level: 3 },
    ],
  },
  capgemini: {
    skills: [
      { id: "skill1", name: "Java", level: 4 },
      { id: "skill2", name: "Cloud Computing", level: 3 },
      { id: "skill3", name: "Salesforce", level: 4 },
      { id: "skill4", name: "Agile", level: 4 },
      { id: "skill5", name: "Digital Transformation", level: 3 },
    ],
  },
}

const baseResumeData: ResumeData = {
  personalInfo: {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    title: "Senior Software Engineer",
    summary: "Experienced software engineer with 5+ years of experience building scalable applications and services.",
    linkedin: "linkedin.com/in/alexjohnson",
    website: "alexjohnson.dev",
  },
  experience: [
    {
      id: "exp1",
      company: "Tech Solutions Inc.",
      position: "Senior Software Engineer",
      startDate: "2021-03",
      endDate: "",
      current: true,
      description: "Lead development for enterprise SaaS platform",
      achievements: [
        "Improved application performance by 40% through code optimization",
        "Led migration from monolith to microservices, reducing build times by 65%",
        "Mentored junior developers and established engineering best practices",
      ],
    },
    {
      id: "exp2",
      company: "Digital Innovations",
      position: "Software Engineer",
      startDate: "2018-06",
      endDate: "2021-02",
      current: false,
      description: "Developed scalable applications for clients across various industries",
      achievements: [
        "Built and maintained 15+ client applications using modern tech stacks",
        "Implemented CI/CD pipelines that reduced deployment time by 50%",
        "Collaborated with product team to create component library used across projects",
      ],
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2014-09",
      endDate: "2018-05",
      current: false,
      description: "Graduated with honors. Specialized in algorithms and distributed systems.",
    },
  ],
  skills: [
    { id: "skill1", name: "JavaScript", level: 5 },
    { id: "skill2", name: "TypeScript", level: 4 },
    { id: "skill3", name: "React", level: 5 },
    { id: "skill4", name: "Node.js", level: 4 },
    { id: "skill5", name: "SQL", level: 4 },
    { id: "skill6", name: "Git", level: 4 },
    { id: "skill7", name: "System Design", level: 3 },
    { id: "skill8", name: "Cloud Services", level: 3 },
  ],
}

interface ResumeBuilderProps {
  selectedCompany?: string
  initialData?: Partial<ResumeData> | null
}

export default function ResumeBuilder({ selectedCompany = "general", initialData = null }: ResumeBuilderProps) {
  // Initialize with company-specific template if available
  const getInitialResumeData = () => {
    // Start with base data
    let data = { ...baseResumeData }

    // Apply company template if available
    if (selectedCompany && selectedCompany !== "general" && companyTemplates[selectedCompany]) {
      data = {
        ...data,
        ...companyTemplates[selectedCompany],
        skills: companyTemplates[selectedCompany].skills || data.skills,
      }
    }

    // Apply parsed resume data if available
    if (initialData) {
      data = {
        ...data,
        ...initialData,
        personalInfo: { ...data.personalInfo, ...initialData.personalInfo },
        experience: initialData.experience || data.experience,
        education: initialData.education || data.education,
        skills: initialData.skills || data.skills,
      }
    }

    return data
  }

  const [resumeData, setResumeData] = useState<ResumeData>(getInitialResumeData())
  const [activeTab, setActiveTab] = useState("personal")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [atsScore, setAtsScore] = useState(85)
  const [showCompanySelector, setShowCompanySelector] = useState(false)
  const [showPdfPreview, setShowPdfPreview] = useState(false)

  const resumeRef = useRef<HTMLDivElement>(null)
  const pdfTemplateRef = useRef<HTMLDivElement>(null)

  // Get company name for display
  const getCompanyName = () => {
    const companies = {
      google: "Google",
      microsoft: "Microsoft",
      amazon: "Amazon",
      deloitte: "Deloitte",
      tcs: "TCS",
      infosys: "Infosys",
      capgemini: "Capgemini",
      general: "General Purpose",
    }
    return companies[selectedCompany as keyof typeof companies] || "Custom"
  }

  const updatePersonalInfo = (data: ResumeData["personalInfo"]) => {
    setResumeData((prev) => ({ ...prev, personalInfo: data }))
  }

  const updateExperience = (data: ResumeData["experience"]) => {
    setResumeData((prev) => ({ ...prev, experience: data }))
  }

  const updateEducation = (data: ResumeData["education"]) => {
    setResumeData((prev) => ({ ...prev, education: data }))
  }

  const updateSkills = (data: ResumeData["skills"]) => {
    setResumeData((prev) => ({ ...prev, skills: data }))
  }

  const getAtsScoreColor = () => {
    if (atsScore >= 80) return "text-emerald-500"
    if (atsScore >= 60) return "text-amber-500"
    return "text-red-500"
  }

  const togglePdfPreview = () => {
    setShowPdfPreview(!showPdfPreview)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-sm font-medium">
            {getCompanyName()} Template
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6 shadow-md">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <TabsContent value="personal" className="mt-0">
                    <PersonalInfoForm data={resumeData.personalInfo} updateData={updatePersonalInfo} />
                  </TabsContent>

                  <TabsContent value="experience" className="mt-0">
                    <ExperienceForm data={resumeData.experience} updateData={updateExperience} />
                  </TabsContent>

                  <TabsContent value="education" className="mt-0">
                    <EducationForm data={resumeData.education} updateData={updateEducation} />
                  </TabsContent>

                  <TabsContent value="skills" className="mt-0">
                    <SkillsForm data={resumeData.skills} updateData={updateSkills} />
                  </TabsContent>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowSuggestions(!showSuggestions)}
                  className="flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  AI Suggestions
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      const nextTab = {
                        personal: "experience",
                        experience: "education",
                        education: "skills",
                        skills: "personal",
                      }[activeTab as keyof typeof nextTab]
                      setActiveTab(nextTab)
                    }}
                  >
                    Next Section
                  </Button>
                  <PdfExportButton
                    targetRef={pdfTemplateRef}
                    filename={`${resumeData.personalInfo.name.replace(/\s+/g, "_")}_Resume.pdf`}
                  />
                </div>
              </div>
            </Tabs>
          </Card>

          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6"
            >
              <AiSuggestions resumeData={resumeData} />
            </motion.div>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Preview
              </h2>
              <div className="flex items-center gap-2">
               
                <span className="text-sm text-slate-500">ATS Score:</span>
                <span className={`font-bold ${getAtsScoreColor()}`}>{atsScore}%</span>
                {atsScore >= 80 ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                )}
              </div>
            </div>

            <Separator className="mb-4" />

            {showPdfPreview ? (
              <div className="bg-white border rounded-md p-4 max-h-[600px] overflow-y-auto">
                <div ref={pdfTemplateRef}>
                  <ResumePdfTemplate resumeData={resumeData} />
                </div>
              </div>
            ) : (
              <div className="bg-white border rounded-md p-4 max-h-[600px] overflow-y-auto" ref={resumeRef}>
                <ResumePreview resumeData={resumeData} />
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Hidden PDF template for export */}
      <div className="hidden">
        <div ref={pdfTemplateRef}>
          <ResumePdfTemplate resumeData={resumeData} />
        </div>
      </div>
    </div>
  )
}
