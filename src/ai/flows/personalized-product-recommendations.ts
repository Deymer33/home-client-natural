'use server';

/**
 * @fileOverview Provides personalized product recommendations based on user data.
 *
 * - getPersonalizedRecommendations - A function to retrieve personalized product recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  userId: z.string().describe('The unique identifier of the user.'),
  browsingHistory: z.array(z.string()).describe('The user\'s browsing history (list of product IDs).'),
  purchaseHistory: z.array(z.string()).describe('The user\'s purchase history (list of product IDs).'),
  statedPreferences: z.string().describe('The user\'s stated preferences or interests related to natural products.'),
});
export type PersonalizedRecommendationsInput = z.infer<typeof PersonalizedRecommendationsInputSchema>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of product IDs recommended for the user.'),
  reasoning: z.string().describe('Explanation of why the products were recommended.'),
});
export type PersonalizedRecommendationsOutput = z.infer<typeof PersonalizedRecommendationsOutputSchema>;

export async function getPersonalizedRecommendations(input: PersonalizedRecommendationsInput): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an AI assistant specializing in providing personalized product recommendations for a natural products store.

  Based on the user's data below, recommend a list of products from our store that they might be interested in.
  Explain the reasoning behind your recommendations.

  User ID: {{{userId}}}
  Browsing History: {{#if browsingHistory}}{{#each browsingHistory}}- {{{this}}}{{/each}}{{else}}None{{/if}}
  Purchase History: {{#if purchaseHistory}}{{#each purchaseHistory}}- {{{this}}}{{/each}}{{else}}None{{/if}}
  Stated Preferences: {{{statedPreferences}}}

  Output the recommendations as a list of product IDs and provide a concise reasoning for each recommendation.
  `,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
