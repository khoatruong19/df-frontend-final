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
