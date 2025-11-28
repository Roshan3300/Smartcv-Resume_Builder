import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

interface PricingCardProps {
  title: string
  price: string
  period?: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant: "default" | "outline"
  href: string
  popular?: boolean
}

export default function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonVariant,
  href,
  popular = false,
}: PricingCardProps) {
  return (
    <Card
      className={`border-slate-200 dark:border-slate-800 ${
        popular
          ? "relative border-emerald-500 dark:border-emerald-500 shadow-lg"
          : "hover:shadow-md transition-shadow duration-300"
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Most Popular</span>
        </div>
      )}
      <CardHeader className={popular ? "pt-8" : ""}>
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="flex items-baseline mt-2">
          <span className="text-3xl font-bold text-slate-900 dark:text-white">{price}</span>
          {period && <span className="ml-1 text-slate-500 dark:text-slate-400">/{period}</span>}
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500" />
              <span className="text-slate-700 dark:text-slate-300">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link href={href} className="w-full">
          <Button
            variant={buttonVariant}
            className={`w-full ${buttonVariant === "default" ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""}`}
          >
            {buttonText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
