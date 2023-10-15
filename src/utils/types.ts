export type ResumeTemplate = {
  name: string;
  coverImage: string;
};

export type ResumePersonalDetails = {
  jobTitle?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  country?: string;
  city?: string;
  address?: string;
  dateOfBirth?: string;
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
