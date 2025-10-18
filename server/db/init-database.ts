import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sql = neon(process.env.DATABASE_URL!);

export async function initializeDatabase() {
  console.log('Initializing database...');

  try {
    const migrationSQL = readFileSync(
      join(__dirname, './migrations/0001_create_tables.sql'),
      'utf-8'
    );

    await sql(migrationSQL);
    console.log('✓ Database tables created');

    const existingClauses = await sql`SELECT COUNT(*) as count FROM clauses`;
    const clauseCount = parseInt(existingClauses[0].count as string);

    if (clauseCount === 0) {
      console.log('Seeding California clauses...');
      
      const clausesJSON = readFileSync(
        join(__dirname, '../../data/clauses/california-clauses.json'),
        'utf-8'
      );
      const californiaClausesData = JSON.parse(clausesJSON);
      
      for (const clause of californiaClausesData) {
        await sql`
          INSERT INTO clauses (clause_id, title, category, jurisdiction, text_normalized, version)
          VALUES (${clause.clauseId}, ${clause.title}, ${clause.category}, 
                  ${clause.jurisdiction}, ${clause.textNormalized}, ${clause.version})
          ON CONFLICT (clause_id) DO NOTHING
        `;
      }
      
      console.log(`✓ Seeded ${californiaClausesData.length} California clauses`);
    } else {
      console.log(`✓ Database already contains ${clauseCount} clauses`);
    }

    console.log('Database initialization complete!');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
