import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

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

export const updateTitle = mutation({
  args: {
    id: v.id('resume'),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
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
    employmentId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const { id, employmentId } = args;

    const document = await ctx.db.get(id);

    const employmentHistory = document?.employmentHistory ?? [];

    employmentHistory.push({ id: employmentId });

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
