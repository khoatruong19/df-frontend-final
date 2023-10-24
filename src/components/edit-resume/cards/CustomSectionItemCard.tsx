import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useDebounce } from '@/hooks/useDebounce';
import { CustomSectionItem } from '@/utils/types';
import { useMutation } from 'convex/react';
import { ChevronDown, Trash } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Id } from '../../../../convex/_generated/dataModel';
import { api } from '../../../../convex/_generated/api';
import FieldControl from '../form/FieldControl';
import { DatePicker } from '../form/DatePicker';
import Editor from '../editor/Editor';

type CustomSectionCardProps = {
  customSectionId: Id<'customSection'>;
  item: CustomSectionItem;
};

const CustomSectionCard = ({
  customSectionId,
  item,
}: CustomSectionCardProps) => {
  const [content, setContent] = useState(item.content ?? '');
  const [city, setCity] = useState(item.city ?? '');
  const [description, setDescription] = useState(item.description ?? '');
  const [startDate, setStartDate] = useState(item.startDate ?? '');
  const [endDate, setEndDate] = useState(item.endDate ?? '');

  const hasBasicInfo =
    item.content || item.city || item.startDate || item.endDate;

  const memoDetails = useMemo(
    () => ({
      content,
      city,
      description,
      startDate,
      endDate,
    }),
    [content, city, description, startDate, endDate]
  );

  const debouncedValues = useDebounce<Omit<CustomSectionItem, 'id'>>(
    memoDetails,
    1000
  );

  const updateSectionItem = useMutation(api.customSection.updateSectionItem);

  const deleteSectionItem = useMutation(api.customSection.deleteSectionItem);

  const deleteSectionItemOnClick = () =>
    deleteSectionItem({ customSectionId, id: item.id });

  useEffect(() => {
    const cleanedValues: CustomSectionItem = { id: item.id };

    Object.entries(debouncedValues).forEach(([key, value]) => {
      if (value.length > 0) {
        cleanedValues[key as keyof CustomSectionItem] = value;
      }
    });
    updateSectionItem({ customSectionId, ...cleanedValues });
  }, [debouncedValues]);

  return (
    <Collapsible className="group relative border-2 border-white rounded-md cursor-pointer px-5 py-2">
      <CollapsibleTrigger asChild>
        <div className=" relative text-base min-h-[56px] flex items-center justify-between hover:opacity-60">
          {!hasBasicInfo && <p>&#40;Not specified&#41;</p>}
          {hasBasicInfo && (
            <div>
              <h3>
                {content} - {city}
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
            value={content}
            setValue={setContent}
            label="Aсtivity name, job title, book title etc."
          />

          <FieldControl value={city} setValue={setCity} label="City" />

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
                    className="px-3 py-2.5 outline-none bg-appSecondary text-appMainTextColor text-lg font-medium w-full text-center"
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
                    className="px-3 py-2.5 outline-none bg-appSecondary text-appMainTextColor text-lg font-medium w-full text-center"
                  />
                }
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <label className="text-sm">Description</label>
          <Editor value={description} setValue={setDescription} />
        </div>
      </CollapsibleContent>
      <button
        onClick={deleteSectionItemOnClick}
        className="hidden group-hover:flex absolute top-5 right-[-40px] px-2 py-1 justify-end hover:opacity-80 text-danger"
      >
        <Trash />
      </button>
    </Collapsible>
  );
};

export default CustomSectionCard;
