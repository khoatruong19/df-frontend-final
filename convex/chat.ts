import OpenAI from 'openai';
import { action } from './_generated/server';
import { v } from 'convex/values';

const openai = new OpenAI();

export const findProfessionalSummaries = action({
  args: {
    keyword: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated!');
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Give me some at most five detailed professional summaries which looks like this "Dedicated Customer Service Representative dedicated to providing quality care for ultimate customer
          satisfaction. Proven ability to establish and maintain excellent communication and relationships with clients
          . Adept in general accounting and finance transactions. Dedicated to identifying customer needs and delivering
           effective solutions to all problems. Excellent time management skills combined with a superior knowledge of the customer service industry.
          Bilingual, hardworking, and ready to join my next team" in one array about '${args.keyword}' in a json format like this:
          {
            summaries: string[]
          }
      `,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    const response = completion.choices[0].message.content ?? '';

    let summaries: string[] = [];
    try {
      summaries = JSON.parse(response).summaries;
    } catch (error) {
      throw new Error('Fail to parse response from OpenAI');
    }

    return summaries;
  },
});

export const findEmploymentHistories = action({
  args: {
    keyword: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated!');
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Give me some at most five detailed employments summaries which looks like this "Learned and followed 
          all store policies and procedures, resulting in fewer mistakes and improved customer service" in one array about 
          '${args.keyword}' in a json format like this:
          {
            employmentHistories: string[]
          }
      `,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    const response = completion.choices[0].message.content ?? '';

    let employmentHistories: string[] = [];
    try {
      employmentHistories = JSON.parse(response).employmentHistories;
    } catch (error) {
      throw new Error('Fail to parse response from OpenAI');
    }

    return employmentHistories;
  },
});

export const findSkills = action({
  args: {
    keyword: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated!');
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Give me some at most some general skills in one array at most 10 items relevant to the field including  
        '${args.keyword}' in a json format like this:
        {
          skills: string[]
        }
    `,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    const response = completion.choices[0].message.content ?? '';

    let skills: string[] = [];
    try {
      skills = JSON.parse(response).skills;
    } catch (error) {
      throw new Error('Fail to parse response from OpenAI');
    }

    return skills;
  },
});
