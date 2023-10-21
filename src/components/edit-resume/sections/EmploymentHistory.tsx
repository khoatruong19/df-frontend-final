import { EmploymentHistory } from '@/utils/types';
import { useMutation } from 'convex/react';
import { PlusIcon } from 'lucide-react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import EmploymentCard from '../cards/EmploymentCard';
import { useEffect, useState } from 'react';
import SectionTitleInput from '../form/SectionTitleInput';
import { useDebounce } from '@/hooks/useDebounce';

type EmploymentHistoryProps = {
  resumeId: Id<'resume'>;
  employmentHistoryTitle: string;
  employmentHistories: EmploymentHistory[];
};

const EmploymentHistory = ({
  resumeId,
  employmentHistoryTitle,
  employmentHistories,
}: EmploymentHistoryProps) => {
  const [title, setTitle] = useState(employmentHistoryTitle);

  const debouncedTitle = useDebounce(title, 500);

  const updateEmploymentHistoryTitle = useMutation(
    api.resume.updateEmploymentHistoryTitle
  );
  const addEmploymentHistory = useMutation(api.resume.addEmploymentHistory);

  const addMoreEmployment = () => {
    addEmploymentHistory({ id: resumeId });
  };

  useEffect(() => {
    updateEmploymentHistoryTitle({
      id: resumeId,
      employmentHistoryTitle: title,
    });
  }, [debouncedTitle]);

  useEffect(() => {
    if (title !== employmentHistoryTitle) setTitle(employmentHistoryTitle);
  }, [employmentHistoryTitle]);

  return (
    <section>
      <div className="mb-3">
        <SectionTitleInput value={title} setValue={setTitle} />
        <p className="text-sm text-gray-400">Show your working experiences</p>
      </div>

      <div className="flex flex-col gap-3">
        {employmentHistories.map((employment) => (
          <EmploymentCard
            resumeId={resumeId}
            employment={employment}
            key={employment.id}
          />
        ))}

        <button
          onClick={addMoreEmployment}
          className="py-2 px-5 hover:bg-slate-200 flex items-center gap-2 text-base cursor-pointer duration-100"
        >
          <PlusIcon size={15} />
          <span>
            {employmentHistories.length === 0
              ? 'Add one employment'
              : 'Add one more employment'}
          </span>
        </button>
      </div>
    </section>
  );
};

export default EmploymentHistory;
