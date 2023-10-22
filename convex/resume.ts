import { action, internalMutation, mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { v4 as uuid } from 'uuid';
import { SKILL_LEVELS } from '../src/utils/constants';
import { api, internal } from './_generated/api';
import { DEFAULT_RESUME_SECTION_TITLES } from './constants';

export const create = mutation({
  args: {
    template: v.string(),
  },
  handler: async (ctx, { template }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const document = await ctx.db.insert('resume', {
      userId,
      title: 'Untitled',
      template,
      personalDetails: {
        title: DEFAULT_RESUME_SECTION_TITLES.PROFILE_DETAILS,
      },
      profileSummaryTitle: DEFAULT_RESUME_SECTION_TITLES.PROFESSIONAL_SUMMARY,
      employmentHistoryTitle: DEFAULT_RESUME_SECTION_TITLES.EMPLOYMENT_HISTORY,
      educationTitle: DEFAULT_RESUME_SECTION_TITLES.EDUCATION,
      socialLinksTitle: DEFAULT_RESUME_SECTION_TITLES.SOCIAL_LINK,
      skillsTitle: DEFAULT_RESUME_SECTION_TITLES.SKILLS,
      education: [],
      employmentHistory: [],
      socialLinks: [],
      skills: [],
    });

    return document;
  },
});

export const deleteOne = mutation({
  args: {
    id: v.id('resume'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new Error('Resume not found');
    }

    if (document?.userId !== userId) {
      throw new Error('Not authenticated');
    }

    const exisitingCoverImage = document?.coverImage?.id;

    if (
      exisitingCoverImage &&
      (await ctx.storage.getUrl(exisitingCoverImage))
    ) {
      await ctx.storage.delete(exisitingCoverImage);
    }

    const exisitingProfileImage = document?.personalDetails.profileImage?.id;

    if (
      exisitingProfileImage &&
      (await ctx.storage.getUrl(exisitingProfileImage))
    ) {
      await ctx.storage.delete(exisitingProfileImage);
    }

    await ctx.db.delete(args.id);
  },
});

export const getById = query({
  args: {
    id: v.id('resume'),
  },
  handler: async (ctx, args) => {
    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error('Not found');
    }

    return existingDocument;
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const documents = await ctx.db
      .query('resume')
      .filter((q) => q.eq(q.field('userId'), userId))
      .collect();

    return documents;
  },
});

export const updateTitle = mutation({
  args: {
    id: v.id('resume'),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw Error('Not authenticated');
    }

    const userId = identity.subject;

    const document = await ctx.db.patch(args.id, {
      userId,
      title: args.title.length === 0 ? 'Untitled' : args.title,
    });

    return document;
  },
});

export const updateTemplate = mutation({
  args: {
    id: v.id('resume'),
    template: v.string(),
  },
  handler: async (ctx, { id, template }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw Error('Not authenticated');
    }

    const userId = identity.subject;

    const document = await ctx.db.patch(id, {
      userId,
      template,
    });

    return document;
  },
});

export const updateProfileDetail = mutation({
  args: {
    id: v.id('resume'),
    jobTitle: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    country: v.optional(v.string()),
    city: v.optional(v.string()),
    address: v.optional(v.string()),
    dateOfBirth: v.optional(v.string()),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const { id, ...rest } = args;

    const document = await ctx.db.get(id);

    if (!document) {
      throw Error('Resume not found!');
    }

    const userId = identity.subject;

    await ctx.db.patch(id, {
      userId,
      personalDetails: {
        ...document.personalDetails,
        ...rest,
        title:
          rest.title === ''
            ? DEFAULT_RESUME_SECTION_TITLES.PROFILE_DETAILS
            : rest.title,
      },
    });

    return document;
  },
});

export const updateProfileSummaryTitle = mutation({
  args: {
    id: v.id('resume'),
    profileSummaryTitle: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const { id, profileSummaryTitle } = args;

    const document = await ctx.db.patch(id, {
      userId,
      profileSummaryTitle,
    });

    return document;
  },
});

export const updateProfileSummary = mutation({
  args: {
    id: v.id('resume'),
    profileSummary: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const { id, profileSummary } = args;

    const document = await ctx.db.patch(id, {
      userId,
      profileSummary,
    });

    return document;
  },
});

