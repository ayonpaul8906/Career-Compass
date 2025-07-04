'use server';

/**
 * @fileOverview A project idea generator AI agent.
 *
 * - generateProjectIdeas - A function that handles the project idea generation process.
 * - GenerateProjectIdeasInput - The input type for the generateProjectIdeas function.
 * - GenerateProjectIdeasOutput - The return type for the generateProjectIdeas function.
 */

import {ai} from '../genkit';
import {z} from 'zod';

const GenerateProjectIdeasInputSchema = z.object({
  interests: z
    .string()
    .describe("A comma separated list of the user's interests."),
  skills: z.string().describe("A comma separated list of the user's skills."),
});
export type GenerateProjectIdeasInput = z.infer<typeof GenerateProjectIdeasInputSchema>;

const GenerateProjectIdeasOutputSchema = z.object({
  projectIdeas: z.array(z.string()).describe('An array of project ideas.'),
});
export type GenerateProjectIdeasOutput = z.infer<typeof GenerateProjectIdeasOutputSchema>;

export async function generateProjectIdeas(input: GenerateProjectIdeasInput): Promise<GenerateProjectIdeasOutput> {
  return generateProjectIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectIdeasPrompt',
  input: {schema: GenerateProjectIdeasInputSchema},
  output: {schema: GenerateProjectIdeasOutputSchema},
  prompt: `You are a career mentor who specializes in suggesting project ideas to students based on their interests and skills.

  Given the following interests and skills, suggest 3 project ideas that the user could build to showcase their abilities.

  Interests: {{{interests}}}
  Skills: {{{skills}}}

  Format the response as a JSON array of strings.`,
});

const generateProjectIdeasFlow = ai.defineFlow(
  {
    name: 'generateProjectIdeasFlow',
    inputSchema: GenerateProjectIdeasInputSchema,
    outputSchema: GenerateProjectIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
