import React from 'react';
import Stockholm from '../resume-templates/Stockholm';
import { Doc } from '../../../convex/_generated/dataModel';

type ResumeReviewProps = {
  resume: Doc<'resume'>;
};

const ResumeReview = ({ resume }: ResumeReviewProps) => {
  return (
    <section className="w-[50%] flex flex-col items-center justify-center scale-85">
      <Stockholm resume={resume} />
    </section>
  );
};

export default ResumeReview;
