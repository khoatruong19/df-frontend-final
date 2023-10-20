export type ResumeTemplate = {
  name: string;
  coverImage: string;
};

export type ResumePersonalDetails = {
  title: string;
  jobTitle?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  country?: string;
  city?: string;
  address?: string;
  dateOfBirth?: string;
  profileImage?: {
    id: string;
    url: string;
  };
};

export type EmploymentHistory = {
  id: string;
  jobTitle?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
  city?: string;
  description?: string;
};

export type Education = {
  id: string;
  school?: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
  city?: string;
  description?: string;
};

export type SocialLink = {
  id: string;
  platform?: string;
  link?: string;
};

export type Skill = {
  id: string;
  skill?: string;
  level: string;
};

export type CustomSectionItem = {
  id: string;
  content?: string;
  city?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
};

export type ProfileImage = {
  id: string;
  url: string;
};

export type Hobbies = {
  title: string;
  content?: string;
};

export type Course = {
  id: string;
  course?: string;
  institution?: string;
  startDate?: string;
  endDate?: string;
};
