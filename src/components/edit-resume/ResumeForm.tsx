import React from 'react';
import { Input } from '../ui/input';
import PersonalDetails from './PersonalDetails';
import ProfessionalSummary from './ProfessionalSummary';
import EmploymentHistory from './EmploymentHistory';
import Education from './Education';

type Props = {};

const ResumeForm = (props: Props) => {
  return (
    <section
      className="w-[50%] py-8 px-5 flex flex-col gap-4 text-2xl font-semibold overflow-auto 
    scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-neutral-400  font-display"
    >
      <input
        value={'Untitled'}
        className="bg-transparent h-12 w-auto outline-none mx-auto text-center"
      />
      <div className="flex flex-col gap-5">
        <PersonalDetails />
        <ProfessionalSummary />
        <EmploymentHistory />
        <Education />
      </div>
    </section>
  );
};

export default ResumeForm;
