import React, { useEffect, useState } from 'react';

import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useDebounce } from '@/hooks/useDebounce';
import { Id } from '../../../convex/_generated/dataModel';

type ProfessionalSummaryProps = {
  resumeId: Id<'resume'>;
  profileSummary?: string;
};

const ProfessionalSummary = ({
  resumeId,
  profileSummary,
}: ProfessionalSummaryProps) => {
  const [value, setValue] = useState(profileSummary ?? '');

  const debouncedValue = useDebounce<string>(value, 500);

  const updatePersonalDetails = useMutation(api.resume.updateProfileSummary);

  useEffect(() => {
    updatePersonalDetails({ id: resumeId, profileSummary: debouncedValue });
  }, [debouncedValue]);

  return (
    <section>
      <div className="mb-3">
        <h3 className="mb-2 text-xl">Professional Summary</h3>
        <p className="text-sm text-gray-400">
          Write 2-4 short & energetic sentences to interest the reader! Mention
          your role, experience & most importantly - your biggest achievements,
          best qualities and skills.
        </p>
      </div>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full min-h-[200px] bg-slate-200 text-lg font-medium px-2"
      ></textarea>
    </section>
  );
};

export default ProfessionalSummary;
