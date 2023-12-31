'use client';

import ResumeForm from '@/components/edit-resume/ResumeForm';
import ResumeReview from '@/components/edit-resume/ResumeReview';
import { useQuery } from 'convex/react';
import { Id } from '../../../../../convex/_generated/dataModel';
import { api } from '../../../../../convex/_generated/api';
import UserPopoverTrigger from '@/components/edit-resume/popover/UserPopoverTrigger';
import ResumeActions from '@/components/edit-resume/ResumeActions';

type EditResumePageProps = {
  params: { id: Id<'resume'> };
};

const EditResumePage = ({ params: { id } }: EditResumePageProps) => {
  const resume = useQuery(api.resume.getById, { id });
  if (!resume) return null;

  return (
    <main className="relative max-h-screen flex overflow-hidden bg-appPrimary">
      <ResumeForm resume={resume} />
      <ResumeReview resume={resume} />
      <ResumeActions resumeId={resume._id} resumeTemplate={resume.template} />
      <UserPopoverTrigger className="absolute top-4 right-5" />
    </main>
  );
};

export default EditResumePage;
