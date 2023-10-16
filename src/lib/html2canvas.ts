import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportAsImage = async () => {
  const ele = document.getElementById('viewing-resume');

  const canvas = await html2canvas(ele!, {
    useCORS: true,
    logging: true,
    allowTaint: false,
    backgroundColor: '#ffffff',
    scale: 1,
  });
  const image = canvas.toDataURL('image/png');

  //   const link = document.createElement('a');

  //   if (typeof link.download === 'string') {
  //     link.href = image;
  //     link.download = 'image.jpg';

  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } else {
  //     window.open(image);
  //   }

  return image;
};
