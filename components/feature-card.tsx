import type { ReactNode } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-semibold text-xl text-slate-900 dark:text-white">{title}</h3>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600 dark:text-slate-400">{description}</p>
      </CardContent>
    </Card>
  )
}
