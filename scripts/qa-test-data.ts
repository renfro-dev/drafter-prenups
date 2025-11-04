import fetch from 'node-fetch';

// Test data variations for QA testing
const testScenarios = [
  {
    name: "Minimal - No Assets or Debts",
    data: {
      email: "test-minimal@example.com",
      state: "CA",
      partyAName: "Alice Johnson",
      partyBName: "Bob Smith",
      weddingDate: "2024-12-15",
      assets: [],
      debts: [],
      spousalSupportWaived: false,
      separatePropertyProtection: true,
      counselRepresented: false,
    }
  },
  {
    name: "Simple - Single House",
    data: {
      email: "test-simple@example.com",
      state: "CA",
      partyAName: "Charlie Brown",
      partyBName: "Diana Prince",
      weddingDate: "2025-06-20",
      assets: [
        {
          type: "real_property",
          description: "Single family home in Los Angeles",
          value: 850000,
          owner: "A"
        }
      ],
      debts: [
        {
          type: "mortgage",
          description: "Mortgage on Los Angeles home",
          value: 500000,
          party: "A"
        }
      ],
      spousalSupportWaived: true,
      separatePropertyProtection: true,
      counselRepresented: true,
    }
  },
  {
    name: "Complex - Multiple Assets and Debts",
    data: {
      email: "test-complex@example.com",
      state: "CA",
      partyAName: "Edward Norton",
      partyBName: "Fiona Apple",
      weddingDate: "2025-03-15",
      assets: [
        {
          type: "real_property",
          description: "Primary residence in San Francisco",
          value: 1500000,
          owner: "A"
        },
        {
          type: "real_property",
          description: "Vacation home in Lake Tahoe",
          value: 750000,
          owner: "joint"
        },
        {
          type: "investment",
          description: "Stock portfolio - Tech companies",
          value: 500000,
          owner: "A"
        },
        {
          type: "retirement",
          description: "401(k) retirement account",
          value: 300000,
          owner: "B"
        },
        {
          type: "business",
          description: "Software consulting LLC",
          value: 250000,
          owner: "A"
        },
        {
          type: "vehicle",
          description: "2023 Tesla Model S",
          value: 85000,
          owner: "A"
        },
        {
          type: "vehicle",
          description: "2022 BMW X5",
          value: 65000,
          owner: "B"
        }
      ],
      debts: [
        {
          type: "mortgage",
          description: "Mortgage on San Francisco property",
          value: 900000,
          party: "A"
        },
        {
          type: "mortgage",
          description: "Mortgage on Lake Tahoe property",
          value: 400000,
          party: "joint"
        },
        {
          type: "student_loan",
          description: "MBA student loans",
          value: 80000,
          party: "B"
        },
        {
          type: "business_debt",
          description: "Business line of credit",
          value: 50000,
          party: "A"
        }
      ],
      spousalSupportWaived: true,
      separatePropertyProtection: true,
      counselRepresented: true,
      additionalProvisions: "Party A will maintain life insurance policy with Party B as beneficiary for duration of marriage. Any pets acquired during marriage will be considered joint property."
    }
  },
  {
    name: "High Net Worth - Extensive Assets",
    data: {
      email: "test-highnetworth@example.com",
      state: "CA",
      partyAName: "George Hamilton",
      partyBName: "Helen Mirren",
      weddingDate: "2025-09-01",
      assets: [
        {
          type: "real_property",
          description: "Primary estate in Beverly Hills (5 bed, 7 bath)",
          value: 8500000,
          owner: "A"
        },
        {
          type: "real_property",
          description: "Penthouse apartment in Manhattan",
          value: 4200000,
          owner: "A"
        },
        {
          type: "real_property",
          description: "Beach house in Malibu",
          value: 3800000,
          owner: "joint"
        },
        {
          type: "investment",
          description: "Diversified stock portfolio",
          value: 2500000,
          owner: "A"
        },
        {
          type: "investment",
          description: "Private equity investments",
          value: 1800000,
          owner: "A"
        },
        {
          type: "investment",
          description: "Cryptocurrency holdings (Bitcoin, Ethereum)",
          value: 750000,
          owner: "B"
        },
        {
          type: "retirement",
          description: "IRA and 401(k) combined",
          value: 1200000,
          owner: "A"
        },
        {
          type: "retirement",
          description: "Pension plan",
          value: 900000,
          owner: "B"
        },
        {
          type: "business",
          description: "Tech startup (45% ownership)",
          value: 3500000,
          owner: "A"
        },
        {
          type: "business",
          description: "Restaurant chain (3 locations)",
          value: 1800000,
          owner: "B"
        },
        {
          type: "personal_property",
          description: "Art collection (contemporary and modern)",
          value: 950000,
          owner: "joint"
        },
        {
          type: "personal_property",
          description: "Jewelry and watches",
          value: 425000,
          owner: "B"
        },
        {
          type: "vehicle",
          description: "2024 Porsche 911 Turbo S",
          value: 230000,
          owner: "A"
        },
        {
          type: "vehicle",
          description: "2023 Range Rover Autobiography",
          value: 145000,
          owner: "B"
        },
        {
          type: "vehicle",
          description: "Yacht - 55ft sailing vessel",
          value: 850000,
          owner: "joint"
        }
      ],
      debts: [
        {
          type: "mortgage",
          description: "Beverly Hills estate mortgage",
          value: 3500000,
          party: "A"
        },
        {
          type: "mortgage",
          description: "Manhattan penthouse mortgage",
          value: 2000000,
          party: "A"
        },
        {
          type: "business_debt",
          description: "Business loan for restaurant expansion",
          value: 500000,
          party: "B"
        },
        {
          type: "credit_card",
          description: "Credit card balances",
          value: 45000,
          party: "joint"
        }
      ],
      spousalSupportWaived: true,
      separatePropertyProtection: true,
      counselRepresented: true,
      additionalProvisions: "Party A's startup equity shall remain separate property. Any stock options that vest during marriage will be allocated according to time-based formula. Trust accounts maintained separately by each party shall remain separate property regardless of contributions made during marriage."
    }
  },
  {
    name: "Student Debt Heavy - Early Career Couple",
    data: {
      email: "test-studentdebt@example.com",
      state: "CA",
      partyAName: "Ian Cooper",
      partyBName: "Julia Roberts",
      weddingDate: "2025-05-10",
      assets: [
        {
          type: "bank_account",
          description: "Joint savings account",
          value: 25000,
          owner: "joint"
        },
        {
          type: "retirement",
          description: "401(k) - Party A",
          value: 35000,
          owner: "A"
        },
        {
          type: "retirement",
          description: "401(k) - Party B",
          value: 28000,
          owner: "B"
        },
        {
          type: "vehicle",
          description: "2020 Honda Accord",
          value: 22000,
          owner: "A"
        },
        {
          type: "vehicle",
          description: "2019 Toyota Camry",
          value: 19000,
          owner: "B"
        }
      ],
      debts: [
        {
          type: "student_loan",
          description: "Medical school loans - Party A",
          value: 320000,
          party: "A"
        },
        {
          type: "student_loan",
          description: "Law school loans - Party B",
          value: 180000,
          party: "B"
        },
        {
          type: "auto_loan",
          description: "Car loan for Honda Accord",
          value: 12000,
          party: "A"
        },
        {
          type: "auto_loan",
          description: "Car loan for Toyota Camry",
          value: 8500,
          party: "B"
        },
        {
          type: "credit_card",
          description: "Credit card debt",
          value: 15000,
          party: "joint"
        }
      ],
      spousalSupportWaived: false,
      separatePropertyProtection: true,
      counselRepresented: true,
      additionalProvisions: "Pre-marital student loan debt shall remain separate debt of each party. Income during marriage may be used to pay down either party's student loans without creating a reimbursement claim."
    }
  },
  {
    name: "Business Owner Scenario",
    data: {
      email: "test-business@example.com",
      state: "CA",
      partyAName: "Kevin Martinez",
      partyBName: "Laura Chen",
      weddingDate: "2025-07-22",
      assets: [
        {
          type: "business",
          description: "Manufacturing company (100% ownership)",
          value: 4500000,
          owner: "A"
        },
        {
          type: "real_property",
          description: "Commercial building (houses business)",
          value: 2200000,
          owner: "A"
        },
        {
          type: "real_property",
          description: "Primary residence",
          value: 950000,
          owner: "joint"
        },
        {
          type: "investment",
          description: "Business investment account",
          value: 650000,
          owner: "A"
        },
        {
          type: "retirement",
          description: "SEP IRA",
          value: 425000,
          owner: "A"
        },
        {
          type: "retirement",
          description: "Roth IRA",
          value: 185000,
          owner: "B"
        },
        {
          type: "personal_property",
          description: "Business equipment and inventory",
          value: 380000,
          owner: "A"
        }
      ],
      debts: [
        {
          type: "business_debt",
          description: "Business line of credit",
          value: 750000,
          party: "A"
        },
        {
          type: "mortgage",
          description: "Commercial property mortgage",
          value: 1200000,
          party: "A"
        },
        {
          type: "mortgage",
          description: "Home mortgage",
          value: 600000,
          party: "joint"
        }
      ],
      spousalSupportWaived: true,
      separatePropertyProtection: true,
      counselRepresented: true,
      additionalProvisions: "Party A's business shall remain separate property. Any increase in business value during marriage shall be apportioned based on community vs. separate contributions. Party B waives any management rights in the business but retains financial interest as determined by this agreement."
    }
  },
  {
    name: "All Asset Types - Comprehensive Test",
    data: {
      email: "test-alltypes@example.com",
      state: "CA",
      partyAName: "Michael Wong",
      partyBName: "Nancy Davis",
      weddingDate: "2025-11-11",
      assets: [
        {
          type: "real_property",
          description: "Family home",
          value: 1200000,
          owner: "joint"
        },
        {
          type: "bank_account",
          description: "Checking and savings",
          value: 85000,
          owner: "joint"
        },
        {
          type: "investment",
          description: "Brokerage account",
          value: 450000,
          owner: "A"
        },
        {
          type: "retirement",
          description: "Combined retirement accounts",
          value: 680000,
          owner: "B"
        },
        {
          type: "business",
          description: "Consulting practice",
          value: 320000,
          owner: "A"
        },
        {
          type: "vehicle",
          description: "Family SUV",
          value: 55000,
          owner: "joint"
        },
        {
          type: "personal_property",
          description: "Furniture, electronics, jewelry",
          value: 95000,
          owner: "joint"
        },
        {
          type: "other",
          description: "Collectibles and memorabilia",
          value: 42000,
          owner: "A"
        }
      ],
      debts: [
        {
          type: "mortgage",
          description: "Home mortgage",
          value: 750000,
          party: "joint"
        },
        {
          type: "student_loan",
          description: "Graduate school loans",
          value: 65000,
          party: "B"
        },
        {
          type: "credit_card",
          description: "Credit cards",
          value: 18000,
          party: "joint"
        },
        {
          type: "auto_loan",
          description: "SUV loan",
          value: 28000,
          party: "joint"
        },
        {
          type: "personal_loan",
          description: "Personal loan from family",
          value: 25000,
          party: "A"
        },
        {
          type: "business_debt",
          description: "Business credit line",
          value: 45000,
          party: "A"
        },
        {
          type: "other",
          description: "Medical bills",
          value: 8500,
          party: "B"
        }
      ],
      spousalSupportWaived: true,
      separatePropertyProtection: true,
      counselRepresented: true,
      additionalProvisions: "Comprehensive agreement covering all asset types. Each party retains separate property brought into marriage. Community property will be divided equally upon dissolution."
    }
  },
  {
    name: "Edge Case - Maximum Additional Provisions",
    data: {
      email: "test-edgecase@example.com",
      state: "CA",
      partyAName: "Oliver Thompson",
      partyBName: "Patricia Lee",
      weddingDate: "2025-04-04",
      assets: [
        {
          type: "real_property",
          description: "Downtown condo",
          value: 725000,
          owner: "A"
        },
        {
          type: "investment",
          description: "Stock portfolio",
          value: 285000,
          owner: "B"
        }
      ],
      debts: [
        {
          type: "mortgage",
          description: "Condo mortgage",
          value: 450000,
          party: "A"
        }
      ],
      spousalSupportWaived: false,
      separatePropertyProtection: false,
      counselRepresented: true,
      additionalProvisions: `This prenuptial agreement includes several special provisions that reflect the unique circumstances of our relationship:

1. INTELLECTUAL PROPERTY: Any patents, copyrights, trademarks, or other intellectual property created by either party during the marriage shall be owned by the creating party, regardless of when conceived or registered.

2. INHERITANCE PROVISIONS: Any inheritance received by either party during the marriage shall remain the separate property of the receiving party. This includes real property, personal property, financial assets, and business interests.

3. GIFT PROVISIONS: Gifts received by either party from third parties shall remain separate property. Gifts exchanged between spouses shall be considered separate property of the recipient unless otherwise specified in writing.

4. BUSINESS INTERESTS: If either party starts a business during the marriage, that business shall be considered separate property of the founding party. The non-founding party waives any community property interest but may be entitled to reimbursement for community funds used.

5. RETIREMENT ACCOUNTS: Contributions to retirement accounts from separate property funds shall remain separate property. Only contributions made from community earnings shall be subject to community property division.

6. EDUCATION AND CAREER: If either party pursues additional education or professional licensing during marriage, any increased earning capacity shall be considered a community asset subject to reimbursement claims.

7. RELOCATION: If career opportunities require relocation, both parties agree to negotiate in good faith. The relocating party's career advancement shall not automatically entitle them to greater property division.

8. CHILDREN FROM PRIOR RELATIONSHIPS: Each party has children from a prior relationship. This agreement shall not affect the inheritance rights of those children or any obligations to them.

9. SPOUSAL SUPPORT LIMITATION: While not completely waived, spousal support shall be limited to a maximum of 3 years and capped at $5,000 per month, adjusted for inflation.

10. DISPUTE RESOLUTION: Any disputes regarding this agreement shall be resolved through binding arbitration rather than litigation. Each party waives the right to a jury trial.`
    }
  },
  {
    name: "Minimal Valid - Edge Case Minimum",
    data: {
      email: "test-minimal-edge@example.com",
      state: "CA",
      partyAName: "QA",
      partyBName: "QB",
      weddingDate: "2025-01-01",
      assets: [],
      debts: [],
      spousalSupportWaived: false,
      separatePropertyProtection: false,
      counselRepresented: false,
    }
  },
  {
    name: "Joint Ownership Focus",
    data: {
      email: "test-joint@example.com",
      state: "CA",
      partyAName: "Robert Zhang",
      partyBName: "Sarah Kim",
      weddingDate: "2025-08-08",
      assets: [
        {
          type: "real_property",
          description: "Jointly purchased home",
          value: 950000,
          owner: "joint"
        },
        {
          type: "bank_account",
          description: "Joint savings",
          value: 120000,
          owner: "joint"
        },
        {
          type: "investment",
          description: "Joint investment account",
          value: 275000,
          owner: "joint"
        },
        {
          type: "vehicle",
          description: "Family minivan",
          value: 42000,
          owner: "joint"
        },
        {
          type: "personal_property",
          description: "Shared household items",
          value: 65000,
          owner: "joint"
        }
      ],
      debts: [
        {
          type: "mortgage",
          description: "Joint home mortgage",
          value: 650000,
          party: "joint"
        },
        {
          type: "credit_card",
          description: "Joint credit cards",
          value: 12000,
          party: "joint"
        }
      ],
      spousalSupportWaived: false,
      separatePropertyProtection: true,
      counselRepresented: true,
      additionalProvisions: "Most assets are jointly owned. In event of dissolution, assets will be liquidated and proceeds divided equally after paying off all joint debts."
    }
  }
];

