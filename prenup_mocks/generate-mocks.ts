import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface MockScenario {
  name: string;
  description: string;
  data: any;
}

async function generateMockPrenups() {
  console.log('🚀 Starting mock prenup generation...\n');

  const scenarios: MockScenario[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'mock-scenarios.json'), 'utf-8')
  );

  for (let i = 0; i < scenarios.length; i++) {
    const scenario = scenarios[i];
    console.log(`\n📄 Generating ${i + 1}/${scenarios.length}: ${scenario.name}`);
    console.log(`   ${scenario.description}`);

    try {
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scenario.data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`API error: ${error.error || response.statusText}`);
      }

      const result = await response.json();
      
      if (result.downloadUrl) {
        const base64Data = result.downloadUrl.split(',')[1];
        const buffer = Buffer.from(base64Data, 'base64');
        
        const filename = `${i + 1}-${scenario.name.replace(/\s+/g, '-')}.docx`;
        const filepath = path.join(__dirname, filename);
        
        fs.writeFileSync(filepath, buffer);
        console.log(`   ✅ Saved: ${filename}`);
      } else {
        console.log(`   ℹ️  Document sent via email to ${scenario.data.email}`);
      }

      console.log(`   📧 Email delivered: ${result.emailDelivered ? 'Yes' : 'No'}`);
      
    } catch (error) {
      console.error(`   ❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    if (i < scenarios.length - 1) {
      console.log('\n   ⏳ Waiting 2 seconds before next generation...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log('\n\n✨ Mock generation complete!');
  console.log(`📁 Check the prenup_mocks/ folder for generated documents\n`);
}

generateMockPrenups().catch(console.error);
