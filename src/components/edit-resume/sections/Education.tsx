import { useDebounce } from '@/hooks/useDebounce';
import { Education } from '@/utils/types';
import { useMutation } from 'convex/react';
import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import SectionTitleInput from '../form/SectionTitleInput';
import EducationCard from '../cards/EducationCard';

type EducationProps = {
  resumeId: Id<'resume'>;
  educationTitle: string;
  educations: Education[];
};

const Education = ({
  educationTitle,
  educations,
  resumeId,
}: EducationProps) => {
  const [title, setTitle] = useState(educationTitle);

  const debouncedTitle = useDebounce(title, 500);

  const updateEducationTitle = useMutation(api.resume.updateEducationTitle);
  const addEducation = useMutation(api.resume.addEducation);

  const addMoreEducation = () => {
    addEducation({ id: resumeId });
  };

  useEffect(() => {
    updateEducationTitle({ id: resumeId, educationTitle: title });
  }, [debouncedTitle]);

  useEffect(() => {
    if (title !== educationTitle) setTitle(educationTitle);
  }, [educationTitle]);

  return (
    <section>
      <div className="mb-3">
        <SectionTitleInput value={title} setValue={setTitle} />
        <p className="text-sm text-appSecondaryTextColor font-semibold">
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
          className="py-2 px-5 hover:bg-white flex items-center gap-2 text-base cursor-pointer duration-100"
        >
          <PlusIcon size={15} />
          <span>
            {educations.length === 0
              ? 'Add one education'
              : 'Add one more education'}
          </span>
        </button>
      </div>
    </section>
  );
};

export default Education;
