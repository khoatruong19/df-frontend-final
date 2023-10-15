import React, { useEffect, useState } from 'react';
import PersonalDetails from './PersonalDetails';
import ProfessionalSummary from './ProfessionalSummary';
import EmploymentHistory from './EmploymentHistory';
import Education from './Education';
import { Doc } from '../../../convex/_generated/dataModel';
import { useDebounce } from '@/hooks/useDebounce';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import SocialLinks from './SocialLinks';

type ResumeFormProps = {
  resume: Doc<'resume'>;
};

const ResumeForm = ({ resume }: ResumeFormProps) => {
  const [title, setTitle] = useState(resume.title);

  const debouncedValue = useDebounce<string>(title, 500);

  const updateResumeTitle = useMutation(api.resume.updateTitle);

  useEffect(() => {
    updateResumeTitle({ id: resume._id, title });
  }, [debouncedValue]);

  return (
    <section
      className="w-[50%] py-8 px-10 flex flex-col gap-4 text-2xl font-semibold overflow-auto 
    scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-neutral-400  font-display"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-transparent h-12 w-auto outline-none mx-auto text-center"
      />
      <div className="flex flex-col gap-5">
        <PersonalDetails
          resumeId={resume._id}
          details={resume.personalDetails}
        />
        <ProfessionalSummary
          resumeId={resume._id}
          profileSummary={resume.profileSummary}
        />
        <EmploymentHistory
          resumeId={resume._id}
          employmentHistories={resume.employmentHistory}
        />
        <Education resumeId={resume._id} educations={resume.education} />
        <SocialLinks resumeId={resume._id} socialLinks={resume.socialLinks} />
      </div>
    </section>
  );
};

export default ResumeForm;
