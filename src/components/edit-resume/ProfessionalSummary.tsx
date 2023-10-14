import React from 'react';

type Props = {};

const ProfessionalSummary = (props: Props) => {
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

      <textarea className="w-full min-h-[200px] bg-slate-200"></textarea>
    </section>
  );
};

export default ProfessionalSummary;
