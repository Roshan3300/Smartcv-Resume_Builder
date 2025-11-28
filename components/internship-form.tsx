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

interface InternshipFormProps {
  data: ResumeData["internships"]
  updateData: (data: ResumeData["internships"]) => void
}

export default function InternshipForm({ data, updateData }: InternshipFormProps) {
  const [internships, setInternships] = useState(data)
  const [expandedId, setExpandedId] = useState<string | null>(data[0]?.id || null)

  const handleAddInternship = () => {
    const newInternship = {
      id: uuidv4(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [""],
    }

    const updatedInternships = [...internships, newInternship]
    setInternships(updatedInternships)
    updateData(updatedInternships)
    setExpandedId(newInternship.id)
  }

  const handleRemoveInternship = (id: string) => {
    const updatedInternships = internships.filter((int) => int.id !== id)
    setInternships(updatedInternships)
    updateData(updatedInternships)

    if (expandedId === id) {
      setExpandedId(updatedInternships[0]?.id || null)
    }
  }

  const handleInternshipChange = (id: string, field: string, value: any) => {
    const updatedInternships = internships.map((int) => {
      if (int.id === id) {
        return { ...int, [field]: value }
      }
      return int
    })

    setInternships(updatedInternships)
    updateData(updatedInternships)
  }

  const handleAddAchievement = (internshipId: string) => {
    const updatedInternships = internships.map((int) => {
      if (int.id === internshipId) {
        return {
          ...int,
          achievements: [...int.achievements, ""],
        }
      }
      return int
    })

    setInternships(updatedInternships)
    updateData(updatedInternships)
  }

  const handleRemoveAchievement = (internshipId: string, index: number) => {
    const updatedInternships = internships.map((int) => {
      if (int.id === internshipId) {
        const updatedAchievements = [...int.achievements]
        updatedAchievements.splice(index, 1)
        return {
          ...int,
          achievements: updatedAchievements,
        }
      }
      return int
    })

    setInternships(updatedInternships)
    updateData(updatedInternships)
  }

  const handleAchievementChange = (internshipId: string, index: number, value: string) => {
    const updatedInternships = internships.map((int) => {
      if (int.id === internshipId) {
        const updatedAchievements = [...int.achievements]
        updatedAchievements[index] = value
        return {
          ...int,
          achievements: updatedAchievements,
        }
      }
      return int
    })

    setInternships(updatedInternships)
    updateData(updatedInternships)
  }

  const moveInternship = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= internships.length) return

    const updatedInternships = [...internships]
    const [removed] = updatedInternships.splice(fromIndex, 1)
    updatedInternships.splice(toIndex, 0, removed)

    setInternships(updatedInternships)
    updateData(updatedInternships)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Internships</h2>
        <Button onClick={handleAddInternship} size="sm" className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add Internship
        </Button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {internships.map((internship, index) => (
            <motion.div
              key={internship.id}
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
                    onClick={() => moveInternship(index, index - 1)}
                    disabled={index === 0}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => moveInternship(index, index + 1)}
                    disabled={index === internships.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>

                <div className="pl-8">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-slate-400" />
                      <h3 className="font-medium">
                        {internship.position ? internship.position : "New Internship"}
                        {internship.company ? ` at ${internship.company}` : ""}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setExpandedId(expandedId === internship.id ? null : internship.id)}
                      >
                        {expandedId === internship.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemoveInternship(internship.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {expandedId === internship.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 mt-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`company-${internship.id}`}>Company</Label>
                          <Input
                            id={`company-${internship.id}`}
                            value={internship.company}
                            onChange={(e) => handleInternshipChange(internship.id, "company", e.target.value)}
                            placeholder="Company Name"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`position-${internship.id}`}>Position</Label>
                          <Input
                            id={`position-${internship.id}`}
                            value={internship.position}
                            onChange={(e) => handleInternshipChange(internship.id, "position", e.target.value)}
                            placeholder="Intern Title"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`startDate-${internship.id}`}>Start Date</Label>
                          <Input
                            id={`startDate-${internship.id}`}
                            type="month"
                            value={internship.startDate}
                            onChange={(e) => handleInternshipChange(internship.id, "startDate", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor={`endDate-${internship.id}`}>End Date</Label>
                            <div className="flex items-center gap-2">
                              <Label htmlFor={`current-${internship.id}`} className="text-sm">
                                Current
                              </Label>
                              <Switch
                                id={`current-${internship.id}`}
                                checked={internship.current}
                                onCheckedChange={(checked) => {
                                  handleInternshipChange(internship.id, "current", checked)
                                  if (checked) {
                                    handleInternshipChange(internship.id, "endDate", "")
                                  }
                                }}
                              />
                            </div>
                          </div>
                          <Input
                            id={`endDate-${internship.id}`}
                            type="month"
                            value={internship.endDate}
                            onChange={(e) => handleInternshipChange(internship.id, "endDate", e.target.value)}
                            disabled={internship.current}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`description-${internship.id}`}>Description</Label>
                        <Textarea
                          id={`description-${internship.id}`}
                          value={internship.description}
                          onChange={(e) => handleInternshipChange(internship.id, "description", e.target.value)}
                          placeholder="Brief description of your internship role and responsibilities"
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label>Key Achievements</Label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddAchievement(internship.id)}
                            className="flex items-center gap-1"
                          >
                            <Plus className="h-3 w-3" /> Add
                          </Button>
                        </div>

                        <div className="space-y-2">
                          {internship.achievements.map((achievement, achievementIndex) => (
                            <div key={achievementIndex} className="flex gap-2">
                              <Input
                                value={achievement}
                                onChange={(e) =>
                                  handleAchievementChange(internship.id, achievementIndex, e.target.value)
                                }
                                placeholder="What did you accomplish during this internship?"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                                onClick={() => handleRemoveAchievement(internship.id, achievementIndex)}
                                disabled={internship.achievements.length <= 1}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Pro tip: Focus on learning outcomes and contributions you made
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {internships.length === 0 && (
          <div className="text-center py-8 border border-dashed rounded-md">
            <p className="text-slate-500 mb-4">No internships added yet</p>
            <Button onClick={handleAddInternship} variant="outline" className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> Add Internship
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
