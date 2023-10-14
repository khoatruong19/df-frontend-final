import React from 'react';

type Props = {};

const Education = (props: Props) => {
  return (
    <section>
      <div className="mb-3">
        <h3 className="mb-2 text-xl">Education</h3>
        <p className="text-sm text-gray-400">
          A varied education on your resume sums up the value that your
          learnings and background will bring to job
        </p>
      </div>

      <textarea className="w-full min-h-[200px] bg-slate-200"></textarea>
    </section>
  );
};

export default Education;
