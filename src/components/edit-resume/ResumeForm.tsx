import React, { useEffect, useState } from 'react';
import PersonalDetails from './sections/PersonalDetails';
import ProfessionalSummary from './sections/ProfessionalSummary';
import EmploymentHistory from './sections/EmploymentHistory';
import Education from './sections/Education';
import { Doc } from '../../../convex/_generated/dataModel';
import { useDebounce } from '@/hooks/useDebounce';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import SocialLinks from './sections/SocialLinks';
import Skills from './sections/Skills';
import AddSection from './sections/AddSection';
import CustomSection from './sections/CustomSection';
import Hobbies from './sections/Hobbies';
import Courses from './sections/Courses';
import useUploadResumeCoverImg from '@/hooks/useUploadResumeCoverImg';

type ResumeFormProps = {
  resume: Doc<'resume'>;
};

const ResumeForm = ({ resume }: ResumeFormProps) => {
  const [title, setTitle] = useState(resume.title);

  const customSections = useQuery(api.customSection.getAll, {
    resumeId: resume._id,
    userId: resume.userId,
  });

  const debouncedValue = useDebounce<string>(title, 500);
  const updateResumeTitle = useMutation(api.resume.updateTitle);

  useUploadResumeCoverImg({ resumeId: resume._id });

  useEffect(() => {
    updateResumeTitle({ id: resume._id, title });
  }, [debouncedValue]);

  return (
    <section
      className="w-[50%] py-8 px-10 flex flex-col gap-4 text-2xl font-semibold overflow-auto 
    custom-scrollbar font-display"
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
          profileSummary={resume?.profileSummary}
          profileSummaryTitle={resume.profileSummaryTitle}
        />
        <EmploymentHistory
          resumeId={resume._id}
          employmentHistoryTitle={resume.employmentHistoryTitle}
          employmentHistories={resume.employmentHistory}
        />
        <Education
          resumeId={resume._id}
          educationTitle={resume.educationTitle}
          educations={resume.education}
        />
        <SocialLinks
          socialLinksTitle={resume.socialLinksTitle}
          resumeId={resume._id}
          socialLinks={resume.socialLinks}
        />
        <Skills
          resumeId={resume._id}
          skillsTitle={resume.skillsTitle}
          skills={resume.skills}
          jobTitle={resume.personalDetails.jobTitle}
        />
        {resume.hobbies && (
          <Hobbies resumeId={resume._id} hobbies={resume.hobbies} />
        )}
        {resume.courses && (
          <Courses
            resumeId={resume._id}
            coursesTitle={resume.coursesTitle!}
            courses={resume.courses}
          />
        )}
        {customSections &&
          customSections.map((section) => (
            <CustomSection key={section._id} customSection={section} />
          ))}
        <AddSection resume={resume} />
      </div>
    </section>
  );
};

export default ResumeForm;
