import React, { useEffect, useState } from 'react';
import Stockholm from '../resume-templates/Stockholm';
import { Doc } from '../../../convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { exportAsImage } from '@/lib/html2canvas';

type ResumeReviewProps = {
  resume: Doc<'resume'>;
};

const ResumeReview = ({ resume }: ResumeReviewProps) => {
  const customSections = useQuery(api.customSection.getAll, {
    resumeId: resume._id,
  });

  const [imgs, setImgs] = useState<string[]>([]);

  useEffect(() => {
    exportAsImage().then((image) => setImgs((prev) => [image]));
  }, []);

  console.log({ imgs });

  return (
    <section className="w-[50%] relative flex flex-col items-center justify-center">
      <div id="test-section">
        <Stockholm resume={resume} customSections={customSections ?? []} />
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full z-50 flex items-center justify-center"
        style={{
          backgroundColor: 'black',
        }}
      >
        {imgs.map((image, idx) => (
          <img
            key={idx}
            alt=""
            src={image}
            className="w-auto h-[90%] object-contain"
          />
        ))}
      </div>
    </section>
  );
};

export default ResumeReview;
