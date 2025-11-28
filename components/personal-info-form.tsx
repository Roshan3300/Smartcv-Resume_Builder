"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { ResumeData } from "@/components/resume-builder"

interface PersonalInfoFormProps {
  data: ResumeData["personalInfo"]
  updateData: (data: ResumeData["personalInfo"]) => void
}

export default function PersonalInfoForm({ data, updateData }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState(data)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const newData = { ...formData, [name]: value }
    setFormData(newData)
    updateData(newData)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Software Engineer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="(555) 123-4567" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, State"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn (optional)</Label>
          <Input
            id="linkedin"
            name="linkedin"
            value={formData.linkedin || ""}
            onChange={handleChange}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website/Portfolio (optional)</Label>
        <Input
          id="website"
          name="website"
          value={formData.website || ""}
          onChange={handleChange}
          placeholder="johndoe.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Career Objective</Label>
        <Textarea
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          placeholder="Brief overview of your professional background and key strengths"
          rows={4}
        />
        <p className="text-xs text-slate-500 mt-1">
          Pro tip: Include keywords from the job description to improve ATS compatibility
        </p>
      </div>
    </motion.div>
  )
}
