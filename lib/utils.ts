import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date string (YYYY-MM) into a more readable format (Month Year)
 * @param dateString - Date string in YYYY-MM format
 * @returns Formatted date string or empty string if input is invalid
 */
export function formatDate(dateString: string): string {
  if (!dateString) return ""

  try {
    const [year, month] = dateString.split("-")
    if (!year || !month) return dateString

    const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1)

    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
  } catch (error) {
    console.error("Error formatting date:", error)
    return dateString
  }
}
