"use client"

import { useState } from "react"
import CompanySelector from "@/components/company-selector"
import ResumeBuilder from "@/components/resume-builder"
import { Card } from "@/components/ui/card"

export default function ResumeBuilderContainer() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)

  const handleSelectCompany = (companyId: string) => {
    setSelectedCompany(companyId)
  }

  return (
    <Card className="p-6 shadow-md">
      {!selectedCompany ? (
        <CompanySelector onSelectCompany={handleSelectCompany} />
      ) : (
        <ResumeBuilder selectedCompany={selectedCompany} />
      )}
    </Card>
  )
}
