'use client';

import ResumeForm from '@/components/edit-resume/ResumeForm';
import ResumeReview from '@/components/edit-resume/ResumeReview';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

type EditResumePageProps = {
  params: { id: Id<'resume'> };
};

const EditResumePage = ({ params: { id } }: EditResumePageProps) => {
  const resume = useQuery(api.resume.getById, { id });

  if (!resume) return null;

  return (
    <main className="max-h-screen flex overflow-hidden">
      <ResumeForm resume={resume} />
      <ResumeReview resume={resume} />
    </main>
  );
};

export default EditResumePage;
