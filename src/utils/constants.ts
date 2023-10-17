import { GraduationCap, Settings2, Trophy } from 'lucide-react';
import { ResumeTemplate } from './types';

export const APP_ROUTES = {
  HOME: {
    path: '/',
    isPublic: true,
  },
  RESUME_TEMPLATES: {
    path: '/resume-templates',
    isPublic: true,
  },
  CHOOSE_TEMPLATE: {
    path: '/create-resume/templates',
    isPublic: false,
  },
  EDIT_TEMPLATE: {
    path: '/edit-resume/',
    isPublic: false,
  },
  MY_RESUMES: {
    path: '/resumes',
    isPublic: false,
  },
};

export const RESUME_TEMPLATES: ResumeTemplate[] = [
  {
    name: 'Stockholm',
    coverImage:
      'https://s3.resume.io/cdn-cgi/image/format=auto,fit=scale-down,dpr=1.5,width=154/uploads/local_template_image/image/370/persistent-resource/stockholm-resume-templates.jpg',
  },
  {
    name: 'Stockholm',
    coverImage:
      'https://s3.resume.io/cdn-cgi/image/format=auto,fit=scale-down,dpr=1.5,width=154/uploads/local_template_image/image/370/persistent-resource/stockholm-resume-templates.jpg',
  },
  {
    name: 'Stockholm',
    coverImage:
      'https://s3.resume.io/cdn-cgi/image/format=auto,fit=scale-down,dpr=1.5,width=154/uploads/local_template_image/image/370/persistent-resource/stockholm-resume-templates.jpg',
  },
];

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
