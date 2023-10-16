// export const cleanEmptyStringValueProperties = <K extends PropertyKey, V>(
//   obj: Record<K, V>
// ) => {
//   const cleanedValues = {} as Record<K, V>;

import { SKILL_LEVELS } from './constants';

//   Object.entries(obj).forEach(([key, value]) => {
//     if (!!value) {
//       cleanedValues[key as K] = value as V;
//     }
//   });
// };

export const getSkillProgress = (level: string) => {
  return SKILL_LEVELS.find((item) => item.name === level)?.progress ?? '25%';
};

export const getSkillByName = (name: string) => {
  return SKILL_LEVELS.find((item) => item.name === name) ?? SKILL_LEVELS[0];
};
