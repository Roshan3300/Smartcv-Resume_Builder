"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PrintButtonProps {
  targetRef: React.RefObject<HTMLDivElement>
}

export default function PrintButton({ targetRef }: PrintButtonProps) {
  const { toast } = useToast()

  const handlePrint = () => {
    if (!targetRef.current) {
      toast({
        title: "Print Error",
        description: "Unable to find resume content to print.",
        variant: "destructive",
      })
      return
    }

    // Create a new window for printing
    const printWindow = window.open("", "_blank")
    if (!printWindow) {
      toast({
        title: "Print Error",
        description: "Unable to open print window. Please check popup blockers.",
        variant: "destructive",
      })
      return
    }

    // Get the resume content
    const resumeContent = targetRef.current.innerHTML

    // Write the content to the new window
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Resume</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: white;
            color: black;
          }
          @media print {
            body {
              margin: 0;
              padding: 15mm;
            }
            @page {
              size: A4;
              margin: 0;
            }
          }
          h1, h2, h3 {
            color: black !important;
          }
          .text-gray-600, .text-gray-700 {
            color: #4a5568 !important;
          }
          .bg-gray-100, .bg-gray-200 {
            background-color: #f7fafc !important;
          }
        </style>
      </head>
      <body>
        ${resumeContent}
      </body>
      </html>
    `)

    printWindow.document.close()

    // Wait for content to load, then print
    printWindow.onload = () => {
      printWindow.print()
      printWindow.close()
    }

    toast({
      title: "Print Dialog Opened",
      description: "Use 'Save as PDF' in the print dialog to create a PDF file.",
    })
  }

  return (
    <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2">
      <Printer className="h-4 w-4" />
      Print / Save as PDF
    </Button>
  )
}
