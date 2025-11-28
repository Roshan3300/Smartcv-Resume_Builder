"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FileText, Sparkles, CheckCircle2, AlertCircle, Target } from "lucide-react"
import PersonalInfoForm from "@/components/personal-info-form"
import ExperienceForm from "@/components/experience-form"
import EducationForm from "@/components/education-form"
import SkillsForm from "@/components/skills-form"
import ResumePreview from "@/components/resume-preview"
import ResumePdfTemplate from "@/components/resume-pdf-template"
import PdfExportButton from "@/components/pdf-export-button"
import PrintButton from "@/components/print-button"
import AiSuggestions from "@/components/ai-suggestions"
import InternshipForm from "@/components/internship-form"
import CertificationsForm from "@/components/certifications-form"
import ProjectsForm from "@/components/projects-form"
import ATSScoreChecker from "@/components/ats-score-checker"

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
  internships: {
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    current: boolean
    description: string
    achievements: string[]
  }[]
  projects: {
    id: string
    name: string
    description: string
    technologies: string[]
    startDate: string
    endDate: string
    current: boolean
    url?: string
    github?: string
    achievements: string[]
  }[]
  certifications: {
    id: string
    name: string
    issuer: string
    issueDate: string
    expiryDate?: string
    credentialId?: string
    url?: string
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
    name: "JHON DOE",
    email: "jhondoe123@gmail.com",
    phone: "9098199098",
    location: "California",
    title: "AI Developer",
    summary:
      "Seeking an opportunity in Artificial Intelligence and Machine learning to apply my knowledge of algorithms and data structure to build Intelligent systems and drive impactful innovation",
    linkedin: "linkedin.com/in/JhonDoe",
    website: "SmartCV Coders",
  },
  experience: [
    {
      id: "exp1",
      company: "Tech Solutions Inc.",
      position: "Senior Software Engineer",
      startDate: "2023-27",
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
      institution: "Haward",
      degree: "Bachelor of Technology",
      field: "Artificial Intelligence",
      startDate: "2023",
      endDate: "2025",
      current: false,
      description: "Graduated with Computer Science. Specialized in algorithms and distributed systems.",
    },
  ],
  internships: [
    {
      id: "int1",
      company: "StartupXYZ",
      position: "Software Development Intern",
      startDate: "2022-06",
      endDate: "2022-08",
      current: false,
      description: "Worked on frontend development using React and TypeScript",
      achievements: [
        "Developed responsive user interfaces for 3 client projects",
        "Collaborated with senior developers on code reviews and best practices",
        "Implemented automated testing that improved code coverage by 25%",
      ],
    },
  ],
  projects: [
    {
      id: "proj1",
      name: "E-Commerce Platform",
      description: "Full-stack web application for online shopping with payment integration",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
      startDate: "2023-01",
      endDate: "2023-04",
      current: false,
      url: "https://ecommerce-demo.com",
      github: "https://github.com/johndoe/ecommerce-platform",
      achievements: [
        "Built responsive frontend with React and modern CSS",
        "Implemented secure payment processing with Stripe",
        "Deployed on AWS with 99.9% uptime",
      ],
    },
    {
      id: "proj2",
      name: "AI Chatbot Assistant",
      description: "Intelligent chatbot using natural language processing for customer support",
      technologies: ["Python", "TensorFlow", "Flask", "OpenAI API"],
      startDate: "2023-05",
      endDate: "",
      current: true,
      github: "https://github.com/johndoe/ai-chatbot",
      achievements: [
        "Achieved 85% accuracy in intent recognition",
        "Reduced customer support response time by 60%",
        "Integrated with multiple messaging platforms",
      ],
    },
  ],
  certifications: [
    {
      id: "cert1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      issueDate: "2023-03",
      expiryDate: "2026-03",
      credentialId: "AWS-SAA-123456",
      url: "https://aws.amazon.com/certification/",
    },
    {
      id: "cert2",
      name: "React Developer Certification",
      issuer: "Meta",
      issueDate: "2022-11",
      credentialId: "META-REACT-789012",
    },
  ],
  skills: [
    { id: "skill1", name: "Python", level: 5 },
    { id: "skill2", name: "C++", level: 4 },
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
  const [showATSChecker, setShowATSChecker] = useState(false)
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

  const updateInternships = (data: ResumeData["internships"]) => {
    setResumeData((prev) => ({ ...prev, internships: data }))
  }

  const updateProjects = (data: ResumeData["projects"]) => {
    setResumeData((prev) => ({ ...prev, projects: data }))
  }

  const updateCertifications = (data: ResumeData["certifications"]) => {
    setResumeData((prev) => ({ ...prev, certifications: data }))
  }

  const getAtsScoreColor = () => {
    if (atsScore >= 80) return "text-emerald-500"
    if (atsScore >= 60) return "text-amber-500"
    return "text-red-500"
  }

  const togglePdfPreview = () => {
    setShowPdfPreview(!showPdfPreview)
  }

  // Check if resume is complete enough to show ATS checker
  const isResumeComplete = () => {
    return (
      resumeData.personalInfo.name &&
      resumeData.personalInfo.email &&
      resumeData.personalInfo.summary &&
      resumeData.experience.length > 0 &&
      resumeData.skills.length > 0
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-sm font-medium">
            {getCompanyName()} Template
          </div>
        </div>
        {isResumeComplete() && (
          <Button
            onClick={() => setShowATSChecker(!showATSChecker)}
            variant={showATSChecker ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <Target className="h-4 w-4" />
            {showATSChecker ? "Hide ATS Checker" : "Check ATS Score"}
          </Button>
        )}
      </div>

      {showATSChecker && isResumeComplete() ? (
        <ATSScoreChecker resumeData={resumeData} selectedCompany={selectedCompany} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-md">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-7 mb-6">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="internships">Internships</TabsTrigger>
                  <TabsTrigger value="certifications">Certifications</TabsTrigger>
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

                    <TabsContent value="projects" className="mt-0">
                      <ProjectsForm data={resumeData.projects} updateData={updateProjects} />
                    </TabsContent>

                    <TabsContent value="internships" className="mt-0">
                      <InternshipForm data={resumeData.internships} updateData={updateInternships} />
                    </TabsContent>

                    <TabsContent value="certifications" className="mt-0">
                      <CertificationsForm data={resumeData.certifications} updateData={updateCertifications} />
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
                          personal: "education",
                          education: "experience",
                          experience: "projects",
                          projects: "internships",
                          internships: "certifications",
                          certifications: "skills",
                          skills: "personal",
                        }[activeTab as keyof typeof nextTab]
                        setActiveTab(nextTab)
                      }}
                    >
                      Next Section
                    </Button>
                    <PrintButton targetRef={pdfTemplateRef} />
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

              <div className="bg-white border rounded-md p-4 max-h-[600px] overflow-y-auto" ref={resumeRef}>
                <ResumePreview resumeData={resumeData} selectedCompany={selectedCompany} />
              </div>

              {isResumeComplete() && (
                <div className="mt-4">
                  <Button
                    onClick={() => setShowATSChecker(true)}
                    variant="outline"
                    className="w-full flex items-center gap-2"
                  >
                    <Target className="h-4 w-4" />
                    Check ATS Score
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}

      {/* Hidden PDF template for export */}
      <div className="hidden">
        <div ref={pdfTemplateRef}>
          <ResumePdfTemplate resumeData={resumeData} selectedCompany={selectedCompany} />
        </div>
      </div>
    </div>
  )
}
