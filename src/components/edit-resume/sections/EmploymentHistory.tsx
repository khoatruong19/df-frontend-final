import { EmploymentHistory } from '@/utils/types';
import { useMutation } from 'convex/react';
import { PlusIcon } from 'lucide-react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import EmploymentCard from '../cards/EmploymentCard';

type EmploymentHistoryProps = {
  resumeId: Id<'resume'>;
  employmentHistories: EmploymentHistory[];
};

const EmploymentHistory = ({
  resumeId,
  employmentHistories,
}: EmploymentHistoryProps) => {
  const addEmploymentHistory = useMutation(api.resume.addEmploymentHistory);

  const addMoreEmployment = () => {
    addEmploymentHistory({ id: resumeId });
  };

  return (
    <section>
      <div className="mb-3">
        <h3 className="mb-2 text-xl">Employment History</h3>
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
          <span>Add one more employment</span>
        </button>
      </div>
    </section>
  );
};

export default EmploymentHistory;
