import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { useDebounce } from '@/hooks/useDebounce';
import { SKILL_LEVELS } from '@/utils/constants';
import { getSkillByName } from '@/utils/helpers';
import { Skill } from '@/utils/types';
import { useMutation } from 'convex/react';
import { ChevronDown, Trash } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import FieldControl from '../form/FieldControl';

type SkillCardProps = {
  resumeId: Id<'resume'>;
  skill: Skill;
};

const SkillCard = ({ resumeId, skill }: SkillCardProps) => {
  const [name, setName] = useState(skill.skill ?? '');
  const [level, setLevel] = useState<(typeof SKILL_LEVELS)[number]>(() => {
    return (
      SKILL_LEVELS.find((item) => item.name === skill.level) ?? SKILL_LEVELS[0]
    );
  });

  const memoSkill = useMemo(
    () => ({
      name,
      level,
    }),
    [name, level]
  );

  const debouncedValues = useDebounce(memoSkill, 1000);

  const onChangeSkillLevel = (value: string) => setLevel(getSkillByName(value));

  const updateSkill = useMutation(api.resume.updateSkill);

  const deleteSkill = useMutation(api.resume.deleteSkill);

  const deleteSkillOnClick = () => deleteSkill({ resumeId, id: skill.id });

  useEffect(() => {
    updateSkill({ resumeId, id: skill.id, name, level: level.name });
  }, [debouncedValues]);

  const hasInformation = skill.level || skill.level;

  return (
    <Collapsible className="group relative border-2 border-white rounded-md cursor-pointer px-5 py-2">
      <CollapsibleTrigger asChild>
        <div className=" relative text-base min-h-[56px] flex items-center justify-between hover:opacity-60">
          {!hasInformation && <p>&#40;Not specified&#41;</p>}
          {hasInformation && (
            <div>
              <h3>{name}</h3>
              <p className="text-sm text-appSecondaryTextColor font-semibold capitalize">
                {level.name}
              </p>
            </div>
          )}
          <ChevronDown />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex items-end gap-x-10 mt-3">
          <FieldControl value={name} setValue={setName} label="Skill" />
          <Select onValueChange={onChangeSkillLevel}>
            <SelectTrigger className="h-12 px-3 capitalize text-center border-4 border-appSecondary">
              {level.name}
            </SelectTrigger>
            <SelectContent>
              {SKILL_LEVELS.map((skill) => (
                <SelectItem
                  key={skill.name}
                  value={skill.name}
                  className="capitalize"
                >
                  {skill.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CollapsibleContent>
      <button
        onClick={deleteSkillOnClick}
        className="hidden group-hover:flex absolute top-5 right-[-40px] px-2 py-1 justify-end hover:opacity-80 text-danger"
      >
        <Trash />
      </button>
    </Collapsible>
  );
};

export default SkillCard;
