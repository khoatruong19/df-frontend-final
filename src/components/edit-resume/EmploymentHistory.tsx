import React from 'react';

type Props = {};

const EmploymentHistory = (props: Props) => {
  return (
    <section>
      <div className="mb-3">
        <h3 className="mb-2 text-xl">Employment History</h3>
        <p className="text-sm text-gray-400">Show your working experiences</p>
      </div>

      <textarea className="w-full min-h-[200px] bg-slate-200"></textarea>
    </section>
  );
};

export default EmploymentHistory;
