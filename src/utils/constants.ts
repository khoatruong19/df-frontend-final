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
