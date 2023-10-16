import React from 'react';
import Stockholm from '../resume-templates/Stockholm';
import { Doc } from '../../../convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

type ResumeReviewProps = {
  resume: Doc<'resume'>;
};

const ResumeReview = ({ resume }: ResumeReviewProps) => {
  const customSections = useQuery(api.customSection.getAll, {
    resumeId: resume._id,
  });
  return (
    <section className="w-[50%] flex flex-col items-center justify-center scale-85">
      <Stockholm resume={resume} customSections={customSections ?? []} />
    </section>
  );
};

export default ResumeReview;
