import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// A4 at 96dpi: 210mm ≈ 794px, 297mm ≈ 1123px
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

export async function exportResumeToPdf(elementId: string, filename = "resume.pdf") {
  const source = document.getElementById(elementId);
  if (!source) throw new Error("Preview element not found");

  // Clone into a fixed A4-sized wrapper so layout is computed at exact page size (matches UI on A4)
  const wrapper = document.createElement("div");
  wrapper.setAttribute("data-pdf-export", "true");
  Object.assign(wrapper.style, {
    position: "fixed",
    left: "-9999px",
    top: "0",
    width: `${A4_WIDTH_PX}px`,
    minHeight: `${A4_HEIGHT_PX}px`,
    overflow: "hidden",
    zIndex: "-1",
    backgroundColor: "#ffffff",
    boxSizing: "border-box",
  });

  const clone = source.cloneNode(true) as HTMLElement;
  Object.assign(clone.style, {
    width: `${A4_WIDTH_PX}px`,
    minHeight: `${A4_HEIGHT_PX}px`,
    maxWidth: "none",
    boxSizing: "border-box",
  });
  // Ensure inner content fills width (Tailwind w-full may not apply in clone context)
  const inner = clone.querySelector("[class*='w-full']") as HTMLElement | null;
  if (inner) inner.style.width = "100%";
  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  // Wait for layout and styles to settle (clone is in fixed-size wrapper)
  await new Promise<void>((r) => {
    requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(r, 50)));
  });

  try {
    const canvas = await html2canvas(wrapper, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: A4_WIDTH_PX,
      windowWidth: A4_WIDTH_PX,
      onclone: (_doc, clonedWrapper) => {
        const w = clonedWrapper as HTMLElement;
        w.style.width = `${A4_WIDTH_PX}px`;
        w.style.minHeight = `${A4_HEIGHT_PX}px`;
        const c = w.firstElementChild as HTMLElement;
        if (c) {
          c.style.width = `${A4_WIDTH_PX}px`;
          c.style.maxWidth = "none";
        }
      },
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const contentWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * contentWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = margin;

    pdf.addImage(imgData, "PNG", margin, position, contentWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight + margin;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", margin, position, contentWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
  } finally {
    wrapper.remove();
  }
}
