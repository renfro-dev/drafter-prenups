import Anthropic from '@anthropic-ai/sdk';

/*
Referenced from javascript_anthropic integration blueprint.
The newest Anthropic model is "claude-sonnet-4-20250514", not "claude-3-7-sonnet-20250219", "claude-3-5-sonnet-20241022" nor "claude-3-sonnet-20240229". 
If the user doesn't specify a model, always prefer using "claude-sonnet-4-20250514" as it is the latest model.
*/

// <important_do_not_delete>
const DEFAULT_MODEL_STR = "claude-sonnet-4-20250514";
// </important_do_not_delete>

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generatePrenup(
  maskedIntakeData: any,
  clauses: Array<{ title: string; text_normalized: string; category: string }>
): Promise<{ jurisdiction: string; sections: Array<{ title: string; text: string }> }> {
  const systemPrompt = `You are a legal drafting AI specialized in creating prenuptial agreements for California.

Your task is to generate a complete, enforceable prenuptial agreement based on:
1. Masked intake data from the parties
2. A library of verified California family law clauses

Return ONLY valid JSON in this exact format:
{
  "jurisdiction": "CA",
  "sections": [
    {"title": "Recitals", "text": "..."},
    {"title": "Full Financial Disclosure", "text": "..."},
    {"title": "Separate Property", "text": "..."},
    {"title": "Community Property", "text": "..."},
    {"title": "Spousal Support", "text": "..."},
    {"title": "Debts and Liabilities", "text": "..."},
    {"title": "Mutual Representations", "text": "..."},
    {"title": "Execution and Governing Law", "text": "..."}
  ]
}

Important:
- Use California-specific legal language
- Incorporate the provided clauses appropriately
- Maintain the masked tokens (PARTY_A_*, PARTY_B_*, VALUE_*, DESC_*, DATE_*) exactly as provided
- Ensure all sections flow logically and comprehensively
- Include proper recitals, definitions, and execution clauses
- The agreement must comply with California Family Code requirements`;

  const userPrompt = `Generate a California prenuptial agreement using the following information:

INTAKE DATA:
${JSON.stringify(maskedIntakeData, null, 2)}

AVAILABLE CLAUSES:
${clauses.map(c => `Category: ${c.category}\nTitle: ${c.title}\nText: ${c.text_normalized}\n`).join('\n---\n')}

Generate the complete prenup agreement in JSON format.`;

  const response = await anthropic.messages.create({
    model: DEFAULT_MODEL_STR,
    max_tokens: 4096,
    system: systemPrompt,
    messages: [
      { role: 'user', content: userPrompt }
    ],
  });

  const textContent = response.content.find(c => c.type === 'text');
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text response from Claude');
  }

  const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No JSON found in response');
  }

  const result = JSON.parse(jsonMatch[0]);
  
  return {
    jurisdiction: result.jurisdiction || 'CA',
    sections: result.sections || [],
  };
}
