import 'dotenv/config';
import postgres from 'postgres';

const sql = postgres(process.env.SUPABASE_DB_URL!, { ssl: 'require' });

async function checkPIIMap() {
  try {
    const result = await sql`
      SELECT id, email, pii_map
      FROM intakes
      WHERE id = '9a79109d-bea6-43eb-b84a-df092620f8c5'
      LIMIT 1
    `;

    if (result.length === 0) {
      console.log('No intake found');
      process.exit(0);
    }

    const intake = result[0];
    console.log('\n=== Intake Info ===');
    console.log('ID:', intake.id);
    console.log('Email:', intake.email);
    console.log('\n=== PII Map Structure ===');
    console.log('pii_map exists:', intake.pii_map !== null);
    console.log('pii_map type:', typeof intake.pii_map);
    console.log('\n=== PII Map Contents (JSON) ===');
    console.log(JSON.stringify(intake.pii_map, null, 2));

    if (intake.pii_map) {
      console.log('\n=== PII Map Properties ===');
      console.log('Has names property:', 'names' in intake.pii_map);
      console.log('Has values property:', 'values' in intake.pii_map);
      console.log('Has descriptions property:', 'descriptions' in intake.pii_map);
      console.log('Has dates property:', 'dates' in intake.pii_map);

      console.log('\n=== Property Types ===');
      console.log('names type:', typeof intake.pii_map.names);
      console.log('values type:', typeof intake.pii_map.values);
      console.log('descriptions type:', typeof intake.pii_map.descriptions);
      console.log('dates type:', typeof intake.pii_map.dates);

      console.log('\n=== Property Contents ===');
      console.log('names keys:', Object.keys(intake.pii_map.names || {}));
      console.log('values keys:', Object.keys(intake.pii_map.values || {}));
      console.log('descriptions keys:', Object.keys(intake.pii_map.descriptions || {}));
      console.log('dates keys:', Object.keys(intake.pii_map.dates || {}));
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sql.end();
  }
}

checkPIIMap();
