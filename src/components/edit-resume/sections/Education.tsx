import { Education } from '@/utils/types';
import React from 'react';
import { Id } from '../../../../convex/_generated/dataModel';
import EducationCard from '../cards/EducationCard';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { PlusIcon } from 'lucide-react';

type EducationProps = {
  resumeId: Id<'resume'>;
  educations: Education[];
};

const Education = ({ educations, resumeId }: EducationProps) => {
  const addEducation = useMutation(api.resume.addEducation);

  const addMoreEducation = () => {
    addEducation({ id: resumeId });
  };

  return (
    <section>
      <div className="mb-3">
        <h3 className="mb-2 text-xl">Education</h3>
        <p className="text-sm text-gray-400">
          A varied education on your resume sums up the value that your
          learnings and background will bring to job
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {educations.map((education) => (
          <EducationCard
            resumeId={resumeId}
            education={education}
            key={education.id}
          />
        ))}

        <button
          onClick={addMoreEducation}
          className="py-2 px-5 hover:bg-slate-200 flex items-center gap-2 text-base cursor-pointer duration-100"
        >
          <PlusIcon size={15} />
          <span>Add one more education</span>
        </button>
      </div>
    </section>
  );
};

export default Education;
