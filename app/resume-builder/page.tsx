import { Suspense } from "react"
import ResumeBuilderContainer from "@/components/resume-builder-container"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function ResumeBuilderPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8 flex justify-between items-center">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="font-bold text-slate-800 dark:text-white">SmartCV</span>
          </div>
        </div>

        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-emerald-600 to-emerald-400 dark:from-emerald-400 dark:to-emerald-200 bg-clip-text text-transparent">
            ATS-Friendly Resume Builder
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Create a professional resume optimized for Applicant Tracking Systems with AI-powered suggestions
          </p>
        </header>

        <Suspense
          fallback={
            <div className="flex justify-center items-center h-[600px]">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            </div>
          }
        >
          <ResumeBuilderContainer />
        </Suspense>
      </div>
    </main>
  )
}