export const updateEmploymentHistoryTitle = mutation({
  args: {
    id: v.id('resume'),
    employmentHistoryTitle: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const { id, employmentHistoryTitle } = args;

    const document = await ctx.db.patch(id, {
      userId,
      employmentHistoryTitle,
    });

    return document;
  },
});

export const addEmploymentHistory = mutation({
  args: {
    id: v.id('resume'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const { id } = args;

    const document = await ctx.db.get(id);

    if (!document) {
      throw new Error('Resume not found!');
    }

    const employmentHistory = document?.employmentHistory ?? [];

    employmentHistory.push({ id: uuid() });

    await ctx.db.patch(id, { employmentHistory });

    return document;
  },
});

export const updateEmploymentHistory = mutation({
  args: {
    resumeId: v.id('resume'),
    id: v.string(),
    jobTitle: v.optional(v.string()),
    company: v.optional(v.string()),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
    city: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const { resumeId, id, ...rest } = args;

    const document = await ctx.db.get(resumeId);

    if (!document) {
      throw new Error('Not found resume');
    }

    let employmentHistory = document?.employmentHistory ?? [];

    employmentHistory = employmentHistory.map((employment) => {
      if (employment.id === id) {
        return {
          id: employment.id,
          ...rest,
        };
      }
      return employment;
    });

    await ctx.db.patch(resumeId, { employmentHistory });

    return document;
  },
});

export const deleteEmploymentHistory = mutation({
  args: {
    resumeId: v.id('resume'),
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const { resumeId, id } = args;

    const document = await ctx.db.get(resumeId);

    if (!document) {
      throw new Error('Not found resume');
    }

    let employmentHistory = document?.employmentHistory ?? [];

    employmentHistory = employmentHistory.filter(
      (employment) => employment.id !== id
    );

    await ctx.db.patch(resumeId, { employmentHistory });

    return document;
  },
});

export const updateEducationTitle = mutation({
  args: {
    id: v.id('resume'),
    educationTitle: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const { id, educationTitle } = args;

    const document = await ctx.db.patch(id, {
      userId,
      educationTitle,
    });

    return document;
  },
});

export const addEducation = mutation({
  args: {
    id: v.id('resume'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const { id } = args;

    const document = await ctx.db.get(id);

    if (!document) {
      throw new Error('Resume not found!');
    }

    const education = document?.education ?? [];

    education.push({ id: uuid() });

    await ctx.db.patch(id, { education });

    return document;
  },
});

export const updateEducation = mutation({
  args: {
    resumeId: v.id('resume'),
    id: v.string(),
    school: v.optional(v.string()),
    degree: v.optional(v.string()),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
    city: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const { resumeId, id, ...rest } = args;

    const document = await ctx.db.get(resumeId);

    if (!document) {
      throw new Error('Resume not found');
    }

    let educations = document?.education ?? [];

    educations = educations.map((education) => {
      if (education.id === id) {
        return {
          id: education.id,
          ...rest,
        };
      }
      return education;
    });

    await ctx.db.patch(resumeId, { education: educations });

    return document;
  },
});

export const deleteEducation = mutation({
  args: {
    resumeId: v.id('resume'),
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const { resumeId, id } = args;

    const document = await ctx.db.get(resumeId);

    if (!document) {
      throw new Error('Not found resume');
    }

    let educations = document?.education ?? [];

    educations = educations.filter((education) => education.id !== id);

    await ctx.db.patch(resumeId, { education: educations });

    return document;
  },
});

export const updateSocialLinksTitle = mutation({
  args: {
    id: v.id('resume'),
    socialLinksTitle: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const { id, socialLinksTitle } = args;

    const document = await ctx.db.patch(id, {
      userId,

      socialLinksTitle,
    });

    return document;
  },
});

export const addSocialLink = mutation({
  args: {
    id: v.id('resume'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const { id } = args;

    const document = await ctx.db.get(id);

    if (!document) {
      throw new Error('Resume not found!');
    }

    const socialLinks = document?.socialLinks ?? [];

    socialLinks.push({ id: uuid() });

    await ctx.db.patch(id, { socialLinks });

    return document;
  },
});

export const updateSocialLink = mutation({
  args: {
    resumeId: v.id('resume'),
    id: v.string(),
    platform: v.optional(v.string()),
    link: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const { resumeId, id, link: linkValue, platform } = args;

    const document = await ctx.db.get(resumeId);

    if (!document) {
      throw new Error('Resume not found');
    }

    let socialLinks = document?.socialLinks ?? [];

    socialLinks = socialLinks.map((socialLink) => {
      if (socialLink.id === id) {
        return {
          id: socialLink.id,
          platform,
          link: linkValue === '' ? undefined : linkValue,
        };
      }
      return socialLink;
    });

    await ctx.db.patch(resumeId, { socialLinks });

    return document;
  },
});

export const deleteSocialLink = mutation({
  args: {
    resumeId: v.id('resume'),
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const { resumeId, id } = args;

    const document = await ctx.db.get(resumeId);

    if (!document) {
      throw new Error('Not found resume');
    }

    let socialLinks = document?.socialLinks ?? [];

    socialLinks = socialLinks.filter((socialLink) => socialLink.id !== id);

    await ctx.db.patch(resumeId, { socialLinks });

    return document;
  },
});

export const updateSkillsTitle = mutation({
  args: {
    id: v.id('resume'),
    skillsTitle: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const { id, skillsTitle } = args;

    const document = await ctx.db.patch(id, {
      userId,

      skillsTitle,
    });

    return document;
  },
});

export const addSkill = mutation({
  args: {
    id: v.id('resume'),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const { id, name } = args;

    const document = await ctx.db.get(id);

    if (!document) {
      throw new Error('Resume not found!');
    }

    const skills = document?.skills ?? [];

    skills.push({ id: uuid(), level: SKILL_LEVELS[0].name, skill: name });

    await ctx.db.patch(id, { skills });

    return document;
  },
});

export const updateSkill = mutation({
  args: {
    resumeId: v.id('resume'),
    id: v.string(),
    name: v.optional(v.string()),
    level: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const { resumeId, id, name, level } = args;

    const document = await ctx.db.get(resumeId);

    if (!document) {
      throw new Error('Resume not found');
    }

    let skills = document?.skills ?? [];

    skills = skills.map((skill) => {
      if (skill.id === id) {
        return {
          id: skill.id,
          skill: name === '' ? undefined : name,
          level,
        };
      }
      return skill;
    });

    await ctx.db.patch(resumeId, { skills });

    return document;
  },
});

export const deleteSkill = mutation({
  args: {
    resumeId: v.id('resume'),
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const { resumeId, id } = args;

    const document = await ctx.db.get(resumeId);

    if (!document) {
      throw new Error('Not found resume');
    }

    let skills = document?.skills ?? [];

    skills = skills.filter((skill) => skill.id !== id);

    await ctx.db.patch(resumeId, { skills });

    return document;
  },
});

export const updateResumeCoverImage = action({
  args: {
    resumeId: v.id('resume'),
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const { resumeId, storageId } = args;

    const document = await ctx.runQuery(api.resume.getById, { id: resumeId });

    if (!document) {
      throw new Error('Not found resume');
    }

    const exisitingImage = document?.coverImage?.id;

    if (exisitingImage && (await ctx.storage.getUrl(exisitingImage))) {
      await ctx.storage.delete(exisitingImage);
    }

    await ctx.runMutation(internal.resume.storeCoverImage, {
      resumeId,
      storageId,
    });
  },
});

export const storeCoverImage = internalMutation({
  args: {
    resumeId: v.id('resume'),
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const { resumeId, storageId } = args;

    const url = (await ctx.storage.getUrl(storageId)) ?? '';

    await ctx.db.patch(resumeId, {
      coverImage: {
        id: storageId,
        url,
      },
    });
  },
});

export const updateResumeProfileImage = mutation({
  args: {
    resumeId: v.id('resume'),
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const { resumeId, storageId } = args;

    const document = await ctx.db.get(resumeId);

    if (!document) {
      throw new Error('Not found resume');
    }

    const exisitingImage = document?.personalDetails.profileImage?.id;

    if (exisitingImage && (await ctx.storage.getUrl(exisitingImage))) {
      await ctx.storage.delete(exisitingImage);
    }

    const url = (await ctx.storage.getUrl(storageId)) ?? '';

    await ctx.db.patch(resumeId, {
      personalDetails: {
        ...document.personalDetails,
        profileImage: {
          id: storageId,
          url,
        },
      },
    });
  },
});

export const deleteResumeProfileImage = mutation({
  args: {
    resumeId: v.id('resume'),
  },
  handler: async (ctx, args) => {
    const { resumeId } = args;

    const document = await ctx.db.get(resumeId);

    if (!document) {
      throw new Error('Not found resume');
    }

    const exisitingImage = document?.personalDetails.profileImage?.id;

    if (exisitingImage && (await ctx.storage.getUrl(exisitingImage))) {
      await ctx.storage.delete(exisitingImage);

      await ctx.db.patch(resumeId, {
        personalDetails: {
          ...document.personalDetails,
          profileImage: undefined,
        },
      });
    } else throw Error('Profile image not found!');
  },
});

export const addHobbiesSection = mutation({
  args: {
    resumeId: v.id('resume'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const { resumeId } = args;

    const document = await ctx.db.get(resumeId);

    if (!document) {
      throw new Error('Resume not found!');
    }

    if (document.userId !== identity.subject) {
      throw new Error('Not authorized!');
    }

    await ctx.db.patch(resumeId, {
      ...document,
      hobbies: {
        title: DEFAULT_RESUME_SECTION_TITLES.HOBBIES,
      },
    });

    return document;
  },
});

export const updateHobbiesSection = mutation({
  args: {
    resumeId: v.id('resume'),
    title: v.string(),
    content: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const { resumeId, title, content } = args;

    const document = await ctx.db.get(resumeId);

    if (!document) {
      throw new Error('Resume not found!');
    }

    if (document.userId !== identity.subject) {
      throw new Error('Not authorized!');
    }

    await ctx.db.patch(resumeId, {
      ...document,
      hobbies: {
        title: title === '' ? DEFAULT_RESUME_SECTION_TITLES.HOBBIES : title,
        content,
      },
    });

    return document;
  },
});

export const deleteHobbiesSection = mutation({
  args: {
    resumeId: v.id('resume'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const { resumeId } = args;

    const document = await ctx.db.get(resumeId);

    if (!document) {
      throw new Error('Resume not found!');
    }

    if (document.userId !== identity.subject) {
      throw new Error('Not authorized!');
    }

    await ctx.db.patch(resumeId, {
      ...document,
      hobbies: undefined,
    });

    return document;
  },
});

export const addCoursesSection = mutation({
  args: {
    resumeId: v.id('resume'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const { resumeId } = args;

    const document = await ctx.db.get(resumeId);

    if (!document) {
      throw new Error('Resume not found!');
    }

    if (document.userId !== identity.subject) {
      throw new Error('Not authorized!');
    }

    await ctx.db.patch(resumeId, {
      ...document,
      coursesTitle: DEFAULT_RESUME_SECTION_TITLES.COURSES,
      courses: [],
    });

    return document;
  },
});

export const updateCoursesTitle = mutation({
  args: {
    id: v.id('resume'),
    coursesTitle: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const { id, coursesTitle } = args;

    const document = await ctx.db.patch(id, {
      userId,
      coursesTitle,
    });

    return document;
  },
});

export const addCourse = mutation({
  args: {
    resumeId: v.id('resume'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const { resumeId } = args;

    const document = await ctx.db.get(resumeId);

    if (!document) {
      throw new Error('Resume not found!');
    }

    const courses = document?.courses ?? [];

    courses.push({ id: uuid() });

    await ctx.db.patch(resumeId, { courses });

    return document;
  },
});

export const updateCourse = mutation({
  args: {
    resumeId: v.id('resume'),
    id: v.string(),
    course: v.optional(v.string()),
    institution: v.optional(v.string()),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const { resumeId, id, ...rest } = args;

    const document = await ctx.db.get(resumeId);

    if (!document) {
      throw new Error('Resume not found');
    }

    let courses = document?.courses ?? [];

    courses = courses.map((course) => {
      if (course.id === id) {
        return {
          id: course.id,
          ...rest,
        };
      }
      return course;
    });

    await ctx.db.patch(resumeId, { courses });

    return document;
  },
});

export const deleteCourse = mutation({
  args: {
    resumeId: v.id('resume'),
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const { resumeId, id } = args;

    const document = await ctx.db.get(resumeId);

    if (!document) {
      throw new Error('Not found resume');
    }

    let courses = document?.courses ?? [];

    courses = courses.filter((course) => course.id !== id);

    await ctx.db.patch(resumeId, { courses });

    return document;
  },
});
