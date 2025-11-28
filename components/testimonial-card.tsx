import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  rating: number
}

export default function TestimonialCard({ quote, author, role, rating }: TestimonialCardProps) {
  return (
    <Card className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow duration-300">
      <CardContent className="pt-6">
        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating ? "text-amber-400 fill-amber-400" : "text-slate-300 dark:text-slate-700"
              }`}
            />
          ))}
        </div>
        <p className="text-slate-700 dark:text-slate-300 mb-4 italic">"{quote}"</p>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
            <span className="font-semibold text-slate-600 dark:text-slate-300">{author.charAt(0)}</span>
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">{author}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
