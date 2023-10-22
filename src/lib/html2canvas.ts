import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportPDF = async () => {
  const resume = document.getElementById('resume');

  if (!resume) return alert("Can't download PDF!");

  resume.classList.add('tracking-for-pdf');

  const canvas = await html2canvas(resume!, {
    useCORS: true,
    allowTaint: true,
    logging: false,
    backgroundColor: '#ffffff',
    scale: 1,
  });
  const contentWidth = canvas.width;
  const contentHeight = canvas.height;

  const pageHeight = (contentWidth / 592.28) * 841.89;
  let leftHeight = contentHeight;
  let position = 0;
  const imgWidth = 595.28;
  const imgHeight = (592.28 / contentWidth) * contentHeight;

  const pageData = canvas.toDataURL('image/jpeg', 1.0);

  const pdf = new jsPDF('p', 'pt', 'a4');

  if (leftHeight < pageHeight) {
    pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
  } else {
    while (leftHeight > 0) {
      pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
      leftHeight -= pageHeight;
      position -= 841.89;
      if (leftHeight > 0) {
        pdf.addPage();
      }
    }
  }
  pdf.save('stone.pdf');

  resume.classList.remove('tracking-for-pdf');
};

export const exportAsImage = async () => {
  const resume = document.getElementById('resume');

  if (!resume) return alert("Can't download PDF!");

  resume.classList.add('tracking-for-pdf');

  const canvas = await html2canvas(resume!, {
    useCORS: true,
    allowTaint: true,
    logging: false,
    backgroundColor: '#ffffff',
    scale: 1,
  });

  const image = canvas.toDataURL('image/png');

  return image;
};
