import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  resume: defineTable({
    title: v.string(),
    profileImage: v.optional(v.string()),
    coverImage: v.optional(
      v.object({
        id: v.string(),
        url: v.string(),
      })
    ),
    userId: v.string(),
    personalDetails: v.object({
      jobTitle: v.optional(v.string()),
      firstName: v.optional(v.string()),
      lastName: v.optional(v.string()),
      phone: v.optional(v.string()),
      email: v.optional(v.string()),
      country: v.optional(v.string()),
      city: v.optional(v.string()),
      address: v.optional(v.string()),
      dateOfBirth: v.optional(v.string()),
    }),
    profileSummary: v.optional(v.string()),
    employmentHistory: v.array(
      v.object({
        id: v.string(),
        jobTitle: v.optional(v.string()),
        company: v.optional(v.string()),
        startDate: v.optional(v.string()),
        endDate: v.optional(v.string()),
        city: v.optional(v.string()),
        description: v.optional(v.string()),
      })
    ),
    education: v.array(
      v.object({
        id: v.string(),
        school: v.optional(v.string()),
        degree: v.optional(v.string()),
        startDate: v.optional(v.string()),
        endDate: v.optional(v.string()),
        city: v.optional(v.string()),
        description: v.optional(v.string()),
      })
    ),
    socialLinks: v.array(
      v.object({
        id: v.string(),
        platform: v.optional(v.string()),
        link: v.optional(v.string()),
      })
    ),
    skills: v.array(
      v.object({
        id: v.string(),
        skill: v.optional(v.string()),
        level: v.string(),
      })
    ),
  }),
  customSection: defineTable({
    userId: v.string(),
    resumeId: v.id('resume'),
    title: v.string(),
    items: v.array(
      v.object({
        id: v.string(),
        content: v.optional(v.string()),
        city: v.optional(v.string()),
        startDate: v.optional(v.string()),
        endDate: v.optional(v.string()),
        description: v.optional(v.string()),
      })
    ),
  }),
});
