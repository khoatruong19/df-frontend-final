import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Doc } from '../../../convex/_generated/dataModel';
import Stockholm from '../resume-templates/Stockholm';

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
    </section>
  );
};

export default ResumeReview;
