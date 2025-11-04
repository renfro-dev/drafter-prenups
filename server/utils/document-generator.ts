import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Packer } from "docx";
import type { GeneratedPrenup, PIIMap } from "@shared/schema";
import { unmaskText } from "./pii-masking";

export async function generateWordDocument(prenup: GeneratedPrenup, piiMap: PIIMap, intake: any): Promise<Buffer> {
  const unmaskedSections = prenup.sections.map(section => ({
    title: unmaskText(section.title, piiMap),
    text: unmaskText(section.text, piiMap),
  }));

  // Extract party names with better error handling
  const partyAKey = Object.keys(piiMap.names).find(k => k.startsWith('PARTY_A_'));
  const partyBKey = Object.keys(piiMap.names).find(k => k.startsWith('PARTY_B_'));

  if (!partyAKey) {
    console.warn('[Document Generator] WARNING: No PARTY_A token found in piiMap.names');
    console.warn('[Document Generator] Available name keys:', Object.keys(piiMap.names));
  }
  if (!partyBKey) {
    console.warn('[Document Generator] WARNING: No PARTY_B token found in piiMap.names');
    console.warn('[Document Generator] Available name keys:', Object.keys(piiMap.names));
  }

  const partyA = partyAKey ? piiMap.names[partyAKey] : 'Party A';
  const partyB = partyBKey ? piiMap.names[partyBKey] : 'Party B';

  // Extract wedding date with better error handling
  const dateKeys = Object.keys(piiMap.dates);
  if (dateKeys.length === 0) {
    console.warn('[Document Generator] WARNING: No date tokens found in piiMap.dates');
  }
  const weddingDate = dateKeys.length > 0 ? piiMap.dates[dateKeys[0]] : 'TBD';

  const children: Paragraph[] = [];

  children.push(
    new Paragraph({
      text: "PRENUPTIAL AGREEMENT",
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `This Prenuptial Agreement ("Agreement") is entered into on this ___ day of __________, 20___, by and between `,
        }),
        new TextRun({
          text: partyA,
          bold: true,
        }),
        new TextRun({
          text: ` ("Party A") and `,
        }),
        new TextRun({
          text: partyB,
          bold: true,
        }),
        new TextRun({
          text: ` ("Party B"), collectively referred to as the "Parties."`,
        }),
      ],
      spacing: { after: 300 },
    })
  );

  for (const section of unmaskedSections) {
    children.push(
      new Paragraph({
        text: section.title.toUpperCase(),
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 300, after: 200 },
      })
    );

    const paragraphs = section.text.split('\n\n');
    for (const para of paragraphs) {
      if (para.trim()) {
        children.push(
          new Paragraph({
            text: para.trim(),
            spacing: { after: 200 },
          })
        );
      }
    }
  }

  children.push(
    new Paragraph({
      text: "IN WITNESS WHEREOF",
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 200 },
    }),
    new Paragraph({
      text: "The Parties have executed this Prenuptial Agreement on the date first written above.",
      spacing: { after: 300 },
    }),
    new Paragraph({
      text: "",
      spacing: { after: 200 },
    }),
    new Paragraph({
      text: "______________________________          Date: ______________",
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: partyA,
          bold: true,
        }),
      ],
      spacing: { after: 100 },
    }),
    new Paragraph({
      text: "Party A",
      spacing: { after: 300 },
    }),
    new Paragraph({
      text: "",
      spacing: { after: 200 },
    }),
    new Paragraph({
      text: "______________________________          Date: ______________",
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: partyB,
          bold: true,
        }),
      ],
      spacing: { after: 100 },
    }),
    new Paragraph({
      text: "Party B",
      spacing: { after: 400 },
    }),
    new Paragraph({
      text: "NOTARY ACKNOWLEDGMENT",
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 200 },
    }),
    new Paragraph({
      text: "State of California",
      spacing: { after: 100 },
    }),
    new Paragraph({
      text: "County of ______________",
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `On this ___ day of __________, 20___, before me, a Notary Public, personally appeared `,
        }),
        new TextRun({
          text: partyA,
          bold: true,
        }),
        new TextRun({
          text: ` and `,
        }),
        new TextRun({
          text: partyB,
          bold: true,
        }),
        new TextRun({
          text: `, known to me (or proved to me on the basis of satisfactory evidence) to be the persons whose names are subscribed to the within instrument, and acknowledged that they executed the same.`,
        }),
      ],
      spacing: { after: 200 },
    }),
    new Paragraph({
      text: "WITNESS my hand and official seal.",
      spacing: { after: 300 },
    }),
    new Paragraph({
      text: "",
      spacing: { after: 200 },
    }),
    new Paragraph({
      text: "______________________________",
      spacing: { after: 100 },
    }),
    new Paragraph({
      text: "Notary Public",
      spacing: { after: 400 },
    }),
    new Paragraph({
      text: "DISCLAIMER",
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 200 },
    }),
    new Paragraph({
      text: "This document has been generated using AI-powered legal technology and is provided for informational purposes only. This document does NOT constitute legal advice. Both parties are STRONGLY ADVISED to:",
      spacing: { after: 200 },
    }),
    new Paragraph({
      text: "1. Consult with independent legal counsel before signing this agreement",
      spacing: { after: 100 },
    }),
    new Paragraph({
      text: "2. Ensure adequate time for review (minimum 7 days before marriage as required by California law)",
      spacing: { after: 100 },
    }),
    new Paragraph({
      text: "3. Verify all financial disclosures are complete and accurate",
      spacing: { after: 100 },
    }),
    new Paragraph({
      text: "4. Obtain proper notarization and witnessing",
      spacing: { after: 200 },
    }),
    new Paragraph({
      text: `Generated on: ${new Date().toISOString()}`,
      spacing: { after: 100 },
    }),
    new Paragraph({
      text: "Jurisdiction: California",
      spacing: { after: 100 },
    }),
    new Paragraph({
      text: "Version: 1.0",
    })
  );

  const doc = new Document({
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });

  return await Packer.toBuffer(doc);
}
