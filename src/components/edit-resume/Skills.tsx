import React from 'react';

type Props = {};

const Skills = (props: Props) => {
  return (
    <section>
      <div className="mb-3">
        <h3 className="mb-2 text-xl">Skills</h3>
        <p className="text-sm text-gray-400">
          Show the employer what skills you have!
        </p>
      </div>

      <textarea className="w-full min-h-[200px] bg-slate-200"></textarea>
    </section>
  );
};

export default Skills;
