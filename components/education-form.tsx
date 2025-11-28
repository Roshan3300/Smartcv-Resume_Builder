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

interface EducationFormProps {
  data: ResumeData["education"]
  updateData: (data: ResumeData["education"]) => void
}

export default function EducationForm({ data, updateData }: EducationFormProps) {
  const [educations, setEducations] = useState(data)
  const [expandedId, setExpandedId] = useState<string | null>(data[0]?.id || null)

  const handleAddEducation = () => {
    const newEducation = {
      id: uuidv4(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }

    const updatedEducations = [...educations, newEducation]
    setEducations(updatedEducations)
    updateData(updatedEducations)
    setExpandedId(newEducation.id)
  }

  const handleRemoveEducation = (id: string) => {
    const updatedEducations = educations.filter((edu) => edu.id !== id)
    setEducations(updatedEducations)
    updateData(updatedEducations)

    if (expandedId === id) {
      setExpandedId(updatedEducations[0]?.id || null)
    }
  }

  const handleEducationChange = (id: string, field: string, value: any) => {
    const updatedEducations = educations.map((edu) => {
      if (edu.id === id) {
        return { ...edu, [field]: value }
      }
      return edu
    })

    setEducations(updatedEducations)
    updateData(updatedEducations)
  }

  const moveEducation = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= educations.length) return

    const updatedEducations = [...educations]
    const [removed] = updatedEducations.splice(fromIndex, 1)
    updatedEducations.splice(toIndex, 0, removed)

    setEducations(updatedEducations)
    updateData(updatedEducations)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Education</h2>
        <Button onClick={handleAddEducation} size="sm" className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add Education
        </Button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {educations.map((education, index) => (
            <motion.div
              key={education.id}
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
                    onClick={() => moveEducation(index, index - 1)}
                    disabled={index === 0}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => moveEducation(index, index + 1)}
                    disabled={index === educations.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>

                <div className="pl-8">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-slate-400" />
                      <h3 className="font-medium">
                        {education.degree ? education.degree : "New Degree"}
                        {education.institution ? ` at ${education.institution}` : ""}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setExpandedId(expandedId === education.id ? null : education.id)}
                      >
                        {expandedId === education.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemoveEducation(education.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {expandedId === education.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 mt-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`institution-${education.id}`}>Institution</Label>
                          <Input
                            id={`institution-${education.id}`}
                            value={education.institution}
                            onChange={(e) => handleEducationChange(education.id, "institution", e.target.value)}
                            placeholder="University or School Name"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`degree-${education.id}`}>Degree</Label>
                          <Input
                            id={`degree-${education.id}`}
                            value={education.degree}
                            onChange={(e) => handleEducationChange(education.id, "degree", e.target.value)}
                            placeholder="Bachelor's, Master's, etc."
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`field-${education.id}`}>Field of Study</Label>
                        <Input
                          id={`field-${education.id}`}
                          value={education.field}
                          onChange={(e) => handleEducationChange(education.id, "field", e.target.value)}
                          placeholder="Computer Science, Business, etc."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`startDate-${education.id}`}>Start Date</Label>
                          <Input
                            id={`startDate-${education.id}`}
                            type="month"
                            value={education.startDate}
                            onChange={(e) => handleEducationChange(education.id, "startDate", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor={`endDate-${education.id}`}>End Date</Label>
                            <div className="flex items-center gap-2">
                              <Label htmlFor={`current-${education.id}`} className="text-sm">
                                Current
                              </Label>
                              <Switch
                                id={`current-${education.id}`}
                                checked={education.current}
                                onCheckedChange={(checked) => {
                                  handleEducationChange(education.id, "current", checked)
                                  if (checked) {
                                    handleEducationChange(education.id, "endDate", "")
                                  }
                                }}
                              />
                            </div>
                          </div>
                          <Input
                            id={`endDate-${education.id}`}
                            type="month"
                            value={education.endDate}
                            onChange={(e) => handleEducationChange(education.id, "endDate", e.target.value)}
                            disabled={education.current}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`description-${education.id}`}>Description (Optional)</Label>
                        <Textarea
                          id={`description-${education.id}`}
                          value={education.description || ""}
                          onChange={(e) => handleEducationChange(education.id, "description", e.target.value)}
                          placeholder="Relevant coursework, honors, activities, etc."
                          rows={2}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {educations.length === 0 && (
          <div className="text-center py-8 border border-dashed rounded-md">
            <p className="text-slate-500 mb-4">No education added yet</p>
            <Button onClick={handleAddEducation} variant="outline" className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> Add Education
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
