import { RESUME_TEMPLATES } from '@/components/resume-templates/constants';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

import React, { useState } from 'react';
import ResumeTemplateCard from '../cards/ResumeTemplateCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

type SelectTemplatesDialogProps = {
  wrapperClass?: string;
  triggerElement: React.ReactNode;
  resumeTemplate: string;
  resumeId: Id<'resume'>;
};

const SelectTemplatesDialog = ({
  triggerElement,
  wrapperClass,
  resumeTemplate,
  resumeId,
}: SelectTemplatesDialogProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState(resumeTemplate);

  const updateTemplate = useMutation(api.resume.updateTemplate);

  const selectTemplate = (templateName: string) =>
    setSelectedTemplate(templateName);

  const saveTemplate = () => {
    updateTemplate({ id: resumeId, template: selectedTemplate }).catch(
      console.error
    );
  };

  const isTemplateUsing = selectedTemplate === resumeTemplate;

  return (
    <aside className={wrapperClass}>
      <Dialog>
        <DialogTrigger>{triggerElement}</DialogTrigger>
        <DialogContent className="max-w-[700px] w-full bg-appPrimary">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center mb-3">
              Choose a template
            </DialogTitle>
            <DialogDescription className="w- full grid grid-cols-3 gap-3">
              {RESUME_TEMPLATES.map((template) => (
                <ResumeTemplateCard
                  selectTemplate={() => selectTemplate(template.name)}
                  isSelected={selectedTemplate === template.name}
                  key={template.name}
                  template={template}
                />
              ))}
            </DialogDescription>
          </DialogHeader>
          <DialogClose
            className={cn({
              'opacity-60 cursor-default': isTemplateUsing,
            })}
            disabled={isTemplateUsing}
          >
            <Button disabled={isTemplateUsing} onClick={saveTemplate}>
              Save
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </aside>
  );
};

export default SelectTemplatesDialog;
