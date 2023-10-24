import React from 'react';
import SelectTemplatesDialog from './dialogs/SelectTemplatesDialog';
import { LayoutTemplate } from 'lucide-react';
import PreviewResumeTooltip from './tooltips/PreviewResumeTooltip';
import { Id } from '../../../convex/_generated/dataModel';
import Link from 'next/link';
import { Button } from '../ui/button';
import { exportPDF } from '@/lib/html2canvas';

type ResumeActionsProps = {
  resumeId: Id<'resume'>;
  resumeTemplate: string;
};

const ResumeActions = ({ resumeId, resumeTemplate }: ResumeActionsProps) => {
  return (
    <div className="absolute w-1/2 right-1 top-3 px-28 flex items-center justify-between">
      <SelectTemplatesDialog
        resumeId={resumeId}
        resumeTemplate={resumeTemplate}
        triggerElement={
          <button className="flex items-center gap-2 hover:bg-black/10 px-2 py-0.5 rounded-full">
            <LayoutTemplate />
            <span className="font-medium">Select Template</span>
          </button>
        }
      />
      <div className="flex items-center gap-3">
        <PreviewResumeTooltip resumeId={resumeId} />
        <Button onClick={exportPDF}>Download PDF</Button>
      </div>
    </div>
  );
};

export default ResumeActions;
