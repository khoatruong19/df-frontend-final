import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { v4 as uuid } from 'uuid';

export const create = mutation({
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

    await ctx.db.insert('customSection', {
      userId: identity.subject,
      resumeId,
      title: 'Untitled',
      items: [],
    });

    return document;
  },
});

export const getAll = query({
  args: {
    resumeId: v.id('resume'),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const { resumeId, userId } = args;

    const customSections = await ctx.db
      .query('customSection')
      .filter((q) => q.eq(q.field('userId'), userId))
      .filter((q) => q.eq(q.field('resumeId'), resumeId))
      .collect();
    return customSections;
  },
});

export const updateTitle = mutation({
  args: {
    id: v.id('customSection'),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const { id, title } = args;

    const document = await ctx.db.get(id);

    if (!document) {
      throw new Error('Section not found!');
    }

    if (document.userId !== identity.subject) {
      throw new Error('Not authorized!');
    }

    await ctx.db.patch(id, {
      title: title === '' ? 'Untitled' : title,
    });

    return document;
  },
});

export const deleteOne = mutation({
  args: {
    id: v.id('customSection'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const { id } = args;

    const document = await ctx.db.get(id);

    if (!document) {
      throw new Error('Section not found!');
    }

    if (document.userId !== identity.subject) {
      throw new Error('Not authorized!');
    }

    await ctx.db.delete(id);

    return document;
  },
});

export const addSectionItem = mutation({
  args: {
    customSectionId: v.id('customSection'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const { customSectionId } = args;

    const document = await ctx.db.get(customSectionId);

    if (!document) {
      throw new Error('Section not found!');
    }

    if (document.userId !== identity.subject) {
      throw new Error('Not authorized!');
    }

    const items = document?.items ?? [];

    items.push({ id: uuid() });

    await ctx.db.patch(customSectionId, { items });

    return document;
  },
});

export const updateSectionItem = mutation({
  args: {
    customSectionId: v.id('customSection'),
    id: v.string(),
    content: v.optional(v.string()),
    city: v.optional(v.string()),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const { customSectionId, id, ...rest } = args;

    const document = await ctx.db.get(customSectionId);

    if (!document) {
      throw new Error('Section not found!');
    }

    if (document.userId !== identity.subject) {
      throw new Error('Not authorized!');
    }

    let items = document?.items ?? [];

    items = items.map((item) => {
      if (item.id === id)
        return {
          ...item,
          ...rest,
        };
      return item;
    });

    await ctx.db.patch(customSectionId, { items });

    return document;
  },
});

export const deleteSectionItem = mutation({
  args: {
    customSectionId: v.id('customSection'),
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const { customSectionId, id } = args;

    const document = await ctx.db.get(customSectionId);

    if (!document) {
      throw new Error('Section not found!');
    }

    if (document.userId !== identity.subject) {
      throw new Error('Not authorized!');
    }

    let items = document?.items ?? [];

    items = items.filter((item) => item.id !== id);

    await ctx.db.patch(customSectionId, { items });

    return document;
  },
});
