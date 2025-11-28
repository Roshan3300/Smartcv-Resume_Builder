"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical, ExternalLink } from "lucide-react"
import type { ResumeData } from "@/components/resume-builder"
import { v4 as uuidv4 } from "uuid"

interface CertificationsFormProps {
  data: ResumeData["certifications"]
  updateData: (data: ResumeData["certifications"]) => void
}

export default function CertificationsForm({ data, updateData }: CertificationsFormProps) {
  const [certifications, setCertifications] = useState(data)
  const [expandedId, setExpandedId] = useState<string | null>(data[0]?.id || null)

  const handleAddCertification = () => {
    const newCertification = {
      id: uuidv4(),
      name: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      credentialId: "",
      url: "",
    }

    const updatedCertifications = [...certifications, newCertification]
    setCertifications(updatedCertifications)
    updateData(updatedCertifications)
    setExpandedId(newCertification.id)
  }

  const handleRemoveCertification = (id: string) => {
    const updatedCertifications = certifications.filter((cert) => cert.id !== id)
    setCertifications(updatedCertifications)
    updateData(updatedCertifications)

    if (expandedId === id) {
      setExpandedId(updatedCertifications[0]?.id || null)
    }
  }

  const handleCertificationChange = (id: string, field: string, value: any) => {
    const updatedCertifications = certifications.map((cert) => {
      if (cert.id === id) {
        return { ...cert, [field]: value }
      }
      return cert
    })

    setCertifications(updatedCertifications)
    updateData(updatedCertifications)
  }

  const moveCertification = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= certifications.length) return

    const updatedCertifications = [...certifications]
    const [removed] = updatedCertifications.splice(fromIndex, 1)
    updatedCertifications.splice(toIndex, 0, removed)

    setCertifications(updatedCertifications)
    updateData(updatedCertifications)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Certifications</h2>
        <Button onClick={handleAddCertification} size="sm" className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add Certification
        </Button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {certifications.map((certification, index) => (
            <motion.div
              key={certification.id}
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
                    onClick={() => moveCertification(index, index - 1)}
                    disabled={index === 0}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => moveCertification(index, index + 1)}
                    disabled={index === certifications.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>

                <div className="pl-8">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-slate-400" />
                      <h3 className="font-medium">
                        {certification.name ? certification.name : "New Certification"}
                        {certification.issuer ? ` by ${certification.issuer}` : ""}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setExpandedId(expandedId === certification.id ? null : certification.id)}
                      >
                        {expandedId === certification.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemoveCertification(certification.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {expandedId === certification.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 mt-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`name-${certification.id}`}>Certification Name</Label>
                          <Input
                            id={`name-${certification.id}`}
                            value={certification.name}
                            onChange={(e) => handleCertificationChange(certification.id, "name", e.target.value)}
                            placeholder="e.g., AWS Certified Solutions Architect"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`issuer-${certification.id}`}>Issuing Organization</Label>
                          <Input
                            id={`issuer-${certification.id}`}
                            value={certification.issuer}
                            onChange={(e) => handleCertificationChange(certification.id, "issuer", e.target.value)}
                            placeholder="e.g., Amazon Web Services"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`issueDate-${certification.id}`}>Issue Date</Label>
                          <Input
                            id={`issueDate-${certification.id}`}
                            type="month"
                            value={certification.issueDate}
                            onChange={(e) => handleCertificationChange(certification.id, "issueDate", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`expiryDate-${certification.id}`}>Expiry Date (Optional)</Label>
                          <Input
                            id={`expiryDate-${certification.id}`}
                            type="month"
                            value={certification.expiryDate || ""}
                            onChange={(e) => handleCertificationChange(certification.id, "expiryDate", e.target.value)}
                            placeholder="Leave empty if no expiry"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`credentialId-${certification.id}`}>Credential ID (Optional)</Label>
                          <Input
                            id={`credentialId-${certification.id}`}
                            value={certification.credentialId || ""}
                            onChange={(e) =>
                              handleCertificationChange(certification.id, "credentialId", e.target.value)
                            }
                            placeholder="e.g., AWS-SAA-123456"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`url-${certification.id}`}>Verification URL (Optional)</Label>
                          <div className="flex gap-2">
                            <Input
                              id={`url-${certification.id}`}
                              value={certification.url || ""}
                              onChange={(e) => handleCertificationChange(certification.id, "url", e.target.value)}
                              placeholder="https://..."
                            />
                            {certification.url && (
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => window.open(certification.url, "_blank")}
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {certifications.length === 0 && (
          <div className="text-center py-8 border border-dashed rounded-md">
            <p className="text-slate-500 mb-4">No certifications added yet</p>
            <Button onClick={handleAddCertification} variant="outline" className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> Add Certification
            </Button>
          </div>
        )}
      </div>

      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md mt-4">
        <h3 className="font-medium mb-2">Tips for Adding Certifications</h3>
        <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 list-disc pl-5">
          <li>Include relevant industry certifications and professional licenses</li>
          <li>Add online course completions from reputable platforms (Coursera, edX, Udemy)</li>
          <li>Include vendor-specific certifications (AWS, Microsoft, Google Cloud)</li>
          <li>Add credential IDs and verification URLs when available</li>
          <li>Keep certifications current and relevant to your target role</li>
        </ul>
      </div>
    </motion.div>
  )
}
