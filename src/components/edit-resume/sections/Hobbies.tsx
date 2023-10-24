import { useDebounce } from '@/hooks/useDebounce';
import { Hobbies } from '@/utils/types';
import { useMutation } from 'convex/react';
import { useEffect, useMemo, useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import SectionTitleInput from '../form/SectionTitleInput';
import { Trash } from 'lucide-react';

type HobbiesProps = {
  resumeId: Id<'resume'>;
  hobbies: Hobbies;
};

const Hobbies = ({ hobbies, resumeId }: HobbiesProps) => {
  const [title, setTitle] = useState(hobbies.title);
  const [content, setContent] = useState(hobbies?.content ?? '');

  const memoHobbies = useMemo(() => ({ title, content }), [title, content]);

  const debouncedValues = useDebounce(memoHobbies, 500);
  const updateHobbiesSection = useMutation(api.resume.updateHobbiesSection);
  const deleteHobbiesSection = useMutation(api.resume.deleteHobbiesSection);

  const deleteHobbiesSectionOnClick = () => deleteHobbiesSection({ resumeId });

  useEffect(() => {
    updateHobbiesSection({ resumeId, title, content });
  }, [debouncedValues]);

  useEffect(() => {
    if (title !== hobbies.title) setTitle(hobbies.title);
  }, [hobbies]);

  return (
    <section className="group relative">
      <div className="mb-3">
        <SectionTitleInput value={title} setValue={setTitle} />
        <p className="text-sm text-appSecondaryTextColor font-semibold">
          What do you like?
        </p>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        className="text-base w-full p-2 bg-appSecondary/70 text-appMainTextColor rounded-md min-h-[200px] outline-none"
        placeholder="e.g. Skiing, Skydiving, Painting"
      ></textarea>

      <button
        onClick={deleteHobbiesSectionOnClick}
        className="absolute right-0 top-0 hover:opacity-50 hidden group-hover:block"
      >
        <Trash color="red" />
      </button>
    </section>
  );
};

export default Hobbies;
