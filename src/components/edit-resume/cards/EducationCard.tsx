import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useDebounce } from '@/hooks/useDebounce';
import { Education } from '@/utils/types';
import { useMutation } from 'convex/react';
import { ChevronDown, Trash } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import { DatePicker } from '../form/DatePicker';
import FieldControl from '../form/FieldControl';
import Editor from '../editor/Editor';

type EducationCardProps = {
  resumeId: Id<'resume'>;
  education: Education;
};

const EducationCard = ({ resumeId, education }: EducationCardProps) => {
  const [school, setSchool] = useState(education.school ?? '');
  const [degree, setDegree] = useState(education.degree ?? '');
  const [city, setCity] = useState(education.city ?? '');
  const [description, setDescription] = useState(education.description ?? '');
  const [startDate, setStartDate] = useState(education.startDate ?? '');
  const [endDate, setEndDate] = useState(education.endDate ?? '');

  const hasBasicInfo =
    education.school ||
    education.degree ||
    education.startDate ||
    education.endDate;

  const memoDetails = useMemo(
    () => ({
      school,
      degree,
      city,
      description,
      startDate,
      endDate,
    }),
    [school, degree, city, description, startDate, endDate]
  );

  const debouncedValues = useDebounce<Omit<Education, 'id'>>(memoDetails, 1000);

  const updateEducation = useMutation(api.resume.updateEducation);

  const deleteEducation = useMutation(api.resume.deleteEducation);

  const deleteEducationOnClick = () =>
    deleteEducation({ resumeId, id: education.id });

  useEffect(() => {
    const cleanedValues: Education = { id: education.id };

    Object.entries(debouncedValues).forEach(([key, value]) => {
      if (value.length > 0) {
        cleanedValues[key as keyof Education] = value;
      }
    });

    updateEducation({ resumeId, ...cleanedValues });
  }, [debouncedValues]);

  return (
    <Collapsible className="group relative border-2 cursor-pointer px-5 py-2">
      <CollapsibleTrigger asChild>
        <div className=" relative text-base min-h-[56px] flex items-center justify-between hover:opacity-60">
          {!hasBasicInfo && <p>&#40;Not specified&#41;</p>}
          {hasBasicInfo && (
            <div>
              <h3>
                {school} - {degree}
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
          <FieldControl value={school} setValue={setSchool} label="School" />

          <FieldControl value={degree} setValue={setDegree} label="Degree" />

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

        <div className="mt-5">
          <label className="text-sm text-gray-400">Description</label>
          <Editor value={description} setValue={setDescription} />
        </div>
      </CollapsibleContent>
      <button
        onClick={deleteEducationOnClick}
        className="hidden group-hover:flex absolute top-5 right-[-40px] px-2 py-1 justify-end hover:opacity-80 text-red-500"
      >
        <Trash />
      </button>
    </Collapsible>
  );
};

export default EducationCard;
