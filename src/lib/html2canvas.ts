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

  const image = canvas.toDataURL('image/png');
  const imgWidth = 190;
  const pageHeight = 290;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  const doc = new jsPDF('p', 'mm');
  let position = 0;
  doc.addImage(image, 'PNG', 10, 0, imgWidth, imgHeight + 25);
  heightLeft -= pageHeight;
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    doc.addPage();
    doc.addImage(image, 'PNG', 10, position, imgWidth, imgHeight + 25);
    heightLeft -= pageHeight;
  }
  doc.save('download.pdf');

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
