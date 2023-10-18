import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useDebounce } from '@/hooks/useDebounce';
import { EmploymentHistory } from '@/utils/types';
import { useMutation } from 'convex/react';
import { ChevronDown, Trash } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import { DatePicker } from '../DatePicker';
import FieldControl from '../FieldControl';
import Editor from '../editor/Editor';

type EmploymentCardProps = {
  resumeId: Id<'resume'>;
  employment: EmploymentHistory;
};

const EmploymentCard = ({ resumeId, employment }: EmploymentCardProps) => {
  const [jobTitle, setJobTitle] = useState(employment.jobTitle ?? '');
  const [company, setCompany] = useState(employment.company ?? '');
  const [city, setCity] = useState(employment.city ?? '');
  const [description, setDescription] = useState(employment.description ?? '');
  const [startDate, setStartDate] = useState(employment.startDate ?? '');
  const [endDate, setEndDate] = useState(employment.endDate ?? '');

  const hasBasicInfo =
    employment.jobTitle ||
    employment.company ||
    employment.startDate ||
    employment.endDate;

  const memoDetails = useMemo(
    () => ({
      jobTitle,
      company,
      city,
      description,
      startDate,
      endDate,
    }),
    [jobTitle, company, city, description, startDate, endDate]
  );

  const debouncedValues = useDebounce<Omit<EmploymentHistory, 'id'>>(
    memoDetails,
    1000
  );

  const updateEmploymentHistory = useMutation(
    api.resume.updateEmploymentHistory
  );

  const deleteEmploymentHistory = useMutation(
    api.resume.deleteEmploymentHistory
  );

  const deleteEmployementHistoryOnClick = () =>
    deleteEmploymentHistory({ resumeId, id: employment.id });

  useEffect(() => {
    const cleanedValues: EmploymentHistory = { id: employment.id };

    Object.entries(debouncedValues).forEach(([key, value]) => {
      if (value.length > 0) {
        cleanedValues[key as keyof EmploymentHistory] = value;
      }
    });

    updateEmploymentHistory({ resumeId, ...cleanedValues });
  }, [debouncedValues]);

  return (
    <Collapsible className="group relative border-2 cursor-pointer px-5 py-2">
      <CollapsibleTrigger asChild>
        <div className=" relative text-base min-h-[56px] flex items-center justify-between hover:opacity-60">
          {!hasBasicInfo && <p>&#40;Not specified&#41;</p>}
          {hasBasicInfo && (
            <div>
              <h3>
                {jobTitle} - {company}
              </h3>
              <p className="text-sm text-gray-400">
                {startDate} - {endDate}
              </p>
            </div>
          )}
          <ChevronDown />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="grid grid-cols-2 gap-y-5 gap-x-10 mt-3">
          <FieldControl
            value={jobTitle}
            setValue={setJobTitle}
            label="Job Title"
          />

          <FieldControl value={company} setValue={setCompany} label="Company" />

          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm text-gray-400">Start & End Date</label>
            <div className="flex items-center gap-3 w-full">
              <DatePicker
                setValue={setStartDate}
                triggerElement={
                  <input
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder={'MM/YYYY'}
                    className="px-3 py-2.5 outline-none bg-slate-200 text-lg font-medium w-full text-center"
                  />
                }
              />
              <DatePicker
                setValue={setEndDate}
                triggerElement={
                  <input
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder={'MM/YYYY'}
                    className="px-3 py-2.5 outline-none bg-slate-200 text-lg font-medium w-full text-center"
                  />
                }
              />
            </div>
          </div>

          <FieldControl value={city} setValue={setCity} label="City" />
        </div>

        <div>
          <label className="text-sm text-gray-400">Description</label>
          <Editor value={description} setValue={setDescription} />
        </div>
      </CollapsibleContent>
      <button
        onClick={deleteEmployementHistoryOnClick}
        className="hidden group-hover:flex absolute top-5 right-[-40px] px-2 py-1 justify-end hover:opacity-80 text-red-500"
      >
        <Trash />
      </button>
    </Collapsible>
  );
};

export default EmploymentCard;
