// 'use server';
/**
 * @fileOverview AI agent that summarizes workshop details from a URL or document.
 *
 * - summarizeWorkshop - A function that handles the workshop summarization process.
 * - SummarizeWorkshopInput - The input type for the summarizeWorkshop function.
 * - SummarizeWorkshopOutput - The return type for the summarizeWorkshop function.
 */

'use server';

import {ai} from '../genkit';
import {z} from 'zod';

const SummarizeWorkshopInputSchema = z.object({
  source: z.string().describe('URL or text content describing the workshop.'),
});
export type SummarizeWorkshopInput = z.infer<typeof SummarizeWorkshopInputSchema>;

const SummarizeWorkshopOutputSchema = z.object({
  summary: z.string().describe('A summary of the key details and benefits of the workshop.'),
});
export type SummarizeWorkshopOutput = z.infer<typeof SummarizeWorkshopOutputSchema>;

export async function summarizeWorkshop(input: SummarizeWorkshopInput): Promise<SummarizeWorkshopOutput> {
  return summarizeWorkshopFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeWorkshopPrompt',
  input: {schema: SummarizeWorkshopInputSchema},
  output: {schema: SummarizeWorkshopOutputSchema},
  prompt: `You are an AI assistant that summarizes workshop details to help users decide if they want to attend.

  Summarize the key details and benefits of the workshop from the following source:

  {{source}}`,
});

const summarizeWorkshopFlow = ai.defineFlow(
  {
    name: 'summarizeWorkshopFlow',
    inputSchema: SummarizeWorkshopInputSchema,
    outputSchema: SummarizeWorkshopOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
