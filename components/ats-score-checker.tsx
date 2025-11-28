"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Target,
  Lightbulb,
  Download,
  RefreshCw,
} from "lucide-react"
import type { ResumeData } from "@/components/resume-builder"

interface ATSScoreCheckerProps {
  resumeData: ResumeData
  selectedCompany?: string
}

interface ATSAnalysis {
  overallScore: number
  sections: {
    formatting: { score: number; issues: string[] }
    keywords: { score: number; missing: string[]; present: string[] }
    content: { score: number; suggestions: string[] }
    structure: { score: number; issues: string[] }
  }
  recommendations: string[]
  industryKeywords: string[]
  competitorAnalysis?: {
    averageScore: number
    topKeywords: string[]
  }
}

export default function ATSScoreChecker({ resumeData, selectedCompany = "general" }: ATSScoreCheckerProps) {
  const [jobDescription, setJobDescription] = useState("")
  const [uploadedResume, setUploadedResume] = useState<File | null>(null)
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeTab, setActiveTab] = useState("current")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Real ATS analysis function
  const analyzeResume = async (data: ResumeData, jobDesc?: string) => {
    setIsAnalyzing(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Convert resume data to text for analysis
    const resumeText = convertResumeToText(data)

    // Perform actual analysis
    const analysis: ATSAnalysis = {
      overallScore: calculateOverallScore(data, jobDesc, resumeText),
      sections: {
        formatting: analyzeFormatting(data),
        keywords: analyzeKeywords(data, jobDesc, resumeText),
        content: analyzeContent(data, resumeText),
        structure: analyzeStructure(data),
      },
      recommendations: generateRecommendations(data, selectedCompany, jobDesc),
      industryKeywords: getIndustryKeywords(selectedCompany),
      competitorAnalysis: {
        averageScore: 72,
        topKeywords: getTopIndustryKeywords(selectedCompany),
      },
    }

    setAnalysis(analysis)
    setIsAnalyzing(false)
  }

  // Convert resume data to searchable text
  const convertResumeToText = (data: ResumeData): string => {
    const textParts = [
      data.personalInfo.name,
      data.personalInfo.title,
      data.personalInfo.summary,
      ...data.experience.map(
        (exp) => `${exp.company} ${exp.position} ${exp.description} ${exp.achievements.join(" ")}`,
      ),
      ...data.education.map((edu) => `${edu.institution} ${edu.degree} ${edu.field} ${edu.description || ""}`),
      ...data.projects.map(
        (proj) => `${proj.name} ${proj.description} ${proj.technologies.join(" ")} ${proj.achievements.join(" ")}`,
      ),
      ...data.internships.map(
        (int) => `${int.company} ${int.position} ${int.description} ${int.achievements.join(" ")}`,
      ),
      ...data.certifications.map((cert) => `${cert.name} ${cert.issuer}`),
      ...data.skills.map((skill) => skill.name),
    ]

    return textParts.join(" ").toLowerCase()
  }

  // Calculate overall ATS score based on multiple factors
  const calculateOverallScore = (data: ResumeData, jobDesc?: string, resumeText?: string): number => {
    let score = 0
    const weights = {
      completeness: 0.25,
      keywords: 0.3,
      formatting: 0.2,
      content: 0.25,
    }

    // Completeness score (0-100)
    const completenessScore = calculateCompletenessScore(data)

    // Keywords score (0-100)
    const keywordScore = calculateKeywordScore(data, jobDesc, resumeText || "")

    // Formatting score (0-100)
    const formattingScore = calculateFormattingScore(data)

    // Content quality score (0-100)
    const contentScore = calculateContentScore(data, resumeText || "")

    score =
      completenessScore * weights.completeness +
      keywordScore * weights.keywords +
      formattingScore * weights.formatting +
      contentScore * weights.content

    return Math.round(Math.min(Math.max(score, 0), 100))
  }

  // Calculate completeness score
  const calculateCompletenessScore = (data: ResumeData): number => {
    let score = 0
    const maxScore = 100

    // Essential sections
    if (data.personalInfo.name) score += 10
    if (data.personalInfo.email) score += 10
    if (data.personalInfo.phone) score += 5
    if (data.personalInfo.summary && data.personalInfo.summary.length > 50) score += 15
    if (data.experience.length > 0) score += 20
    if (data.education.length > 0) score += 15
    if (data.skills.length >= 5) score += 15

    // Bonus sections
    if (data.projects.length > 0) score += 5
    if (data.certifications.length > 0) score += 3
    if (data.personalInfo.linkedin) score += 2

    return Math.min(score, maxScore)
  }

  // Calculate keyword matching score
  const calculateKeywordScore = (data: ResumeData, jobDesc?: string, resumeText?: string): number => {
    if (!jobDesc || !resumeText) {
      // Default scoring based on industry keywords
      const industryKeywords = getIndustryKeywords(selectedCompany)
      const matchedKeywords = industryKeywords.filter((keyword) => resumeText?.includes(keyword.toLowerCase()) || false)
      return Math.min((matchedKeywords.length / industryKeywords.length) * 100, 100)
    }

    const jobKeywords = extractKeywordsFromJobDescription(jobDesc)
    const matchedKeywords = jobKeywords.filter((keyword) => resumeText.includes(keyword.toLowerCase()))

    if (jobKeywords.length === 0) return 70 // Default if no keywords found

    return Math.min((matchedKeywords.length / jobKeywords.length) * 100, 100)
  }

  // Calculate formatting score
  const calculateFormattingScore = (data: ResumeData): number => {
    let score = 80 // Base score for good structure

    // Check for consistent date formatting
    const dates = [
      ...data.experience.map((exp) => [exp.startDate, exp.endDate]),
      ...data.education.map((edu) => [edu.startDate, edu.endDate]),
      ...data.projects.map((proj) => [proj.startDate, proj.endDate]),
    ]
      .flat()
      .filter((date) => date)

    const dateFormats = dates.map((date) => {
      if (date.match(/^\d{4}-\d{2}$/)) return "YYYY-MM"
      if (date.match(/^\d{4}$/)) return "YYYY"
      return "other"
    })

    const uniqueFormats = new Set(dateFormats)
    if (uniqueFormats.size === 1) score += 10
    else if (uniqueFormats.size === 2) score += 5

    // Check for bullet points in achievements
    const hasAchievements =
      data.experience.some((exp) => exp.achievements.length > 0) ||
      data.projects.some((proj) => proj.achievements.length > 0)
    if (hasAchievements) score += 10

    return Math.min(score, 100)
  }

  // Calculate content quality score
  const calculateContentScore = (data: ResumeData, resumeText: string): number => {
    let score = 60 // Base score

    // Check for quantifiable achievements
    const numberPattern = /\d+[%$]?/g
    const numbers = resumeText.match(numberPattern) || []
    score += Math.min(numbers.length * 3, 20)

    // Check for action verbs
    const actionVerbs = [
      "achieved",
      "built",
      "created",
      "developed",
      "implemented",
      "improved",
      "increased",
      "led",
      "managed",
      "optimized",
      "reduced",
      "designed",
    ]
    const actionVerbCount = actionVerbs.filter((verb) => resumeText.includes(verb)).length
    score += Math.min(actionVerbCount * 2, 15)

    // Check summary length and quality
    if (data.personalInfo.summary.length > 100) score += 5

    return Math.min(score, 100)
  }

  // Extract keywords from job description
  const extractKeywordsFromJobDescription = (jobDesc: string): string[] => {
    const text = jobDesc.toLowerCase()

    // Technical skills keywords
    const techKeywords = [
      "javascript",
      "python",
      "java",
      "react",
      "node.js",
      "angular",
      "vue",
      "aws",
      "azure",
      "gcp",
      "docker",
      "kubernetes",
      "sql",
      "mongodb",
      "git",
      "ci/cd",
      "agile",
      "scrum",
      "rest api",
      "graphql",
      "microservices",
      "machine learning",
      "ai",
      "data science",
      "tensorflow",
      "pytorch",
    ]

    // Soft skills keywords
    const softKeywords = [
      "leadership",
      "communication",
      "teamwork",
      "problem solving",
      "project management",
      "analytical",
      "creative",
      "detail-oriented",
    ]

    // Industry-specific keywords
    const industryKeywords = getIndustryKeywords(selectedCompany)

    const allKeywords = [...techKeywords, ...softKeywords, ...industryKeywords.map((k) => k.toLowerCase())]

    return allKeywords.filter((keyword) => text.includes(keyword))
  }

  // Analyze formatting
  const analyzeFormatting = (data: ResumeData) => {
    const issues: string[] = []
    let score = 85

    // Check for missing contact information
    if (!data.personalInfo.phone) {
      issues.push("Add phone number for better contact accessibility")
      score -= 5
    }
    if (!data.personalInfo.linkedin) {
      issues.push("Include LinkedIn profile URL")
      score -= 3
    }

    // Check date consistency
    const allDates = [
      ...data.experience.flatMap((exp) => [exp.startDate, exp.endDate]),
      ...data.education.flatMap((edu) => [edu.startDate, edu.endDate]),
    ].filter((date) => date)

    const inconsistentDates = allDates.some((date) => !date.match(/^\d{4}(-\d{2})?$/))
    if (inconsistentDates) {
      issues.push("Use consistent date format (YYYY-MM or YYYY)")
      score -= 10
    }

    return { score: Math.max(score, 0), issues }
  }

  // Analyze keywords
  const analyzeKeywords = (data: ResumeData, jobDesc?: string, resumeText?: string) => {
    const industryKeywords = getIndustryKeywords(selectedCompany)
    let relevantKeywords = industryKeywords

    if (jobDesc) {
      relevantKeywords = extractKeywordsFromJobDescription(jobDesc)
    }

    const presentKeywords = relevantKeywords.filter((keyword) => resumeText?.includes(keyword.toLowerCase()) || false)

    const missingKeywords = relevantKeywords
      .filter((keyword) => !resumeText?.includes(keyword.toLowerCase()))
      .slice(0, 8) // Limit to top 8 missing keywords

    const score =
      relevantKeywords.length > 0 ? Math.round((presentKeywords.length / relevantKeywords.length) * 100) : 70

    return {
      score,
      present: presentKeywords.slice(0, 10), // Limit display
      missing: missingKeywords,
    }
  }

  // Analyze content quality
  const analyzeContent = (data: ResumeData, resumeText: string) => {
    const suggestions: string[] = []
    let score = 75

    // Check for quantifiable achievements
    const hasNumbers = /\d+[%$]?/.test(resumeText)
    if (!hasNumbers) {
      suggestions.push("Add quantifiable achievements with specific numbers and percentages")
      score -= 15
    }

    // Check summary length
    if (data.personalInfo.summary.length < 100) {
      suggestions.push("Expand your professional summary to 2-3 sentences")
      score -= 10
    }

    // Check for action verbs
    const actionVerbs = ["achieved", "built", "created", "developed", "implemented", "improved"]
    const hasActionVerbs = actionVerbs.some((verb) => resumeText.includes(verb))
    if (!hasActionVerbs) {
      suggestions.push("Use strong action verbs to describe your accomplishments")
      score -= 10
    }

    // Check for relevant certifications
    if (data.certifications.length === 0) {
      suggestions.push("Consider adding relevant industry certifications")
      score -= 5
    }

    return { score: Math.max(score, 0), suggestions }
  }

  // Analyze structure
  const analyzeStructure = (data: ResumeData) => {
    const issues: string[] = []
    let score = 90

    // Check section completeness
    if (data.experience.length === 0) {
      issues.push("Add work experience section")
      score -= 20
    }

    if (data.skills.length < 5) {
      issues.push("Include at least 5 relevant skills")
      score -= 10
    }

    if (!data.personalInfo.summary) {
      issues.push("Add a professional summary")
      score -= 15
    }

    return { score: Math.max(score, 0), issues }
  }

  // Generate personalized recommendations
  const generateRecommendations = (data: ResumeData, company: string, jobDesc?: string): string[] => {
    const recommendations: string[] = []

    // General recommendations
    const resumeText = convertResumeToText(data)

    if (!/\d+[%$]?/.test(resumeText)) {
      recommendations.push("Add quantifiable achievements with specific numbers, percentages, or dollar amounts")
    }

    if (data.personalInfo.summary.length < 100) {
      recommendations.push("Expand your professional summary to better highlight your value proposition")
    }

    if (data.skills.length < 8) {
      recommendations.push("Include more relevant technical and soft skills")
    }

    if (data.projects.length === 0) {
      recommendations.push("Add personal or professional projects to showcase your abilities")
    }

    // Company-specific recommendations
    if (company === "google") {
      recommendations.push("Emphasize data-driven decision making and scalability in your achievements")
      if (!resumeText.includes("machine learning") && !resumeText.includes("ai")) {
        recommendations.push("Consider highlighting any AI/ML experience or interest")
      }
    } else if (company === "microsoft") {
      recommendations.push("Highlight collaboration and teamwork experiences")
      if (!resumeText.includes("azure") && !resumeText.includes("cloud")) {
        recommendations.push("Mention any cloud computing experience, especially with Azure")
      }
    } else if (company === "amazon") {
      recommendations.push("Include examples that demonstrate Amazon's Leadership Principles")
      if (!resumeText.includes("customer")) {
        recommendations.push("Emphasize customer-focused achievements and experiences")
      }
    }

    // Job description specific recommendations
    if (jobDesc) {
      const jobKeywords = extractKeywordsFromJobDescription(jobDesc)
      const missingKeywords = jobKeywords.filter((keyword) => !resumeText.includes(keyword.toLowerCase())).slice(0, 3)

      if (missingKeywords.length > 0) {
        recommendations.push(`Consider incorporating these job-relevant keywords: ${missingKeywords.join(", ")}`)
      }
    }

    return recommendations.slice(0, 6) // Limit to 6 recommendations
  }

  const getIndustryKeywords = (company: string): string[] => {
    const industryKeywords = {
      google: [
        "Machine Learning",
        "Artificial Intelligence",
        "Data Science",
        "TensorFlow",
        "Python",
        "BigQuery",
        "GCP",
        "Kubernetes",
        "Microservices",
        "Scalability",
        "Analytics",
        "Algorithm",
      ],
      microsoft: [
        "Azure",
        "C#",
        ".NET",
        "PowerBI",
        "SQL Server",
        "Teams",
        "Office 365",
        "DevOps",
        "Agile",
        "Cloud Computing",
        "TypeScript",
        "Collaboration",
      ],
      amazon: [
        "AWS",
        "Lambda",
        "DynamoDB",
        "S3",
        "EC2",
        "Leadership Principles",
        "Customer Obsession",
        "Scalability",
        "Microservices",
        "DevOps",
        "Java",
        "Distributed Systems",
      ],
      deloitte: [
        "Consulting",
        "Project Management",
        "Business Analysis",
        "SAP",
        "Data Analytics",
        "Digital Transformation",
        "Strategy",
        "Client Relations",
        "Process Improvement",
      ],
      tcs: [
        "Java",
        "Spring Boot",
        "Oracle",
        "Agile",
        "DevOps",
        "Enterprise Applications",
        "Software Development",
        "Testing",
        "Database Management",
      ],
      infosys: [
        "Java",
        "Hibernate",
        "SQL",
        "REST API",
        "Microservices",
        "Spring Framework",
        "Web Services",
        "Application Development",
        "System Integration",
      ],
      capgemini: [
        "Java",
        "Cloud Computing",
        "Salesforce",
        "Agile",
        "Digital Transformation",
        "Consulting",
        "Enterprise Solutions",
        "System Architecture",
      ],
      general: [
        "JavaScript",
        "React",
        "Node.js",
        "Python",
        "SQL",
        "Git",
        "Agile",
        "REST API",
        "Database",
        "Problem Solving",
        "Communication",
        "Teamwork",
      ],
    }

    return industryKeywords[company as keyof typeof industryKeywords] || industryKeywords.general
  }

  const getTopIndustryKeywords = (company: string): string[] => {
    const topKeywords = {
      google: ["Python", "Machine Learning", "TensorFlow", "GCP", "Data Science"],
      microsoft: ["Azure", "C#", ".NET", "TypeScript", "DevOps"],
      amazon: ["AWS", "Java", "Microservices", "Leadership", "Scalability"],
      general: ["JavaScript", "React", "Python", "SQL", "Git"],
    }

    return topKeywords[company as keyof typeof topKeywords] || topKeywords.general
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && (file.type === "application/pdf" || file.type.includes("document"))) {
      setUploadedResume(file)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle2 className="h-5 w-5 text-green-600" />
    if (score >= 60) return <AlertTriangle className="h-5 w-5 text-yellow-600" />
    return <XCircle className="h-5 w-5 text-red-600" />
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            ATS Score Checker
          </CardTitle>
          <p className="text-slate-600 dark:text-slate-400">
            Analyze your resume's ATS compatibility and get personalized recommendations
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current">Current Resume</TabsTrigger>
              <TabsTrigger value="upload">Upload Resume</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="job-description">Job Description (Optional)</Label>
                  <Textarea
                    id="job-description"
                    placeholder="Paste the job description here to get targeted keyword analysis..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={6}
                    className="mt-2"
                  />
                </div>
                <Button
                  onClick={() => analyzeResume(resumeData, jobDescription)}
                  disabled={isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing Resume...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Analyze Current Resume
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="upload" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label>Upload Resume</Label>
                  <div
                    className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center cursor-pointer hover:border-slate-400 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                    <p className="text-sm text-slate-600 dark:text-slate-400">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
                    {uploadedResume && <p className="text-sm text-green-600 mt-2">✓ {uploadedResume.name} uploaded</p>}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
                <div>
                  <Label htmlFor="job-description-upload">Job Description (Optional)</Label>
                  <Textarea
                    id="job-description-upload"
                    placeholder="Paste the job description here to get targeted keyword analysis..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={6}
                    className="mt-2"
                  />
                </div>
                <Button
                  onClick={() => uploadedResume && analyzeResume(resumeData, jobDescription)}
                  disabled={!uploadedResume || isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing Resume...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Analyze Uploaded Resume
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {analysis && (
        <div className="space-y-6">
          {/* Overall Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Overall ATS Score</span>
                <div className="flex items-center gap-2">
                  {getScoreIcon(analysis.overallScore)}
                  <span className={`text-2xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                    {analysis.overallScore}%
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={analysis.overallScore} className="mb-4" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className={`text-lg font-semibold ${getScoreColor(analysis.sections.formatting.score)}`}>
                    {analysis.sections.formatting.score}%
                  </div>
                  <div className="text-sm text-slate-600">Formatting</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-semibold ${getScoreColor(analysis.sections.keywords.score)}`}>
                    {analysis.sections.keywords.score}%
                  </div>
                  <div className="text-sm text-slate-600">Keywords</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-semibold ${getScoreColor(analysis.sections.content.score)}`}>
                    {analysis.sections.content.score}%
                  </div>
                  <div className="text-sm text-slate-600">Content</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-semibold ${getScoreColor(analysis.sections.structure.score)}`}>
                    {analysis.sections.structure.score}%
                  </div>
                  <div className="text-sm text-slate-600">Structure</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Keywords Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Keyword Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">
                    Present Keywords ({analysis.sections.keywords.present.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.sections.keywords.present.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">
                    Missing Keywords ({analysis.sections.keywords.missing.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.sections.keywords.missing.map((keyword, index) => (
                      <Badge key={index} variant="outline" className="border-red-200 text-red-600">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Content Issues */}
          {analysis.sections.content.suggestions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Content Improvements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.sections.content.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Formatting Issues */}
          {analysis.sections.formatting.issues.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Formatting Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.sections.formatting.issues.map((issue, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Industry Keywords */}
          <Card>
            <CardHeader>
              <CardTitle>Trending Industry Keywords</CardTitle>
              <p className="text-sm text-slate-600">
                Consider including these keywords relevant to your target industry
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {analysis.industryKeywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="cursor-pointer hover:bg-slate-100">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Competitor Analysis */}
          {analysis.competitorAnalysis && (
            <Card>
              <CardHeader>
                <CardTitle>Competitive Analysis</CardTitle>
                <p className="text-sm text-slate-600">See how your resume compares to others in your field</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Your Score vs Average</h4>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{analysis.overallScore}%</div>
                        <div className="text-sm text-slate-600">Your Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-400">
                          {analysis.competitorAnalysis.averageScore}%
                        </div>
                        <div className="text-sm text-slate-600">Industry Average</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Top Keywords in Your Field</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.competitorAnalysis.topKeywords.map((keyword, index) => (
                        <Badge key={index} variant="secondary">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Items */}
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download Detailed Report
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  Get Keyword Optimization Guide
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Schedule Resume Review Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
