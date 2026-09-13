const { JoynerLucasLifecycleService, createInitialDeal } = require('./lucasfilm_engine');

console.log('=== RUNNING LUCASFILM & JOYNER LUCAS CONTRACT SUITE ===\n');
let passed = 0, failed = 0;
function assert(desc, condition) {
  if (condition) {
    console.log('  [PASS] ' + desc);
    passed++;
  } else {
    console.error('  [FAIL] ' + desc);
    failed++;
  }
}

// 1. Happy path
const deal1 = createInitialDeal(3000000);
const svc1 = new JoynerLucasLifecycleService(deal1);
assert('Initial stage is Draft', svc1.getStage() === 'Draft');

const r1 = svc1.executeAgreement('Joyner Lucas', 'George Lucas');
assert('Execution triggers Milestone 1 ($625,000)', r1.success && r1.stage === 'Executed' && deal1.escrowBalanceUSD === 2375000);

const r2 = svc1.startScoringSessions(['2026-10-15', '2026-10-22'], 'Skywalker Chief Mixer');
assert('Scoring starts successfully', r2.success && r2.stage === 'Scoring_Sessions_Active');

const r3 = svc1.submitAndValidateMasters({ format: 'Dolby_Atmos_ADM_BWF', sampleRateKhz: 96, checksumSha256: 'abc123' }, 'Skywalker QA');
assert('Masters deliver and Milestone 2 is paid ($312,500)', r3.success && r3.stage === 'Masters_Delivered' && deal1.escrowBalanceUSD === 2062500);

const r4 = svc1.conductCanonContinuityReview({ prohibitedTermsFound: [], notes: 'Lore clean' }, 'Holocron Keeper');
assert('Canon review approves', r4.success && r4.stage === 'Canon_Approved');

const r5 = svc1.finalizeTheatricalCutSignoff('Executive Producer');
assert('Theatrical cut signoff triggers Milestone 3 ($312,500) and Active_Distribution', r5.success && r5.stage === 'Active_Distribution' && deal1.escrowBalanceUSD === 1750000);

const waterfall = svc1.processRevenueWaterfall(10000000);
assert('Waterfall computes 22.5% Lucasfilm ($2.25M), 15% ILM/Skywalker ($1.5M), 2.5% Joyner Lucas ($250k)', 
  waterfall.lucasfilmLtdShareUSD === 2250000 && 
  waterfall.skywalkerSoundReserveUSD === 1500000 && 
  waterfall.joynerLucasBackendUSD === 250000 && 
  waterfall.producerPoolUSD === 6000000
);

// 2. Guard rails
const deal2 = createInitialDeal(500000);
const svc2 = new JoynerLucasLifecycleService(deal2);
const rShortfall = svc2.executeAgreement('Joyner Lucas', 'George Lucas');
assert('Prevent milestone payout on escrow shortfall', !rShortfall.success && rShortfall.error.includes('Escrow shortfall'));

const deal3 = createInitialDeal(3000000);
const svc3 = new JoynerLucasLifecycleService(deal3);
svc3.executeAgreement('Joyner Lucas', 'George Lucas');
svc3.startScoringSessions(['2026-10-15'], 'Mixer');
const rBadFormat = svc3.submitAndValidateMasters({ format: 'MP3', sampleRateKhz: 44.1 }, 'QA');
assert('Reject non-Dolby Atmos / low sample rate audio', !rBadFormat.success && rBadFormat.error.includes('Rejected'));

console.log('\n============================================================');
console.log('TEST SUMMARY: ' + passed + ' passed, ' + failed + ' failed.');
console.log('============================================================\n');
