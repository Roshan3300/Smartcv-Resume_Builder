export async function exportToPdf(element: HTMLElement, filename = "resume.pdf") {
  try {
    // Dynamic imports to reduce bundle size
    const html2canvas = (await import("html2canvas")).default
    const jsPDF = (await import("jspdf")).jsPDF

    // Get element dimensions
    const rect = element.getBoundingClientRect()

    // Ensure element is visible and has dimensions
    if (rect.width === 0 || rect.height === 0) {
      throw new Error("Element has no visible dimensions")
    }

    // Create canvas with explicit dimensions
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      width: Math.max(rect.width, element.scrollWidth),
      height: Math.max(rect.height, element.scrollHeight),
    })

    // Validate canvas dimensions
    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error("Canvas has invalid dimensions")
    }

    // Get image data
    const imgData = canvas.toDataURL("image/png", 0.9)

    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    // A4 dimensions in mm
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 10

    // Calculate available space
    const availableWidth = pageWidth - margin * 2
    const availableHeight = pageHeight - margin * 2

    // Calculate image dimensions in mm (assuming 96 DPI)
    const pixelsPerMM = 96 / 25.4
    const imgWidthMM = canvas.width / pixelsPerMM / 2 // Divide by 2 because of scale factor
    const imgHeightMM = canvas.height / pixelsPerMM / 2

    // Calculate scaling to fit page
    let finalWidth = imgWidthMM
    let finalHeight = imgHeightMM

    // Scale down if too wide
    if (finalWidth > availableWidth) {
      const ratio = availableWidth / finalWidth
      finalWidth = availableWidth
      finalHeight = finalHeight * ratio
    }

    // Scale down if too tall
    if (finalHeight > availableHeight) {
      const ratio = availableHeight / finalHeight
      finalHeight = availableHeight
      finalWidth = finalWidth * ratio
    }

    // Center the image
    const x = (pageWidth - finalWidth) / 2
    const y = margin

    // Validate final dimensions and positioning
    if (finalWidth <= 0 || finalHeight <= 0 || isNaN(finalWidth) || isNaN(finalHeight)) {
      throw new Error("Invalid final dimensions calculated")
    }

    if (x < 0 || y < 0 || isNaN(x) || isNaN(y)) {
      throw new Error("Invalid positioning calculated")
    }

    // Add image to PDF
    pdf.addImage(imgData, "PNG", x, y, finalWidth, finalHeight)

    // Save the PDF
    pdf.save(filename)

    return { success: true }
  } catch (error) {
    console.error("Error exporting PDF:", error)
    return { success: false, error }
  }
}
