"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { ResumeData } from "@/components/resume-builder"
import { Sparkles, Check, RefreshCw, AlertTriangle, Lightbulb, CheckCircle2 } from "lucide-react"

interface AiSuggestionsProps {
  resumeData: ResumeData
  selectedCompany?: string
  activeSection?: string
}

interface Suggestion {
  id: string
  type: "improvement" | "warning" | "tip"
  section: "summary" | "experience" | "education" | "skills" | "general"
  title: string
  description: string
  example?: string
}

export default function AiSuggestions({ resumeData, selectedCompany = "general", activeSection }: AiSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(true)
  const [appliedSuggestions, setAppliedSuggestions] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  // Generate fallback suggestions based on resume data
  const generateFallbackSuggestions = (): Suggestion[] => {
    const fallbackSuggestions: Suggestion[] = []

    // Check personal info
    if (!resumeData.personalInfo.summary || resumeData.personalInfo.summary.length < 50) {
      fallbackSuggestions.push({
        id: "summary-length",
        type: "improvement",
        section: "summary",
        title: "Enhance your professional summary",
        description: "Your summary should be 2-3 sentences highlighting your key achievements and career goals.",
        example:
          "Results-driven Software Engineer with 5+ years of experience building scalable web applications. Specialized in React and Node.js with a proven track record of improving application performance by 40% and leading cross-functional teams.",
      })
    }

    // Check experience section
    if (resumeData.experience.length === 0) {
      fallbackSuggestions.push({
        id: "add-experience",
        type: "warning",
        section: "experience",
        title: "Add work experience",
        description: "Include your relevant work experience to showcase your professional background.",
      })
    } else {
      // Check for quantifiable achievements
      const hasQuantifiableResults = resumeData.experience.some((exp) =>
        exp.achievements.some((achievement) => /\d+%|\d+\+|\$\d+|increased|improved|reduced|saved/i.test(achievement)),
      )

      if (!hasQuantifiableResults) {
        fallbackSuggestions.push({
          id: "quantify-achievements",
          type: "improvement",
          section: "experience",
          title: "Add quantifiable results",
          description: "Include specific numbers, percentages, and metrics to demonstrate your impact.",
          example:
            "Instead of 'Improved application performance', write 'Improved application performance by 40%, reducing load times from 3s to 1.8s'",
        })
      }
    }

    // Check skills section
    if (resumeData.skills.length < 5) {
      fallbackSuggestions.push({
        id: "add-skills",
        type: "tip",
        section: "skills",
        title: "Add more relevant skills",
        description: "Include 8-12 relevant technical and soft skills to improve ATS matching.",
      })
    }

    // Company-specific suggestions
    if (selectedCompany && selectedCompany !== "general") {
      const companyTips = {
        google:
          "Focus on innovation, scalability, and data-driven results. Mention experience with large-scale systems.",
        microsoft: "Highlight collaboration, cloud technologies, and enterprise solutions experience.",
        amazon: "Emphasize customer obsession, ownership, and experience with distributed systems.",
        deloitte: "Showcase consulting experience, client management, and business transformation projects.",
        tcs: "Highlight experience with enterprise clients, agile methodologies, and global delivery models.",
        infosys: "Focus on digital transformation, automation, and client-centric solutions.",
        capgemini: "Emphasize innovation, digital solutions, and multi-industry experience.",
      }

      if (companyTips[selectedCompany as keyof typeof companyTips]) {
        fallbackSuggestions.push({
          id: `company-${selectedCompany}`,
          type: "tip",
          section: "general",
          title: `Optimize for ${selectedCompany.charAt(0).toUpperCase() + selectedCompany.slice(1)}`,
          description: companyTips[selectedCompany as keyof typeof companyTips],
        })
      }
    }

    // General ATS optimization tips
    fallbackSuggestions.push({
      id: "ats-keywords",
      type: "tip",
      section: "general",
      title: "Include relevant keywords",
      description: "Use keywords from the job description throughout your resume to improve ATS matching.",
    })

    fallbackSuggestions.push({
      id: "action-verbs",
      type: "improvement",
      section: "experience",
      title: "Use strong action verbs",
      description:
        "Start bullet points with powerful action verbs like 'Led', 'Implemented', 'Optimized', 'Architected'.",
      example:
        "Instead of 'Was responsible for managing team', write 'Led cross-functional team of 8 engineers to deliver project 2 weeks ahead of schedule'",
    })

    return fallbackSuggestions.slice(0, 5) // Limit to 5 suggestions
  }

  const fetchSuggestions = async () => {
    setLoading(true)
    setError(null)

    try {
      // Try to fetch from API first
      const WEBHOOK_URL = "https://roshan0112.app.n8n.cloud/workflow/HXqWAIsTqQ7wuyRL"
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          resumeData,
          selectedCompany,
          activeSection,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data: Suggestion[] = await response.json()

      if (Array.isArray(data) && data.length > 0) {
        setSuggestions(data)
      } else {
        throw new Error("Invalid response format")
      }
    } catch (err) {
      console.warn("API unavailable, using fallback suggestions:", err)
      setError("Using offline suggestions")
      // Use fallback suggestions when API fails
      setSuggestions(generateFallbackSuggestions())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Add a small delay to prevent too many API calls
    const timer = setTimeout(() => {
      fetchSuggestions()
    }, 500)

    return () => clearTimeout(timer)
  }, [resumeData, selectedCompany, activeSection])

  const handleApplySuggestion = (id: string) => {
    setAppliedSuggestions((prev) => [...prev, id])
    // In a real implementation, this would apply the suggestion to the resumeData
  }

  const handleRefreshSuggestions = () => {
    setAppliedSuggestions([])
    fetchSuggestions()
  }

  const getSuggestionIcon = (type: Suggestion["type"]) => {
    switch (type) {
      case "improvement":
        return <Sparkles className="h-5 w-5 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "tip":
        return <Lightbulb className="h-5 w-5 text-green-500" />
      default:
        return <Sparkles className="h-5 w-5 text-blue-500" />
    }
  }

  const getSuggestionBorderColor = (type: Suggestion["type"]) => {
    switch (type) {
      case "improvement":
        return "border-l-blue-400"
      case "warning":
        return "border-l-amber-400"
      case "tip":
        return "border-l-green-400"
      default:
        return "border-l-blue-400"
    }
  }

  return (
    <Card className="p-6 shadow-md bg-white/80 backdrop-blur-sm border-white/30">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-500" />
          AI Suggestions
          {error && <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">Offline Mode</span>}
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefreshSuggestions}
          disabled={loading}
          className="flex items-center gap-1 bg-transparent"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <Separator className="mb-4" />

      {loading ? (
        <div className="py-8 text-center">
          <RefreshCw className="h-8 w-8 text-slate-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-500">Analyzing your resume...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {suggestions.length === 0 ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-4" />
              <p className="text-slate-600 font-medium">Great job! Your resume looks good.</p>
              <p className="text-slate-500 text-sm">Keep refining it for even better results.</p>
            </div>
          ) : (
            suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className={`p-4 rounded-lg border ${
                  appliedSuggestions.includes(suggestion.id)
                    ? "bg-slate-50 border-slate-200 opacity-75"
                    : "bg-white border-slate-200 hover:shadow-sm transition-shadow"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0">{getSuggestionIcon(suggestion.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className="font-medium text-slate-900 text-sm">{suggestion.title}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 capitalize flex-shrink-0">
                        {suggestion.section}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm mb-3 leading-relaxed">{suggestion.description}</p>

                    {suggestion.example && (
                      <div
                        className={`p-3 bg-slate-50 border-l-4 ${getSuggestionBorderColor(suggestion.type)} text-slate-700 text-sm rounded-r mb-3`}
                      >
                        <div className="font-medium text-slate-800 mb-1">Example:</div>
                        <div className="text-slate-600">{suggestion.example}</div>
                      </div>
                    )}

                    {!appliedSuggestions.includes(suggestion.id) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 flex items-center gap-1 h-8 px-3"
                        onClick={() => handleApplySuggestion(suggestion.id)}
                      >
                        <Check className="h-3 w-3" />
                        Mark as Applied
                      </Button>
                    )}

                    {appliedSuggestions.includes(suggestion.id) && (
                      <div className="flex items-center gap-1 text-green-600 text-sm">
                        <Check className="h-3 w-3" />
                        Applied
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center gap-2 text-amber-800 text-sm">
            <AlertTriangle className="h-4 w-4" />
            <span>AI service temporarily unavailable. Showing smart suggestions based on your resume.</span>
          </div>
        </div>
      )}
    </Card>
  )
}
