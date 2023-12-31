import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useDebounce } from '@/hooks/useDebounce';
import { EmploymentHistory } from '@/utils/types';
import { useMutation } from 'convex/react';
import { ChevronDown, Plus, Trash } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import { DatePicker } from '../form/DatePicker';
import FieldControl from '../form/FieldControl';
import Editor from '../editor/Editor';
import EmploymentHistoryPhrasesPopup from '../popups/EmploymentHistoryPhrasesPopup';

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
  const [openEditor, setOpenEditor] = useState(false);
  const [refreshEditor, setRefreshEditor] = useState(false);

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

  const parsedDescription: { type: string; content: any[] } = useMemo(() => {
    let result = { type: 'doc', content: [] };

    if (!debouncedValues?.description) return result;

    try {
      result = JSON.parse(debouncedValues.description);
    } catch (error) {
      console.log(error);
    }
    return result;
  }, [debouncedValues]);

  const selectPrewrittenPhrase = (phrase: string) => {
    setRefreshEditor(true);
    const paragraph = {
      type: 'text',
      text: phrase.replaceAll(`\n`, ''),
    };
    parsedDescription.content.push(paragraph);
    setDescription(JSON.stringify(parsedDescription));
    setTimeout(() => {
      setRefreshEditor(false);
    }, 500);
  };

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
    <Collapsible
      open={openEditor}
      onOpenChange={(value) => setOpenEditor(value)}
      className="group relative border-2 border-white rounded-md cursor-pointer px-5 py-2"
    >
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
            <label className="text-sm">Start & End Date</label>
            <div className="flex items-center gap-3 w-full">
              <DatePicker
                setValue={setStartDate}
                triggerElement={
                  <input
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder={'MM/YYYY'}
                    className="px-3 py-2.5 outline-none bg-appSecondary text-appMainTextColor rounded-md text-lg font-medium w-full text-center"
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
                    className="px-3 py-2.5 outline-none bg-appSecondary text-appMainTextColor rounded-md text-lg font-medium w-full text-center"
                  />
                }
              />
            </div>
          </div>

          <FieldControl value={city} setValue={setCity} label="City" />
        </div>

        <div className="mt-5 mb-2">
          <label className="text-sm">Description</label>
          <Editor
            isRefresh={refreshEditor}
            value={description}
            setValue={setDescription}
          />
        </div>
      </CollapsibleContent>
      <button
        onClick={deleteEmployementHistoryOnClick}
        className="hidden group-hover:flex absolute top-5 right-[-40px] px-2 py-1 justify-end hover:opacity-80 text-danger"
      >
        <Trash />
      </button>
      {openEditor && (
        <EmploymentHistoryPhrasesPopup
          jobTitle={debouncedValues.jobTitle}
          wrapperClass="absolute top-64  right-0 z-50 mt-1.5 mr-4 "
          triggerElement={
            <button className="flex items-center gap-2 text-appMainTextColor hover:text-appSecondaryTextColor">
              <span className="text-base">Pre-written phase</span>
              <Plus size={18} />
            </button>
          }
          selectPrewrittenPhrase={selectPrewrittenPhrase}
        />
      )}
    </Collapsible>
  );
};

export default EmploymentCard;
