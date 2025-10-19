import type { GeneratedPrenup, PrenupSection, InsertPrenupClause } from "@shared/schema";

interface ParsedClause {
  clauseNumber: number;
  title: string;
  legalText: string;
  category: string;
}

export function parsePrenupClauses(prenup: GeneratedPrenup, intakeId: string): InsertPrenupClause[] {
  const parsedClauses: ParsedClause[] = [];
  let clauseNumber = 1;

  for (const section of prenup.sections) {
    // Split section text into individual clauses
    // Clauses are typically separated by numbered paragraphs or lettered subsections
    const clauses = splitSectionIntoClauses(section);
    
    for (const clause of clauses) {
      parsedClauses.push({
        clauseNumber: clauseNumber++,
        title: clause.title || section.title,
        legalText: clause.text,
        category: determineCategory(section.title),
      });
    }
  }

  return parsedClauses.map(clause => ({
    intakeId,
    clauseNumber: clause.clauseNumber,
    title: clause.title,
    legalText: clause.legalText,
    category: clause.category,
    plainExplanation: null,
  }));
}

function splitSectionIntoClauses(section: PrenupSection): Array<{ title: string | null; text: string }> {
  const text = section.text;
  
  // Pattern 1: Numbered paragraphs (e.g., "1. ", "2. ", "3. ")
  const numberedPattern = /(?:^|\n)(\d+)\.\s+/g;
  const numberedMatches = Array.from(text.matchAll(numberedPattern));
  
  if (numberedMatches.length > 1) {
    const clauses: Array<{ title: string | null; text: string }> = [];
    
    for (let i = 0; i < numberedMatches.length; i++) {
      const match = numberedMatches[i];
      const startIndex = match.index! + match[0].length;
      const endIndex = i < numberedMatches.length - 1 
        ? numberedMatches[i + 1].index 
        : text.length;
      
      const clauseText = text.substring(startIndex, endIndex).trim();
      
      // Extract title from first line if it looks like a heading
      const lines = clauseText.split('\n');
      const firstLine = lines[0].trim();
      const hasTitle = firstLine.length < 100 && !firstLine.endsWith('.');
      
      clauses.push({
        title: hasTitle ? firstLine : null,
        text: hasTitle ? lines.slice(1).join('\n').trim() : clauseText,
      });
    }
    
    return clauses;
  }
  
  // Pattern 2: Lettered subsections (e.g., "a) ", "b) ", "c) ")
  const letteredPattern = /(?:^|\n)([a-z])\)\s+/g;
  const letteredMatches = Array.from(text.matchAll(letteredPattern));
  
  if (letteredMatches.length > 1) {
    const clauses: Array<{ title: string | null; text: string }> = [];
    
    for (let i = 0; i < letteredMatches.length; i++) {
      const match = letteredMatches[i];
      const startIndex = match.index! + match[0].length;
      const endIndex = i < letteredMatches.length - 1 
        ? letteredMatches[i + 1].index 
        : text.length;
      
      const clauseText = text.substring(startIndex, endIndex).trim();
      clauses.push({
        title: null,
        text: clauseText,
      });
    }
    
    return clauses;
  }
  
  // Pattern 3: No clear subsections - treat entire section as one clause
  return [{
    title: section.title,
    text: section.text.trim(),
  }];
}

function determineCategory(sectionTitle: string): string {
  const title = sectionTitle.toLowerCase();
  
  if (title.includes('recital') || title.includes('background') || title.includes('preamble')) {
    return 'Recitals';
  }
  if (title.includes('disclosure') || title.includes('financial')) {
    return 'Financial Disclosure';
  }
  if (title.includes('property') || title.includes('asset') || title.includes('separate')) {
    return 'Property Rights';
  }
  if (title.includes('support') || title.includes('alimony') || title.includes('maintenance')) {
    return 'Spousal Support';
  }
  if (title.includes('debt') || title.includes('liabilit')) {
    return 'Debts & Liabilities';
  }
  if (title.includes('estate') || title.includes('inherit') || title.includes('death')) {
    return 'Estate Planning';
  }
  if (title.includes('attorney') || title.includes('counsel') || title.includes('representation')) {
    return 'Legal Representation';
  }
  if (title.includes('modification') || title.includes('amendment')) {
    return 'Modifications';
  }
  if (title.includes('sever') || title.includes('enforc')) {
    return 'General Provisions';
  }
  
  return 'General Provisions';
}
