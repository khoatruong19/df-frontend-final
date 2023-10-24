import { useDebounce } from '@/hooks/useDebounce';
import { Course } from '@/utils/types';
import { useMutation } from 'convex/react';
import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import SectionTitleInput from '../form/SectionTitleInput';
import CourseCard from '../cards/CourseCard';

type CoursesProps = {
  resumeId: Id<'resume'>;
  coursesTitle: string;
  courses: Course[];
};

const Courses = ({ coursesTitle, courses, resumeId }: CoursesProps) => {
  const [title, setTitle] = useState(coursesTitle);

  const debouncedTitle = useDebounce(title, 500);

  const updateCoursesTitle = useMutation(api.resume.updateCoursesTitle);
  const addCourse = useMutation(api.resume.addCourse);

  const addMoreCourse = () => {
    addCourse({ resumeId });
  };

  useEffect(() => {
    updateCoursesTitle({ id: resumeId, coursesTitle: title });
  }, [debouncedTitle]);

  useEffect(() => {
    if (title !== coursesTitle) setTitle(coursesTitle);
  }, [coursesTitle]);

  return (
    <section>
      <div className="mb-3">
        <SectionTitleInput value={title} setValue={setTitle} />
        <p className="text-sm text-appSecondaryTextColor font-semibold">
          What courses have you taken?
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {courses.map((course) => (
          <CourseCard resumeId={resumeId} courseData={course} key={course.id} />
        ))}

        <button
          onClick={addMoreCourse}
          className="py-2 px-5 hover:bg-white flex items-center gap-2 text-base cursor-pointer duration-100"
        >
          <PlusIcon size={15} />
          <span>
            {courses.length === 0 ? 'Add one course' : 'Add one more course'}
          </span>
        </button>
      </div>
    </section>
  );
};

export default Courses;
