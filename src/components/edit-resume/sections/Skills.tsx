import React, { useEffect, useState } from 'react';
import SkillBadge from '../SkillBadge';
import { Skill } from '@/utils/types';
import SkillCard from '../cards/SkillCard';
import { Id } from '../../../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { PlusIcon } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import SectionTitleInput from '../SectionTitleInput';

type SkillsProps = {
  resumeId: Id<'resume'>;
  skillsTitle: string;
  skills: Skill[];
};

const Skills = ({ resumeId, skillsTitle, skills }: SkillsProps) => {
  const [title, setTitle] = useState(skillsTitle);

  const debouncedTitle = useDebounce(title, 500);

  const updateSkillsTitle = useMutation(api.resume.updateSkillsTitle);
  const addSkill = useMutation(api.resume.addSkill);

  const addMoreSkill = () => {
    addSkill({ id: resumeId });
  };

  const addSkillWithBadge = (name: string) => {
    addSkill({ id: resumeId, name });
  };

  useEffect(() => {
    updateSkillsTitle({
      id: resumeId,
      skillsTitle: title,
    });
  }, [debouncedTitle]);

  useEffect(() => {
    if (title !== skillsTitle) setTitle(skillsTitle);
  }, [skillsTitle]);

  return (
    <section>
      <div className="mb-5">
        <SectionTitleInput value={title} setValue={setTitle} />
        <p className="text-sm text-gray-400">
          Show the employer what skills you have!
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap mb-5">
        {['asjdfkldf', 'jskldfhjkl', 'kdlfk;jds'].map((skill) => (
          <SkillBadge
            clickHandler={addSkillWithBadge}
            key={skill}
            content={skill}
          />
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {skills.map((skill) => (
          <SkillCard resumeId={resumeId} skill={skill} key={skill.id} />
        ))}

        <button
          onClick={addMoreSkill}
          className="py-2 px-5 hover:bg-slate-200 flex items-center gap-2 text-base cursor-pointer duration-100"
        >
          <PlusIcon size={15} />
          <span>
            {skills.length === 0 ? 'Add one skill' : 'Add one more skill'}
          </span>
        </button>
      </div>
    </section>
  );
};

export default Skills;
