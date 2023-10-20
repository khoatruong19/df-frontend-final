import { ADD_SECTIONS } from '@/utils/constants';
import React from 'react';
import { Doc } from '../../../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { cn } from '@/lib/utils';

type AddSectionProps = {
  resume: Doc<'resume'>;
};

const AddSection = ({ resume }: AddSectionProps) => {
  const addSection = useMutation(api.customSection.create);
  const addHobbiesSection = useMutation(api.resume.addHobbiesSection);
  const addCoursesSection = useMutation(api.resume.addCoursesSection);

  const sectionClickHandler = (dataField: string) => {
    if (dataField === 'customSection') {
      addSection({ resumeId: resume._id });
      return;
    }
    if (dataField === 'hobbies') {
      addHobbiesSection({ resumeId: resume._id });
      return;
    }
    if (dataField === 'courses') {
      addCoursesSection({ resumeId: resume._id });
      return;
    }
  };

  return (
    <section>
      <h3 className="mb-2 text-xl">Add Section</h3>
      <div className="grid grid-cols-2 gap-y-5 gap-x-10 mt-5">
        {ADD_SECTIONS.map(({ name, icon: Icon, dataField }) => {
          const isFieldExisting = !!resume[dataField as keyof typeof resume];
          return (
            <button
              key={name}
              className={cn(
                'flex items-center gap-2 text-lg hover:text-blue-400',
                { 'opacity-60 hover:text-inherit': isFieldExisting }
              )}
              onClick={() => sectionClickHandler(dataField)}
              disabled={isFieldExisting}
            >
              <Icon />
              <span>{name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default AddSection;
