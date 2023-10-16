import { ADD_SECTIONS } from '@/utils/constants';
import React from 'react';
import { Doc } from '../../../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

type AddSectionProps = {
  resume: Doc<'resume'>;
};

const AddSection = ({ resume }: AddSectionProps) => {
  const addSection = useMutation(api.customSection.create);

  const sectionClickHandler = (name: string) => {
    if (name === 'Custom Section') {
      addSection({ resumeId: resume._id });
      return;
    }
  };

  return (
    <section>
      <h3 className="mb-2 text-xl">Add Section</h3>
      <div className="grid grid-cols-2 gap-y-5 gap-x-10 mt-5">
        {ADD_SECTIONS.map(({ name, icon: Icon }) => (
          <button
            key={name}
            className="flex items-center gap-2 text-lg hover:text-blue-400"
            onClick={() => sectionClickHandler(name)}
          >
            <Icon />
            <span>{name}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default AddSection;
