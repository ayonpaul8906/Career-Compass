// src/ai/flows/career-advice-chatbot.ts
'use server';

/**
 * @fileOverview An AI chatbot for providing career advice.
 *
 * - careerAdviceChatbot - A function that handles the career advice chatbot flow.
 * - CareerAdviceChatbotInput - The input type for the careerAdviceChatbot function.
 * - CareerAdviceChatbotOutput - The return type for the careerAdviceChatbot function.
 */

import {ai} from '../genkit';
import {z} from 'zod';

const CareerAdviceChatbotInputSchema = z.object({
  query: z.string().describe('The user query about career advice.'),
});
export type CareerAdviceChatbotInput = z.infer<typeof CareerAdviceChatbotInputSchema>;

const CareerAdviceChatbotOutputSchema = z.object({
  response: z.string().describe('The response from the AI chatbot.'),
});
export type CareerAdviceChatbotOutput = z.infer<typeof CareerAdviceChatbotOutputSchema>;

export async function careerAdviceChatbot(input: CareerAdviceChatbotInput): Promise<CareerAdviceChatbotOutput> {
  return careerAdviceChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'careerAdviceChatbotPrompt',
  input: {schema: CareerAdviceChatbotInputSchema},
  output: {schema: CareerAdviceChatbotOutputSchema},
  prompt: `You are a helpful AI career mentor chatbot.

You will help the user with career advice based on their questions.

User Query: {{{query}}}`,
});

const careerAdviceChatbotFlow = ai.defineFlow(
  {
    name: 'careerAdviceChatbotFlow',
    inputSchema: CareerAdviceChatbotInputSchema,
    outputSchema: CareerAdviceChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
