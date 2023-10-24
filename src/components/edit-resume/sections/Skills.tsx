import React, { useCallback, useEffect, useState } from 'react';
import SkillBadge from '../badges/SkillBadge';
import { Skill } from '@/utils/types';
import SkillCard from '../cards/SkillCard';
import { Id } from '../../../../convex/_generated/dataModel';
import { useAction, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { PlusIcon } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import SectionTitleInput from '../form/SectionTitleInput';
import { DEFAULT_SKILLS } from '@/utils/constants';

type SkillsProps = {
  resumeId: Id<'resume'>;
  skillsTitle: string;
  skills: Skill[];
  jobTitle?: string;
};

const Skills = ({
  resumeId,
  skillsTitle,
  skills,
  jobTitle = '',
}: SkillsProps) => {
  const [title, setTitle] = useState(skillsTitle);
  const [suggestionSkills, setSuggestionSkills] = useState(DEFAULT_SKILLS);

  const debouncedTitle = useDebounce(title, 500);

  const updateSkillsTitle = useMutation(api.resume.updateSkillsTitle);
  const addSkill = useMutation(api.resume.addSkill);
  const getSkillsSuggestion = useAction(api.chat.findSkills);

  const addMoreSkill = () => {
    addSkill({ id: resumeId });
  };

  const addSkillWithBadge = (name: string) => {
    addSkill({ id: resumeId, name });
    const leftSkills = [...suggestionSkills].filter((skill) => skill !== name);
    setSuggestionSkills(leftSkills);
  };

  const updateSkillSuggesttion = useCallback(async () => {
    if (!!!jobTitle) return;
    const skills = await getSkillsSuggestion({ keyword: jobTitle });
    setSuggestionSkills(skills);
  }, [jobTitle]);

  useEffect(() => {
    updateSkillsTitle({
      id: resumeId,
      skillsTitle: title,
    });
  }, [debouncedTitle]);

  useEffect(() => {
    if (title !== skillsTitle) setTitle(skillsTitle);
  }, [skillsTitle]);

  useEffect(() => {
    if (!!!jobTitle) return;
    updateSkillSuggesttion();
  }, [jobTitle]);

  return (
    <section>
      <div className="mb-5">
        <SectionTitleInput value={title} setValue={setTitle} />
        <p className="text-sm text-appSecondaryTextColor font-semibold">
          Show the employer what skills you have!
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap mb-5">
        {suggestionSkills.map((skill) => (
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
          className="py-2 px-5 hover:bg-white flex items-center gap-2 text-base cursor-pointer duration-100"
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
