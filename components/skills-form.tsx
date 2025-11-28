"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Trash2, GripVertical } from "lucide-react"
import type { ResumeData } from "@/components/resume-builder"
import { v4 as uuidv4 } from "uuid"
import { Slider } from "@/components/ui/slider"

interface SkillsFormProps {
  data: ResumeData["skills"]
  updateData: (data: ResumeData["skills"]) => void
}

export default function SkillsForm({ data, updateData }: SkillsFormProps) {
  const [skills, setSkills] = useState(data)

  const handleAddSkill = () => {
    const newSkill = {
      id: uuidv4(),
      name: "",
      level: 3,
    }

    const updatedSkills = [...skills, newSkill]
    setSkills(updatedSkills)
    updateData(updatedSkills)
  }

  const handleRemoveSkill = (id: string) => {
    const updatedSkills = skills.filter((skill) => skill.id !== id)
    setSkills(updatedSkills)
    updateData(updatedSkills)
  }

  const handleSkillChange = (id: string, field: string, value: any) => {
    const updatedSkills = skills.map((skill) => {
      if (skill.id === id) {
        return { ...skill, [field]: value }
      }
      return skill
    })

    setSkills(updatedSkills)
    updateData(updatedSkills)
  }

  const moveSkill = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= skills.length) return

    const updatedSkills = [...skills]
    const [removed] = updatedSkills.splice(fromIndex, 1)
    updatedSkills.splice(toIndex, 0, removed)

    setSkills(updatedSkills)
    updateData(updatedSkills)
  }

  const getSkillLevelLabel = (level: number) => {
    switch (level) {
      case 1:
        return "Beginner"
      case 2:
        return "Basic"
      case 3:
        return "Intermediate"
      case 4:
        return "Advanced"
      case 5:
        return "Expert"
      default:
        return "Intermediate"
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Skills</h2>
        <Button onClick={handleAddSkill} size="sm" className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add Skill
        </Button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, overflow: "hidden" }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-slate-400 cursor-move" />
                    <Input
                      value={skill.name}
                      onChange={(e) => handleSkillChange(skill.id, "name", e.target.value)}
                      placeholder="Skill name (e.g., JavaScript, Project Management)"
                      className="w-[200px]"
                    />
                  </div>

                  <div className="flex-1 flex items-center gap-4">
                    <div className="flex-1">
                      <Slider
                        value={[skill.level]}
                        min={1}
                        max={5}
                        step={1}
                        onValueChange={(value) => handleSkillChange(skill.id, "level", value[0])}
                      />
                    </div>
                    <span className="text-sm text-slate-500 w-24">{getSkillLevelLabel(skill.level)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => moveSkill(index, index - 1)}
                      disabled={index === 0}
                      className="h-8 w-8"
                    >
                      <span className="sr-only">Move up</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-up"
                      >
                        <path d="m18 15-6-6-6 6" />
                      </svg>
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => moveSkill(index, index + 1)}
                      disabled={index === skills.length - 1}
                      className="h-8 w-8"
                    >
                      <span className="sr-only">Move down</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-down"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8"
                      onClick={() => handleRemoveSkill(skill.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {skills.length === 0 && (
          <div className="text-center py-8 border border-dashed rounded-md">
            <p className="text-slate-500 mb-4">No skills added yet</p>
            <Button onClick={handleAddSkill} variant="outline" className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> Add Skill
            </Button>
          </div>
        )}
      </div>

      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md mt-4">
        <h3 className="font-medium mb-2">Tips for ATS-Friendly Skills</h3>
        <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 list-disc pl-5">
          <li>Include skills mentioned in the job description</li>
          <li>List both technical and soft skills</li>
          <li>Be specific (e.g., "React.js" instead of just "JavaScript")</li>
          <li>Order skills by relevance to the position</li>
          <li>Only include skills you're comfortable discussing in an interview</li>
        </ul>
      </div>
    </motion.div>
  )
}
