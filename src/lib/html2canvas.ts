import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportPDF = async () => {
  const resume = document.getElementById('resume');

  if (!resume) return alert("Can't download PDF!");

  resume.classList.add('tracking-for-pdf');

  const icons = document.getElementsByClassName('icon');
  for (let i = 0; i < icons.length; i++) {
    icons[i].classList.add('icon-for-pdf');
  }

  const processes = document.getElementsByClassName('process');
  for (let i = 0; i < processes.length; i++) {
    processes[i].classList.add('process-for-pdf');
  }

  const leadings = document.getElementsByClassName('leading');
  for (let i = 0; i < leadings.length; i++) {
    leadings[i].classList.add('leading-for-pdf');
  }

  const canvas = await html2canvas(resume!, {
    useCORS: true,
    allowTaint: true,
    logging: false,
    backgroundColor: '#ffffff',
    scale: 3,
  });

  const contentWidth = canvas.width;
  const contentHeight = canvas.height;
  const biasWidth = 592.28;
  const biasHeight = 841.89;

  const pageHeight = (contentWidth / biasWidth) * biasHeight;
  let leftHeight = contentHeight;
  let position = 0;
  const imgWidth = biasWidth;
  const imgHeight = (biasWidth / contentWidth) * contentHeight;

  const pageData = canvas.toDataURL('image/jpeg', 1.0);
  const pdf = new jsPDF('p', 'pt', 'a4');

  if (leftHeight < pageHeight) {
    pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
  } else {
    while (leftHeight > 0) {
      pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
      leftHeight -= pageHeight;
      position -= biasHeight;
      if (leftHeight > 0) {
        pdf.addPage();
      }
    }
  }
  pdf.save('Resume.pdf');

  resume.classList.remove('tracking-for-pdf');

  for (let i = 0; i < icons.length; i++) {
    icons[i].classList.remove('icon-for-pdf');
  }

  for (let i = 0; i < processes.length; i++) {
    processes[i].classList.remove('process-for-pdf');
  }

  for (let i = 0; i < leadings.length; i++) {
    leadings[i].classList.remove('leading-for-pdf');
  }
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
