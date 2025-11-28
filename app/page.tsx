import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Users, Sparkles } from "lucide-react"
import TestimonialCard from "@/components/testimonial-card"
import FeatureCard from "@/components/feature-card"

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-slate-900/0" />

        <div className="container relative mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 rounded-full bg-slate-800/60 px-3 py-1 text-sm text-slate-300 backdrop-blur-sm w-fit mb-6">
                <span className="https://media1.thehungryjpeg.com/thumbs2/ori_3681417_cxf544aq4v8wnf68l06vrmescf953kttnuv1ruqz_project-manager-resume-resume-cv-with-logo-professional-cover-lette.jpg">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
              </div>

              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                Create ATS-Friendly <span className="text-emerald-500 animate-pulse">Resumes</span> That Get You Hired
              </h1>

              <p className="mb-8 text-lg text-slate-300 md:text-xl">
                SmartCV helps you build professional, ATS-optimized resumes with AI-powered suggestions to
                maximize your chances of landing interviews.
              </p>

              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link href="/resume-builder">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white w-full sm:w-auto">
                    Build Your Resume <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </div>

              <div className="mt-8 flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="inline-block h-8 w-8 rounded-full bg-slate-700 ring-2 hover:ring-slate-900" />
                  ))}
                </div>
                <div className="text-sm text-slate-400">
                  <span className="font-semibold text-slate-300 hover:text-white">Explore more</span> 
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-lg overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(99,102,241,0.6)]">
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 via-transparent to-purple-500/30 pointer-events-none z-10" />

              {/* Resume Image */}
              <img
                src="https://media1.thehungryjpeg.com/thumbs2/ori_3681417_cxf544aq4v8wnf68l06vrmescf953kttnuv1ruqz_project-manager-resume-resume-cv-with-logo-professional-cover-lette.jpg"
                alt="Professional Resume Template Preview"
                className="relative z-20 w-full object-cover transition duration-300 ease-in-out hover:scale-105"
              />
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Why Choose SmartCV?
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with professional resume expertise to help you stand out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<CheckCircle className="h-6 w-6 text-emerald-500" />}
              title="ATS-Optimized Templates"
              description="Our templates are designed to pass through Applicant Tracking Systems with ease, ensuring your resume gets seen by human recruiters."
            />
            <FeatureCard
              icon={<Sparkles className="h-6 w-6 text-emerald-500" />}
              title="AI-Powered Suggestions"
              description="Get real-time feedback and suggestions to improve your resume content, tailored to your industry and target position."
            />
            <FeatureCard
              icon={<Users className="h-6 w-6 text-emerald-500" />}
              title="Expert-Backed Advice"
              description="Our platform incorporates insights from HR professionals and hiring managers across various industries."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
<section className="py-20 bg-white dark:bg-slate-950">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
        How It Works
      </h2>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
        Create a professional, ATS-friendly resume in just three simple steps.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map((step, idx) => {
        const stepData = [
          {
            title: "Enter Your Information",
            description:
              "Fill in your personal details, work experience, education, and skills in our user-friendly form.",
          },
          {
            title: "Get AI Suggestions",
            description:
              "Our AI analyzes your resume and provides personalized suggestions to improve your content and ATS score.",
          },
          {
            title: "Export & Apply",
            description:
              "Download your professionally formatted, ATS-optimized resume and start applying for jobs with confidence.",
          },
        ][idx];

        return (
          <div
            key={step}
            className="text-center p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white font-bold text-lg shadow-lg ring-4 ring-emerald-200/30 dark:ring-emerald-500/20">
              {step}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
              {stepData.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-base">
              {stepData.description}
            </p>
          </div>
        );
      })}
    </div>

    <div className="mt-12 text-center">
      <Link href="/resume-builder">
        <Button
          size="lg"
          className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-md hover:shadow-lg transition-all"
        >
          Start Building Your Resume <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  </div>
</section>



      {/* Testimonials */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              What Our Users Say
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Join thousands of professionals who have successfully landed their dream jobs using SmartCV Coders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="I applied to over 50 jobs with my old resume and got zero callbacks. After using SmartCV Coders, I got 5 interviews in just two weeks!"
              author="Sarah Johnson"
              role="Marketing Manager"
              rating={5}
            />
            <TestimonialCard
              quote="The AI suggestions were incredibly helpful. They pointed out weaknesses in my resume that I never would have noticed on my own."
              author="Michael Chen"
              role="Software Engineer"
              rating={5}
            />
            <TestimonialCard
              quote="As someone who's been out of the job market for years, this tool was a lifesaver. It helped me create a modern, ATS-friendly resume that got me noticed."
              author="Jennifer Lopez"
              role="Project Manager"
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* Resume Templates */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Professional Resume Templates
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Choose from our collection of ATS-optimized templates that get results. Completely free for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <div className="group rounded-lg overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <div className="relative aspect-[3/4] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <img
                  src="/images/design-mode/best_resume_templates_012.jpg"
                  alt="Professional Resume Template"
                   className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold">Modern</h3>
                  <p className="text-white/80 text-sm">Contemporary look for tech jobs</p>
                </div>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 flex justify-between items-center">
                <span className="text-emerald-500 font-semibold">Free</span>
                <Link href="/resume-builder">
                  <Button size="sm">Use Template</Button>
                </Link>
              </div>
            </div>

             <div className="group rounded-lg overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <div className="relative aspect-[3/4] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <img
                      src="https://th.bing.com/th/id/OIP.7ewlfO1u3q6Sbh2RcdwsYgHaFj?w=1000&h=750&rs=1&pid=ImgDetMain"
                      alt="Creative Resume Template"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold">Modern</h3>
                  <p className="text-white/80 text-sm">Contemporary look for tech jobs</p>
                </div>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 flex justify-between items-center">
                <span className="text-emerald-500 font-semibold">Free</span>
                <Link href="/resume-builder">
                  <Button size="sm">Use Template</Button>
                </Link>
              </div>
            </div>

            <div className="group rounded-lg overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
            <div className="relative aspect-[3/4] bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <img
                src="/images/design-mode/resume-cv-template-vector.jpg"
                alt="Modern Resume Template"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-bold">Modern</h3>
                <p className="text-white/80 text-sm">Contemporary look for tech jobs</p>
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 flex justify-between items-center">
              <span className="text-emerald-500 font-semibold">Free</span>
              <Link href="/resume-builder">
                <Button size="sm">Use Template</Button>
              </Link>
            </div>
          </div>

          </div>

          <div className="mt-12 text-center">
            <Link href="/resume-builder">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 hover:text-white">
                Browse All Templates <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Join thousands of professionals who have boosted their careers with SmartCV Coders.
          </p>
          <Link href="/resume-builder">
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 hover:text-white">
              Build Your Resume Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">SmartCV</h3>
              <p className="mb-4">Creating professional, ATS-friendly resumes that get you noticed.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/roshan-malviya-a94453294/" className="text-slate-400 hover:text-white"
                   target="_blank"
                   rel="noopener noreferrer">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Resume Builder
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Cover Letter Builder
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/roshan-malviya-a94453294/" 
                     target="_blank"
                     rel="noopener noreferrer"
                    // className="hover:text-white"
                     >
                    LinkedIn Optimizer
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Job Tracker
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Career Advice
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Resume Examples
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} SmartCV. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
