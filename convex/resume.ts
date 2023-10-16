import { action, internalMutation, mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { v4 as uuid } from 'uuid';
import { SKILL_LEVELS } from '../src/utils/constants';
import { api, internal } from './_generated/api';

export const create = mutation({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const document = await ctx.db.insert('resume', {
      userId,
      title: 'Untitled',
      personalDetails: {},
      education: [],
      employmentHistory: [],
      socialLinks: [],
      skills: [],
    });

    return document;
  },
});

export const getById = query({
  args: {
    id: v.id('resume'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error('Not found');
    }

    if (existingDocument.userId !== userId) {
      throw new Error('Unauthorized');
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
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const { id, ...rest } = args;

    const document = await ctx.db.patch(id, {
      userId,
      personalDetails: rest,
    });

    return document;
  },
});

export const updateProfileSummary = mutation({
  args: {
    id: v.id('resume'),
    profileSummary: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const { id, profileSummary: value } = args;

    const document = await ctx.db.patch(id, {
      userId,
      profileSummary: value === '' ? undefined : value,
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
    console.log({ resumeId, url });
    await ctx.db.patch(resumeId, {
      coverImage: {
        id: storageId,
        url,
      },
    });
  },
});
