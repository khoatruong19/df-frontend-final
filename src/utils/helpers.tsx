import { SKILL_LEVELS } from './constants';

export const getSkillProgress = (level: string) => {
  return SKILL_LEVELS.find((item) => item.name === level)?.progress ?? '25%';
};

export const getSkillByName = (name: string) => {
  return SKILL_LEVELS.find((item) => item.name === name) ?? SKILL_LEVELS[0];
};
