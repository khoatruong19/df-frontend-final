import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Doc } from '../../../convex/_generated/dataModel';
import Stockholm from '../resume-templates/Stockholm';
import Dublin from '../resume-templates/Dublin';
import Madrid from '../resume-templates/Madrid';
import { LayoutTemplate } from 'lucide-react';
import { Button } from '../ui/button';
import SelectTemplatesDialog from './dialogs/SelectTemplatesDialog';
import { useCallback } from 'react';

type ResumeReviewProps = {
  resume: Doc<'resume'>;
};

const ResumeReview = ({ resume }: ResumeReviewProps) => {
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
      id="viewing-resume"
      className="relative w-[50%] flex flex-col items-center justify-center scale-85 "
    >
      <div className="absolute w-full top-[-60px] px-12 flex items-center justify-between">
        <SelectTemplatesDialog
          resumeId={resume._id}
          resumeTemplate={resume.template}
          triggerElement={
            <button className="flex items-center gap-2 hover:bg-black/10 px-2 py-0.5 rounded-full">
              <LayoutTemplate />
              <span>Select Template</span>
            </button>
          }
        />
        <Button>Download PDF</Button>
      </div>
      {_renderTemplate()}
    </section>
  );
};

export default ResumeReview;
