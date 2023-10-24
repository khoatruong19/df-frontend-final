import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useDebounce } from '@/hooks/useDebounce';
import { Course } from '@/utils/types';
import { useMutation } from 'convex/react';
import { ChevronDown, Trash } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import { DatePicker } from '../form/DatePicker';
import FieldControl from '../form/FieldControl';

type CourseCardProps = {
  resumeId: Id<'resume'>;
  courseData: Course;
};

const CourseCard = ({ resumeId, courseData }: CourseCardProps) => {
  const [course, setCourse] = useState(courseData.course ?? '');
  const [institution, setInstitution] = useState(courseData.institution ?? '');
  const [startDate, setStartDate] = useState(courseData.startDate ?? '');
  const [endDate, setEndDate] = useState(courseData.endDate ?? '');

  const hasBasicInfo =
    courseData.course ||
    courseData.institution ||
    courseData.startDate ||
    courseData.endDate;

  const memoDetails = useMemo(
    () => ({
      course,
      institution,
      startDate,
      endDate,
    }),
    [course, institution, startDate, endDate]
  );

  const debouncedValues = useDebounce<Omit<Course, 'id'>>(memoDetails, 1000);

  const updateCourse = useMutation(api.resume.updateCourse);

  const deleteCourse = useMutation(api.resume.deleteCourse);

  const deleteCourseOnClick = () =>
    deleteCourse({ resumeId, id: courseData.id });

  useEffect(() => {
    const cleanedValues: Course = { id: courseData.id };

    Object.entries(debouncedValues).forEach(([key, value]) => {
      if (value.length > 0) {
        cleanedValues[key as keyof Course] = value;
      }
    });

    updateCourse({ resumeId, ...cleanedValues });
  }, [debouncedValues]);

  return (
    <Collapsible className="group relative border-2 border-white rounded-md cursor-pointer px-5 py-2 pb-5">
      <CollapsibleTrigger asChild>
        <div className=" relative text-base min-h-[56px] flex items-center justify-between hover:opacity-60">
          {!hasBasicInfo && <p>&#40;Not specified&#41;</p>}
          {hasBasicInfo && (
            <div>
              <h3>
                {course} - {institution}
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
          <FieldControl value={course} setValue={setCourse} label="Course" />

          <FieldControl
            value={institution}
            setValue={setInstitution}
            label="Institution"
          />

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
        </div>
      </CollapsibleContent>
      <button
        onClick={deleteCourseOnClick}
        className="hidden group-hover:flex absolute top-5 right-[-40px] px-2 py-1 justify-end hover:opacity-80 text-danger"
      >
        <Trash />
      </button>
    </Collapsible>
  );
};

export default CourseCard;
