import { GraduationCap, Settings2, Trophy } from 'lucide-react';

export const APP_ROUTES = {
  HOME: {
    path: '/',
    isPublic: true,
  },
  RESUME_TEMPLATES: {
    path: '/resume-templates',
    isPublic: true,
  },
  EDIT_TEMPLATE: {
    path: '/edit-resume/',
    isPublic: false,
  },
  MY_RESUMES: {
    path: '/resumes',
    isPublic: false,
  },
  RESUME_PREVIEW: {
    path: '/resume-preview/',
    isPublic: false,
  },
};

export const SKILL_LEVELS = [
  {
    name: 'novice',
    color: '#E95793',
    progress: '20%',
  },
  {
    name: 'beginner',
    color: '#DE8F5F',
    progress: '40%',
  },
  {
    name: 'skillful',
    color: '#CD5C08',
    progress: '60%',
  },
  {
    name: 'experienced',
    color: '#186F65',
    progress: '80%',
  },
  {
    name: 'expert',
    color: '#713ABE',
    progress: '100%',
  },
];

export const ADD_SECTIONS = [
  {
    name: 'Custom Section',
    icon: Settings2,
    dataField: 'customSection',
  },
  {
    name: 'Courses',
    icon: GraduationCap,
    dataField: 'courses',
  },
  {
    name: 'Hobbies',
    icon: Trophy,
    dataField: 'hobbies',
  },
];

export const DEFAULT_SKILLS = ['Time management', 'Team work', 'NodeJS'];
