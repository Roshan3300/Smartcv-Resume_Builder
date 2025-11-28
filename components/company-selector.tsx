"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface CompanyOption {
  id: string
  name: string
  logo: string
  description: string
}

interface CompanySelectorProps {
  onSelectCompany: (companyId: string) => void
}

const companies: CompanyOption[] = [
  {
    id: "google",
    name: "Google",
    logo: "https://th.bing.com/th/id/OIP.HgH-NjiOdFOrkmwjsZCCfAHaHl?rs=1&pid=ImgDetMain",
    description: "Optimized for Google's ATS with focus on technical skills and impact metrics.",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logo: "https://th.bing.com/th/id/OIP.28M75ByK0d0O364Q7l6-fQHaE8?rs=1&pid=ImgDetMain",
    description: "Tailored for Microsoft with emphasis on collaboration and innovation.",
  },
  {
    id: "amazon",
    name: "Amazon",
    logo: "https://th.bing.com/th/id/OIP.qVLgQzPd0xJHAzzFntPd1wHaHo?rs=1&pid=ImgDetMain",
    description: "Structured around Amazon's leadership principles and quantifiable achievements.",
  },
  {
    id: "deloitte",
    name: "Deloitte",
    logo: "https://logodownload.org/wp-content/uploads/2019/10/deloitte-logo.png",
    description: "Focused on consulting skills, client experience, and industry knowledge.",
  },
  {
    id: "tcs",
    name: "TCS",
    logo: "https://th.bing.com/th/id/OIP.nDdw9cc1ll-HMlptuvsSPwHaHa?rs=1&pid=ImgDetMain",
    description: "Highlights technical expertise and project delivery experience.",
  },
  {
    id: "infosys",
    name: "Infosys",
    logo: "https://logodix.com/logo/1048357.png",
    description: "Emphasizes technical skills and enterprise solution experience.",
  },
  {
    id: "capgemini",
    name: "Capgemini",
    logo: "https://www.drupal.org/files/Capgemini_Logo_2COL_RGB.png",
    description: "Focuses on consulting capabilities and technical implementation skills.",
  },
  {
    id: "general",
    name: "General Purpose",
    logo: "https://cdn-images.zety.com/pages/best_resume_templates_012.jpg",
    description: "Universal ATS-friendly format suitable for most companies and industries.",
  },
]

export default function CompanySelector({ onSelectCompany }: CompanySelectorProps) {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)

  const handleCompanySelect = (companyId: string) => {
    setSelectedCompany(companyId)
  }

  const handleContinue = () => {
    if (selectedCompany) {
      onSelectCompany(selectedCompany)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Choose a Company Template</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Select a company to optimize your resume for their specific ATS and hiring preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {companies.map((company) => (
          <motion.div key={company.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card
              className={`p-4 cursor-pointer h-full flex flex-col ${
                selectedCompany === company.id
                  ? "border-emerald-500 dark:border-emerald-500 ring-2 ring-emerald-500"
                  : "hover:border-emerald-200 dark:hover:border-emerald-800"
              }`}
              onClick={() => handleCompanySelect(company.id)}
            >
              <div className="flex items-center justify-center mb-4 h-16">
                <img src={company.logo || "https://cdn.sologo.ai/temp24h/logo/be703dbd-e250-4117-bc27-c78e15c88f2c.png?x-oss-process=image/crop,x_400,y_0,w_400,h_300"} alt={`${company.name} logo`} className="max-h-full" />
              </div>
              <h3 className="font-semibold text-center mb-2">{company.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 text-center flex-grow">{company.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button
          onClick={handleContinue}
          disabled={!selectedCompany}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-8"
        >
          Continue to Resume Builder <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