interface TestResult {
  scenario: string;
  success: boolean;
  intakeId?: string;
  error?: string;
  responseTime: number;
}

async function runTest(scenario: any): Promise<TestResult> {
  const startTime = Date.now();

  try {
    const response = await fetch('http://localhost:5000/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scenario.data),
    });

    const responseTime = Date.now() - startTime;

    if (!response.ok) {
      const errorText = await response.text();
      return {
        scenario: scenario.name,
        success: false,
        error: `HTTP ${response.status}: ${errorText}`,
        responseTime,
      };
    }

    const result = await response.json();

    return {
      scenario: scenario.name,
      success: result.success,
      intakeId: result.intakeId,
      responseTime,
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    return {
      scenario: scenario.name,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      responseTime,
    };
  }
}

async function runAllTests(concurrency: number = 1) {
  console.log('='.repeat(80));
  console.log('QA TEST DATA SUBMISSION - PRENUP GENERATOR');
  console.log('='.repeat(80));
  console.log(`\nRunning ${testScenarios.length} test scenarios with concurrency: ${concurrency}\n`);

  const results: TestResult[] = [];

  if (concurrency === 1) {
    // Run sequentially
    for (let i = 0; i < testScenarios.length; i++) {
      const scenario = testScenarios[i];
      console.log(`[${i + 1}/${testScenarios.length}] Testing: ${scenario.name}...`);

      const result = await runTest(scenario);
      results.push(result);

      if (result.success) {
        console.log(`  ✓ SUCCESS (${result.responseTime}ms) - Intake ID: ${result.intakeId}`);
      } else {
        console.log(`  ✗ FAILED (${result.responseTime}ms) - ${result.error}`);
      }

      // Add delay between requests
      if (i < testScenarios.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  } else {
    // Run with limited concurrency
    for (let i = 0; i < testScenarios.length; i += concurrency) {
      const batch = testScenarios.slice(i, i + concurrency);
      console.log(`\nBatch ${Math.floor(i / concurrency) + 1}: Testing ${batch.length} scenarios...`);

      const batchResults = await Promise.all(
        batch.map(scenario => runTest(scenario))
      );

      results.push(...batchResults);

      batchResults.forEach(result => {
        if (result.success) {
          console.log(`  ✓ ${result.scenario} (${result.responseTime}ms)`);
        } else {
          console.log(`  ✗ ${result.scenario} (${result.responseTime}ms) - ${result.error}`);
        }
      });

      // Add delay between batches
      if (i + concurrency < testScenarios.length) {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
  }

  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('TEST SUMMARY');
  console.log('='.repeat(80));

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  const avgResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0) / results.length;

  console.log(`\nTotal Tests: ${results.length}`);
  console.log(`Successful: ${successful} (${((successful / results.length) * 100).toFixed(1)}%)`);
  console.log(`Failed: ${failed} (${((failed / results.length) * 100).toFixed(1)}%)`);
  console.log(`Average Response Time: ${avgResponseTime.toFixed(0)}ms`);

  if (failed > 0) {
    console.log('\nFailed Tests:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.scenario}: ${r.error}`);
    });
  }

  if (successful > 0) {
    console.log('\nSuccessful Test Intake IDs:');
    results.filter(r => r.success).forEach(r => {
      console.log(`  - ${r.scenario}: ${r.intakeId}`);
    });
  }

  console.log('\n' + '='.repeat(80));
  console.log('To review a specific intake, visit:');
  console.log('http://localhost:5000/review?intakeId=<INTAKE_ID>');
  console.log('='.repeat(80) + '\n');
}

// Parse command line arguments
const args = process.argv.slice(2);
const concurrency = args.includes('--parallel')
  ? parseInt(args[args.indexOf('--parallel') + 1] || '3', 10)
  : 1;

const scenarioFilter = args.find(arg => arg.startsWith('--scenario='));
if (scenarioFilter) {
  const scenarioName = scenarioFilter.split('=')[1];
  const filtered = testScenarios.filter(s =>
    s.name.toLowerCase().includes(scenarioName.toLowerCase())
  );

  if (filtered.length === 0) {
    console.error(`No scenarios found matching: ${scenarioName}`);
    console.log('\nAvailable scenarios:');
    testScenarios.forEach(s => console.log(`  - ${s.name}`));
    process.exit(1);
  }

  testScenarios.length = 0;
  testScenarios.push(...filtered);
}

// Run tests
runAllTests(concurrency).catch(error => {
  console.error('Fatal error running tests:', error);
  process.exit(1);
});
