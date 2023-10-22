import { useQuery } from 'convex/react';
import { useCallback } from 'react';
import { api } from '../../../convex/_generated/api';
import { Doc } from '../../../convex/_generated/dataModel';
import Dublin from '../resume-templates/Dublin';
import Madrid from '../resume-templates/Madrid';
import Stockholm from '../resume-templates/Stockholm';
import { cn } from '@/lib/utils';

type ResumeReviewProps = {
  resume: Doc<'resume'>;
  downScale?: boolean;
};

const ResumeReview = ({ resume, downScale = true }: ResumeReviewProps) => {
  const customSections = useQuery(api.customSection.getAll, {
    resumeId: resume._id,
  });

  const _renderTemplate = useCallback(() => {
    if (resume.template === 'Stockholm')
      return (
        <Stockholm resume={resume} customSections={customSections ?? []} />
      );
    if (resume.template === 'Dublin')
      return <Dublin resume={resume} customSections={customSections ?? []} />;
    if (resume.template === 'Madrid')
      return <Madrid resume={resume} customSections={customSections ?? []} />;
  }, [resume]);

  return (
    <section
      className={cn(
        'relative w-[50%] flex flex-col items-center justify-center scale-85',
        {
          'scale-100': !downScale,
        }
      )}
    >
      {_renderTemplate()}
    </section>
  );
};

export default ResumeReview;
