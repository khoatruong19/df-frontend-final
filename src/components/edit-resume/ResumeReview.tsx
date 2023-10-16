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

  return (
    <section
      id="viewing-resume"
      className="w-[50%] relative flex flex-col items-center justify-center scale-85"
    >
      <Stockholm resume={resume} customSections={customSections ?? []} />
      {/* <div
        className="absolute top-0 left-0 w-full h-fit z-50 "
        style={{
          backgroundColor: 'black',
        }}
      >
        {imgs.map((image, idx) => (
          <img
            key={idx}
            alt=""
            src={image}
            className="w-[80%] h-[90%] object-contain"
          />
        ))}
      </div> */}
    </section>
  );
};

export default ResumeReview;
