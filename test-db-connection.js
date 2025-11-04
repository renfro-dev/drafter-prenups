import 'dotenv/config';
import postgres from 'postgres';

console.log('Testing Supabase database connection...');
console.log('Connection URL (masked):', process.env.SUPABASE_DB_URL?.replace(/:[^@]+@/, ':****@'));

const sql = postgres(process.env.SUPABASE_DB_URL, {
  ssl: 'require',
});

try {
  const result = await sql`SELECT current_database(), current_user, version()`;
  console.log('✅ Connection successful!');
  console.log('Database:', result[0].current_database);
  console.log('User:', result[0].current_user);
  console.log('PostgreSQL version:', result[0].version.split(' ')[0], result[0].version.split(' ')[1]);

  // Test table creation
  console.log('\nTesting table access...');
  const tables = await sql`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    LIMIT 5
  `;
  console.log('Tables found:', tables.length);
  tables.forEach(t => console.log('  -', t.table_name));

  await sql.end();
  process.exit(0);
} catch (error) {
  console.error('❌ Connection failed:');
  console.error(error.message);
  console.error('\nPlease verify:');
  console.error('1. Your connection string is correct (copy it directly from Supabase Dashboard)');
  console.error('2. The database password is URL-encoded (special chars like $ should be %24)');
  console.error('3. You\'re using the Connection Pooling URL (port 6543), not direct connection');
  await sql.end();
  process.exit(1);
}
