"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PdfExportButtonProps {
  targetRef: React.RefObject<HTMLDivElement>
  filename?: string
}

export default function PdfExportButton({ targetRef, filename = "resume.pdf" }: PdfExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const handleExportPDF = async () => {
    if (!targetRef.current) {
      toast({
        title: "Export Error",
        description: "Unable to find resume content to export.",
        variant: "destructive",
      })
      return
    }

    setIsExporting(true)

    try {
      // Use window.print() as fallback if libraries fail
      const printFallback = () => {
        const printWindow = window.open("", "_blank")
        if (printWindow) {
          printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
              <title>Resume</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                @media print {
                  body { margin: 0; }
                  @page { size: A4; margin: 20mm; }
                }
              </style>
            </head>
            <body>
              ${targetRef.current?.innerHTML || ""}
            </body>
            </html>
          `)
          printWindow.document.close()
          printWindow.print()
        }
      }

      try {
        // Try the library approach first
        const html2canvas = (await import("html2canvas")).default
        const jsPDF = (await import("jspdf")).jsPDF

        // Simple canvas creation
        const canvas = await html2canvas(targetRef.current, {
          scale: 1,
          useCORS: true,
          backgroundColor: "#ffffff",
        })

        const imgData = canvas.toDataURL("image/png")
        const pdf = new jsPDF("p", "mm", "a4")

        // Simple approach - just fit to page
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
        pdf.save(filename)

        toast({
          title: "Export Successful",
          description: "Your resume has been downloaded as a PDF.",
        })
      } catch (libraryError) {
        console.log("Library approach failed, using print fallback:", libraryError)
        printFallback()
        toast({
          title: "Print Dialog Opened",
          description: "Please use your browser's print dialog to save as PDF.",
        })
      }
    } catch (error) {
      console.error("All export methods failed:", error)

      // Last resort - copy content to clipboard
      try {
        await navigator.clipboard.writeText(targetRef.current?.innerText || "")
        toast({
          title: "Content Copied",
          description: "Resume content copied to clipboard as text.",
        })
      } catch (clipboardError) {
        toast({
          title: "Export Failed",
          description: "Unable to export resume. Please try copying the content manually.",
          variant: "destructive",
        })
      }
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button
      onClick={handleExportPDF}
      disabled={isExporting}
      className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600"
    >
      {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
      {isExporting ? "Exporting..." : "Export PDF"}
    </Button>
  )
}
