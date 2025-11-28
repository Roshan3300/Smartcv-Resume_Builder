"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from "lucide-react"
import type { ResumeData } from "@/components/resume-builder"
import { v4 as uuidv4 } from "uuid"

interface ExperienceFormProps {
  data: ResumeData["experience"]
  updateData: (data: ResumeData["experience"]) => void
}

export default function ExperienceForm({ data, updateData }: ExperienceFormProps) {
  const [experiences, setExperiences] = useState(data)
  const [expandedId, setExpandedId] = useState<string | null>(data[0]?.id || null)

  const handleAddExperience = () => {
    const newExperience = {
      id: uuidv4(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [""],
    }

    const updatedExperiences = [...experiences, newExperience]
    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
    setExpandedId(newExperience.id)
  }

  const handleRemoveExperience = (id: string) => {
    const updatedExperiences = experiences.filter((exp) => exp.id !== id)
    setExperiences(updatedExperiences)
    updateData(updatedExperiences)

    if (expandedId === id) {
      setExpandedId(updatedExperiences[0]?.id || null)
    }
  }

  const handleExperienceChange = (id: string, field: string, value: any) => {
    const updatedExperiences = experiences.map((exp) => {
      if (exp.id === id) {
        return { ...exp, [field]: value }
      }
      return exp
    })

    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
  }

  const handleAddAchievement = (experienceId: string) => {
    const updatedExperiences = experiences.map((exp) => {
      if (exp.id === experienceId) {
        return {
          ...exp,
          achievements: [...exp.achievements, ""],
        }
      }
      return exp
    })

    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
  }

  const handleRemoveAchievement = (experienceId: string, index: number) => {
    const updatedExperiences = experiences.map((exp) => {
      if (exp.id === experienceId) {
        const updatedAchievements = [...exp.achievements]
        updatedAchievements.splice(index, 1)
        return {
          ...exp,
          achievements: updatedAchievements,
        }
      }
      return exp
    })

    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
  }

  const handleAchievementChange = (experienceId: string, index: number, value: string) => {
    const updatedExperiences = experiences.map((exp) => {
      if (exp.id === experienceId) {
        const updatedAchievements = [...exp.achievements]
        updatedAchievements[index] = value
        return {
          ...exp,
          achievements: updatedAchievements,
        }
      }
      return exp
    })

    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
  }

  const moveExperience = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= experiences.length) return

    const updatedExperiences = [...experiences]
    const [removed] = updatedExperiences.splice(fromIndex, 1)
    updatedExperiences.splice(toIndex, 0, removed)

    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Work Experience</h2>
        <Button onClick={handleAddExperience} size="sm" className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add Position
        </Button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, overflow: "hidden" }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-4 relative">
                <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => moveExperience(index, index - 1)}
                    disabled={index === 0}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => moveExperience(index, index + 1)}
                    disabled={index === experiences.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>

                <div className="pl-8">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-slate-400" />
                      <h3 className="font-medium">
                        {experience.position ? experience.position : "New Position"}
                        {experience.company ? ` at ${experience.company}` : ""}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setExpandedId(expandedId === experience.id ? null : experience.id)}
                      >
                        {expandedId === experience.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemoveExperience(experience.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {expandedId === experience.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 mt-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`company-${experience.id}`}>Company</Label>
                          <Input
                            id={`company-${experience.id}`}
                            value={experience.company}
                            onChange={(e) => handleExperienceChange(experience.id, "company", e.target.value)}
                            placeholder="Company Name"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`position-${experience.id}`}>Position</Label>
                          <Input
                            id={`position-${experience.id}`}
                            value={experience.position}
                            onChange={(e) => handleExperienceChange(experience.id, "position", e.target.value)}
                            placeholder="Job Title"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                          <Input
                            id={`startDate-${experience.id}`}
                            type="month"
                            value={experience.startDate}
                            onChange={(e) => handleExperienceChange(experience.id, "startDate", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                            <div className="flex items-center gap-2">
                              <Label htmlFor={`current-${experience.id}`} className="text-sm">
                                Current
                              </Label>
                              <Switch
                                id={`current-${experience.id}`}
                                checked={experience.current}
                                onCheckedChange={(checked) => {
                                  handleExperienceChange(experience.id, "current", checked)
                                  if (checked) {
                                    handleExperienceChange(experience.id, "endDate", "")
                                  }
                                }}
                              />
                            </div>
                          </div>
                          <Input
                            id={`endDate-${experience.id}`}
                            type="month"
                            value={experience.endDate}
                            onChange={(e) => handleExperienceChange(experience.id, "endDate", e.target.value)}
                            disabled={experience.current}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`description-${experience.id}`}>Job Description</Label>
                        <Textarea
                          id={`description-${experience.id}`}
                          value={experience.description}
                          onChange={(e) => handleExperienceChange(experience.id, "description", e.target.value)}
                          placeholder="Brief description of your role and responsibilities"
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label>Key Achievements</Label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddAchievement(experience.id)}
                            className="flex items-center gap-1"
                          >
                            <Plus className="h-3 w-3" /> Add
                          </Button>
                        </div>

                        <div className="space-y-2">
                          {experience.achievements.map((achievement, achievementIndex) => (
                            <div key={achievementIndex} className="flex gap-2">
                              <Input
                                value={achievement}
                                onChange={(e) =>
                                  handleAchievementChange(experience.id, achievementIndex, e.target.value)
                                }
                                placeholder="Quantifiable achievement (e.g., Increased sales by 20%)"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                                onClick={() => handleRemoveAchievement(experience.id, achievementIndex)}
                                disabled={experience.achievements.length <= 1}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Pro tip: Use action verbs and quantify your achievements with numbers
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {experiences.length === 0 && (
          <div className="text-center py-8 border border-dashed rounded-md">
            <p className="text-slate-500 mb-4">No work experience added yet</p>
            <Button onClick={handleAddExperience} variant="outline" className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> Add Work Experience
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
