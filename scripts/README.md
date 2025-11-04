# QA Testing Scripts

This directory contains automated testing scripts for quality assurance of the prenup generator application.

## QA Test Data Submission (`qa-test-data.ts`)

Comprehensive testing script that submits various intake scenarios to the prenup generation API for QA testing.

### Test Scenarios Included

1. **Minimal - No Assets or Debts**: Bare minimum valid intake with no assets or debts
2. **Simple - Single House**: Basic scenario with one property and mortgage
3. **Complex - Multiple Assets and Debts**: Moderate complexity with 7 assets and 4 debts
4. **High Net Worth - Extensive Assets**: High-value scenario with 15+ assets totaling $30M+
5. **Student Debt Heavy - Early Career Couple**: Young professionals with significant student loans
6. **Business Owner Scenario**: Entrepreneur with business assets and commercial property
7. **All Asset Types - Comprehensive Test**: Tests every asset and debt type available
8. **Edge Case - Maximum Additional Provisions**: Tests large text in additional provisions field
9. **Minimal Valid - Edge Case Minimum**: Absolute minimum valid data
10. **Joint Ownership Focus**: Most assets owned jointly by both parties

Each scenario tests different combinations of:
- Asset types (real property, bank accounts, investments, retirement, business, vehicles, personal property)
- Debt types (mortgage, student loan, credit card, auto loan, personal loan, business debt)
- Ownership structures (Party A, Party B, Joint)
- Boolean flags (spousal support waived, separate property protection, counsel represented)
- Additional provisions text

### Usage

#### Run all tests sequentially (recommended for first run):
```bash
npm run test:qa
```

#### Run tests in parallel (faster, for subsequent runs):
```bash
npm run test:qa:parallel
```

#### Run specific scenario:
```bash
npm run test:qa -- --scenario="High Net Worth"
```

#### Custom parallel concurrency:
```bash
tsx scripts/qa-test-data.ts --parallel 5
```

### Command Line Options

- `--parallel <n>`: Run tests in parallel with specified concurrency (default: 1)
- `--scenario=<name>`: Filter scenarios by name (case-insensitive partial match)

### Output

The script provides detailed output including:
- Progress updates for each test
- Success/failure status with response times
- Summary statistics (total, successful, failed, average response time)
- List of all generated intake IDs for successful tests
- Direct links to review each generated prenup

### Example Output

```
================================================================================
QA TEST DATA SUBMISSION - PRENUP GENERATOR
================================================================================

Running 10 test scenarios with concurrency: 1

[1/10] Testing: Minimal - No Assets or Debts...
  ✓ SUCCESS (2543ms) - Intake ID: abc123-def456-ghi789

[2/10] Testing: Simple - Single House...
  ✓ SUCCESS (3201ms) - Intake ID: xyz789-uvw456-rst123

...

================================================================================
TEST SUMMARY
================================================================================

Total Tests: 10
Successful: 10 (100.0%)
Failed: 0 (0.0%)
Average Response Time: 3845ms

Successful Test Intake IDs:
  - Minimal - No Assets or Debts: abc123-def456-ghi789
  - Simple - Single House: xyz789-uvw456-rst123
  ...

================================================================================
To review a specific intake, visit:
http://localhost:5000/review?intakeId=<INTAKE_ID>
================================================================================
```

### Prerequisites

- Development server must be running (`npm run dev`)
- Database must be initialized with California clauses
- Anthropic API key must be configured in `.env`

### Testing Checklist

After running the QA tests, verify:

1. **Document Generation**: All prenups generated successfully
2. **Clause Parsing**: Review features work (clauses are parseable)
3. **PII Masking**: Sensitive data is properly masked in database
4. **Asset/Debt Handling**: All types are properly formatted in documents
5. **Edge Cases**: Minimal and maximum data scenarios work
6. **Additional Provisions**: Long text fields render correctly
7. **Database Records**: Check intakes, generation_logs, prenup_clauses tables
8. **Document Quality**: Review generated Word documents for formatting
9. **Performance**: Response times are acceptable (< 10s for most scenarios)
10. **Error Handling**: Failed scenarios (if any) have clear error messages

### Reviewing Generated Prenups

To review a generated prenup:
1. Copy the intake ID from the test output
2. Visit: `http://localhost:5000/review?intakeId=<INTAKE_ID>`
3. Review the clause-by-clause breakdown
4. Check for proper formatting and legal text
5. Verify PII replacement worked correctly

### Troubleshooting

**Tests failing with connection errors:**
- Ensure dev server is running: `npm run dev`
- Verify server is on port 5000
- Check database connection

**Tests failing with generation errors:**
- Verify Anthropic API key is set
- Check database has California clauses: `npm run db:push`
- Review server logs for detailed error messages

**Slow response times:**
- Anthropic API may be under load
- Use parallel mode for faster overall execution
- Consider reducing test scenarios for quick checks

### Adding New Test Scenarios

To add new test scenarios, edit `qa-test-data.ts` and add to the `testScenarios` array:

```typescript
{
  name: "Your Scenario Name",
  data: {
    email: "test-yourscenario@example.com",
    state: "CA",
    partyAName: "Party A Name",
    partyBName: "Party B Name",
    weddingDate: "2025-MM-DD",
    assets: [ /* your assets */ ],
    debts: [ /* your debts */ ],
    spousalSupportWaived: true/false,
    separatePropertyProtection: true/false,
    counselRepresented: true/false,
    additionalProvisions: "optional text"
  }
}
```

### Notes

- Each test creates real database records
- Use test emails to easily identify QA data
- Tests include 2-3 second delays between requests to avoid overwhelming the API
- All scenarios use California (CA) jurisdiction
- Test data uses realistic values and descriptions
