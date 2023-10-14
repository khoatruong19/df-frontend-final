import ResumeForm from '@/components/edit-resume/ResumeForm';
import ResumeReview from '@/components/edit-resume/ResumeReview';
import React from 'react';

type Props = {};

const EditResumePage = (props: Props) => {
  return (
    <main className="max-h-screen flex overflow-hidden">
      <ResumeForm />
      <ResumeReview />
    </main>
  );
};

export default EditResumePage;
