"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2, GripVertical, ExternalLink, Github, Calendar } from "lucide-react"
import { Switch } from "@/components/ui/switch"

type Project = {
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
}

interface ProjectsFormProps {
  data: Project[]
  updateData: (data: Project[]) => void
}

export default function ProjectsForm({ data, updateData }: ProjectsFormProps) {
  const [projects, setProjects] = useState<Project[]>(data)
  const [newTechnology, setNewTechnology] = useState<{ [key: string]: string }>({})
  const [newAchievement, setNewAchievement] = useState<{ [key: string]: string }>({})

  const addProject = () => {
    const newProject: Project = {
      id: `proj_${Date.now()}`,
      name: "",
      description: "",
      technologies: [],
      startDate: "",
      endDate: "",
      current: false,
      url: "",
      github: "",
      achievements: [""],
    }
    const updatedProjects = [...projects, newProject]
    setProjects(updatedProjects)
    updateData(updatedProjects)
  }

  const removeProject = (id: string) => {
    const updatedProjects = projects.filter((project) => project.id !== id)
    setProjects(updatedProjects)
    updateData(updatedProjects)
  }

  const updateProject = (id: string, field: keyof Project, value: any) => {
    const updatedProjects = projects.map((project) => (project.id === id ? { ...project, [field]: value } : project))
    setProjects(updatedProjects)
    updateData(updatedProjects)
  }

  const addTechnology = (projectId: string) => {
    const technology = newTechnology[projectId]?.trim()
    if (!technology) return

    const updatedProjects = projects.map((project) =>
      project.id === projectId ? { ...project, technologies: [...project.technologies, technology] } : project,
    )
    setProjects(updatedProjects)
    updateData(updatedProjects)
    setNewTechnology({ ...newTechnology, [projectId]: "" })
  }

  const removeTechnology = (projectId: string, index: number) => {
    const updatedProjects = projects.map((project) =>
      project.id === projectId
        ? { ...project, technologies: project.technologies.filter((_, i) => i !== index) }
        : project,
    )
    setProjects(updatedProjects)
    updateData(updatedProjects)
  }

  const addAchievement = (projectId: string) => {
    const achievement = newAchievement[projectId]?.trim()
    if (!achievement) return

    const updatedProjects = projects.map((project) =>
      project.id === projectId ? { ...project, achievements: [...project.achievements, achievement] } : project,
    )
    setProjects(updatedProjects)
    updateData(updatedProjects)
    setNewAchievement({ ...newAchievement, [projectId]: "" })
  }

  const removeAchievement = (projectId: string, index: number) => {
    const updatedProjects = projects.map((project) =>
      project.id === projectId
        ? { ...project, achievements: project.achievements.filter((_, i) => i !== index) }
        : project,
    )
    setProjects(updatedProjects)
    updateData(updatedProjects)
  }

  const updateAchievement = (projectId: string, index: number, value: string) => {
    const updatedProjects = projects.map((project) =>
      project.id === projectId
        ? {
            ...project,
            achievements: project.achievements.map((achievement, i) => (i === index ? value : achievement)),
          }
        : project,
    )
    setProjects(updatedProjects)
    updateData(updatedProjects)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-slate-600 dark:text-slate-400">Showcase your personal and professional projects</p>
        </div>
        <Button onClick={addProject} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <Card key={project.id} className="relative">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-slate-400" />
                <CardTitle className="text-lg">Project {index + 1}</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeProject(project.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`project-name-${project.id}`}>Project Name *</Label>
                  <Input
                    id={`project-name-${project.id}`}
                    value={project.name}
                    onChange={(e) => updateProject(project.id, "name", e.target.value)}
                    placeholder="E-Commerce Platform"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    id={`current-${project.id}`}
                    checked={project.current}
                    onCheckedChange={(checked) => updateProject(project.id, "current", checked)}
                  />
                  <Label htmlFor={`current-${project.id}`}>Currently working on this project</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`project-description-${project.id}`}>Description *</Label>
                <Textarea
                  id={`project-description-${project.id}`}
                  value={project.description}
                  onChange={(e) => updateProject(project.id, "description", e.target.value)}
                  placeholder="Brief description of the project and its purpose"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`start-date-${project.id}`}>
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Start Date
                  </Label>
                  <Input
                    id={`start-date-${project.id}`}
                    type="month"
                    value={project.startDate}
                    onChange={(e) => updateProject(project.id, "startDate", e.target.value)}
                  />
                </div>
                {!project.current && (
                  <div className="space-y-2">
                    <Label htmlFor={`end-date-${project.id}`}>
                      <Calendar className="h-4 w-4 inline mr-1" />
                      End Date
                    </Label>
                    <Input
                      id={`end-date-${project.id}`}
                      type="month"
                      value={project.endDate}
                      onChange={(e) => updateProject(project.id, "endDate", e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`project-url-${project.id}`}>
                    <ExternalLink className="h-4 w-4 inline mr-1" />
                    Live URL (Optional)
                  </Label>
                  <Input
                    id={`project-url-${project.id}`}
                    value={project.url || ""}
                    onChange={(e) => updateProject(project.id, "url", e.target.value)}
                    placeholder="https://myproject.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`project-github-${project.id}`}>
                    <Github className="h-4 w-4 inline mr-1" />
                    GitHub URL (Optional)
                  </Label>
                  <Input
                    id={`project-github-${project.id}`}
                    value={project.github || ""}
                    onChange={(e) => updateProject(project.id, "github", e.target.value)}
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Technologies Used</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="flex items-center gap-1">
                      {tech}
                      <button
                        onClick={() => removeTechnology(project.id, techIndex)}
                        className="ml-1 text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTechnology[project.id] || ""}
                    onChange={(e) => setNewTechnology({ ...newTechnology, [project.id]: e.target.value })}
                    placeholder="Add technology (e.g., React, Node.js)"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTechnology(project.id)
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={() => addTechnology(project.id)}>
                    Add
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Key Achievements & Features</Label>
                <div className="space-y-2">
                  {project.achievements.map((achievement, achievementIndex) => (
                    <div key={achievementIndex} className="flex gap-2">
                      <Input
                        value={achievement}
                        onChange={(e) => updateAchievement(project.id, achievementIndex, e.target.value)}
                        placeholder="Describe a key achievement or feature"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAchievement(project.id, achievementIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newAchievement[project.id] || ""}
                    onChange={(e) => setNewAchievement({ ...newAchievement, [project.id]: e.target.value })}
                    placeholder="Add new achievement"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addAchievement(project.id)
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={() => addAchievement(project.id)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {projects.length === 0 && (
          <Card className="border-dashed border-2 border-slate-300 dark:border-slate-600">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-slate-400 mb-4">
                <Plus className="h-12 w-12" />
              </div>
              <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-2">No projects added</h3>
              <p className="text-slate-500 dark:text-slate-500 text-center mb-4">
                Add your projects to showcase your technical skills and experience
              </p>
              <Button onClick={addProject} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Project
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
